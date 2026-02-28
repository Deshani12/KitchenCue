// src/hooks/useMeals.js
// A reusable hook that fetches meal data from TheMealDB API.
// It handles loading, error, and data states automatically.

import { useState, useEffect } from "react";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export function useMeals(query, searchType = "name") {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if query is empty
    if (!query.trim()) {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      setLoading(true);
      setError(null);

      try {
        // Choose endpoint based on search type
        const endpoint =
          searchType === "ingredient"
            ? `${BASE_URL}/filter.php?i=${encodeURIComponent(query)}`
            : `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch recipes. Please try again.");
        }

        const data = await response.json();
        setMeals(data.meals || []); // API returns null if no results
      } catch (err) {
        setError(err.message || "Something went wrong.");
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [query, searchType]);

  return { meals, loading, error };
}

// Fetch a single meal by ID (used on the Recipe Details page)
export async function fetchMealById(id) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) throw new Error("Recipe not found.");
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}

// Fetch random meals for the homepage display
export async function fetchRandomMeals(count = 8) {
  const promises = Array.from({ length: count }, () =>
    fetch(`${BASE_URL}/random.php`).then((r) => r.json())
  );
  const results = await Promise.all(promises);
  return results.map((r) => r.meals[0]);
}
