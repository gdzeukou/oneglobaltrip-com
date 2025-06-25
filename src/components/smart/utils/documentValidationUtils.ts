
import { DocumentValidation } from '../types/documentValidation';

export const validateDocument = (file: File): Promise<DocumentValidation> => {
  return new Promise((resolve) => {
    // Simulate AI validation
    setTimeout(() => {
      const validExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
      const extension = file.name.split('.').pop()?.toLowerCase();
      const isValidType = validExtensions.includes(extension || '');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      let issues: string[] = [];
      let suggestions: string[] = [];
      let confidence = 85;

      if (!isValidType) {
        issues.push('Invalid file format');
        suggestions.push('Please upload PDF, JPG, or PNG files only');
        confidence -= 30;
      }

      if (!isValidSize) {
        issues.push('File size too large');
        suggestions.push('Please compress the file to under 10MB');
        confidence -= 20;
      }

      if (file.size < 50 * 1024) { // Less than 50KB
        issues.push('File size suspiciously small');
        suggestions.push('Ensure the document is clear and readable');
        confidence -= 15;
      }

      // Simulate quality checks
      if (Math.random() > 0.7) {
        issues.push('Image quality may be too low');
        suggestions.push('Try scanning at higher resolution (300 DPI minimum)');
        confidence -= 10;
      }

      resolve({
        isValid: issues.length === 0,
        confidence: Math.max(confidence, 0),
        issues,
        suggestions
      });
    }, 1500);
  });
};

export const getStatusColor = (status: 'completed' | 'in-progress' | 'pending' | 'attention-needed') => {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-100';
    case 'in-progress': return 'text-blue-600 bg-blue-100';
    case 'pending': return 'text-gray-600 bg-gray-100';
    case 'attention-needed': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};
