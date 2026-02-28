// src/App.jsx
// Root of the application.
// Sets up:
//  1. FavoritesProvider – wraps everything so any child can access favorites
//  2. React Router – maps URL paths to page components
//  3. Navbar + Footer – shared layout on all pages

import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    // FavoritesProvider makes the favorites list available to ALL components
    <FavoritesProvider>
      <div className="min-h-screen flex flex-col font-poppins bg-background">
        {/* Sticky navigation bar */}
        <Navbar />

        {/* Page content grows to fill available space */}
        <div className="flex-grow">
          <Routes>
            {/* Home / Search page */}
            <Route path="/" element={<HomePage />} />

            {/* Recipe details page — :id is the meal ID from TheMealDB */}
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />

            {/* Saved favorites page */}
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* 404 catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </FavoritesProvider>
  );
}
