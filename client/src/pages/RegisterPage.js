import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-700 p-6 rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Name:
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)} required
          />
        </label>
        <label className="block mb-2">Email:
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)} required
          />
        </label>
        <label className="block mb-2">Password:
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)} required
          />
        </label>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}