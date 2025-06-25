
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, FileText, Users } from 'lucide-react';
import type { NationalVisaCategory } from '@/utils/nationalVisaCategories';

interface NationalVisaCategoriesProps {
  categories: NationalVisaCategory[];
  destination: string;
  purpose: string;
}

const NationalVisaCategories = ({ categories, destination, purpose }: NationalVisaCategoriesProps) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-2">🏛️ National Visa Required</h4>
        <p className="text-blue-700">
          For long-stay or {purpose} purposes, you'll need a national visa specific to your situation. 
          Contact our experts for personalized guidance on the best pathway.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          🏛️ National Visa Options
        </h4>
        <p className="text-gray-600">
          Long-stay visas with pathways to permanent residence and citizenship
        </p>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">{category.name}</h5>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
              <Badge variant="outline" className="ml-2">
                {category.id.includes('golden') ? 'Investment' : 
                 category.id.includes('student') ? 'Study' :
                 category.id.includes('digital') ? 'Remote Work' : 'Work'}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Processing:</span>
                  <span className="text-gray-600 ml-1">{category.processingTime}</span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <DollarSign className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Financial:</span>
                  <span className="text-gray-600 ml-1">{category.financialRequirement}</span>
                </div>
              </div>
            </div>

            {category.additionalRequirements.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Key Requirements:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {category.additionalRequirements.map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(category.pathToPR || category.pathToCitizenship) && (
              <div className="border-t pt-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Residency Pathway:</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  {category.pathToPR && (
                    <div>• <strong>Permanent Residence:</strong> {category.pathToPR}</div>
                  )}
                  {category.pathToCitizenship && (
                    <div>• <strong>Citizenship:</strong> {category.pathToCitizenship}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p className="text-sm text-orange-800">
          <strong>Important:</strong> National visas require in-country registration and cannot be converted 
          from tourist visas. EU/EEA citizens have freedom of movement within their region.
        </p>
      </div>
    </div>
  );
};

export default NationalVisaCategories;
