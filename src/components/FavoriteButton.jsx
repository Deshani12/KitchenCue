// src/components/FavoriteButton.jsx
// Heart icon button that toggles a meal as favorite.
// Uses the FavoritesContext to read/write the favorites list.

import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoriteButton({ meal, size = 20, className = "" }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(meal.idMeal);

  const handleClick = (e) => {
    // Stop the event from bubbling up (so clicking heart doesn't navigate to recipe)
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(meal);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`p-2 rounded-full transition-all active:scale-90 ${
        favorited
          ? "bg-primary text-white shadow-md"
          : "bg-white/80 text-gray-400 hover:text-primary hover:bg-white"
      } ${className}`}
    >
      <Heart
        size={size}
        className={favorited ? "fill-current" : ""}
      />
    </button>
  );
}
