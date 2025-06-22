
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Calendar as CalendarIcon, Clock, Video } from 'lucide-react';

interface Appointment {
  id: string;
  lead_id: string;
  appointment_type: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  meeting_link: string;
  notes: string;
  lead?: {
    name: string;
    email: string;
    destination: string;
  };
}

const CalendarView = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCreating, setIsCreating] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAppointments();
    fetchLeads();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          lead:form_submissions(name, email, destination)
        `)
        .order('scheduled_at', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('id, name, email, destination')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.scheduled_at);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'no_show': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const CreateAppointmentForm = () => {
    const [formData, setFormData] = useState({
      lead_id: '',
      appointment_type: 'consultation',
      scheduled_at: '',
      duration_minutes: 30,
      meeting_link: '',
      notes: ''
    });

    const saveAppointment = async () => {
      try {
        const { error } = await supabase
          .from('appointments')
          .insert([formData]);

        if (error) throw error;

        // Update lead appointment status
        await supabase
          .from('form_submissions')
          .update({ appointment_booked: true })
          .eq('id', formData.lead_id);

        toast({
          title: "Appointment Scheduled",
          description: "New appointment has been created successfully"
        });

        setIsCreating(false);
        fetchAppointments();
      } catch (error) {
        console.error('Error creating appointment:', error);
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Schedule New Appointment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Select Lead</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.lead_id}
              onChange={(e) => setFormData({ ...formData, lead_id: e.target.value })}
            >
              <option value="">Select a lead...</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} - {lead.email} ({lead.destination})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Date & Time</label>
            <Input
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Duration (minutes)</label>
            <Input
              type="number"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Meeting Link</label>
            <Input
              placeholder="Zoom/Meet link"
              value={formData.meeting_link}
              onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Notes</label>
            <Input
              placeholder="Appointment notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={saveAppointment}>Schedule Appointment</Button>
            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isCreating) {
    return <CreateAppointmentForm />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Calendar</CardTitle>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Appointments for {selectedDate.toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getAppointmentsForDate(selectedDate).map((appointment) => (
              <div key={appointment.id} className="p-3 border rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">
                      {appointment.lead?.name || 'Unknown Lead'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {appointment.lead?.destination} - {appointment.appointment_type}
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(appointment.scheduled_at).toLocaleTimeString()}
                  </div>
                  <div>{appointment.duration_minutes}min</div>
                  {appointment.meeting_link && (
                    <a 
                      href={appointment.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Join
                    </a>
                  )}
                </div>
                
                {appointment.notes && (
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>Notes:</strong> {appointment.notes}
                  </div>
                )}
              </div>
            ))}
            
            {getAppointmentsForDate(selectedDate).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No appointments scheduled for this date.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
