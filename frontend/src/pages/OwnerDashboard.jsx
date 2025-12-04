import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';

const OwnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchMyComplaints();
    fetchNotices();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      const { data } = await api.get('/complaints/my');
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const fetchNotices = async () => {
    try {
      const { data } = await api.get('/notices/active');
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try {
      await api.post('/complaints', formData);
      setShowComplaintForm(false);
      setFormData({ title: '', description: '' });
      fetchMyComplaints();
      alert('Complaint registered successfully!');
    } catch (error) {
      alert('Error registering complaint');
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Flat No: {user?.flatNo}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">My Complaints</h2>
              <button
                onClick={() => setShowComplaintForm(!showComplaintForm)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
              >
                {showComplaintForm ? 'Cancel' : 'Register Complaint'}
              </button>
            </div>

            {showComplaintForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-4">
                <h3 className="text-xl font-bold mb-4">Register New Complaint</h3>
                <form onSubmit={handleSubmitComplaint} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      rows="4"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
                  >
                    Submit Complaint
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {complaints.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                  No complaints registered yet
                </div>
              ) : (
                complaints.map((complaint) => (
                  <div key={complaint._id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{complaint.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{complaint.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notice Board</h2>
            <div className="space-y-4">
              {notices.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                  No active notices
                </div>
              ) : (
                notices.map((notice) => (
                  <div key={notice._id} className="bg-lite rounded-lg shadow p-6 border-l-4 border-accent">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{notice.title}</h3>
                    <p className="text-gray-700 mb-2">{notice.message}</p>
                    <p className="text-xs text-gray-600">
                      Valid till: {new Date(notice.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;