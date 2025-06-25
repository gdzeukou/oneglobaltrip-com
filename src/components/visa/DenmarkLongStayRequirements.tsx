
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { getDenmarkLongStayRequirementsByCategory, getAllDenmarkLongStayCategories, RequirementItem } from '@/utils/denmarkLongStayRequirements';

interface DenmarkLongStayRequirementsProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const RequirementCard = ({ requirement }: { requirement: RequirementItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = requirement.icon;

  return (
    <Card className="hover-lift">
      <CardContent className="p-6">
        <div className="text-center">
          <IconComponent className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="font-bold mb-2 flex items-center justify-center gap-2">
            {requirement.title}
            {requirement.mandatory && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{requirement.description}</p>
          
          {requirement.details && (
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  {isExpanded ? (
                    <>
                      Hide Details <ChevronUp className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Show Details <ChevronDown className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <ul className="text-sm text-left space-y-2">
                    {requirement.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const DenmarkLongStayRequirements = ({ selectedCategory = 'Work', onCategoryChange }: DenmarkLongStayRequirementsProps) => {
  const categories = getAllDenmarkLongStayCategories();
  const requirements = getDenmarkLongStayRequirementsByCategory(selectedCategory);
  const IconComponent = requirements.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Denmark Long-Stay Visa Requirements
        </h2>
        <p className="text-gray-600 mb-8">
          Requirements vary by visa purpose. Select your category below to see specific requirements.
        </p>
        
        <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-1">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-white border border-red-200 rounded-lg p-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <IconComponent className="h-8 w-8 text-red-600" />
          <h3 className="text-2xl font-bold text-gray-900">{requirements.name}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600">Processing Time</div>
            <div className="font-bold text-red-600">{requirements.processingTime}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600">Stay Duration</div>
            <div className="font-bold text-red-600">{requirements.stayDuration}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600">Visa Fee</div>
            <div className="font-bold text-red-600">{requirements.fee}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-6 text-gray-900 text-center">
          Standard Requirements (All Visa Types)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requirements.commonRequirements.map((requirement, index) => (
            <RequirementCard key={`common-${index}`} requirement={requirement} />
          ))}
        </div>
      </div>

      {requirements.specificRequirements.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-6 text-gray-900 text-center">
            Additional Requirements for {requirements.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.specificRequirements.map((requirement, index) => (
              <RequirementCard key={`specific-${index}`} requirement={requirement} />
            ))}
          </div>
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Important Notes for Denmark Long-Stay Visa
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• All documents must be apostilled and translated</li>
          <li>• DKK 300,000+ health insurance required</li>
          <li>• Danish language requirements for family reunification</li>
          <li>• Integration contract may be required</li>
          <li>• Processing times may vary by category</li>
        </ul>
      </div>
    </div>
  );
};

export default DenmarkLongStayRequirements;
