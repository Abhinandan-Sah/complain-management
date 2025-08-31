import ComplaintForm from '@/components/ComplaintForm';

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to the Complaint Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit your complaints and feedback through our easy-to-use form. 
            Your concerns are important to us and will be addressed promptly.
          </p>
        </div>
        <ComplaintForm />
      </div>
    </div>
  );
}
