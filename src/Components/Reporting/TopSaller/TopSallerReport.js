import React, { useState, useEffect } from "react";
import TopSallerList from "./TopSallerList";

import DateRange from "../../Orders/InstoreOrder/DateRange";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";

const TopSallerReport = () => {
  const [filteredData, setFilteredData] = useState({ category_id: "all" });

  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;
      let orderTypValue;

      switch (selectedOrderSource) {
        case "All":
          orderEnvValue = 1;
          break;
        case "Online Order":
          orderEnvValue = 2;
          break;
        case "Store Order":
          orderEnvValue = 3;
          break;
        default:
          orderEnvValue = 1;
          break;
      }
      switch (selectedLimitType) {
        case "10":
          orderTypValue = "10";
          break;
        case "20":
          orderTypValue = "20";
          break;
        case "50":
          orderTypValue = "50";
          break;
        case "100":
          orderTypValue = "100";
          break;

        default:
          orderTypValue = "10";
          break;
      }

      const updatedData = {
        ...filteredData,
        ...data,
        merchant_id: "MAL0100CA",
        order_env: orderEnvValue,
        limit: orderTypValue,
      };
      // console.log(updatedData);
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedLimitType, setselectedLimitType] = useState("10");
  const [selectedLCategoryType, setselectedLCategoryType] = useState("ALL");

  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] =
    useState(false);
  const [limitTypeDropdownVisible, setlimitTypeDropdownVisible] =
    useState(false);
  const [categoryTypeDropdownVisible, setCategoryTypeDropdownVisible] =
    useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
      case "limit":
        setlimitTypeDropdownVisible(!limitTypeDropdownVisible);
        break;
      case "category":
        setCategoryTypeDropdownVisible(!categoryTypeDropdownVisible);
        break;

      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option);
        setOrderSourceDropdownVisible(false);
        break;
      case "limit":
        setselectedLimitType(option);
        setlimitTypeDropdownVisible(false);
        break;
      case "category":
        if (option === "All") {
          setselectedLCategoryType("All");
          setCategoryTypeDropdownVisible(false);
          setFilteredData({
            ...filteredData,
            category_id: "all",
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        } else {
          const category_id = option.id;
          setselectedLCategoryType(option.title);
          setCategoryTypeDropdownVisible(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL + TAXE_CATEGORY_LIST,
          {
            merchant_id: "MAL0100CA",
          },
          { headers: { "Content-Type": "multipart/form-data" } }
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
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []); // Fetch categories only once when the component mounts

  return (
    <>
      <div className="q-order-main-page">
        <div className="q-category-bottom-detail-section">
          <div className="q-category-bottom-header-sticky">
            <div className="q-category-bottom-header">
              <div className="q_details_header ml-2">
                {" "}
                Top Sellers - Overall Top 10
              </div>
            </div>
            <div className="q_details_header ml-8">Filter by</div>
          </div>
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
              <label className="q-details-page-label" htmlFor="limitFilter">
                Limit
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("limit")}
                >
                  <span className="selected-option mt-1">
                    {selectedLimitType}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {limitTypeDropdownVisible && (
                  <div className="dropdown-content">
                    <div onClick={() => handleOptionClick("10", "limit")}>
                      10
                    </div>
                    <div onClick={() => handleOptionClick("20", "limit")}>
                      20
                    </div>
                    <div onClick={() => handleOptionClick("50", "limit")}>
                      50
                    </div>
                    <div onClick={() => handleOptionClick("100", "limit")}>
                      100
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="q-order-page-filter">
              <label className="q-details-page-label" htmlFor="categoryFilter">
                Category
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("category")}
                >
                  <span className="selected-option mt-1">
                    {selectedLCategoryType}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {categoryTypeDropdownVisible && (
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
        </div>
      </div>

      <style>
        {`
          .dailytotoalReport .q_dateRange_header{
            margin-top: 0rem ;
          }
        `}
      </style>

      <div className="q-attributes-main-page">
        <div className="dailytotoalReport">
          <DateRange onDateRangeChange={handleDataFiltered} />
        </div>
      </div>

      <div className="mt-10">
        <div className="q-attributes-main-page">
          <TopSallerList data={filteredData} />
        </div>
      </div>
    </>
  );
};

export default TopSallerReport;
