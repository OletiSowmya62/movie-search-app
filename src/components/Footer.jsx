const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span>🎬 CineScope</span>
          <p>
            Discover meaningful movies, track your watchlist,
            and build your next cinematic night.
          </p>
        </div>

        <div className="tmdb-credit">
          <p>
            This product uses the TMDB API but is not
            endorsed or certified by TMDB.
          </p>

          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/tmdb-logo.svg"
              alt="TMDB"
              className="tmdb-logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;