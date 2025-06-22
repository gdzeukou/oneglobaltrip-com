
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Download, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsData {
  conversionFunnel: any[];
  leadsByCountry: any[];
  leadsBySource: any[];
  monthlyTrends: any[];
  revenueData: any[];
}

const AnalyticsReports = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    conversionFunnel: [],
    leadsByCountry: [],
    leadsBySource: [],
    monthlyTrends: [],
    revenueData: []
  });
  const [timeRange, setTimeRange] = useState('30');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(timeRange));

      // Fetch form submissions for the period
      const { data: submissions, error: submissionsError } = await supabase
        .from('form_submissions')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (submissionsError) throw submissionsError;

      // Fetch user activity
      const { data: activity, error: activityError } = await supabase
        .from('user_activity')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (activityError) throw activityError;

      // Process conversion funnel
      const totalVisitors = activity?.length || 0;
      const formStarters = submissions?.length || 0;
      const completedForms = submissions?.filter(s => s.destination && s.nationality).length || 0;
      const bookedConsultations = submissions?.filter(s => s.appointment_booked).length || 0;
      const convertedSales = submissions?.filter(s => s.sales_value > 0).length || 0;

      const conversionFunnel = [
        { stage: 'Visitors', count: totalVisitors, percentage: 100 },
        { stage: 'Form Started', count: formStarters, percentage: totalVisitors ? (formStarters / totalVisitors * 100).toFixed(1) : 0 },
        { stage: 'Form Completed', count: completedForms, percentage: totalVisitors ? (completedForms / totalVisitors * 100).toFixed(1) : 0 },
        { stage: 'Consultation Booked', count: bookedConsultations, percentage: totalVisitors ? (bookedConsultations / totalVisitors * 100).toFixed(1) : 0 },
        { stage: 'Converted to Sale', count: convertedSales, percentage: totalVisitors ? (convertedSales / totalVisitors * 100).toFixed(1) : 0 }
      ];

      // Process leads by country
      const countryGroups = submissions?.reduce((acc: any, sub) => {
        const country = sub.destination || 'Unknown';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {}) || {};

      const leadsByCountry = Object.entries(countryGroups).map(([country, count]) => ({
        country,
        leads: count
      }));

      // Process leads by source
      const sourceGroups = submissions?.reduce((acc: any, sub) => {
        const source = sub.referral_source || 'Direct';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {}) || {};

      const leadsBySource = Object.entries(sourceGroups).map(([source, count]) => ({
        source,
        leads: count
      }));

      // Process monthly trends (last 6 months for better view)
      const monthlyData = [];
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date();
        monthStart.setMonth(monthStart.getMonth() - i);
        monthStart.setDate(1);
        
        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthEnd.getMonth() + 1);
        monthEnd.setDate(0);

        const monthSubmissions = submissions?.filter(sub => {
          const subDate = new Date(sub.created_at);
          return subDate >= monthStart && subDate <= monthEnd;
        }) || [];

        monthlyData.push({
          month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          leads: monthSubmissions.length,
          revenue: monthSubmissions.reduce((sum, sub) => sum + (sub.sales_value || 0), 0)
        });
      }

      setAnalyticsData({
        conversionFunnel,
        leadsByCountry: leadsByCountry.slice(0, 10), // Top 10
        leadsBySource,
        monthlyTrends: monthlyData,
        revenueData: monthlyData
      });

    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCsv = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Business Analytics & Reports</h3>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            onClick={() => exportToCsv(analyticsData.conversionFunnel, 'analytics-report')}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.conversionFunnel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leads by Country */}
        <Card>
          <CardHeader>
            <CardTitle>Top Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.leadsByCountry}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="leads"
                  label={({ country, leads }) => `${country}: ${leads}`}
                >
                  {analyticsData.leadsByCountry.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData.leadsBySource}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#8884d8" name="Leads" />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              onClick={() => exportToCsv(analyticsData.conversionFunnel, 'conversion-funnel')}
            >
              <Download className="h-4 w-4 mr-2" />
              Conversion Report
            </Button>
            <Button 
              variant="outline"
              onClick={() => exportToCsv(analyticsData.leadsByCountry, 'leads-by-country')}
            >
              <Download className="h-4 w-4 mr-2" />
              Country Report
            </Button>
            <Button 
              variant="outline"
              onClick={() => exportToCsv(analyticsData.monthlyTrends, 'monthly-trends')}
            >
              <Download className="h-4 w-4 mr-2" />
              Trends Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReports;
