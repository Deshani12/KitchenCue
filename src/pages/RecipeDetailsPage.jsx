// src/pages/RecipeDetailsPage.jsx
// Displays a single recipe's full details:
// image, category, area, ingredients list, and step-by-step instructions.
// The meal ID comes from the URL (/recipe/:id).

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Globe, CheckCircle2, Youtube } from "lucide-react";
import { fetchMealById } from "../hooks/useMeals";
import FavoriteButton from "../components/FavoriteButton";

export default function RecipeDetailsPage() {
  const { id } = useParams(); // Get meal ID from URL
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch meal details when component mounts or ID changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchMealById(id)
      .then((data) => {
        if (!data) throw new Error("Recipe not found.");
        setMeal(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Helper: Extract ingredients list from the flat meal object.
  // TheMealDB stores ingredients as strIngredient1 ... strIngredient20
  // and measures as strMeasure1 ... strMeasure20
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient: ingredient.trim(), measure: measure?.trim() || "" });
      }
    }
    return ingredients;
  };

  // ── Loading State ──
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="skeleton h-8 w-32 rounded-full mb-6" />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="skeleton rounded-2xl h-80" />
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4 rounded-full" />
            <div className="skeleton h-4 w-1/2 rounded-full" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-4 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error State ──
  if (error) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="font-bold text-dark text-xl mb-2">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!meal) return null;

  const ingredients = getIngredients(meal);

  // Format instructions into separate steps by splitting on newlines
  const instructions = meal.strInstructions
    ?.split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10) || [];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-dark font-semibold hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Recipes
      </button>

      {/* ── TOP SECTION: Image + Meta ── */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-72 md:h-full object-cover"
          />
          {/* Favorite button over image */}
          <div className="absolute top-4 right-4">
            <FavoriteButton meal={meal} size={22} />
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-col justify-center">
          {/* Category badge */}
          <span className="inline-block bg-secondary/15 text-secondary text-sm font-semibold px-3 py-1 rounded-full mb-3 w-fit">
            {meal.strCategory}
          </span>

          {/* Recipe Name */}
          <h1
            className="font-poppins font-bold text-dark leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 4vw, 40px)" }}
          >
            {meal.strMeal}
          </h1>

          {/* Area */}
          {meal.strArea && (
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <Globe size={16} className="text-secondary" />
              <span className="font-medium">{meal.strArea} Cuisine</span>
            </div>
          )}

          {/* Tags */}
          {meal.strTags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {meal.strTags.split(",").map((tag) => (
                <span
                  key={tag}
                  className="bg-background border border-secondary/30 text-dark text-xs font-medium px-3 py-1 rounded-full"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

        
        </div>
      </div>

      {/* ── INGREDIENTS & INSTRUCTIONS ── */}
      <div className="grid md:grid-cols-5 gap-8">
        {/* Ingredients (left column - 2/5 width on desktop) */}
        <div className="md:col-span-2">
          <div className="bg-card-bg rounded-2xl p-6 shadow-md sticky top-20">
            <h2
              className="font-poppins font-semibold text-dark mb-4 pb-3 border-b border-orange-100"
              style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}
            >
              🧾 Ingredients
            </h2>
            <ul className="space-y-2.5">
              {ingredients.map(({ ingredient, measure }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-dark text-sm">
                    <span className="font-semibold text-secondary">{measure}</span>{" "}
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions (right column - 3/5 width on desktop) */}
        <div className="md:col-span-3">
          <h2
            className="font-poppins font-semibold text-dark mb-4"
            style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}
          >
            📋 Instructions
          </h2>

          {/* If we successfully split into steps, show numbered list */}
          {instructions.length > 1 ? (
            <ol className="space-y-4">
              {instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="bg-secondary text-white text-sm font-bold rounded-full w-7 h-7 flex-shrink-0 flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-dark leading-relaxed text-sm">{step}</p>
                </li>
              ))}
            </ol>
          ) : (
            // Fallback: show as a single block of text
            <p className="text-dark leading-relaxed text-sm whitespace-pre-line bg-card-bg rounded-2xl p-6 shadow-md">
              {meal.strInstructions}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
  