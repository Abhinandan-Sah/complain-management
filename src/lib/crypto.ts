import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';

const SALT_LENGTH = 32;
const HASH_LENGTH = 64;
const ITERATIONS = 10000;

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LENGTH);
  const hash = pbkdf2Sync(password, salt, ITERATIONS, HASH_LENGTH, 'sha256');
  
  // Combine salt and hash
  const combined = Buffer.concat([salt, hash]);
  return combined.toString('base64');
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  try {
    const combined = Buffer.from(hashedPassword, 'base64');
    
    // Extract salt and hash
    const salt = combined.subarray(0, SALT_LENGTH);
    const hash = combined.subarray(SALT_LENGTH);
    
    // Hash the provided password with the extracted salt
    const providedHash = pbkdf2Sync(password, salt, ITERATIONS, HASH_LENGTH, 'sha256');
    
    // Use timing-safe comparison
    return timingSafeEqual(hash, providedHash);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}
