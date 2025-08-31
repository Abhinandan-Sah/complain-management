'use client';

import Link from 'next/link';
import { usePathname, useRouter} from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push('/auth/signin');
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-white text-xl font-bold">Complaint Management System</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/'
                    ? 'border-white text-white'
                    : 'border-transparent text-indigo-200 hover:text-white hover:border-indigo-300'
                }`}
              >
                Submit Complaint
              </Link>
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === '/admin'
                      ? 'border-white text-white'
                      : 'border-transparent text-indigo-200 hover:text-white hover:border-indigo-300'
                  }`}
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="text-indigo-200">Loading...</div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-indigo-200">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="text-indigo-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
