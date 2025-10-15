import React from 'react';
import SpinnerWheel from '../components/SpinnerWheel';
import Leaderboard from '../components/Leaderboard';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Spinnergy!</h1>
      <p className="mt-2">Spin the wheel and earn points!</p>
      <SpinnerWheel />
      <Leaderboard />
    </div>
  );
}