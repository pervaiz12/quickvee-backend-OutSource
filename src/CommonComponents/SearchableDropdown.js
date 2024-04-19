import React, { useRef, useState } from "react";
import Select from "react-select";
import "../Styles/ProductPage.css";
import DownArrow from "../Assests/Dashboard/Down.svg";
import CloseIcon from "../Assests/Dashboard/cross.svg";
import { useTransition } from "react";

const SearchableDropdown = ({
  title,
  keyName,
  optionList,
  handleSelectProductOptions,
  handleDeleteSelectedOption,
  selectedOption,
}) => {
  const [filterOptions, setFilterOptions] = useState(optionList);
  const handleFilterOptions = (e) => {
    const { value } = e.target;
    const filterList = optionList.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilterOptions(
      filterList?.length ? filterList : ["No Search Result Found"]
    );
  };
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef();

  const changeFilterableList = () => {
    if (filterOptions.length) {
      return filterOptions;
    }
    return optionList;
  };

  const toggleOption = () => {
    setShowOptions(!showOptions);
  };

  const handleFocus = () => {
    ref.current.focus();
    setShowOptions((prev) => ({
      prev: !prev ? true : false,
    }));
  };
  return (
    <>
      <div className="title-area">
        <span>{title}</span>
      </div>
      <div
        className="dropdownBox"
        style={{ padding: showOptions ? "10px" : "7px 8px 0px 8px" }}
      >
        <div
          className="search-area"
          style={{ borderBottom: showOptions ? "1px solid #ececec" : "" }}
        >
          <div className="search-selected-item" onClick={handleFocus}>
            <div className="selected-item">
              {selectedOption?.length
                ? selectedOption?.map((option) => {
                    return (
                      <div className="item" key={option?.id}>
                        {option?.title}
                        <img
                          src={CloseIcon}
                          className="cancel-image"
                          onClick={() =>
                            handleDeleteSelectedOption(option?.id, keyName)
                          }
                        />
                      </div>
                    );
                  })
                : ""}
            </div>
            <input
              ref={ref}
              type="text"
              placeholder="Enter category Name"
              className="search-item"
              onFocus={handleFocus}
              onChange={handleFilterOptions}
            />
          </div>
          <div className="toggle-btn">
            <img
              src={DownArrow}
              className={
                showOptions
                  ? "down-arrow-image rotate-dropdpown"
                  : "down-arrow-image remove-rotate-dropdown"
              }
              onClick={toggleOption}
            />
          </div>
        </div>
        {showOptions ? (
          <div className="options-box">
            {showOptions
              ? changeFilterableList()?.map((opt) => {
                  if (typeof opt === "string") {
                    return <p>{opt}</p>;
                  }
                  return (
                    <span
                      className={
                        selectedOption.includes(opt)
                          ? "item active-item"
                          : "item"
                      }
                      key={opt?.id}
                      onClick={() =>
                        selectedOption?.includes(opt)
                          ? handleDeleteSelectedOption(opt?.id, keyName)
                          : handleSelectProductOptions(opt, keyName)
                      }
                    >
                      {opt?.title}
                    </span>
                  );
                })
              : ""}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SearchableDropdown;
