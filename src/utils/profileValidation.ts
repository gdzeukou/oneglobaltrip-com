interface ProfileData {
  first_name: string;
  last_name: string;
  date_of_birth: Date | undefined;
  passport_number: string;
  passport_expiry: Date | undefined;
  nationality: string;
  phone: string;
}

export const validateProfileData = (formData: ProfileData): { isValid: boolean; error?: string } => {
  // Check if at least first name or last name is provided
  if (!formData.first_name && !formData.last_name) {
    return {
      isValid: false,
      error: "Please provide at least your first name or last name."
    };
  }

  // Check if all required fields are filled
  if (!formData.date_of_birth || !formData.passport_number || !formData.passport_expiry) {
    return {
      isValid: false,
      error: "Please fill in all required fields."
    };
  }

  return { isValid: true };
};