// src/components/Navbar.jsx
// Top navigation bar with logo, navigation links, and favorites count badge.

import { Link, useLocation } from "react-router-dom";
import { ChefHat, Heart, Home, BookOpen } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-secondary p-1.5 rounded-lg group-hover:bg-primary transition-colors">
              <ChefHat size={22} className="text-white" />
            </div>
            <span className="font-poppins font-bold text-xl">
              Kitchen<span className="text-secondary">Cue</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                isActive("/")
                  ? "bg-secondary text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-colors relative ${
                isActive("/favorites")
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Heart size={16} className={favorites.length > 0 ? "fill-current text-primary" : ""} />
              <span className="hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {favorites.length > 9 ? "9+" : favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
