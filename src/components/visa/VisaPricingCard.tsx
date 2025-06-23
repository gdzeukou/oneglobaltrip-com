
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';

interface VisaPricingData {
  service: string;
  totalPrice: string;
  consularFee: string;
  centerFee: string;
  centerType: 'VFS' | 'BLS' | 'TLS' | 'Processing' | 'Biometrics' | 'Application';
  serviceFee: string;
  included: string[];
}

interface VisaPricingCardProps {
  visaData: VisaPricingData;
}

const VisaPricingCard = ({ visaData }: VisaPricingCardProps) => {
  const getCenterFeeLabel = () => {
    switch (visaData.centerType) {
      case 'VFS':
        return 'Center Fee (VFS)';
      case 'BLS':
        return 'Center Fee (BLS)';
      case 'TLS':
        return 'Center Fee (TLS)';
      case 'Processing':
        return 'Processing Fee';
      case 'Biometrics':
        return 'Biometrics Fee';
      case 'Application':
        return 'Application Fee';
      default:
        return 'Center Fee';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg text-blue-900">Pricing Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visa Service</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Consular Fee</TableHead>
              <TableHead>{getCenterFeeLabel()}</TableHead>
              <TableHead>Our Service Fee</TableHead>
              <TableHead>Refund / Reapply Policy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{visaData.service}</TableCell>
              <TableCell className="font-bold">{visaData.totalPrice}</TableCell>
              <TableCell>{visaData.consularFee}</TableCell>
              <TableCell>{visaData.centerFee}</TableCell>
              <TableCell>{visaData.serviceFee}</TableCell>
              <TableCell>100% refund OR free reapply</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Included:</h4>
          <div className="space-y-2">
            {visaData.included.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaPricingCard;
