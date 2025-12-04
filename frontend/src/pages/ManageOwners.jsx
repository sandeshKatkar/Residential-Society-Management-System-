import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../utils/axios';

const ManageOwners = () => {
  const [owners, setOwners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    flatNo: ''
  });

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const { data } = await api.get('/owners');
      setOwners(data);
    } catch (error) {
      console.error('Error fetching owners:', error);
    }
  };

  const handleSearch = async () => {
    if (!search) {
      fetchOwners();
      return;
    }
    try {
      const { data } = await api.get(`/owners/search?search=${search}`);
      setOwners(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOwner) {
        await api.put(`/owners/${editingOwner._id}`, formData);
      } else {
        await api.post('/owners', formData);
      }
      setShowForm(false);
      setEditingOwner(null);
      setFormData({ name: '', email: '', password: '', flatNo: '' });
      fetchOwners();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving owner');
    }
  };

  const handleEdit = (owner) => {
    setEditingOwner(owner);
    setFormData({
      name: owner.name,
      email: owner.email,
      password: '',
      flatNo: owner.flatNo
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      try {
        await api.delete(`/owners/${id}`);
        fetchOwners();
      } catch (error) {
        alert('Error deleting owner');
      }
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Manage Flat Owners</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingOwner(null);
                setFormData({ name: '', email: '', password: '', flatNo: '' });
              }}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
            >
              {showForm ? 'Cancel' : 'Add Owner'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">
                {editingOwner ? 'Edit Owner' : 'Add New Owner'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Password {editingOwner && '(Leave blank to keep current)'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required={!editingOwner}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Flat No</label>
                  <input
                    type="text"
                    value={formData.flatNo}
                    onChange={(e) => setFormData({ ...formData, flatNo: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
                  >
                    {editingOwner ? 'Update Owner' : 'Add Owner'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search by name or flat number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSearch}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
              >
                Search
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Flat No</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {owners.map((owner) => (
                    <tr key={owner._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{owner.name}</td>
                      <td className="px-6 py-4">{owner.email}</td>
                      <td className="px-6 py-4">{owner.flatNo}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(owner)}
                          className="bg-accent text-white px-4 py-1 rounded mr-2 hover:bg-opacity-80"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(owner._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageOwners;