# 🎬 Movie Explorer

A responsive movie discovery web application built with React and the TMDB API. Users can browse popular movies, search for titles, view detailed movie information, apply filters, sort results, and maintain a personal watchlist.

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
* JavaScript (ES6+)
* Vite
* Axios
* React Icons
* CSS3
* TMDB REST API
* Browser localStorage

## 📁 Project Structure

```text
src/
├── components/
│   ├── FilterBar.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   ├── MovieCard.jsx
│   ├── MovieDetails.jsx
│   ├── MovieGrid.jsx
│   ├── Pagination.jsx
│   └── SearchBar.jsx
│
├── context/
│   └── ThemeContext.jsx
│
├── services/
│   └── tmdbService.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
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
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

The `.env` file is excluded from Git through `.gitignore`.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite.

## 🔐 Environment Variable

The application uses:

```text
VITE_TMDB_ACCESS_TOKEN
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
src/services/tmdbService.js
```

This keeps the API logic separate from the UI components.

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
