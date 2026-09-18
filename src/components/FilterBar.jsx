import { FiFilter, FiRotateCcw } from "react-icons/fi";

const FilterBar = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const activeFilterCount = [
    filters.rating,
    filters.year,
    filters.language,
    filters.sort !== "default" ? "sort" : "",
  ].filter(Boolean).length;

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <div className="filter-heading">
          <span className="filter-icon">
            <FiFilter />
          </span>
          <div>
            <strong>Discover</strong>
            <span>Filter & Sort</span>
          </div>
        </div>

        <div className="filter-summary">
          {activeFilterCount > 0
            ? `${activeFilterCount} active`
            : "No filters"}
        </div>
      </div>

      <div className="filter-controls">
        <div className="filter-field">
          <label htmlFor="rating-filter">Rating</label>
          <select
            id="rating-filter"
            value={filters.rating}
            onChange={(event) => onFilterChange("rating", event.target.value)}
            aria-label="Filter by rating"
          >
            <option value="">Any Rating</option>
            <option value="8">8+ ⭐</option>
            <option value="7">7+ ⭐</option>
            <option value="6">6+ ⭐</option>
            <option value="5">5+ ⭐</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="year-filter">Year</label>
          <select
            id="year-filter"
            value={filters.year}
            onChange={(event) => onFilterChange("year", event.target.value)}
            aria-label="Filter by year"
          >
            <option value="">Any Year</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="language-filter">Language</label>
          <select
            id="language-filter"
            value={filters.language}
            onChange={(event) => onFilterChange("language", event.target.value)}
            aria-label="Filter by language"
          >
            <option value="">Any Language</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
            <option value="ko">Korean</option>
            <option value="ja">Japanese</option>
          </select>
        </div>

        <div className="filter-field filter-field--wide">
          <label htmlFor="sort-filter">Sort by</label>
          <select
            id="sort-filter"
            value={filters.sort}
            onChange={(event) => onFilterChange("sort", event.target.value)}
            aria-label="Sort movies"
          >
            <option value="default">Default</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
          </select>
        </div>

        <button
          className="reset-filter-button"
          onClick={onReset}
          title="Reset filters"
          type="button"
        >
          <FiRotateCcw />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;