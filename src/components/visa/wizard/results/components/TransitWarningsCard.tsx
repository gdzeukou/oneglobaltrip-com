
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TransitWarningsCardProps {
  transitWarnings: string[];
}

const TransitWarningsCard = ({ transitWarnings }: TransitWarningsCardProps) => {
  if (transitWarnings.length === 0) {
    return null;
  }

  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardContent className="p-6">
        <h4 className="font-bold text-yellow-800 mb-4">⚠️ Transit Visa Considerations</h4>
        <div className="space-y-2">
          {transitWarnings.map((warning, index) => (
            <div key={index} className="text-yellow-700">
              • {warning}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransitWarningsCard;
