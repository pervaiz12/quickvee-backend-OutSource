import React, { useEffect, useRef, useState } from "react";
import "../Styles/ProductPage.css";
import DownArrow from "../Assests/Dashboard/Down.svg";
import CloseIcon from "../Assests/Dashboard/cross.svg";
import Validation from "../Constants/Validation";
import { useLocation } from "react-router-dom";

const CreatableDropdown = ({
  title,
  keyName,
  optionList,
  handleSelectProductOptions,
  handleDeleteSelectedOption,
  selectedOption,
  error,
  name,
  placeholder,
  modalType,
  onEnter,
}) => {
  const location = useLocation();
  const { checkLength } = Validation();
  const [filterOptions, setFilterOptions] = useState(optionList);
  const [filterValue, setFilterValue] = useState("");
  const isProductAdd = location.pathname.includes("/products/add");
  const isProductEdit = location.pathname.includes("/products/edit");

  const handleFilterOptions = (e) => {
    let { value } = e.target;
    value = value.replace(/,/g, "");

    if (!value) {
      setFilterValue("");
      setFilterOptions([]);
      return;
    }

    setFilterValue(value ? value : "");
    const filterList = optionList?.filter((item) => {
      return item?.[name]
        ?.toLowerCase()
        ?.includes(value?.trim()?.toLowerCase());
    });
    setFilterOptions(filterList?.length ? filterList : [`Create "${value}"`]);
  };
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  const pressEnter = (e) => {
    if (!filterValue.trim()) {
      setFilterValue("");
      return;
    } else if (
      (e?.key === "Enter" || e.type === "click") &&
      filterValue.trim()
    ) {
      if (selectedOption?.length < 15) {
        onEnter(filterValue?.trim(), keyName);
        setFilterValue("");
        setFilterOptions(optionList);
      } else {
        setFilterValue("");
        setFilterOptions(["Reached maximum limit."]);
        return;
      }
    }
  };

  useEffect(() => {
    if (!!filterValue) {
      document.addEventListener("keypress", pressEnter);
      return () => {
        document.removeEventListener("keypress", pressEnter);
      };
    }
  }, [filterValue, filterOptions]);

  useEffect(() => {
    if (!modalType) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showOptions, modalType]);

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
    setShowOptions(true);
  };

  const handleBlurOption = async (e) => {
    const { name } = e.target;
    if (name === "category") {
      await checkLength(keyName, selectedOption, error);
      //   handleUpdateError(error);
    }
  };
  return (
    <>
      {title ? (
        <div className="title-area">
          <span className="product-input-title">{title}</span>
        </div>
      ) : (
        ""
      )}
      <div
        className="dropdownBox "
        style={{
          padding: showOptions
            ? "0px 8px 8px 8px"
            : !!modalType
              ? ""
              : "0px 8px 0px 8px",
        }}
        onBlur={handleBlurOption}
        name={keyName}
        ref={dropdownRef}
      >
        <div
          className="search-area"
          style={{ borderBottom: showOptions ? "1px solid #ececec" : "" }}
          name={keyName}
          onBlur={handleBlurOption}
        >
          <div
            className={
              !!modalType
                ? "search-selected-item-without-padding"
                : "search-selected-item"
            }
            onClick={handleFocus}
          >
            <div className="selected-item ">
              {selectedOption?.length
                ? selectedOption?.map((option, index) => {
                    return (
                      <div className="item" key={index}>
                        <span>{option?.[name] ? option?.[name] : option}</span>
                        <img
                          src={CloseIcon}
                          className="cancel-image"
                          onClick={() =>
                            handleDeleteSelectedOption(
                              option?.id ? option?.id : option,
                              keyName
                            )
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
              autoComplete={false}
              maxLength={35}
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
          <div className="options-box custom-scroll">
            {showOptions
              ? changeFilterableList()?.map((opt) => {
                  if (typeof opt === "string") {
                    return (
                      <span
                        className={`${
                          opt?.includes("limit".toLowerCase())
                            ? ""
                            : "create-item-box"
                        }`}
                        onClick={pressEnter}
                      >
                        <span
                          className={`${
                            opt?.includes("limit".toLowerCase())
                              ? "max-item-error"
                              : "create-item-text"
                          }`}
                        >
                          {opt}
                        </span>
                      </span>
                    );
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

export default CreatableDropdown;
