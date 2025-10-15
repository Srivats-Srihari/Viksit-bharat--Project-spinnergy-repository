import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiFetch } from '../utils/api';

export default function ProfilePage() {
  const { user, token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!token) return;
    const fetchHistory = async () => {
      try {
        const data = await apiFetch('/game/history', { token });
        setHistory(data);
      } catch (err) {
        console.error('Failed to fetch history', err);
      }
    };
    fetchHistory();
  }, [token]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Profile</h2>
      <p className="mt-2">Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Total Score: {user.score}</p>
      <h3 className="text-lg font-semibold mt-4">Spin History</h3>
      <ul className="mt-2 space-y-1">
        {history.map((entry, idx) => (
          <li key={idx} className="flex justify-between bg-white dark:bg-gray-700 p-2 rounded">
            <span>{new Date(entry.date).toLocaleString()}</span>
            <span>{entry.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}