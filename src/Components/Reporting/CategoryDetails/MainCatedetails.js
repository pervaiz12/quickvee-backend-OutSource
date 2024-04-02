import React, { useState, useEffect } from "react";
import FilterCatDetails from "./FilterCatDetails";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import DetailsSaleReport from "./DetailsSaleReport";
import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";

const MainCatedetails = () => {
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
      switch (selectedOrderType) {
        case "All":
          orderTypValue = "all";
          break;
        case "Pickup":
          orderTypValue = "pickup";
          break;
        case "Delivery":
          orderTypValue = "delivery";
          break;
        default:
          orderTypValue = "all";
          break;
      }

      const updatedData = {
        ...filteredData,
        ...data,
        merchant_id: "MAL0100CA",
        order_env: orderEnvValue,
        order_typ: orderTypValue,
      };
      // console.log(updatedData);
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const [selectedLCategoryType, setselectedLCategoryType] = useState("ALL");

  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] =
    useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
    useState(false);
  const [categoryTypeDropdownVisible, setCategoryTypeDropdownVisible] =
    useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
      case "orderType":
        setOrderTypeDropdownVisible(!orderTypeDropdownVisible);
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
      case "orderType":
        setSelectedOrderType(option);
        setOrderTypeDropdownVisible(false);
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
            order_typ: "",
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
            order_typ: "",
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
        <div className="box">
          <div className="q-category-bottom-detail-section">
            <div className="q-category-bottom-header-sticky">
              <div className="q-category-bottom-header">
                <div className="q_details_header ml-2">
                  Category Sale Report
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
                <label
                  className="q-details-page-label"
                  htmlFor="orderTypeFilter"
                >
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
                      <div
                        onClick={() => handleOptionClick("All", "orderType")}
                      >
                        All
                      </div>
                      <div
                        onClick={() => handleOptionClick("Pickup", "orderType")}
                      >
                        Pickup
                      </div>
                      <div
                        onClick={() =>
                          handleOptionClick("Delivery", "orderType")
                        }
                      >
                        Delivery
                      </div>
                      {/* ... (other order type options) ... */}
                    </div>
                  )}
                </div>
              </div>

              <div className="q-order-page-filter">
                <label
                  className="q-details-page-label"
                  htmlFor="categoryFilter"
                >
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
      </div>

      <div className="q-category-main-page">
        <div className="box">
          <DateRange onDateRangeChange={handleDataFiltered}/>
        </div>
      </div>
      <style>
        {`
          .categorysaleReport {
            margin-top: 2rem ;
          }
        `}
      </style>

      <div className="q-category-main-page categorysaleReport">
        <DetailsSaleReport data={filteredData}/>
      </div>
    </>
  );
};

export default MainCatedetails;
