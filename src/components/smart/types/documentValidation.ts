
export interface DocumentValidation {
  isValid: boolean;
  confidence: number;
  issues: string[];
  suggestions: string[];
}

export interface DocumentValidationState {
  files: File[];
  validations: Record<string, DocumentValidation>;
  validatingFiles: Record<string, boolean>;
}
