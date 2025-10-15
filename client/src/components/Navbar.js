import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        Spinnergy
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-700 dark:text-gray-300">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 bg-green-500 text-white rounded">Login</Link>
            <Link to="/register" className="px-3 py-1 bg-blue-500 text-white rounded">Register</Link>
          </>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
}