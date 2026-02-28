// src/components/Footer.jsx

import { ChefHat, Github, Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-secondary p-1.5 rounded-lg">
                <ChefHat size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl">
                Kitchen<span className="text-secondary">Cue</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unlock your next culinary adventure. Turn your ingredients into
              delicious recipes in seconds.
            </p>
            <p className="text-gray-500 text-xs mt-3">+94 455 1234</p>
            <p className="text-gray-500 text-xs">No. 14, Second Lane, Colombo, Sri Lanka</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 text-secondary">Products</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Search</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition-colors">Popular</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3 text-secondary">Subscribe to our newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="bg-secondary hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Go
              </button>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Youtube size={18}/></a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Facebook size={18}/></a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Instagram size={18}/></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-gray-500 text-xs">
          © 2026 KitchenCue. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
