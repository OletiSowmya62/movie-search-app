# 🎬 Movie Explorer

A responsive movie discovery web application built with React, TypeScript, and the TMDB API. Users can browse popular movies, search for titles, view detailed movie information, apply filters, sort results, and maintain a personal watchlist.

## 🚀 Live Demo

**Live Demo:** https://movie-search-app-one-fawn.vercel.app/

**GitHub:** https://github.com/OletiSowmya62/movie-search-app

## ✨ Features

* Browse popular movies
* Search movies using TMDB API
* Debounced search for improved performance
* Pagination for movie results
* Movie details modal with:

  * Poster
  * Backdrop
  * Rating
  * Release year
  * Runtime
  * Genres
  * Tagline
  * Overview
* Add and remove movies from a personal watchlist
* Watchlist persistence using localStorage
* Filter movies by rating, year, and language
* Sort movies by:

  * Rating
  * Title
  * Release date
* Dark and light theme
* Responsive design for desktop, tablet, and mobile
* Keyboard-accessible movie cards
* Loading, error, and empty-result states
* TMDB attribution

## 🛠️ Tech Stack

* React
* TypeScript
* Redux Toolkit and React Redux (watchlist and filter state)
* Vite
* Axios
* React Icons
* Tailwind CSS
* TMDB REST API
* Browser localStorage

## 📁 Project Structure

```text
src/
├── components/
│   ├── FilterBar.tsx
│   ├── Footer.tsx
│   ├── Loader.tsx
│   ├── MovieCard.tsx
│   ├── MovieDetails.tsx
│   ├── MovieGrid.tsx
│   ├── Pagination.tsx
│   └── SearchBar.tsx
│
├── context/
│   └── ThemeContext.tsx
│
├── services/
│   └── tmdbService.ts
│
├── types/
│   └── movie.ts
├── store/
│   ├── hooks.ts
│   ├── index.ts
│   └── watchlistSlice.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/OletiSowmya62/movie-search-app.git
```

### 2. Navigate to the project

```bash
cd movie-search-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the TMDB API token

Create a `.env` file in the project root:

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

The `.env` file is excluded from Git through `.gitignore`.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite.

## 🔐 Environment Variable

The server-side TMDB proxy uses:

```text
TMDB_ACCESS_TOKEN
```

The token is used to authenticate requests to the TMDB API.

For deployment, configure the same environment variable in the hosting platform rather than committing the `.env` file to the repository.

## 🔌 API Integration

The application uses TMDB API endpoints for movie data, including:

* Popular movies
* Movie search
* Movie details

API requests are centralized in:

```text
src/services/tmdbService.ts
```

This keeps the API logic separate from the UI components. Movie list, details, and pagination responses are modeled in `src/types/movie.ts`, and component props are explicitly typed.

## 💾 Watchlist

The watchlist uses browser `localStorage` to persist saved movies.

Example storage key:

```text
movieFavorites
```

Saved movies remain available after refreshing the page.

## 🌙 Theme

The application supports:

* Light mode
* Dark mode

The selected theme is persisted using `localStorage`.

## 📱 Responsive Design

The interface is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile

The movie grid automatically adjusts the number of columns based on screen width.

## 🚦 Lighthouse Results

Audited the deployed [live demo](https://movie-search-app-one-fawn.vercel.app/) with PageSpeed Insights on **November 9, 2026**, using Lighthouse **13.6.0**. These are initial-load lab results; scores and timings may vary between runs.

| Form factor | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile (Moto G Power, Slow 4G) | 100 | 100 | 100 | 91 | 0.8 s | 0.8 s | 0 ms | 0 | 2.1 s |
| Desktop (custom throttling) | 100 | 100 | 100 | 91 | 0.2 s | 0.2 s | 0 ms | 0 | 1.1 s |

Reports: [Mobile Lighthouse report](https://pagespeed.web.dev/analysis/https-movie-search-app-one-fawn-vercel-app/6pry1ifqf3?form_factor=mobile) · [Desktop Lighthouse report](https://pagespeed.web.dev/analysis/https-movie-search-app-one-fawn-vercel-app/6pry1ifqf3?form_factor=desktop).

PageSpeed Insights reported no Chrome UX Report (field) data for this URL at audit time, so the scores above are Lighthouse lab measurements only.

## 🧩 Key React Concepts Demonstrated

This project demonstrates practical use of:

* Functional components
* `useState`
* `useEffect`
* Context API
* Component props
* Conditional rendering
* Event handling
* Controlled inputs
* API integration
* Debouncing
* Client-side filtering and sorting
* Pagination
* localStorage persistence
* Responsive CSS

## 🏗️ Production Build

Create a production build with:

```bash
npm run build
```

Run the TypeScript compiler without emitting files with:

```bash
npm run typecheck
```

Run the Jest and React Testing Library suite with:

```bash
npm test
```

The generated production files are placed in:

```text
dist/
```

## 🎯 Future Enhancements

Possible improvements include:

* Dedicated movie discovery page using TMDB Discover API
* Genre-based discovery
* Trailer integration
* Cast and crew information
* Similar movie recommendations
* Streaming-provider information
* URL-based search and pagination
* Server-side API proxy for production credential handling

## 📌 Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Movie data and images are provided by **The Movie Database (TMDB)**.

https://www.themoviedb.org

## 👩‍💻 Author

**Sowmya Oleti**

Frontend Developer

GitHub: https://github.com/OletiSowmya62

LinkedIn: https://linkedin.com/in/sowmyaoleti/
