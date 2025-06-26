
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
    <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">Pricing Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Visa Service</TableHead>
              <TableHead className="font-semibold">Total Price</TableHead>
              <TableHead className="font-semibold">Consular Fee</TableHead>
              <TableHead className="font-semibold">{getCenterFeeLabel()}</TableHead>
              <TableHead className="font-semibold">Our Service Fee</TableHead>
              <TableHead className="font-semibold">Refund / Reapply Policy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{visaData.service}</TableCell>
              <TableCell className="font-bold text-lg">{visaData.totalPrice}</TableCell>
              <TableCell>{visaData.consularFee}</TableCell>
              <TableCell>{visaData.centerFee}</TableCell>
              <TableCell>{visaData.serviceFee}</TableCell>
              <TableCell className="text-green-600 font-medium">100% refund OR free reapply</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">What's Included:</h4>
          <div className="space-y-3">
            {visaData.included.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaPricingCard;
