import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users for admin
    const fetchUsers = async () => {
      try {
        const data = await apiFetch('/admin/users', { token: localStorage.getItem('token') });
        setUsers(data);
      } catch (err) {
        alert('Error fetching users');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <table className="min-w-full bg-white dark:bg-gray-700">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Score</th>
            <th className="py-2 px-4">Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t border-gray-300 dark:border-gray-600">
              <td className="py-2 px-4">{u.name}</td>
              <td className="py-2 px-4">{u.email}</td>
              <td className="py-2 px-4">{u.score}</td>
              <td className="py-2 px-4">{u.isAdmin ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}