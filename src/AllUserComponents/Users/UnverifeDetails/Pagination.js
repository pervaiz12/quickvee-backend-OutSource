import React from "react";
import PropTypes from "prop-types";
import LeftArrow from "../../../Assests/VerifiedMerchant/LeftArrow.svg";
import RightArrow from "../../../Assests/VerifiedMerchant/RightArrow.svg";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  rowsPerPage,
  setRowsPerPage,
  setCurrentPage,
  showEntries,
  data,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageLengthOptions = [
    { title: 10 },
    { title: 25 },
    { title: 50 },
    { title: 100 },
  ];

  const handlePageRowLength = (value) => {
    setRowsPerPage(value.title);
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const items = [];

    const addPageNumber = (pageNumber) => {
      items.push(
        <li
          key={pageNumber}
          className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      );
    };

    if (totalPages > 4) {
      if (currentPage < 3) {
        addPageNumber(1);
        addPageNumber(2);
        addPageNumber(3);
        if (totalPages > 4)
          items.push(
            <li key="ellipsis" className="page-item flex items-center">
              ...
            </li>
          );
        addPageNumber(totalPages);
      } else if (currentPage === 3) {
        addPageNumber(1);
        addPageNumber(2);
        addPageNumber(3);
        addPageNumber(4);
        if (totalPages > 4)
          items.push(
            <li key="ellipsis" className="page-item flex items-center">
              ...
            </li>
          );
        addPageNumber(totalPages);
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        addPageNumber(1);
        items.push(
          <li key="ellipsis1" className="page-item flex items-center">
            ...
          </li>
        );
        addPageNumber(currentPage - 1);
        addPageNumber(currentPage);
        addPageNumber(currentPage + 1);
        items.push(
          <li key="ellipsis2" className="page-item flex items-center">
            ...
          </li>
        );
        addPageNumber(totalPages);
      } else if (currentPage >= totalPages - 2) {
        addPageNumber(1);
        items.push(
          <li key="ellipsis" className="page-item flex items-center">
            ...
          </li>
        );
        addPageNumber(totalPages - 2);
        addPageNumber(totalPages - 1);
        addPageNumber(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        addPageNumber(i);
      }
    }

    return items;
  };

  return (
    <nav
      className={`pagination-div ${
        showEntries ? "flex items-center justify-between" : "flex items-center"
      }`}
    >
      {showEntries ? (
        <div className="flex items-center">
          <p className="me-3">Show</p>
          <SelectDropDown
            listItem={pageLengthOptions}
            title="title"
            selectedOption={rowsPerPage}
            onClickHandler={handlePageRowLength}
          />
          <p className="ms-3">Entries</p>
        </div>
      ) : (
        <>
          {data?.length > 0 && (
            <div className="flex items-center justify-between w-full">
              <div>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                {totalItems} entries
              </div>
            </div>
          )}
        </>
      )}
      {(data?.length >= 10 || (currentPage > 1 && data?.length)) && (
        <ul className="flex justify-end">
          <li className={`page-item `}>
            <button
              className="page-link"
              style={{
                backgroundColor: `${currentPage === 1 ? "#f0f0f0" : ""}`,
              }}
              disabled={currentPage === 1}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            >
              <img src={LeftArrow} alt="left arrow" />
            </button>
          </li>
          {renderPageNumbers()}
          <li className={`page-item `}>
            <button
              className="page-link"
              style={{
                backgroundColor: `${
                  currentPage === totalPages ? "#f0f0f0" : ""
                }`,
              }}
              disabled={currentPage === totalPages}
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
            >
              <img src={RightArrow} alt="right arrow" />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  showEntries: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

Pagination.defaultProps = {
  showEntries: false,
  data: [],
};

export default Pagination;
