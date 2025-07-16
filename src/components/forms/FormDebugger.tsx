import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const FormDebugger = () => {
  useEffect(() => {
    const debugFormIssues = async () => {
      console.log('=== FORM DEBUGGER STARTED ===');
      
      // Check authentication state
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('Current user:', user);
      console.log('User error:', userError);
      
      // Check if we can access the database
      try {
        const { data, error } = await supabase
          .from('form_submissions')
          .select('count')
          .limit(1);
        console.log('Database access test - success:', data);
        console.log('Database access test - error:', error);
      } catch (dbError) {
        console.log('Database access test - exception:', dbError);
      }
      
      // Check form_submissions table structure
      try {
        const { data, error } = await supabase
          .from('form_submissions')
          .insert({
            form_type: 'test',
            name: 'Test User',
            email: 'test@example.com',
            phone: '+1234567890'
          })
          .select();
        console.log('Test insert - success:', data);
        console.log('Test insert - error:', error);
      } catch (insertError) {
        console.log('Test insert - exception:', insertError);
      }
      
      console.log('=== FORM DEBUGGER FINISHED ===');
    };
    
    debugFormIssues();
  }, []);

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
      <h3 className="font-bold text-yellow-800">Form Debugger Active</h3>
      <p className="text-yellow-700">Check console for debugging information.</p>
    </div>
  );
};

export default FormDebugger;