import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const DataDeletion = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the request to your backend
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Request Submitted",
        description: "Your data deletion request has been submitted successfully. We will process it within 30 days.",
      });
      
      setEmail('');
      setReason('');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Data Deletion Request</h1>
            <p className="text-muted-foreground text-lg">
              Request the deletion of your personal data from our systems
            </p>
          </div>

          <Alert>
            <AlertDescription>
              <strong>Important:</strong> Once your data is deleted, this action cannot be undone. 
              You will lose access to your account and all associated data permanently.
            </AlertDescription>
          </Alert>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>What Data Will Be Deleted?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Personal Information</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Name and contact details</li>
                    <li>Account credentials</li>
                    <li>Profile information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Travel Data</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Visa applications and documents</li>
                    <li>Travel bookings and history</li>
                    <li>Passport information</li>
                    <li>Trip preferences</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Usage Data</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Activity logs</li>
                    <li>Service interactions</li>
                    <li>Support communications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit Deletion Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Must match the email address associated with your account
                    </p>
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium mb-1">
                      Reason for Deletion (Optional)
                    </label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Please let us know why you're requesting data deletion"
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Deletion Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">What Happens Next?</h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>
                  <h4 className="font-medium">Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    We will verify your identity to ensure the request is legitimate.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <div>
                  <h4 className="font-medium">Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Your data will be permanently deleted from our systems within 30 days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <div>
                  <h4 className="font-medium">Confirmation</h4>
                  <p className="text-sm text-muted-foreground">
                    You will receive an email confirmation once the deletion is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                • <strong>Legal Retention:</strong> Some data may be retained for legal compliance purposes as outlined in our Privacy Policy.
              </p>
              <p>
                • <strong>Backup Systems:</strong> Data in backup systems may take up to 90 days to be completely removed.
              </p>
              <p>
                • <strong>Anonymized Data:</strong> Aggregated, anonymized data used for analytics may be retained.
              </p>
              <p>
                • <strong>Active Services:</strong> If you have active visa applications or bookings, please contact support before submitting this request.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Need help or have questions? Contact us at{' '}
              <a href="mailto:privacy@oneglobaltrip.com" className="text-primary hover:underline">
                privacy@oneglobaltrip.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;