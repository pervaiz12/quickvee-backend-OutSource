import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPaginationItems = () => {
    const items = [];

    const addPageNumber = (pageNumber) => {
      items.push(
        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </button>
        </li>
      );
    };

    // Add first page
    if (currentPage !== 1) {
      items.push(
        <li key="first" className="page-item">
          <button className="page-link" onClick={() => onPageChange(1)}>
            {'<<'}
          </button>
        </li>
      );
    }

    // Add pages around current page
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        addPageNumber(i);
      }
    } else {
      for (let i = Math.max(1, currentPage - 2); i <= Math.min(currentPage + 2, totalPages); i++) {
        addPageNumber(i);
      }
      if (currentPage > 3) {
        items.splice(1, 0, (
          <li key="separator-start" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        ));
      }
      if (currentPage < totalPages - 2) {
        items.splice(items.length - 1, 0, (
          <li key="separator-end" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        ));
      }
    }

    // Add last page
    if (currentPage !== totalPages && totalPages > 1) {
      items.push(
        <li key="last" className="page-item">
          <button className="page-link" onClick={() => onPageChange(totalPages)}>
            {'>>'}
          </button>
        </li>
      );
    }

    return items;
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        {renderPaginationItems()}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
