// src/pages/NotFoundPage.jsx

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-24 px-4">
      <p className="text-7xl font-bold text-secondary mb-2">404</p>
      <h2 className="font-poppins font-bold text-dark text-2xl mb-3">Page Not Found</h2>
      <p className="text-gray-500 mb-8">Looks like this recipe got burned. 🔥</p>
      <Link
        to="/"
        className="bg-primary hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
