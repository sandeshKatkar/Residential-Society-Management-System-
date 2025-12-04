import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../utils/axios';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/complaints');
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/complaints/${id}`, { status });
      fetchComplaints();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/owners', label: 'Manage Owners' },
    { path: '/admin/complaints', label: 'Manage Complaints' },
    { path: '/admin/notices', label: 'Manage Notices' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar links={adminLinks} />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Manage Complaints</h1>

          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{complaint.title}</h3>
                    <p className="text-sm text-gray-600">
                      By: {complaint.createdBy?.name} (Flat: {complaint.createdBy?.flatNo})
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{complaint.description}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(complaint._id, 'Pending')}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(complaint._id, 'In Progress')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(complaint._id, 'Resolved')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                  >
                    Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageComplaints;