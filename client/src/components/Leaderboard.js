import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/game/leaderboard');
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch leaderboard');
      setLeaders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Poll every 5 seconds
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
      <ul className="bg-white dark:bg-gray-700 rounded shadow p-4">
        {leaders.map((u, idx) => (
          <li key={u._id} className="flex justify-between py-1">
            <span>{idx + 1}. {u.name}</span>
            <span>{u.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}