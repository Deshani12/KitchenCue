// src/components/SkeletonCard.jsx
// Displayed while recipes are loading. Mimics the shape of a RecipeCard.

export default function SkeletonCard() {
  return (
    <div className="bg-card-bg rounded-2xl overflow-hidden shadow-md">
      {/* Image placeholder */}
      <div className="skeleton h-48 w-full" />

      {/* Content placeholders */}
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded-full" />
        <div className="skeleton h-4 w-1/2 rounded-full" />
        <div className="skeleton h-3 w-1/3 rounded-full" />
      </div>
    </div>
  );
}
