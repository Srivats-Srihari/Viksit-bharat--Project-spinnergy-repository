import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function SpinnerWheel() {
  const segments = [
    { label: '10 pts', value: 10 },
    { label: '20 pts', value: 20 },
    { label: '30 pts', value: 30 },
    { label: '40 pts', value: 40 },
    { label: '50 pts', value: 50 },
    { label: '100 pts', value: 100 }
  ];

  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);
  const { token, user, setUser } = useContext(AuthContext);

  const handleSpin = async () => {
    if (!token) {
      alert('Please login to spin.');
      return;
    }
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Call backend to spin
    try {
      const res = await fetch('/api/game/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Spin failed');
      setResult(data);
      // Update user total score in context
      setUser(prev => ({ ...prev, score: data.newScore }));
    } catch (error) {
      alert(error.message);
    } finally {
      setSpinning(false);
    }
  };

  // Generate rotation based on server result (for animation)
  const rotation = result ? result.landingRotation : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mt-4">
        {/* Wheel graphic */}
        <div
          ref={wheelRef}
          className={`absolute inset-0 border-4 border-blue-400 rounded-full transition-transform duration-5000 ease-out ${spinning ? 'pointer-events-none' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Placeholder for colored segments */}
          {segments.map((seg, index) => (
            <div
              key={index}
              className="absolute w-1/2 h-1/2 origin-bottom-left"
              style={{ transform: `rotate(${(360 / segments.length) * index}deg)` }}
            >
              <div
                className="h-full bg-blue-200 dark:bg-blue-700 text-black dark:text-white text-center flex items-center justify-center text-sm"
                style={{
                  transform: `rotate(${360 / segments.length / 2}deg)`,
                  transformOrigin: 'center bottom',
                  width: '200%',
                  padding: '0'
                }}
              >
                {seg.label}
              </div>
            </div>
          ))}
        </div>
        {/* Pointer */}
        <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-16 border-b-red-500 left-1/2 transform -translate-x-1/2 -top-4"></div>
      </div>

      <button
        onClick={handleSpin}
        disabled={spinning}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded text-green-800 dark:text-green-200">
          You won {result.value} points!
        </div>
      )}
    </div>
  );
}