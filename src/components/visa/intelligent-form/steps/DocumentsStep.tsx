
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplicationData } from '../IntelligentVisaForm';
import { RequiredDocument, DynamicQuestion } from '../hooks/useVisaIntelligence';
import { Upload, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';

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
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, File>>({});

  const handleFileUpload = (docId: string, file: File) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docId]: file
    }));
  };

  const getDocumentStatus = (docId: string) => {
    return uploadedDocs[docId] ? 'uploaded' : 'pending';
  };

  const renderDocument = (doc: RequiredDocument) => {
    const status = getDocumentStatus(doc.id);
    const isUploaded = status === 'uploaded';

    return (
      <Card key={doc.id} className={`transition-all ${
        isUploaded ? 'border-green-200 bg-green-50' : 'border-gray-200'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${
              isUploaded ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {isUploaded ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <FileText className="h-6 w-6 text-gray-600" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                {doc.required && (
                  <Badge variant="destructive" className="text-xs">Required</Badge>
                )}
                {doc.countrySpecific && (
                  <Badge variant="secondary" className="text-xs">Country Specific</Badge>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
              
              {doc.templates && doc.templates.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Templates Available:</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.templates.map((template, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {/* Download template */}}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {template}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-4">
                {isUploaded ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {uploadedDocs[doc.id].name}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      id={`file-${doc.id}`}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(doc.id, file);
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const requiredDocsCount = requiredDocuments.filter(doc => doc.required).length;
  const uploadedRequiredCount = requiredDocuments.filter(doc => 
    doc.required && getDocumentStatus(doc.id) === 'uploaded'
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Documents</h3>
        <p className="text-gray-600 mb-6">
          Upload the required documents for your visa application. Make sure all documents are clear and legible.
        </p>
      </div>

      {/* Progress Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Document Progress</h4>
              <p className="text-blue-800">
                {uploadedRequiredCount} of {requiredDocsCount} required documents uploaded
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(uploadedRequiredCount / requiredDocsCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload Guidelines */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Upload Guidelines</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>File formats: PDF, JPG, PNG (recommended: PDF)</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Maximum file size: 5MB per document</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Ensure documents are clear, complete, and legible</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>All text should be in English or officially translated</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h4>
        <div className="space-y-4">
          {requiredDocuments.filter(doc => doc.required).map(renderDocument)}
        </div>
      </div>

      {/* Optional Documents */}
      {requiredDocuments.some(doc => !doc.required) && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Optional Documents</h4>
          <p className="text-gray-600 text-sm mb-4">
            These documents may strengthen your application but are not mandatory.
          </p>
          <div className="space-y-4">
            {requiredDocuments.filter(doc => !doc.required).map(renderDocument)}
          </div>
        </div>
      )}

      {/* Additional Notes */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Important Notes</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Documents will be reviewed by our visa experts</li>
                <li>• We may contact you if additional documents are needed</li>
                <li>• Original documents may be required for certain applications</li>
                <li>• Processing time begins after all documents are submitted</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsStep;
