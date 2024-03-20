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
  const [selectedTransaction, setSelectedTransaction] = useState("All");
 
  const [selectedListingType, setSelectedListingType] = useState("Select listing");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] = useState(false);
 
  const [listingTypesDropdownVisible, setlistingTypesDropdownVisible] = useState(false);
  const [categoryId, setCategoryId] = useState("all");

  // Function to update the category ID, which will be passed to the child
  const handleCategoryChange = (catId) => {
    setCategoryId(catId);
    console.log(catId+'catid')
  };

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "transaction":
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

  const handleOptionClick = (option, dropdown) => {

   
    switch (dropdown) {
      case "employee":
        setSelectedEmployee(option);
        setEmployeeDropdownVisible(false); 
        break;
      case "transaction":
        setSelectedTransaction(option);
        setTransactionDropdownVisible(false); 
      // case "category":
      //   setSelectedCategory(option);
      //   setCategoryDropdownVisible(false); 
      //   break;
      case "listingType":
          dispatch(emptyProduct([]))
          if(option === 0)
          {
            setSelectedListingType("Product listing");
          }else
          {
            setSelectedListingType("Variant listing");
          }
          let data = {
            merchant_id: "MAL0100CA",
            category_id: 'all',
            show_status: 'all',
            listing_type: option,
            offset: 0,
            limit: 10,
            page: 0
          };
          if (data) {
            dispatch(fetchProductsData(data));
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
        <FilterProduct {...{ handleOptionClick, toggleDropdown,selectedEmployee,employeeDropdownVisible,selectedTransaction,
                        transactionDropdownVisible,selectedListingType,listingTypesDropdownVisible,handleCategoryChange}} />
      </div>
      <div className="q-attributes-main-page">
        <ProductContent />
      </div>
      <div className="q-attributes-main-page">
        <ProductTable {...{selectedListingType,productsList,setproductsList,offset,setoffset,limit,setlimit,categoryId}} />
      </div>
     
    </>
  );
};

export default MainProducts;
