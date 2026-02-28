<<<<<<< HEAD
# 🍳 KitchenCue – Smart Culinary Recipe App

A responsive React recipe app built with Vite, Tailwind CSS, React Router, and TheMealDB API.

---

## 📁 Project Structure

```
kitchencue/
├── index.html                  ← App entry HTML
├── package.json                ← Dependencies
├── vite.config.js              ← Vite build tool config
├── tailwind.config.js          ← Tailwind CSS theme (colors, fonts)
├── postcss.config.js           ← Required by Tailwind
│
└── src/
    ├── main.jsx                ← React entry point (renders App into DOM)
    ├── App.jsx                 ← Root: sets up Router + FavoritesProvider + layout
    ├── index.css               ← Global styles (Tailwind directives + skeleton animation)
    │
    ├── context/
    │   └── FavoritesContext.jsx   ← Global state: favorites list + localStorage persistence
    │
    ├── hooks/
    │   └── useMeals.js            ← Custom hook: fetches from TheMealDB API
    │
    ├── components/
    │   ├── Navbar.jsx             ← Top navigation with logo + favorites badge
    │   ├── Footer.jsx             ← Site footer
    │   ├── SearchBar.jsx          ← Search input with name/ingredient toggle
    │   ├── RecipeCard.jsx         ← Single recipe card (image, name, favorite button)
    │   ├── FavoriteButton.jsx     ← Heart icon that toggles favorites
    │   └── SkeletonCard.jsx       ← Loading placeholder card
    │
    └── pages/
        ├── HomePage.jsx           ← Landing page with hero, search, recipe grid
        ├── RecipeDetailsPage.jsx  ← Full recipe: image, ingredients, instructions
        ├── FavoritesPage.jsx      ← Grid of saved favorite recipes
        └── NotFoundPage.jsx       ← 404 page
```


## How to Run Locally (Step-by-Step)

### Prerequisites
Make sure you have **Node.js** installed (version 16 or higher).

# Check if Node.js is installed
node --version

# If Node.js is not installed,
# download and install the LTS version from:
# https://nodejs.org


# Step 1 — Download the project

# If you received the project as a ZIP file,
# extract (unzip) it first.

# If you cloned the repository using Git,
# navigate into the project folder:

cd  kitchencue



### Step 2 — Install dependencies

Run this command inside the `kitchencue` folder:
```bash
npm install
```

This will download all required packages (React, Tailwind, React Router, etc.) into a `node_modules` folder. This only takes 1-2 minutes.



### Step 3 — Start the development server

```bash
npm run dev
```

You should see output like:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```



### Step 4 — Open the app

Open your browser and go to:
```
http://localhost:5173
```

The app is now running! 



### Step 5 — Stop the server

Press `Ctrl + C` in your terminal to stop the development server.


## 🏗️ Build for Production

To create an optimized production build:
```bash
npm run build
```

The output goes to the `dist/` folder. To preview the production build:
```bash
npm run preview
```



##  Features

**Search by Name** -> Calls `/search.php?s={name}` on TheMealDB 
**Search by Ingredient** -> Calls `/filter.php?i={ingredient}` on TheMealDB 
**Surprise Me** -> Fetches 8 random meals from `/random.php` |
**Recipe Details** -> Route `/recipe/:id` fetches full data via `/lookup.php?i={id}` 
**Favorites** -> Stored in React Context + persisted to `localStorage` 
**Loading Skeletons** -> Shown while API calls are in progress 
**Error Handling** -> Friendly messages for failed requests or no results 
**Responsive** -> Mobile-first grid: 1 → 2 → 3 → 4 columns 


## 🎨 Design Tokens

Primary `#C12D2D` Buttons, active states, hearts
Secondary `#E47C21` Accents, category badges, CTAs
Dark  `#2C2B2B` Text, navbar, footer 
Background  `#F1E4D4` Page background 
Font  Poppins


## 🔧 Troubleshooting

**"command not found: npm"** → Install Node.js from https://nodejs.org

**Port 5173 already in use** → Run `npm run dev -- --port 3000` to use a different port

**API not loading** → TheMealDB is a free public API. If it's slow, wait and refresh.

**Favorites not saving** → Make sure your browser allows localStorage (disable private/incognito mode for persistence)
=======
# KitchenCue
An Interactive Recipe Finder
>>>>>>> f10c11c31cb806aa9cfff03edf91643fbfd9169a
