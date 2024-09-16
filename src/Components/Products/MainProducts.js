import React, { lazy, useEffect, useState } from "react";
import ProductContent from "./ProductContent";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsData,
  emptyProduct,
  updateProductsType,
  deleteMultipleProductAPI,
} from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import useDebounce from "../../hooks/useDebouncs";
import PasswordShow from "../../Common/passwordShow";
import { CircularProgress, Grid } from "@mui/material";
import { Suspense } from "react";
import DeleteModal from "../../reuseableComponents/DeleteModal";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import "../../Styles/ProductPage.css";
import {
  Router,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const FilterProduct = lazy(() => import("./FilterProduct"));
const ProductTable = lazy(() => import("./ProductTable"));

const MainProducts = () => {
  const dispatch = useDispatch();
  const { inventory_approval } = useSelector(
    (state) => state.StoreSetupList.storesetupData
  );
  const location = useLocation();
  const navigate = useNavigate();

  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(10);
  const [selectedEmployee, setSelectedEmployee] = useState("Select");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStatusValue, setSelectedStatusValue] = useState("All");
  const [productByImages, setProductByImages] = useState("All");
  const [productIdList, setProductIdList] = useState([]);

  const [deleteloading, setDeleteloading] = useState(false);

  const [selectedListingType, setSelectedListingType] =
    useState("Select listing");

  const [selectedListingTypeValue, setSelectedListingTypeValue] = useState("0");

  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();

  const [del_picDropdownVisible, setdel_picDropdownVisible] = useState(false);
  const [transactionDropdownVisible, setTransactionDropdownVisible] =
    useState(false);

  const [listingTypesDropdownVisible, setlistingTypesDropdownVisible] =
    useState(false);
  const [categoryId, setCategoryId] = useState("all");

  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();

  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const categoryUrl = searchParams.get("category")?.trim().toLowerCase();
  const statusUrl = searchParams.get("status")?.trim().toLowerCase();
  const listingUrl = searchParams.get("listingType")?.trim().toLowerCase();
  const imageUrl = searchParams.get("filterBy")?.trim().toLowerCase();
  const searchUrl = searchParams.get("search")?.trim().toLowerCase();
  const [searchId, setSearchId] = useState(searchUrl ? searchUrl : ""); // State to track search ID
  const debouncedValue = useDebounce(searchId, 500);

  useEffect(() => {
    if (debouncedValue) {
      changeProductPageUrl("search", debouncedValue);
    }
  }, [debouncedValue]);

  const changeProductPageUrl = (urlOption, content) => {
    if (content === 0 || content) {
      // Get the current search parameters

      // Set or update the new search parameter
      searchParams.set(urlOption, content);

      // Navigate to the updated URL with all search parameters
      navigate(`/inventory/products?${searchParams.toString()}`);
    } else {
      navigate(location.pathname);
    }
  };

  const handleDeleteProduct = async (id) => {
    setDeleteCategoryId(id);
    setDeleteModalOpen(true);
  };

  // Function to update the category ID, which will be passed to the child
  const handleCategoryChange = (catId) => {
    setProductIdList([]);
    setSearchId("");
    searchParams.delete("search");
    setCategoryId(catId);
  };

  const handleSearch = (val) => {
    setSearchId(val);
    if (!val) {
      changeProductPageUrl("search", "");
    }
  };

  const handleProductUnCheck = (id) => {
    const filterId = productIdList?.filter((existId) => existId !== id);
    setProductIdList(filterId);
  };

  const handleProductCheck = (id) => {
    setProductIdList((prev) => [...prev, id]);
  };

  const filterCategoryOnDropDown = async () => {
    let data = {
      merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      format: "json",
      // category_id: categoryId === "All" ? "all" : categoryId,
      // show_status: selectedStatus,
      category_id: categoryUrl === 0 || categoryUrl ? categoryUrl : "all",
      show_status: statusUrl === 0 || statusUrl ? statusUrl : "all",
      name: searchUrl,
      // is_media_blank: productByImages === "All" ? "" : 1,
      // listing_type: selectedListingTypeValue?.id
      //   ? selectedListingTypeValue?.id
      //   : 0,
      is_media_blank: imageUrl === "all" ? "" : imageUrl,
      listing_type: listingUrl === 0 || listingUrl ? listingUrl : "0",
      offset: 0,
      limit:
        JSON.parse(localStorage.getItem("product-focus-data")) &&
        JSON.parse(localStorage.getItem("product-focus-data"))?.limit
          ? JSON.parse(localStorage.getItem("product-focus-data"))?.limit
          : 10,
      page: 0,
      ...userTypeData,
    };

    dispatch(emptyProduct([]));
    handleOptionClick([]);
    setProductIdList([]);
    try {
      await dispatch(fetchProductsData(data)).unwrap();
      // Handle response if needed
    } catch (error) {
      if (error?.status == 401 || error?.response?.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error?.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  const confirmDeleteCategory = async () => {
    setDeleteloading(true);
    if (deleteCategoryId) {
      let timer = null;
      const formData = new FormData();
      formData.append("ids", productIdList?.map((i) => i).toString());
      formData.append("login_type", userTypeData?.login_type);
      formData.append("token_id", userTypeData?.token_id);
      formData.append("token", userTypeData?.token);
      formData.append(
        "merchant_id",
        LoginGetDashBoardRecordJson?.data?.merchant_id
      );

      try {
        const res = await dispatch(deleteMultipleProductAPI(formData)).unwrap();
        if (res?.status === "success") {
          ToastifyAlert("Deleted Successfully", "success");
          setDeleteCategoryId(null);
          setDeleteModalOpen(false);
          clearTimeout(timer);
          timer = setTimeout(() => {
            window.location.reload();
          }, 600);
        }
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      }
    }
    setDeleteloading(false);
  };

  useEffect(() => {
    filterCategoryOnDropDown();
  }, [
    dispatch,
    debouncedValue,
    LoginGetDashBoardRecordJson?.data?.merchant_id,
    selectedStatus,
    selectedListingTypeValue,
    categoryId,
    productByImages,
    location,
  ]);

  const handlefocus = (e) => {};

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "del_pic":
        setdel_picDropdownVisible(!del_picDropdownVisible);
        break;
      case "status":
        setTransactionDropdownVisible(!transactionDropdownVisible);
        break;
      case "listingType":
        setlistingTypesDropdownVisible(!listingTypesDropdownVisible);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown, value) => {
    switch (dropdown) {
      case "del_pic":
        setdel_picDropdownVisible(false);
        console.log(option);
        if (option === "Select") {
          setSelectedEmployee("Select");
          return;
        }
        if (window.confirm("Are you sure you want to update?")) {
          dispatch(emptyProduct([]));
          setSearchId("");
          searchParams.delete("search");
          handleOptionClick([]);
          setProductIdList([]);
          console.log(option);
          setSelectedEmployee(option.title);
          let type_date = {
            merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
            id: option.id,
            ...userTypeData,
          };
          if (type_date) {
            try {
              dispatch(updateProductsType(type_date))
                .then(async (actionResult) => {
                  const responseData = actionResult.payload;

                  if (responseData) {
                    let del_pic_data = {
                      merchant_id:
                        LoginGetDashBoardRecordJson?.data?.merchant_id,
                      // category_id: categoryId === "All" ? "all" : categoryId,
                      // show_status: selectedStatus,
                      category_id:
                        categoryUrl === 0 || categoryUrl ? categoryUrl : "all",
                      show_status:
                        statusUrl === 0 || statusUrl ? statusUrl : "all",
                      name: searchUrl,
                      // is_media_blank: productByImages === "All" ? "" : 1,
                      // listing_type: selectedListingTypeValue,
                      is_media_blank: imageUrl === "all" ? "" : imageUrl,
                      listing_type:
                        listingUrl === 0 || listingUrl ? listingUrl : "0",
                      offset: 0,
                      limit: 10,
                      page: 0,
                      ...userTypeData,
                    };
                    if (del_pic_data) {
                      try {
                        await dispatch(
                          fetchProductsData(del_pic_data)
                        ).unwrap();
                        // Handle response if needed
                      } catch (error) {
                        if (
                          error.status == 401 ||
                          error.response.status === 401
                        ) {
                          getUnAutherisedTokenMessage();
                          handleCoockieExpire();
                        } else if (error.status == "Network Error") {
                          getNetworkError();
                        }
                      }
                    }
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            } catch (error) {
              if (error.status == 401 || error.response.status === 401) {
                getUnAutherisedTokenMessage();
                handleCoockieExpire();
              } else if (error.status == "Network Error") {
                getNetworkError();
              }
            }
          }
          // setSelectedEmployee("Select");
          setdel_picDropdownVisible(false);
        } else {
          console.log("No");
          setSelectedEmployee("Select");
        }

        break;
      case "status":
        setSearchId("");
        searchParams.delete("search");
        handleOptionClick([]);
        setSelectedStatus(option.id);
        setSelectedStatusValue(option.title);
        setTransactionDropdownVisible(false);
        dispatch(emptyProduct([]));
        setProductIdList([]);
        if (option !== "All") {
          changeProductPageUrl("status", option?.id);
        }
        setlistingTypesDropdownVisible(false);
        break;
      case "listingType":
        setSearchId("");
        searchParams.delete("search");
        dispatch(emptyProduct([]));
        handleOptionClick([]);
        if (option.id === 0) {
          setSelectedListingType("Product listing");
        } else if (option?.id === 1) {
          setSelectedListingType("Variant listing");
        } else {
          setSelectedListingType("Select listing");
        }
        setSelectedListingTypeValue(option);
        changeProductPageUrl("listingType", option?.id);
        setProductIdList([]);
        setlistingTypesDropdownVisible(false);
        break;
      case "image_listing":
        dispatch(emptyProduct([]));
        handleOptionClick([]);
        setProductIdList([]);
        setSearchId("");
        searchParams.delete("search");
        setProductByImages(option?.title);
        setlistingTypesDropdownVisible(false);
        changeProductPageUrl(
          "filterBy",
          option?.id === "0" ? "all" : option?.id
        );

      default:
        break;
    }
  };

  return (
    <>
      <div className="product-layout">
        <div className="q-attributes-main-page">
          <Suspense fallback={<div></div>}>
            <FilterProduct
              {...{
                handleOptionClick,
                toggleDropdown,
                selectedEmployee,
                del_picDropdownVisible,
                setdel_picDropdownVisible,
                selectedStatus,
                setTransactionDropdownVisible,
                transactionDropdownVisible,
                selectedListingType,
                setSelectedListingType,
                selectedListingTypeValue,
                listingTypesDropdownVisible,
                setlistingTypesDropdownVisible,
                handleCategoryChange,
                selectedStatusValue,
                handleSearch,
                searchId,
                handlefocus,
                setSearchId,
                productByImages,
                changeProductPageUrl,
              }}
            />
          </Suspense>
        </div>
        {userTypeData?.login_type !== "superadmin" &&
        inventory_approval === "1" ? (
          <div className="q-attributes-main-page">
            <ProductContent />
          </div>
        ) : (
          ""
        )}
        <div className="q-attributes-main-page">
          <Suspense fallback={<div></div>}>
            <ProductTable
              {...{
                selectedListingType,
                debouncedValue,
                offset,
                setoffset,
                limit,
                setlimit,
                categoryId,
                selectedListingTypeValue,
                selectedStatus,
                selectedStatusValue,
                searchId,
                setSearchId,
                handleProductUnCheck,
                handleProductCheck,
                productIdList,
                productByImages,
              }}
            />
          </Suspense>
        </div>

        <DeleteModal
          headerText="Products"
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
          }}
          onConfirm={confirmDeleteCategory}
          deleteloading={deleteloading}
        />
      </div>

      {productIdList?.length ? (
        <Grid item xs={12} sm={6} md={4} className="Sticky-multiple-delete">
          <button
            style={{ height: "40px", padding: "0px 0px" }}
            className="quic-btn quic-btn-draft  w-full"
            onClick={handleDeleteProduct}
          >
            Delete Selected Product
          </button>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
};

export default MainProducts;
