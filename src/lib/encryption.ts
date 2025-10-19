// Basic encryption utilities for OGT Wallet
// NOTE: This is a placeholder implementation. In production, use proper encryption libraries
// and server-side encryption for sensitive data.

const ENCRYPTION_VERSION = 'v1';

export const encryptData = async (data: string, password: string): Promise<string> => {
  // TODO: Implement proper AES-256 encryption
  // For now, this is a placeholder that returns base64 encoded data
  const encoded = btoa(JSON.stringify({ version: ENCRYPTION_VERSION, data, timestamp: Date.now() }));
  return `encrypted:${encoded}`;
};

export const decryptData = async (encryptedData: string, password: string): Promise<string> => {
  // TODO: Implement proper AES-256 decryption
  // For now, this is a placeholder that decodes base64
  if (!encryptedData.startsWith('encrypted:')) {
    throw new Error('Invalid encrypted data format');
  }
  
  const encoded = encryptedData.replace('encrypted:', '');
  const decoded = JSON.parse(atob(encoded));
  return decoded.data;
};

export const generateBlockchainKey = (): string => {
  // Generate a mock blockchain-style key
  // TODO: Integrate with actual blockchain (Ethereum/Polygon)
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return '0x' + Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
};

export const hashPassword = async (password: string): Promise<string> => {
  // Basic password hashing
  // TODO: Use bcrypt or argon2 in production
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};
