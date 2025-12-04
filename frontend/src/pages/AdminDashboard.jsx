import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import api from '../utils/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOwners: 0,
    totalComplaints: 0,
    pendingComplaints: 0,
    activeNotices: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [owners, complaints, notices] = await Promise.all([
        api.get('/owners'),
        api.get('/complaints/stats'),
        api.get('/notices/active')
      ]);

      setStats({
        totalOwners: owners.data.length,
        totalComplaints: complaints.data.total,
        pendingComplaints: complaints.data.pending,
        activeNotices: notices.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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
          <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              title="Total Owners" 
              value={stats.totalOwners} 
              icon="👥"
              color="primary"
            />
            <Card 
              title="Total Complaints" 
              value={stats.totalComplaints} 
              icon="📝"
              color="secondary"
            />
            <Card 
              title="Pending Complaints" 
              value={stats.pendingComplaints} 
              icon="⏳"
              color="accent"
            />
            <Card 
              title="Active Notices" 
              value={stats.activeNotices} 
              icon="📢"
              color="lite"
            />
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/owners"
                className="bg-primary text-white p-4 rounded text-center hover:bg-secondary transition"
              >
                Add New Owner
              </a>
              <a
                href="/admin/complaints"
                className="bg-primary text-white p-4 rounded text-center hover:bg-secondary transition"
              >
                View Complaints
              </a>
              <a
                href="/admin/notices"
                className="bg-primary text-white p-4 rounded text-center hover:bg-secondary transition"
              >
                Create Notice
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;