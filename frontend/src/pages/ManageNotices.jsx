import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../utils/axios';

const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    expiryDate: ''
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await api.get('/notices');
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNotice) {
        await api.put(`/notices/${editingNotice._id}`, formData);
      } else {
        await api.post('/notices', formData);
      }
      setShowForm(false);
      setEditingNotice(null);
      setFormData({ title: '', message: '', expiryDate: '' });
      fetchNotices();
    } catch (error) {
      alert('Error saving notice');
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      message: notice.message,
      expiryDate: new Date(notice.expiryDate).toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await api.delete(`/notices/${id}`);
        fetchNotices();
      } catch (error) {
        alert('Error deleting notice');
      }
    }
  };

  const isExpired = (date) => {
    return new Date(date) < new Date();
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Manage Notices</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingNotice(null);
                setFormData({ title: '', message: '', expiryDate: '' });
              }}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
            >
              {showForm ? 'Cancel' : 'Create Notice'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">
                {editingNotice ? 'Edit Notice' : 'Create New Notice'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="4"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
                >
                  {editingNotice ? 'Update Notice' : 'Create Notice'}
                </button>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className={`bg-white rounded-lg shadow p-6 ${isExpired(notice.expiryDate) ? 'opacity-60' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{notice.title}</h3>
                    <p className="text-sm text-gray-600">
                      Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                      {isExpired(notice.expiryDate) && (
                        <span className="text-red-600 ml-2">(Expired)</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="bg-accent text-white px-4 py-1 rounded hover:bg-opacity-80"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{notice.message}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageNotices;