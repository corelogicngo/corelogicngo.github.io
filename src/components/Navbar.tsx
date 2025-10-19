import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, schoolId, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/events', label: 'Events' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-[hsl(220,66%,14%)] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-[hsl(41,50%,57%)]">Igiehon</span>
              <span className="text-white"> Foundation</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-[hsl(41,50%,57%)] font-semibold'
                    : 'text-white hover:text-[hsl(41,50%,57%)]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={isAdmin ? '/admin-dashboard' : '/school-dashboard'}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={signOut}
                  className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-[hsl(220,66%,14%)] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-[hsl(220,66%,14%)] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded-lg bg-[hsl(6,77%,28%)] hover:bg-[hsl(6,77%,35%)] transition-colors font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 rounded ${
                  isActive(link.path)
                    ? 'bg-[hsl(6,77%,28%)] text-white'
                    : 'text-white hover:bg-[hsl(220,66%,20%)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to={isAdmin ? '/admin-dashboard' : '/school-dashboard'}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-4 rounded bg-[hsl(6,77%,28%)] text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 rounded border border-white hover:bg-white hover:text-[hsl(220,66%,14%)]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-4 rounded border border-white text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-4 rounded bg-[hsl(6,77%,28%)] text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
