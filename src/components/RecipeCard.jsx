// src/components/RecipeCard.jsx
// Displays a single recipe in a card format with image, name, category,
// a favorite button, and a link to the full recipe details page.

import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

export default function RecipeCard({ meal }) {
  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className="group bg-card-bg rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
    >
      {/* Recipe Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Favorite button sits on top-right corner of image */}
        <div className="absolute top-3 right-3">
          <FavoriteButton meal={meal} size={18} />
        </div>

        {/* Category badge (only available from name search, not ingredient search) */}
        {meal.strCategory && (
          <span className="absolute bottom-3 left-3 bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {meal.strCategory}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Recipe Name */}
        <h3 className="font-bold text-dark text-base leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {meal.strMeal}
        </h3>

        {/* Area / Cuisine */}
        {meal.strArea && (
          <p className="text-gray-500 text-xs font-medium mb-3">
            🌍 {meal.strArea} Cuisine
          </p>
        )}

        {/* View Recipe CTA */}
        <div className="flex items-center gap-1.5 text-secondary font-semibold text-sm mt-auto">
          <BookOpen size={15} />
          <span>View Recipe</span>
        </div>
      </div>
    </Link>
  );
}
