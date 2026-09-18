const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const siblingCount = 1;
  const totalVisiblePages = siblingCount * 2 + 3;

  const startPage = Math.max(1, currentPage - siblingCount);
  const endPage = Math.min(totalPages, currentPage + siblingCount);

  const pages = [];

  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  const showLeftEllipsis = startPage > 2;
  const showRightEllipsis = endPage < totalPages - 1;

  return (
    <div className="pagination-wrapper" aria-label="Movie pagination">
      <button
        className="pagination-button pagination-nav"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        ← Previous
      </button>

      <div className="page-numbers" role="navigation" aria-label="Pagination pages">
        {startPage > 1 && (
          <>
            <button
              className="pagination-button"
              onClick={() => onPageChange(1)}
              type="button"
            >
              1
            </button>
            {showLeftEllipsis && <span className="pagination-dots">…</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-button ${
              currentPage === page ? "pagination-active" : ""
            }`}
            onClick={() => onPageChange(page)}
            type="button"
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {showRightEllipsis && <span className="pagination-dots">…</span>}
            <button
              className="pagination-button"
              onClick={() => onPageChange(totalPages)}
              type="button"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        className="pagination-button pagination-nav"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;