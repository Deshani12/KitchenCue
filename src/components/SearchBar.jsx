// src/components/SearchBar.jsx
// Search input with toggle between "name" and "ingredient" search modes.

import { useState } from "react";
import { Search, Flame } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState("name"); // "name" | "ingredient"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim(), searchType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {/* Search Type Toggle */}
      <div className="flex justify-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setSearchType("name")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            searchType === "name"
              ? "bg-primary text-white shadow-md"
              : "bg-white/70 text-dark hover:bg-white"
          }`}
        >
          By Recipe Name
        </button>
        <button
          type="button"
          onClick={() => setSearchType("ingredient")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            searchType === "ingredient"
              ? "bg-secondary text-white shadow-md"
              : "bg-white/70 text-dark hover:bg-white"
          }`}
        >
          By Ingredient
        </button>
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              searchType === "name"
                ? "Search recipes... e.g. Pasta, Chicken"
                : "Search by ingredient... e.g. Tomato, Egg"
            }
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-transparent bg-white shadow-md text-dark placeholder-gray-400 font-medium focus:outline-none focus:border-secondary transition-all"
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-red-700 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <Search size={18} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
}
