"use client";
import SignIn from '@/components/SignIn';
import { useEffect } from 'react';

export default function SignInPage() {
    useEffect(() => {
    fetch('/api/auth/seed-users', { method: 'POST' });
  }, []);
  return <SignIn />;
}
