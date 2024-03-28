import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import ProductContent from "./ProductContent";
import ProductTable from "./ProductTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsData ,emptyProduct } from "../../Redux/features/Product/ProductSlice";

const MainProducts = () => {
  
  const dispatch = useDispatch();
  const [productsList, setproductsList] = useState([]);
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(10);
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedStatusValue, setSelectedStatusValue] = useState("all");
 
  const [selectedListingType, setSelectedListingType] = useState("Select listing");
  const [selectedListingTypeValue, setSelectedListingTypeValue] = useState("0");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] = useState(false);
 
  const [listingTypesDropdownVisible, setlistingTypesDropdownVisible] = useState(false);
  const [categoryId, setCategoryId] = useState("all");

  // Function to update the category ID, which will be passed to the child
  const handleCategoryChange = (catId) => {
    setCategoryId(catId);
  };

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "status":
        setTransactionDropdownVisible(!transactionDropdownVisible);
        break;
      // case "category":
      //   setCategoryDropdownVisible(!categoryDropdownVisible);
      //   break;
      case "listingType":
          setlistingTypesDropdownVisible(!listingTypesDropdownVisible);
          break;
      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown, value) => {

   
    switch (dropdown) {
      case "employee":
        setSelectedEmployee(option);
        setEmployeeDropdownVisible(false); 
        break;
      case "status":
        setSelectedStatus(option);
        setSelectedStatusValue(value);
        setTransactionDropdownVisible(false); 
        dispatch(emptyProduct([]))
        let status_data = {
          merchant_id: "MAL0100CA",
          category_id: categoryId,
          show_status: option,
          listing_type: selectedListingTypeValue,
          offset: 0,
          limit: 10,
          page: 0
        };
        if (status_data) {
          dispatch(fetchProductsData(status_data));
        }
        setlistingTypesDropdownVisible(false); 
        break;
      case "listingType":
          dispatch(emptyProduct([]))
          if(option === 0)
          {
            setSelectedListingType("Product listing");
          }else
          {
            setSelectedListingType("Variant listing");
          }
          setSelectedListingTypeValue(option)
          let listing_data = {
            merchant_id: "MAL0100CA",
            category_id: categoryId,
            show_status: selectedStatus,
            listing_type: option,
            offset: 0,
            limit: 10,
            page: 0
          };
          if (listing_data) {
            dispatch(fetchProductsData(listing_data));
          }
          setlistingTypesDropdownVisible(false); 
          break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="q-attributes-main-page">
        <FilterProduct {...{ handleOptionClick, toggleDropdown,selectedEmployee,employeeDropdownVisible,selectedStatus,
                        transactionDropdownVisible,selectedListingType,selectedListingTypeValue,listingTypesDropdownVisible,handleCategoryChange,selectedStatusValue}} />
      </div>
      <div className="q-attributes-main-page">
        <ProductContent />
      </div>
      <div className="q-attributes-main-page">
        <ProductTable {...{selectedListingType,productsList,setproductsList,offset,setoffset,limit,setlimit,categoryId,selectedListingTypeValue,selectedStatus}} />
      </div>
     
    </>
  );
};

export default MainProducts;
