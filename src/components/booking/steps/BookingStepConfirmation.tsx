
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Mail, Phone, Download } from 'lucide-react';
import { BookingFormData } from '@/types/booking';

interface BookingStepConfirmationProps {
  orderId: string | null;
  formData: BookingFormData;
  onClose: () => void;
}

const BookingStepConfirmation = ({ orderId, formData, onClose }: BookingStepConfirmationProps) => {
  const orderReference = orderId ? `OGT-${orderId.slice(-8).toUpperCase()}` : 'OGT-DEMO123';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="mb-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        <h2 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Your visa assistance service has been successfully booked.
        </p>
      </div>

      {/* Order Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Order Reference:</span>
            <Badge variant="secondary" className="font-mono">
              {orderReference}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <span>Service Plan:</span>
            <span className="font-medium">{formData.selectedPlan.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Destination:</span>
            <span className="font-medium capitalize">{formData.trip?.destination}</span>
          </div>

          <div className="flex justify-between">
            <span>Departure Date:</span>
            <span className="font-medium">{formData.trip?.departureDate}</span>
          </div>

          <div className="flex justify-between">
            <span>Travelers:</span>
            <span className="font-medium">{formData.trip?.travelers}</span>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <div className="font-medium">Confirmation Email</div>
              <div className="text-sm text-muted-foreground">
                You'll receive a detailed confirmation email within 5 minutes with your booking details and next steps.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div>
              <div className="font-medium">Expert Contact</div>
              <div className="text-sm text-muted-foreground">
                Our visa expert will contact you within {formData.selectedPlan.sla} to begin your application process.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div>
              <div className="font-medium">Document Collection</div>
              <div className="text-sm text-muted-foreground">
                We'll provide you with a personalized checklist and help gather all required documents.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">support@oneglobaltrip.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Book a consultation at calendly.com/oneglobaltrip</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
        <Button onClick={onClose} className="flex-1">
          Close
        </Button>
      </div>
    </div>
  );
};

export default BookingStepConfirmation;
