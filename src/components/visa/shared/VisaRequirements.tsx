
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertCircle, Clock } from 'lucide-react';

interface Requirement {
  title: string;
  description: string;
  required: boolean;
  urgent?: boolean;
}

interface VisaRequirementsProps {
  title?: string;
  requirements: Requirement[];
  className?: string;
}

const VisaRequirements = ({
  title = 'Visa Requirements',
  requirements,
  className = ''
}: VisaRequirementsProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-3">
              {req.urgent ? (
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              ) : req.required ? (
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <h4 className="font-medium text-gray-900">{req.title}</h4>
                <p className="text-sm text-gray-600">{req.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default VisaRequirements;
