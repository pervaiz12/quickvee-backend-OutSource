import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesData } from "../Redux/features/Categories/categoriesSlice";
import {
  fetchProductsData,
  emptyProduct,
} from "../Redux/features/Product/ProductSlice";
import SelectDropDown from "../reuseableComponents/SelectDropDown";
import UpArrow from "../Assests/Dashboard/Up.svg";
import DownIcon from "../Assests/Dashboard/Down.svg";
import { useAuthDetails } from "../Common/cookiesHelper";
import PasswordShow from "../Common/passwordShow";

const CategoryListDropDown = ({
  type,
  onCategoryChange,
  selectedStatus,
  searchId,
  listFor,
  changeProductPageUrl,
}) => {
  let listing_type = 0;
  const searchCategory = new URLSearchParams(window.location.search);
  const categoryUrl = searchCategory.get("category")?.trim().toLowerCase();
  const statusUrl = searchCategory.get("status")?.trim().toLowerCase();
  const listingUrl = searchCategory.get("listingType")?.trim().toLowerCase();
  const imageUrl = searchCategory.get("filterBy")?.trim().toLowerCase();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [allcategories, setallcategories] = useState([]);
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(10);
  const AllCategoriesDataState = useSelector((state) => state.categories);
  const [isTablet, setIsTablet] = useState(false);
  const dispatch = useDispatch();
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const { loading } = useSelector((state) => state.productsListData);

  const getCategories = async () => {
    try {
      let cat_data = {
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
        ...userTypeData,
      };
      if (cat_data) {
        await dispatch(fetchCategoriesData(cat_data)).unwrap();
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    getCategories();
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

  const handleOptionClick = (option, dropdown, value) => {
    switch (dropdown) {
      case "category":
        // console.log("from dropdown: ", option);
        setSelectedCategory(option === "All" ? "All" : option.title);
        onCategoryChange(option === "All" ? "all" : option.id);
        if (listFor === "massInventoryUpdate") {
          return;
        }
        changeProductPageUrl("category", option?.id ? option?.id : "all");
        setCategoryDropdownVisible(false);
        // dispatch(emptyProduct([]));
        let data1 = {
          merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
          format: "json",
          // category_id: option === "All" ? "all" : option?.id,
          // show_status: selectedStatus,
          category_id: categoryUrl === 0 || categoryUrl ? categoryUrl : "all",
          show_status: statusUrl === 0 || statusUrl ? statusUrl : "all",
          name: searchId,
          // listing_type: listing_type,
          is_media_blank: imageUrl === "all" ? "" : imageUrl,
          listing_type: listingUrl === 0 || listingUrl ? listingUrl : "0",
          offset,
          limit: 10,
          page: 0,
          ...userTypeData,
        };
        if (data1) {
          // dispatch(fetchProductsData(data1));
        }

        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 995);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // const dropdownContentClass =
  //   Object.values(fetchProductsData).length > 2
  //     ? "dropdown-content scrollable"
  //     : "dropdown-content";
  // const lengthOfArray = Object.values(fetchProductsData).length;

  return (
    <>
      <label htmlFor="categoryFilter">Category</label>
      <SelectDropDown
        sx={{ pt: 0.5 }}
        heading={"All"}
        title={"title"}
        listItem={allcategories}
        // selectedOption={selectedCategory}
        selectedOption={
          allcategories?.filter((o) => {
            return (
              searchCategory.get("category")?.trim()?.toLowerCase() ===
              o?.id?.trim()?.toLowerCase()
            );
          })?.[0]?.title ?? "All"
        }
        onClickHandler={handleOptionClick}
        dropdownFor={"category"}
        disabled={loading}
      />
      {/* <div
      // className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}
      >
        <label htmlFor="categoryFilter">Category</label>
        <div className="custom-dropdown input_area" ref={dropdownRef}>
          <div
            className="custom-dropdown-header"
            onClick={() => toggleDropdown("category")}
          >
            <span className="selected-option mt-1">{selectedCategory}</span>
            <img
              src={categoryDropdownVisible ? UpArrow : DownIcon}
              alt="Dropdown Icon"
              className="w-6 h-6"
            />
          </div>
          {categoryDropdownVisible && (
            <div className={dropdownContentClass}>
              <div
                className={
                  selectedCategory === "All"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => handleOptionClick("all", "category", "All")}
              >
                All
              </div>
              {allcategories?.map((category, index) => (
                <div
                  className={
                    selectedCategory === category.title
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  key={index}
                  onClick={() =>
                    handleOptionClick(category.id, "category", category.title)
                  }
                >
                  {category.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}
    </>
  );
};

export default CategoryListDropDown;
