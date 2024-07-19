import React, { useState, useEffect } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

const FilterCatDetails = ({ onFilterDataChange, title, showcat }) => {
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const [selectedSelectCategory, setSelectedSelectCategory] = useState("All");

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);

        break;
      case "orderType":
        setSelectedOrderType(option.title);

        break;
      case "selectCategory":
        setSelectedSelectCategory(option.title);

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onFilterDataChange(
      selectedOrderSource,
      selectedOrderType,
      selectedSelectCategory
    );
  }, [selectedOrderSource, selectedOrderType, selectedSelectCategory]);
  const orderSourceList = ["All", "Online Order", "Store Order"];
  const orderTypeList = ["All", "Pickup", "Delivery"];
  const selectCategoryList = ["All", "category1", "category2"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <CustomHeader>{title}</CustomHeader>
        <Grid item xs={12}>
          <Grid container sx={{ px: 2.5, pt: 1 }}>
            <Grid item xs={12}>
              <div className="heading">Filter By</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={showcat != 0 ? 4 : 6}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title={"title"}
                dropdownFor={"orderSource"}
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={showcat != 0 ? 4 : 6}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Type
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                listItem={orderTypeList.map((item) => ({ title: item }))}
                title={"title"}
                dropdownFor={"orderType"}
                selectedOption={selectedOrderType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            {showcat != 0 ? (
              <Grid item xs={12} sm={6} md={showcat != 0 ? 4 : 6}>
                <label
                  className="q-details-page-label"
                  htmlFor="orderSourceFilter"
                >
                  Order Source
                </label>
                <SelectDropDown
                  listItem={selectCategoryList.map((item) => ({ title: item }))}
                  title={"title"}
                  dropdownFor={"selectCategory"}
                  selectedOption={selectedSelectCategory}
                  onClickHandler={handleOptionClick}
                />
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="q-category-bottom-detail-section">
          <div className="q-category-bottom-header">
            <div className="q_details_header ml-2">{title}</div>
          </div>
          <div className="q_details_header ml-8">Filter by</div>

          <div className="q-order-page-container ml-8">
         
            <div className="q-order-page-filter">
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("orderSource")}
                >
                  <span className="selected-option mt-1">
                    {selectedOrderSource}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {orderSourceDropdownVisible && (
                  <div className="dropdown-content ">
                    <div
                      onClick={() => handleOptionClick("All", "orderSource")}
                    >
                      All
                    </div>
                    <div
                      onClick={() =>
                        handleOptionClick("Online Order", "orderSource")
                      }
                    >
                      Online Order
                    </div>
                    <div
                      onClick={() =>
                        handleOptionClick("Store Order", "orderSource")
                      }
                    >
                      Store Order
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="q-order-page-filter">
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Order Type
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("orderType")}
                >
                  <span className="selected-option mt-1">
                    {selectedOrderType}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {orderTypeDropdownVisible && (
                  <div className="dropdown-content">
                    <div onClick={() => handleOptionClick("All", "orderType")}>
                      All
                    </div>
                    <div
                      onClick={() => handleOptionClick("Pickup", "orderType")}
                    >
                      Pickup
                    </div>
                    <div
                      onClick={() => handleOptionClick("Delivery", "orderType")}
                    >
                      Delivery
                    </div>
                  </div>
                )}
              </div>
            </div>

       
            {showcat != 0 ? (
              <div className="q-order-page-filter">
                <label
                  className="q-details-page-label"
                  htmlFor="selectCategoryFilter"
                >
                  Select Category
                </label>
                <div className="custom-dropdown">
                  <div
                    className="custom-dropdown-header"
                    onClick={() => toggleDropdown("selectCategory")}
                  >
                    <span className="selected-option mt-1">
                      {selectedSelectCategory}
                    </span>
                    <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                  </div>
                  {selectCategoryDropdownVisible && (
                    <div className="dropdown-content">
                      <div
                        onClick={() =>
                          handleOptionClick("All", "selectCategory")
                        }
                      >
                        All
                      </div>
                      <div
                        onClick={() =>
                          handleOptionClick("category1", "selectCategory")
                        }
                      >
                        category1
                      </div>
                      <div
                        onClick={() =>
                          handleOptionClick("category2", "selectCategory")
                        }
                      >
                        category2
                      </div>
                   
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default FilterCatDetails;
