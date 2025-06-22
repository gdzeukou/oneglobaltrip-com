
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Edit, Send, Plus, Trash2 } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  template_type: string;
  is_active: boolean;
  created_at: string;
}

const EmailTemplateManager = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const saveTemplate = async (template: Partial<EmailTemplate>) => {
    try {
      if (template.id) {
        // Update existing template
        const { error } = await supabase
          .from('email_templates')
          .update({
            name: template.name,
            subject: template.subject,
            content: template.content,
            template_type: template.template_type
          })
          .eq('id', template.id);

        if (error) throw error;
      } else {
        // Create new template
        const { error } = await supabase
          .from('email_templates')
          .insert([{
            name: template.name,
            subject: template.subject,
            content: template.content,
            template_type: template.template_type || 'manual'
          }]);

        if (error) throw error;
      }

      toast({
        title: "Template Saved",
        description: "Email template has been saved successfully"
      });

      fetchTemplates();
      setEditingTemplate(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    }
  };

  const deleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: "Template Deleted",
        description: "Email template has been deleted"
      });

      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const TemplateForm = ({ template, onSave, onCancel }: {
    template: Partial<EmailTemplate>;
    onSave: (template: Partial<EmailTemplate>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState(template);

    return (
      <Card>
        <CardHeader>
          <CardTitle>{template.id ? 'Edit Template' : 'Create New Template'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Template Name</label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Welcome Email"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-1">Subject Line</label>
            <Input
              value={formData.subject || ''}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Email subject with {{variables}}"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Email Content (HTML supported)</label>
            <Textarea
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Email content with {{name}}, {{visa_country}}, etc."
              rows={10}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Template Type</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.template_type || 'manual'}
              onChange={(e) => setFormData({ ...formData, template_type: e.target.value })}
            >
              <option value="manual">Manual</option>
              <option value="welcome">Welcome</option>
              <option value="follow_up">Follow Up</option>
              <option value="booking_confirmation">Booking Confirmation</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => onSave(formData)}>
              Save Template
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (editingTemplate || isCreating) {
    return (
      <TemplateForm
        template={editingTemplate || {}}
        onSave={saveTemplate}
        onCancel={() => {
          setEditingTemplate(null);
          setIsCreating(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Email Templates</h3>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <Badge variant="outline">{template.template_type}</Badge>
                    {template.is_active && (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(template.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingTemplate(template)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Send className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplateManager;
