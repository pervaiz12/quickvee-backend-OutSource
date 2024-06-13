import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "../Styles/ProductPage.css";
import DownArrow from "../Assests/Dashboard/Down.svg";
import CloseIcon from "../Assests/Dashboard/cross.svg";
import Validation from "../Constants/Validation";

const SearchableDropdown = ({
  title,
  keyName,
  optionList,
  handleSelectProductOptions,
  handleDeleteSelectedOption,
  selectedOption,
  error,
  handleUpdateError,
  name,
  hideSelectedValue,
  hideSelectedList,
  placeholder
}) => {
  // console.log("optionList", keyName, optionList);
  const { checkLength } = Validation();
  const [filterOptions, setFilterOptions] = useState(optionList);
  const [filterValue, setFilterValue] = useState("");
  const handleFilterOptions = (e) => {
    const { value } = e.target;
    setFilterValue(value);
    const filterList = optionList?.filter((item) => {
      return item?.[name]?.toLowerCase().includes(value.toLowerCase());
    });
    setFilterOptions(
      filterList?.length ? filterList : ["No Search Result Found"]
    );
  };
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // check is frequentlyBought selected item length is 2 or not
    if (keyName == "frequentlyBought" && selectedOption?.length === 2) {
      setShowOptions(false);
      setFilterValue("You can only select 2 items.");
    } else {
      setFilterValue("");
    }

    // hide selected value if hideSelectedValue = true
    if (hideSelectedValue === true && hideSelectedList?.length) {
      const hideItemList = optionList?.filter((filtered) => {
        return !hideSelectedList.some((item) => +item.id === +filtered.id);
      });
      setFilterOptions(hideItemList);
    }
  }, [selectedOption, hideSelectedValue, hideSelectedList, optionList]);

  const changeFilterableList = () => {
    // filter incoming optionList items when onchange run
    if (filterOptions?.length) {
      return filterOptions;
    }
    return optionList;
  };

  const toggleOption = () => {
    // toggle optionsPanel
    setShowOptions(!showOptions);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    ref.current.focus();
    // check is frequentlyBought length is 2 or not
    if (selectedOption?.length === 2 && keyName === "frequentlyBought") {
      setShowOptions(false);
    } else {
      setShowOptions(true);
    }
  };

  const handleBlurOption = async (e) => {
    const { name } = e.target;
    if (name === "category") {
      await checkLength(keyName, selectedOption, error);
      handleUpdateError(error);
    }

    // work in progress
    // if (showOptions) {
    //   setShowOptions(false);
    // }
  };

  return (
    <>
      {title ? (
        <div className="title-area">
          <span>{title}</span>
        </div>
      ) : (
        ""
      )}
      <div
        className="dropdownBox"
        style={{ padding: showOptions ? "10px" : "7px 8px 0px 8px" }}
        onBlur={handleBlurOption}
        name={keyName}
      >
        <div
          className="search-area"
          style={{ borderBottom: showOptions ? "1px solid #ececec" : "" }}
          name={keyName}
          onBlur={handleBlurOption}
        >
          <div className="search-selected-item" onClick={handleFocus}>
            <div className="selected-item">
              {selectedOption?.length
                ? selectedOption?.map((option) => {
                    return (
                      <div className="item" key={option?.id}>
                        {option?.[name]}
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
              placeholder={placeholder}
              name={keyName}
              className="search-item"
              value={filterValue}
              onFocus={handleFocus}
              onChange={handleFilterOptions}
              disabled={
                selectedOption?.length === 2 && keyName === "frequentlyBought"
              }
            />
          </div>
          <div className="toggle-btn">
            {selectedOption?.length === 2 && keyName === "frequentlyBought" ? (
              ""
            ) : (
              <img
                src={DownArrow}
                className={
                  showOptions
                    ? "down-arrow-image rotate-dropdpown"
                    : "down-arrow-image remove-rotate-dropdown"
                }
                onClick={toggleOption}
              />
            )}
          </div>
        </div>
        {showOptions ? (
          <div className="options-box">
            {showOptions
              ? changeFilterableList()?.map((opt) => {
                  if (typeof opt === "string") {
                    return <p>{opt}</p>;
                  } else if (opt?.id && opt?.[name]) {
                    return (
                      <span
                        className={
                          selectedOption?.includes(opt)
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
                        {opt?.[name]}
                      </span>
                    );
                  }
                })
              : ""}
          </div>
        ) : (
          ""
        )}
      </div>
      {error?.[keyName] ? (
        <span className="error-alert">{error[keyName]}</span>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchableDropdown;
