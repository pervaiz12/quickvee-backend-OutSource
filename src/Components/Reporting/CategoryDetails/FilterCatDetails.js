import React, { useState, useEffect } from "react";

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
      






































    </>
  );
};

export default FilterCatDetails;
