// src/pages/FavoritesPage.jsx
// Displays all meals the user has marked as favorite.
// Reads directly from FavoritesContext (no API call needed here).

import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-dark hover:text-primary transition-colors font-semibold group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Heart size={24} className="text-primary fill-primary" />
          </div>
          <h1
            className="font-poppins font-bold text-dark"
            style={{ fontSize: "clamp(24px, 4vw, 40px)" }}
          >
            My Favorites
          </h1>
        </div>

        {favorites.length > 0 && (
          <span className="ml-auto bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
            {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"}
          </span>
        )}
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">💔</p>
          <h2 className="font-bold text-dark text-2xl mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-8">
            Start exploring recipes and tap the ❤️ to save your favorites here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-orange-500 transition-colors"
          >
            Discover Recipes
          </Link>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </main>
  );
}
