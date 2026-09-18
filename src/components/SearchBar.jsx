const SearchBar = ({ value, onChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search movies"
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;