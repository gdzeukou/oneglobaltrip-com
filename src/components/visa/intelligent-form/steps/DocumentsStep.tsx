
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApplicationData } from '../IntelligentVisaForm';
import { RequiredDocument, DynamicQuestion } from '../hooks/useVisaIntelligence';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentsStepProps {
  formData: ApplicationData;
  onInputChange: (field: string, value: any) => void;
  requiredDocuments: RequiredDocument[];
  dynamicQuestions: DynamicQuestion[];
  onDynamicFieldChange: (field: string, value: any) => void;
}

const DocumentsStep = ({ 
  formData, 
  onInputChange, 
  requiredDocuments, 
  dynamicQuestions, 
  onDynamicFieldChange 
}: DocumentsStepProps) => {
  const [uploadedDocs, setUploadedDocs] = React.useState<Record<string, boolean>>({});

  const handleFileUpload = (documentId: string, file: File) => {
    // Simulate file upload - in a real app, this would upload to cloud storage
    console.log(`Uploading file for ${documentId}:`, file.name);
    setUploadedDocs(prev => ({ ...prev, [documentId]: true }));
    
    // Store file reference in form data
    onInputChange(`document_${documentId}`, file.name);
  };

  const renderDocumentUpload = (doc: RequiredDocument) => (
    <Card key={doc.id} className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-lg ${uploadedDocs[doc.id] ? 'bg-green-100' : 'bg-gray-100'}`}>
            {uploadedDocs[doc.id] ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <FileText className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-semibold text-gray-900">{doc.name}</h4>
              {doc.required && (
                <Badge variant="destructive" className="text-xs">Required</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
            
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(doc.id, file);
                  }}
                />
                <Button
                  type="button"
                  variant={uploadedDocs[doc.id] ? "outline" : "default"}
                  className="flex items-center space-x-2"
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4" />
                    <span>{uploadedDocs[doc.id] ? 'Replace File' : 'Upload File'}</span>
                  </span>
                </Button>
              </label>
              
              {uploadedDocs[doc.id] && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Uploaded successfully</span>
                </div>
              )}
            </div>
            
            {doc.templates && doc.templates.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-2">Templates Available:</p>
                <div className="flex flex-wrap gap-2">
                  {doc.templates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-100"
                    >
                      Download {template}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDynamicQuestion = (question: DynamicQuestion) => {
    if (question.condition && !question.condition(formData)) {
      return null;
    }

    return (
      <div key={question.id} className="space-y-2">
        <Label htmlFor={question.id} className="text-sm font-medium">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        {question.type === 'text' && (
          <Input
            id={question.id}
            value={formData.dynamicFields[question.id] || ''}
            onChange={(e) => onDynamicFieldChange(question.id, e.target.value)}
            required={question.required}
          />
        )}
        
        {question.type === 'select' && (
          <select
            id={question.id}
            value={formData.dynamicFields[question.id] || ''}
            onChange={(e) => onDynamicFieldChange(question.id, e.target.value)}
            required={question.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        
        {question.type === 'checkbox' && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={question.id}
              checked={formData.dynamicFields[question.id] || false}
              onChange={(e) => onDynamicFieldChange(question.id, e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={question.id} className="text-sm text-gray-700">
              Yes
            </label>
          </div>
        )}
        
        {question.type === 'date' && (
          <Input
            type="date"
            id={question.id}
            value={formData.dynamicFields[question.id] || ''}
            onChange={(e) => onDynamicFieldChange(question.id, e.target.value)}
            required={question.required}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Documents</h3>
        <p className="text-gray-600 mb-6">
          Please upload all required documents. Ensure they are clear, legible, and in the correct format.
        </p>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-4">
        {requiredDocuments.map(renderDocumentUpload)}
      </div>

      {/* Dynamic Questions Section */}
      {dynamicQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
            <div className="space-y-4">
              {dynamicQuestions.map(renderDynamicQuestion)}
            </div>
          </div>
        </div>
      )}

      {/* Important Notes */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Document Requirements</h4>
              <ul className="text-amber-800 text-sm space-y-1">
                <li>• All documents must be in PDF, JPG, or PNG format</li>
                <li>• File size should not exceed 5MB per document</li>
                <li>• Documents should be clear and legible</li>
                <li>• Translations may be required for documents not in English</li>
                <li>• Original or certified copies may be required for submission</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsStep;
