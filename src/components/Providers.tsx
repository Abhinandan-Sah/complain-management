'use client';

import { AuthProvider } from '@/lib/auth-context';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
