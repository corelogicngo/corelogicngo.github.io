import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(220,66%,14%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-[hsl(41,50%,57%)]">Igiehon</span> Foundation
            </h3>
            <p className="text-gray-300 text-sm">
              Empowering Minds. Inspiring Excellence.
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Promoting mathematics education and excellence across Edo State, Nigeria.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[hsl(41,50%,57%)]">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[hsl(41,50%,57%)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-[hsl(41,50%,57%)] transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-[hsl(41,50%,57%)] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-[hsl(41,50%,57%)] transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[hsl(41,50%,57%)]">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Benin City, Edo State, Nigeria</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@igiehonfoundation.org" className="text-gray-300 hover:text-[hsl(41,50%,57%)] transition-colors">
                  info@igiehonfoundation.org
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-gray-300">+234 XXX XXX XXXX</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[hsl(41,50%,57%)]">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[hsl(6,77%,28%)] flex items-center justify-center hover:bg-[hsl(6,77%,35%)] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[hsl(6,77%,28%)] flex items-center justify-center hover:bg-[hsl(6,77%,35%)] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[hsl(6,77%,28%)] flex items-center justify-center hover:bg-[hsl(6,77%,35%)] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Igiehon Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
