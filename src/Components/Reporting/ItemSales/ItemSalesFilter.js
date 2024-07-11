import React, { useState, useEffect } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import PasswordShow from "../../../Common/passwordShow";

const ItemSalesFilter = ({ onFilterDataChange }) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filteredData, setFilteredData] = useState({ category_id: "all" });

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "odersource":
        setSelectedOrderSource(option.title);

        break;
      case "ordertype":
        setSelectedOrderType(option.title);

        break;
      case "category":
        if (option === "All") {
          setSelectedCategory("All");

          setFilteredData({
            ...filteredData,
            category_id: "all",
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        } else {
          const category_id = option.id;
          setSelectedCategory(option.title);

          setFilteredData({
            ...filteredData,
            category_id,
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        }
        break;
      default:
        break;
    }
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  let data = {
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    ...userTypeData,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { token, ...dataNew } = data;
        const response = await axios.post(
          BASE_URL + TAXE_CATEGORY_LIST,
          dataNew,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the API response has a data property containing the category list
        const categoryList = response.data.result;

        // Extracting category IDs and view titles
        const mappedOptions = categoryList.map((category) => ({
          id: category.id,
          title: category.title,
        }));

        setCategoryOptions(mappedOptions);
        setLoadingCategories(false);
      } catch (error) {
        // console.error("Error fetching categories:", error);
        if (error.response.status == 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        }
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []); // Fetch categories only once when the component mounts

  useEffect(() => {
    onFilterDataChange(
      selectedOrderSource,
      selectedOrderType,
      selectedCategory
    );
  }, [selectedOrderSource, selectedOrderType, selectedCategory]);

  const orderSourceList = ["All", "Online Order", "Store Order"];
  const orderTypeList = ["All", "Pickup", "Delivery"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">Item Sales</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header ">Filter by</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <SelectDropDown
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="odersource"
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Order Type
              </label>
              <SelectDropDown
                listItem={orderTypeList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="ordertype"
                selectedOption={selectedOrderType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Category
              </label>
              <SelectDropDown
                heading={"All"}
                listItem={categoryOptions}
                title="title"
                dropdownFor="category"
                selectedOption={selectedCategory}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="q-category-bottom-detail-section">
        <div className="">
          <div className="q-category-bottom-header">
            <div className="q_details_header ml-2">Item Sales</div>
          </div>
          <div className="q_details_header ml-8">Filter by</div>
        </div>
        <div className="q-order-page-container ml-8">
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
              Order Source
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("odersource")}
              >
                <span className="selected-option mt-1">
                  {selectedOrderSource}
                </span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderSourceVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "odersource")}>
                    All
                  </div>
                  <div
                    onClick={() =>
                      handleOptionClick("Online Order", "odersource")
                    }
                  >
                    Online Order
                  </div>
                  <div
                    onClick={() =>
                      handleOptionClick("Store Order", "odersource")
                    }
                  >
                    Store Order
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
              Order Type
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("ordertype")}
              >
                <span className="selected-option mt-1">
                  {selectedOrderType}
                </span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderTypeVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "ordertype")}>
                    All
                  </div>
                  <div onClick={() => handleOptionClick("Pickup", "ordertype")}>
                    Pickup
                  </div>
                  <div
                    onClick={() => handleOptionClick("Delivery", "ordertype")}
                  >
                    Delivery
                  </div>
                </div>
              )}
            </div>
          </div>

        
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="employeeFilter">
              Category
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("category")}
              >
                <span className="selected-option mt-1">{selectedCategory}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {CategoryVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "category")}>
                    All
                  </div>
                  {categoryOptions.map((option, key) => (
                    <div
                      key={key}
                      onClick={() => handleOptionClick(option, "category")}
                    >
                      {option.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ItemSalesFilter;
