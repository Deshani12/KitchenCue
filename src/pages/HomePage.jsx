// src/pages/HomePage.jsx
// The main landing page. Shows a hero section, search bar, and a grid of recipes.
// On first load it fetches random meals. When user searches, it shows search results.

import { useState, useEffect } from "react";
import { Shuffle, TrendingUp } from "lucide-react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import SkeletonCard from "../components/SkeletonCard";
import { useMeals } from "../hooks/useMeals";
import { fetchRandomMeals } from "../hooks/useMeals";

export default function HomePage() {
  // State for the active search query and type
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");

  // Random meals shown before the user searches
  const [randomMeals, setRandomMeals] = useState([]);
  const [randomLoading, setRandomLoading] = useState(true);

  // Search results from the custom hook (only active when searchQuery is non-empty)
  const { meals: searchResults, loading: searchLoading, error } = useMeals(searchQuery, searchType);

  // Fetch random meals on first page load
  useEffect(() => {
    setRandomLoading(true);
    fetchRandomMeals(8)
      .then(setRandomMeals)
      .catch(console.error)
      .finally(() => setRandomLoading(false));
  }, []);

  // Called by SearchBar when user submits
  const handleSearch = (query, type) => {
    setSearchQuery(query);
    setSearchType(type);
    // Smooth scroll to results
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  };

  // Load a new batch of random meals
  const handleSurpriseMe = () => {
    setSearchQuery(""); // Clear any active search
    setRandomLoading(true);
    fetchRandomMeals(8)
      .then(setRandomMeals)
      .catch(console.error)
      .finally(() => setRandomLoading(false));
  };

  // Decide what to show in the grid
  const isSearchActive = searchQuery.trim().length > 0;
  const displayMeals = isSearchActive ? searchResults : randomMeals;
  const isLoading = isSearchActive ? searchLoading : randomLoading;

  return (
    <main>
      {/* ─── HERO SECTION ─── */}
      <section className="bg-gradient-to-br from-background via-orange-50 to-background py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Headline */}
          <h1 className="font-poppins font-bold text-dark mb-4 leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 40px)" }}>
            Tired of endless scrolling?
            <br />
            <span className="text-secondary">KitchenCue</span> is your smart culinary
            <br />
            assistant — instantly turning your
            <br />
            <span className="text-primary">ingredients into delicious recipes</span>
            <br />
            in seconds.
          </h1>

          {/* Search Bar */}
          <div className="mt-8 mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Surprise Me Button */}
          <button
            onClick={handleSurpriseMe}
            className="inline-flex items-center gap-2 bg-secondary hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <Shuffle size={18} />
            Surprise Me!
          </button>
        </div>
      </section>

      {/* ─── RECIPE GRID SECTION ─── */}
      <section id="results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          {isSearchActive ? (
            <>
              <h2 className="font-poppins font-bold text-dark"
                style={{ fontSize: "clamp(22px, 3vw, 32px)" }}>
                Results for "{searchQuery}"
              </h2>
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-primary hover:underline font-medium ml-auto"
              >
                Clear Search
              </button>
            </>
          ) : (
            <>
              <TrendingUp className="text-secondary" size={28} />
              <h2 className="font-poppins font-bold text-dark"
                style={{ fontSize: "clamp(22px, 3vw, 32px)" }}>
                Choose Your Chef's Path
              </h2>
            </>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-primary font-semibold text-lg">{error}</p>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && displayMeals.length === 0 && isSearchActive && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="font-bold text-dark text-xl mb-2">No recipes found</h3>
            <p className="text-gray-500">
              Try a different name or ingredient like "Chicken", "Pasta", or "Tomato"
            </p>
          </div>
        )}

        {/* Recipe Cards Grid */}
        {!isLoading && displayMeals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayMeals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </section>

      {/* ─── SURPRISE ME PROMO SECTION ─── */}
      <section className="bg-dark text-white py-12 px-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-2xl mb-2">
            My Cook <span className="text-secondary">Book</span>
          </h2>
          <p className="text-gray-400 mb-6">Ready for your next culinary adventure?</p>
          <button
            onClick={handleSurpriseMe}
            className="bg-secondary hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all"
          >
            Explore Recipes
          </button>
        </div>
      </section>
    </main>
  );
}
