
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Calendar, X } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination?: string;
  budget?: string;
  lead_status: string;
  lead_tags: string[];
  internal_notes?: string;
  sales_value: number;
}

interface LeadModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdate: () => void;
}

const LeadModal = ({ lead, onClose, onUpdate }: LeadModalProps) => {
  const [editedLead, setEditedLead] = useState(lead);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const saveLead = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({
          lead_status: editedLead.lead_status,
          lead_tags: editedLead.lead_tags,
          internal_notes: editedLead.internal_notes,
          sales_value: editedLead.sales_value
        })
        .eq('id', editedLead.id);

      if (error) throw error;

      toast({
        title: "Lead Updated",
        description: "Lead information has been saved successfully"
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: "Error",
        description: "Failed to save lead information",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const addTag = (tag: string) => {
    if (!editedLead.lead_tags.includes(tag)) {
      setEditedLead({
        ...editedLead,
        lead_tags: [...editedLead.lead_tags, tag]
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEditedLead({
      ...editedLead,
      lead_tags: editedLead.lead_tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Lead Details: {editedLead.name}</h2>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <div className="text-sm p-2 bg-gray-50 rounded">{editedLead.email}</div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Phone</label>
              <div className="text-sm p-2 bg-gray-50 rounded">{editedLead.phone}</div>
            </div>
          </div>

          {/* Service Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Destination</label>
              <div className="text-sm p-2 bg-gray-50 rounded">{editedLead.destination || 'N/A'}</div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Budget</label>
              <div className="text-sm p-2 bg-gray-50 rounded">{editedLead.budget || 'N/A'}</div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium block mb-1">Lead Status</label>
            <Select 
              value={editedLead.lead_status} 
              onValueChange={(value) => setEditedLead({...editedLead, lead_status: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_contacted">Not Contacted</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium block mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {editedLead.lead_tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {['hot', 'cold', 'follow-up', 'paid', 'problem'].map(tag => (
                <Button
                  key={tag}
                  size="sm"
                  variant="outline"
                  onClick={() => addTag(tag)}
                  className="capitalize"
                  disabled={editedLead.lead_tags.includes(tag)}
                >
                  + {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Sales Value */}
          <div>
            <label className="text-sm font-medium block mb-1">Sales Value ($)</label>
            <Input
              type="number"
              value={editedLead.sales_value}
              onChange={(e) => setEditedLead({
                ...editedLead, 
                sales_value: parseFloat(e.target.value) || 0
              })}
              placeholder="0"
            />
          </div>
          
          {/* Internal Notes */}
          <div>
            <label className="text-sm font-medium block mb-1">Internal Notes</label>
            <Textarea
              placeholder="Add your internal notes about this lead..."
              value={editedLead.internal_notes || ''}
              onChange={(e) => setEditedLead({
                ...editedLead,
                internal_notes: e.target.value
              })}
              rows={4}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-4">
            <Button variant="outline" className="flex items-center justify-center">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <Calendar className="h-4 w-4 mr-2" />
              Book Call
            </Button>
          </div>

          {/* Save Button */}
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={saveLead} disabled={saving} className="flex-1">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
