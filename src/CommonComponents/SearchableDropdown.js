import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "../Styles/ProductPage.css";
import DownArrow from "../Assests/Dashboard/Down.svg";
import CloseIcon from "../Assests/Dashboard/cross.svg";
import Validation from "../Constants/Validation";
import { useLocation } from "react-router-dom";

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
  placeholder,
  pageUrl,
  productTitle,
  modalType,
  usingFor,
  setProductName,
}) => {
  const location = useLocation();
  const { checkLength } = Validation();
  const [filterOptions, setFilterOptions] = useState(optionList);
  const [filterValue, setFilterValue] = useState("");
  const isProductAdd = location.pathname.includes("/products/add");
  const isProductEdit = location.pathname.includes("/products/edit");
  const isVarientMerging = location.pathname.includes("/inventory-merge");

  const handleFilterOptions = (e) => {
    const { value } = e?.target;
    setFilterValue(value);
    setProductName(value); // for deven

    if (usingFor === "variantProducts") return;

    const filterList = optionList?.filter((item) => {
      return item?.[name]?.toLowerCase()?.includes(value?.toLowerCase());
    });
    setFilterOptions(
      filterList?.length ? filterList : ["No Search Result Found"]
    );
  };
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef();
  const dropdownRef = useRef(null);

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
        return !hideSelectedList?.some((item) => +item?.id === +filtered?.id);
      });
      setFilterOptions(hideItemList);
    }
  }, [selectedOption, hideSelectedValue, hideSelectedList, optionList]);

  useEffect(() => {
    // remove category error if exist.
    if (selectedOption?.length > 0 && !!handleUpdateError) {
      checkLength(keyName, selectedOption, error);
      handleUpdateError(error);
    }
  }, [selectedOption]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (!modalType) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showOptions, modalType]);

  useEffect(() => {
    // set defaultTax in taxes dropdown
    if (
      optionList?.length &&
      keyName === "taxes" &&
      (isProductAdd || isVarientMerging)
    ) {
      const findOption = optionList?.filter(
        (item) => item?.title === "DefaultTax"
      );
      handleSelectProductOptions(findOption[0], keyName);
    }
  }, [optionList, keyName, productTitle]);

  const changeFilterableList = () => {
    const filterOptionList = optionList?.filter(
      (product) =>
        !product?.title?.toLowerCase()?.includes(productTitle?.toLowerCase())
    );
    // filter incoming optionList items when onchange run
    if (filterOptions?.length) {
      return isProductEdit
        ? filterOptions?.filter(
            (product) =>
              !product?.title
                ?.toLowerCase()
                .includes(productTitle?.toLowerCase())
          )
        : filterOptions;
    }
    return isProductEdit ? filterOptionList : optionList;
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
                ? selectedOption?.map((option) => {
                    return (
                      <div
                        className="item"
                        key={
                          option.isvarient === "1" ? option.var_id : option?.id
                        }
                      >
                        <span>{option?.[name]}</span>
                        <img
                          src={CloseIcon}
                          alt=""
                          className="cancel-image"
                          onClick={() =>
                            handleDeleteSelectedOption(
                              option?.id,
                              keyName,
                              option
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
                alt=""
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
                  const isInSelectedOptions = selectedOption?.some(
                    (selected) =>
                      usingFor === "variantProducts" &&
                      selected.isvarient === "1"
                        ? selected?.id === opt?.id &&
                          selected.var_id === opt.var_id
                        : selected?.id === opt?.id
                  );
                  if (typeof opt === "string") {
                    return <p>{opt}</p>;
                  } else if (opt?.id && opt?.[name]) {
                    return (
                      <span
                        className={
                          isInSelectedOptions ? "item active-item" : "item"
                        }
                        key={opt.isvarient === "1" ? opt.var_id : opt?.id}
                        onClick={() =>
                          isInSelectedOptions
                            ? handleDeleteSelectedOption(opt?.id, keyName, opt)
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
