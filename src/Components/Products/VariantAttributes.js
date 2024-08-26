import React, { useEffect, useState } from "react";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import Validation from "../../Constants/Validation";
import { components } from "react-select";
import SearchIcon from "@mui/icons-material/Search"; // Import MUI icon
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const VariantAttributes = ({
  filterOptionList,
  handleFilterDropdownOption,
  varientDropdownList,
  varientError,
  toggleVarientSection,
  isMultipleVarient,
  handleOnBlurAttributes,
  varientLength,
  handleSetVarientLength,
  addMoreVarientItems,
  handleClearFormData,
  formValue,
}) => {
  const {
    fetchProductLoadingDropdown,
    fetchCategoryListLoading,
    fetchTaxListLoading,
  } = useSelector((state) => state?.productsListData);

  const location = useLocation();
  const isProductAdd = location.pathname.includes("/products/add");
  const isProductEdit = location.pathname.includes("/products/edit");

  const styles = {
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: "none" } : base;
    },
    clearIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: 4,
      position: "absolute",
      top: "50%",
      right: 0,
      transform: "translate(0px, -50%)",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "#F2F2F2", // Background color for selected items
      borderRadius: "2px", // Border radius for selected items
      padding: "2px 0px",
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: "#000", // Text color for selected items
      padding: "0 10px", // Padding for label within the selected item
      fontSize: "13px",
      fontWeight: 500,
      textAlign: "center",
      padding: "3px 6px 3px 10px !important",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#999", // Change this to your desired placeholder text color
      fontSize: "14px", // Change this to your desired placeholder font size
      // Add more CSS properties as needed
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
      // height: 40,
      minHeight: 40,
      "&:hover": {
        borderColor: "black" ? "black" : provided["&:hover"].borderColor,
      },
    }),
    input: (provided) => ({
      ...provided,
      "&:focus": {
        borderColor: "black",
        outline: "none",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "5px 40px 5px 5px",
    }),
  };

  const dropDownStyle = {
    clearIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#000", // Change this to your desired color
      fontWeight: "500", // Change this to your desired font weight
      fontSize: "15px", // Change this to your desired font size
      // Add more CSS properties as needed
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff", // Change the background color of selected item
      color: "#000", // Change the text color of selected item
      cursor: "pointer",
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 1000, // Change this to a higher value to ensure the dropdown is on top
      cursor: "pointer",
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
      // height: 40,
      minHeight: 40,
      "&:hover": {
        borderColor: "black" ? "black" : provided["&:hover"].borderColor,
      },
      cursor: "pointer",
    }),
    input: (provided) => ({
      ...provided,
      "&:focus": {
        borderColor: "black",
        outline: "none",
      },
    }),
  };
  const pageUrl =
    window.location.pathname.split("/")[1] +
    "/" +
    window.location.pathname.split("/")[2] +
    "/" +
    window.location.pathname.split("/")[3];
  const [showAttributes, setShowAttributes] = useState(false);

  const animatedComponents = makeAnimated();

  const handleDeleteClick = (category, id) => {
    // when varientList item is deleted through delete icon click then catgeory is null
    // if someone deleted all items of varient item then category is apply.
    const deleteSelected = varientLength?.filter((item) => {
      return item?.id !== id;
    });

    // change varientItem id => if id is 1 keep 1 or change deleteSelected[0]?.id - 1
    const updatedData = deleteSelected.map((item) => ({
      ...item,
      id: category ? (item?.id === 1 ? 1 : item?.id - 1) : item?.id,
    }));

    handleSetVarientLength(updatedData);
  };

  const filterVarientListIfAllItemsDelete = (index, value) => {
    if (index === 0) {
      if (
        varientLength?.length > 1 &&
        value < varientLength[0]?.varientAttributeList?.length
      ) {
        handleDeleteClick("conditionally-delete", varientLength[0]?.id);
        return true;
      }
    } else if (index === 1) {
      if (
        varientLength?.length > 2 &&
        value < varientLength[1]?.varientAttributeList?.length
      ) {
        handleDeleteClick("conditionally-delete", varientLength[1]?.id);
        return true;
      }
    }
    return false;
  };

  const handlechange = (value, index, name, actionMeta) => {
    // validation for add varient item => only ' is allowed and " is not allowed in varient item text
    let filterValue;
    // if value comes from createble varient
    if (Array.isArray(value)) {
      filterValue = value.map((item) => ({
        ...item,
        label: item?.label?.trim(),
      }));
    } else {
      filterValue = value;
    }

    // clear the all input fields value when add new varient first item
    // here using varientLength length and value is less that current varientLength
    if (index > 0) {
      if (
        filterValue?.length === 1 &&
        filterValue > varientLength[index]?.varientAttributeList
      ) {
        handleClearFormData(true);
      } else {
        handleClearFormData(false);
      }
    }

    if (filterVarientListIfAllItemsDelete(index, filterValue)) {
      return;
    }

    switch (actionMeta?.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta?.removedValue?.isFixed) {
          return;
        }
        break;
      case "clear":
        filterValue = value.filter((v) => v.isFixed);
        break;
    }

    let updateVarientLength = [...varientLength];
    if (name == "varientName") {
      updateVarientLength[index] = {
        ...updateVarientLength[index],
        varientName: filterValue,
      };
    } else if (name == "varientAttributeList") {
      updateVarientLength[index] = {
        ...updateVarientLength[index],
        varientAttributeList: filterValue,
      };
    }
    handleSetVarientLength(updateVarientLength);
  };

  useEffect(() => {
    const filterItems = varientDropdownList?.filter(
      (opt) =>
        !varientLength
          ?.map((item) => item?.varientName?.value)
          .includes(opt?.title)
    );
    handleFilterDropdownOption(filterItems);
  }, [varientLength, varientDropdownList]);

  // if varientName is empty set defaultValue dropdown first item. only for the first dropwdown for fill the value.
  useEffect(() => {
    if (varientLength?.length && varientDropdownList?.length) {
      const setDefaultValue = varientLength?.map((sec, index) => {
        return {
          ...sec,
          varientName: !!sec?.varientName
            ? sec?.varientName
            : {
                value: varientDropdownList[0]?.title,
                label: varientDropdownList[0]?.title,
              },
        };
      });
      handleSetVarientLength(setDefaultValue);
    }
  }, [varientDropdownList]);

  const filterDefaultvalue = () => {
    if (filterOptionList?.length > 0) {
      return filterOptionList?.map((option) => ({
        value: option?.title,
        label: option?.title,
      }));
    }
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      position: "absolute",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
      height: 40,
      minHeight: 40,
      "&:hover": {
        borderColor: "black" ? "black" : provided["&:hover"].borderColor,
      },
    }),
    input: (provided) => ({
      ...provided,
      "&:focus": {
        borderColor: "black",
        outline: "none",
      },
    }),
  };

  const handleInputChange = (newValue) => {
    // Check for forbidden characters
    if (newValue.includes("/")) {
      alert("The '/' character is not allowed.");
      return newValue.replace(/\//g, "");
    } else if (newValue.includes("\\")) {
      alert("The '\\' character is not allowed.");
      return newValue.replace(/\\/g, "");
    } else if (newValue.includes('"')) {
      alert('Double quotes (") are not allowed.');
      return newValue.replace(/"/g, "");
    } else if (newValue.split("").filter((p) => p === "'").length > 1) {
      alert("Only one apostrophe is allowed.");
      return newValue;
    } else if (newValue.includes(",")) {
      alert("The ',' character is not allowed.");
      return newValue.replace(/,/g, "");
    } else if (newValue.includes("~")) {
      alert("The '~' character is not allowed.");
      return newValue.replace(/~/g, "");
    } else if (newValue.includes("-")) {
      alert("The '-' character is not allowed.");
      return newValue.replace(/-/g, "");
    } else if (newValue.includes("<")) {
      alert("The '<' character is not allowed.");
      return newValue.replace(/</g, "");
    } else if (newValue.includes(">")) {
      alert("The '>' character is not allowed.");
      return newValue.replace(/>/g, "");
    } else if (newValue.includes(";")) {
      alert("The ';' character is not allowed.");
      return newValue.replace(/;/g, "");
    }
    return newValue;
  };

  return (
    <>
      <div
        className="mx-0"
        style={{ display: showAttributes ? "block" : "none" }}
      >
        <div className="q-add-categories-single-input">
          <div className="q_dashbaord_netsales">
            <h1>Variant Attributes</h1>
          </div>
        </div>
      </div>

      <div class="varient-block">
        {!isProductEdit ? (
          <div class="multiple-items">
            <span>Multiple Items?*</span>
            <div class="checkbox-area">
              <input
                type="checkbox"
                name="isMultiple"
                checked={isMultipleVarient}
                onChange={toggleVarientSection}
                className="checkbox-input"
              />
              <label for="isMultiple" className="check-text">
                Create Attributes and Options
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
        {isProductEdit && isMultipleVarient ? (
          <div className="product-note-section">
            <p class="product-note">
              Note : After making any change, please update the page.
            </p>
            <p class="product-note">
              Note : You cannot remove existing variants.
            </p>
          </div>
        ) : (
          ""
        )}
        {isMultipleVarient ? (
          <Grid container className="varient-select-section">
            <Grid item xs={12} className="">
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <h2 className="text-[18px] text-black opacity-100 Admin_std">
                    Variant Attributes
                  </h2>
                </Grid>
              </Grid>

              {varientLength.length > 0
                ? varientLength?.map((varient, index) => {
                    return (
                      <>
                        <Grid container sx={{ mb: 1.3 }} key={index + 1}>
                          <Grid item xs={12}>
                            <Grid container sx={{ mt: 1.5 }}>
                              <Grid item xs={12}>
                                <Select
                                  closeMenuOnSelect={true}
                                  components={{ ...animatedComponents }}
                                  value={varient?.varientName}
                                  onChange={(e) =>
                                    handlechange(e, index, "varientName")
                                  }
                                  className="dropdown"
                                  options={filterDefaultvalue()}
                                  isSearchable
                                  isClearable
                                  styles={dropDownStyle}
                                  isDisabled={
                                    index + 1 < varientLength?.length ||
                                    isProductEdit
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container sx={{ mt: 1.5 }}>
                            <Grid item className="relative" xs={12}>
                              <CreatableSelect
                                closeMenuOnSelect={true}
                                // isValidNewOption={isValidNewOption}
                                components={{
                                  ...animatedComponents,
                                  DropdownIndicator: null, // Replace DropdownIndicator with SearchIndicator
                                }}
                                styles={styles}
                                value={varient?.varientAttributeList}
                                options={varient?.varientAttributeList}
                                isDisabled={
                                  isProductEdit
                                    ? fetchProductLoadingDropdown ||
                                      fetchCategoryListLoading ||
                                      fetchTaxListLoading
                                    : null
                                }
                                onChange={(e, actionMeta) => {
                                  handlechange(
                                    e,
                                    index,
                                    "varientAttributeList",
                                    actionMeta
                                  );
                                }}
                                placeholder="Select Variant..."
                                onKeyDown={handleOnBlurAttributes}
                                isMulti
                                isClearable={varient?.varientAttributeList?.some(
                                  (v) => !v.isFixed
                                )}
                                isValidNewOption={(
                                  inputValue,
                                  selectValue,
                                  selectOptions
                                ) =>
                                  inputValue.trim().length > 0 && // Ensure trimmed value is valid
                                  !selectOptions.find(
                                    (option) =>
                                      option.label.trim().toLowerCase() ===
                                      inputValue.trim().toLowerCase()
                                  )
                                }
                                onInputChange={handleInputChange}
                                className="createable"
                                backspaceRemovesValue={false}
                              />
                              {!!varientError?.error &&
                              +varientError?.errorIndex === index ? (
                                <span className="error-alert error-alert-varient">
                                  {varientError?.error}
                                </span>
                              ) : (
                                ""
                              )}
                              {!isProductEdit ? (
                                <div className="absolute top-1.5 right-2">
                                  {varientLength[varientLength?.length - 1]
                                    ?.id === varient?.id &&
                                  varient?.id !== 1 ? (
                                    <button
                                      onClick={() =>
                                        handleDeleteClick(null, varient?.id)
                                      }
                                      className="ml-auto"
                                    >
                                      <img
                                        src={DeleteIcon}
                                        alt=""
                                        className=" m-auto d-grid place-content-center"
                                        width="32px"
                                      />
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })
                : ""}
              <Grid container sx={{ mb: formValue.length ? 1 : 2.5 }}>
                <Grid item xs={12}>
                  {+varientLength?.length < 3 &&
                  isProductAdd &&
                  !isProductEdit ? (
                    <div className="flex">
                      <button
                        className="px-4 py-2 bg-[#0A64F9] text-white rounded-md varient-attribute-btn"
                        onClick={addMoreVarientItems}
                      >
                        Add Variant Attributes +
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default VariantAttributes;
