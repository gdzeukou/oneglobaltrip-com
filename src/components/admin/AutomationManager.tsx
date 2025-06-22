
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Play, Pause, Edit, Trash2 } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  trigger_type: string;
  trigger_conditions: any;
  action_type: string;
  action_data: any;
  is_active: boolean;
  created_at: string;
}

const AutomationManager = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRules();
    fetchEmailTemplates();
  }, []);

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error('Error fetching automation rules:', error);
    }
  };

  const fetchEmailTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setEmailTemplates(data || []);
    } catch (error) {
      console.error('Error fetching email templates:', error);
    }
  };

  const toggleRuleStatus = async (ruleId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('automation_rules')
        .update({ is_active: !isActive })
        .eq('id', ruleId);

      if (error) throw error;

      toast({
        title: "Automation Updated",
        description: `Rule ${!isActive ? 'activated' : 'deactivated'} successfully`
      });

      fetchRules();
    } catch (error) {
      console.error('Error toggling rule status:', error);
    }
  };

  const deleteRule = async (ruleId: string) => {
    if (!confirm('Are you sure you want to delete this automation rule?')) return;

    try {
      const { error } = await supabase
        .from('automation_rules')
        .delete()
        .eq('id', ruleId);

      if (error) throw error;

      toast({
        title: "Automation Deleted",
        description: "Rule has been deleted successfully"
      });

      fetchRules();
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  const CreateRuleForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      trigger_type: '',
      trigger_conditions: {},
      action_type: '',
      action_data: {}
    });

    const saveRule = async () => {
      try {
        const { error } = await supabase
          .from('automation_rules')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Automation Created",
          description: "New automation rule has been created"
        });

        setIsCreating(false);
        fetchRules();
      } catch (error) {
        console.error('Error creating rule:', error);
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Create New Automation Rule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Rule Name</label>
            <Input
              placeholder="e.g., Schengen Welcome Email"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Trigger</label>
            <Select
              value={formData.trigger_type}
              onValueChange={(value) => setFormData({ ...formData, trigger_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="form_submit">Form Submission</SelectItem>
                <SelectItem value="no_reply">No Reply After X Days</SelectItem>
                <SelectItem value="page_visits">Multiple Page Visits</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Action</label>
            <Select
              value={formData.action_type}
              onValueChange={(value) => setFormData({ ...formData, action_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="send_email">Send Email</SelectItem>
                <SelectItem value="add_tag">Add Tag</SelectItem>
                <SelectItem value="update_status">Update Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.action_type === 'send_email' && (
            <div>
              <label className="text-sm font-medium block mb-1">Email Template</label>
              <Select
                onValueChange={(value) => setFormData({
                  ...formData,
                  action_data: { ...formData.action_data, template_id: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={saveRule}>Create Rule</Button>
            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isCreating) {
    return <CreateRuleForm />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Automation Rules & Triggers</h3>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Automation
        </Button>
      </div>

      <div className="grid gap-4">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{rule.name}</h4>
                    <Badge className={rule.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {rule.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Trigger:</strong> {rule.trigger_type.replace('_', ' ').toUpperCase()} → 
                    <strong> Action:</strong> {rule.action_type.replace('_', ' ').toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(rule.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleRuleStatus(rule.id, rule.is_active)}
                  >
                    {rule.is_active ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingRule(rule)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteRule(rule.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {rules.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No automation rules created yet.</p>
              <Button className="mt-4" onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Automation
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AutomationManager;
