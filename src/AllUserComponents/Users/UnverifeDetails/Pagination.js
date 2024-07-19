import React from "react";
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

  const renderPaginationItems = () => {
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

    /*
    1) Pagination should have only 3 number and 2 buttons. one for left and one for right.
    2) if total pages are only 3 or less. then show 1,2,3 all.
    3) if total pages are more than 3, and user is visiting on 4, then show 3,4,5..
    4) if user has reached final page, then show it on last number like.. 10 totalpages.. 8,9,10. 
    */

    if (totalPages > 3) {
      if (currentPage < 3) {
        addPageNumber(1);
        addPageNumber(2);
        addPageNumber(3);
      } else if (currentPage === 3) {
        addPageNumber(2);
        addPageNumber(3);
        addPageNumber(4);
      } else if (currentPage > 3 && currentPage !== totalPages) {
        addPageNumber(currentPage - 1);
        addPageNumber(currentPage);
        addPageNumber(currentPage + 1);
      } else if (currentPage === totalPages) {
        addPageNumber(currentPage - 2);
        addPageNumber(currentPage - 1);
        addPageNumber(currentPage);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        addPageNumber(i);
      }
    }

    return items;
  };
  const pageLength = [{ title: 10 }, { title: 25 }, { title: 50 }];

  const handlePageRowLength = (value) => {
    setRowsPerPage(value.title);
    setCurrentPage(1);
  };

  return (
    <nav
      className={
        showEntries
          ? "flex items-center justify-between pagination-div"
          : "justify-end"
      }
    >
      {showEntries ? (
        <div className="flex items-center">
          <p className="me-3">Show</p>
          <SelectDropDown
            listItem={pageLength}
            title={"title"}
            selectedOption={rowsPerPage}
            onClickHandler={handlePageRowLength}
          />
          <p className="ms-3">Entries</p>
        </div>
      ) : (
        ""
      )}
      {data?.length >= 10 || (currentPage > 1 && data?.length) ? (
        <ul className="flex justify-end	">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => {
                if (currentPage - 1 > 0) {
                  onPageChange(currentPage - 1);
                }
              }}
            >
              <img src={LeftArrow} alt="left arrow" />
            </button>
          </li>
          {renderPaginationItems()}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => {
                if (totalPages >= currentPage + 1) {
                  onPageChange(currentPage + 1);
                }
              }}
            >
              <img src={RightArrow} alt="right arrow" />
            </button>
          </li>
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Pagination;
