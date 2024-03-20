import React, { useEffect, useState } from "react";
import DownIcon from "../../src/Assests/Dashboard/Down.svg"
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesData } from "../Redux/features/Categories/categoriesSlice";
import { fetchProductsData ,emptyProduct } from "../Redux/features/Product/ProductSlice";

const CategoryListDropDown = ({ onCategoryChange }) => {
    let listing_type = 0;
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [category, setCategory] = useState("All");
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
    const [allcategories, setallcategories] = useState([]);
    const [offset, setoffset] = useState(0);
    const [limit, setlimit] = useState(10);
    const AllCategoriesDataState = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        let cat_data = {
        merchant_id: "MAL0100CA",
        };
        if (cat_data) {
            // console.log(props)
        dispatch(fetchCategoriesData(cat_data));
        }
    }, []);
    useEffect(() => {
        if (
        !AllCategoriesDataState.loading &&
        AllCategoriesDataState.categoriesData
        ) {
        setallcategories(AllCategoriesDataState.categoriesData);
        }
    }, [
        AllCategoriesDataState,
        AllCategoriesDataState.loading,
        AllCategoriesDataState.categoriesData,
    ]);
    const toggleDropdown = (dropdown) => {
        switch (dropdown) {
          case "category":
            setCategoryDropdownVisible(!categoryDropdownVisible);
            break;
          default:
            break;
        }
      };
    
      const handleOptionClick = (option, dropdown,value) => {
        switch (dropdown) {
          case "category":
            console.log(option)
            console.log(dropdown)
            console.log(value)
            setSelectedCategory(value);
            onCategoryChange(option);
            
            // handleCategoryChange(option)
            setCategoryDropdownVisible(false); 
            dispatch(emptyProduct([]))
            let data1 = {
                merchant_id: "MAL0100CA",
                format:"json",
                category_id: option,
                show_status: 'all',
                listing_type: listing_type,
                offset: offset,
                limit: 10,
              };
              if (data1) {
                dispatch(fetchProductsData(data1));
                // console.log(productsList);
              }

            break;
          default:
            break;
        }
      };

    return <>
        <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="categoryFilter">
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
              {categoryDropdownVisible && (
                <div className="dropdown-content ">
                  <div onClick={() => handleOptionClick("All", "category","All")}>All</div>
                  { allcategories?.map((category, index) => (
                  <div  key={index} onClick={() => handleOptionClick(category.id, "category",category.title)}>{category.title}</div>
                 
                  ))}
                 
                </div>
              )}
            </div>
          </div>
    </>
}

export default CategoryListDropDown;