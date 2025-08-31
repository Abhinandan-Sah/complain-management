'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function ComplaintForm() {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Show loading state while checking session
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to submit a complaint.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
        }),
      });

      if (response.ok) {
        setMessage('Complaint submitted successfully!');
        setFormData({
          title: '',
          description: '',
          category: '',
          priority: '',
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to submit complaint');
      }
    } catch (err) {
      console.error('Network error:', err);
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit a Complaint</h2>
      
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-700">
          Signed in as: <strong>{user.name}</strong> ({user.email})
        </p>
      </div>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Complaint Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Enter complaint title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Describe your complaint in detail"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="">Select a category</option>
            <option value="Product">Product</option>
            <option value="Service">Service</option>
            <option value="Support">Support</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority *
          </label>
          <div className="space-y-2">
            {['Low', 'Medium', 'High'].map((priority) => (
              <label key={priority} className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={formData.priority === priority}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
}
