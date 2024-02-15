import React, { useState, useEffect } from "react";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";


const ItemSalesFilter = ({onFilterDataChange}) => {
 
  const [selectedOrderSource ,setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const[selectedCategory,setSelectedCategory] = useState("All");

  const [orderSourceVisible, setOrderSourdeDropdownVisible] = useState(false);
  const[orderTypeVisible , setOrderTypeDropdownVisible] = useState(false);
  const [CategoryVisible , setCategoryDropdownVisible] = useState(false);
  const [filteredData, setFilteredData] = useState({ category_id: "all" });

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "odersource":
        setOrderSourdeDropdownVisible(!orderSourceVisible);
        break;
      case "ordertype":
        setOrderTypeDropdownVisible(!orderTypeVisible);
        break;
      case "category":
        setCategoryDropdownVisible(!CategoryVisible);
      default:
        break;
    }
  };
  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "odersource":
        setSelectedOrderSource(option);
        setOrderSourdeDropdownVisible(false);
        break;
      case "ordertype":
        setSelectedOrderType(option);
        setOrderTypeDropdownVisible(false);
        break;
      case "category":
        if (option === "All") {
          setSelectedCategory("All");
          setCategoryDropdownVisible(false);
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
          setCategoryDropdownVisible(false);
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

  useEffect(() => {
    onFilterDataChange(selectedOrderSource , selectedOrderType , selectedCategory)
  }, [selectedOrderSource , selectedOrderType , selectedCategory]);

  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div className="">
          <div className="q-category-bottom-header">
            <div className='q_details_header ml-2'>Item Sales</div>
          </div>
          <div className='q_details_header ml-8'>Filter by</div>
        </div>
        <div className="q-order-page-container ml-8">
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor ="employeeFilter">
              Order Source
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("odersource")}
              >
                <span className="selected-option mt-1">{selectedOrderSource}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderSourceVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "odersource")}>All</div>
                  <div onClick={() => handleOptionClick("Online Order", "odersource")}>Online Order</div>
                  <div onClick={() => handleOptionClick("Store Order", "odersource")}>Store Order</div>
                </div>
              )}
            </div>
          </div>

          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor ="employeeFilter">
              Order Type
            </label>
            <div className="custom-dropdown">
              <div
                className="custom-dropdown-header"
                onClick={() => toggleDropdown("ordertype")}
              >
                <span className="selected-option mt-1">{selectedOrderType}</span>
                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
              </div>
              {orderTypeVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleOptionClick("All", "ordertype")}>All</div>
                  <div onClick={() => handleOptionClick("Pickup", "ordertype")}>Pickup</div>
                  <div onClick={() => handleOptionClick("Delivery", "ordertype")}>Delivery</div>
                </div>
              )}
            </div>
          </div>

          {/* Order Status Dropdown */}
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor ="employeeFilter">
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
      </div>
    </>
  )
}

export default ItemSalesFilter