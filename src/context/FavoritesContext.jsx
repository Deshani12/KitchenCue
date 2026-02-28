// src/context/FavoritesContext.jsx
// This context provides a global favorites list that any component can access.
// It reads from and writes to localStorage so favorites persist after page refresh.

import { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context object
const FavoritesContext = createContext(null);

// 2. Create the Provider component that wraps the whole app
export function FavoritesProvider({ children }) {
  // Initialize state from localStorage (or empty array if nothing saved yet)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("kitchencue_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Whenever favorites changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("kitchencue_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle: if meal is already a favorite → remove it; otherwise → add it
  const toggleFavorite = (meal) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.idMeal === meal.idMeal);
      if (exists) {
        return prev.filter((m) => m.idMeal !== meal.idMeal);
      }
      return [...prev, meal];
    });
  };

  // Check if a meal is currently a favorite
  const isFavorite = (mealId) => favorites.some((m) => m.idMeal === mealId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook so components can easily access the context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside <FavoritesProvider>");
  }
  return context;
}
