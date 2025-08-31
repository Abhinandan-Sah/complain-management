'use client';

import { useState, useEffect } from 'react';

interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: string;
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
  });
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    let filtered = complaints;

    if (filters.status) {
      filtered = filtered.filter(complaint => complaint.status === filters.status);
    }

    if (filters.priority) {
      filtered = filtered.filter(complaint => complaint.priority === filters.priority);
    }

    setFilteredComplaints(filtered);
  }, [complaints, filters]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('/api/complaints');
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/complaints/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchComplaints(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteComplaint = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        const response = await fetch(`/api/complaints/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchComplaints(); // Refresh the list
          setSelectedComplaint(null);
        }
      } catch (error) {
        console.error('Error deleting complaint:', error);
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading complaints...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border rounded-md px-3 py-2"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="border rounded-md px-3 py-2"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    {complaint.title}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {complaint.category}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={complaint.status}
                    onChange={(e) => updateStatus(complaint._id, e.target.value)}
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(complaint.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(complaint.dateSubmitted).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteComplaint(complaint._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No complaints found matching the current filters.
          </div>
        )}
      </div>

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Complaint Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Title:</span> {selectedComplaint.title}
                </div>
                <div>
                  <span className="font-semibold">Category:</span> {selectedComplaint.category}
                </div>
                <div>
                  <span className="font-semibold">Priority:</span>{' '}
                  <span className={getPriorityColor(selectedComplaint.priority)}>
                    {selectedComplaint.priority}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Date:</span>{' '}
                  {new Date(selectedComplaint.dateSubmitted).toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Description:</span>
                  <p className="mt-1 text-gray-700">{selectedComplaint.description}</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
