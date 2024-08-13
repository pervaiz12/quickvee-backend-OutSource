import React, { lazy, useEffect, useState } from "react";
import { useRef } from "react";
import { CircularProgress, Grid } from "@mui/material";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";

import CategoryListDropDown from "../../CommonComponents/CategoryListDropDown";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useSelector } from "react-redux";
import CustomHeader from "../../reuseableComponents/CustomHeader";
import { Suspense } from "react";

const MassInventoryUpdateModal = lazy(
  () => import("./MassInventoryUpdateModal")
);

const FilterProduct = ({
  handleOptionClick,
  selectedEmployee,
  setdel_picDropdownVisible,
  selectedStatus,
  selectedStatusValue,
  setTransactionDropdownVisible,
  selectedListingType,
  setlistingTypesDropdownVisible,
  handleCategoryChange,
  handleSearch,
  searchId,
  productByImages,
}) => {
  const { userTypeData } = useAuthDetails();
  const { loading } = useSelector((state) => state.productsListData);
  const productStatusList = [
    {
      id: "all",
      title: "All",
    },
    {
      id: "0",
      title: "Pending",
    },
    {
      id: "1",
      title: "Approved",
    },
    {
      id: "2",
      title: "Rejected",
    },
  ];

  const listingTypeList = [
    {
      id: 0,
      title: "Product listing",
    },
    {
      id: 1,
      title: "Variant listing",
    },
  ];

  const deliveryPickupList = [
    {
      id: "1",
      title: "Enable All",
    },
    {
      id: "2",
      title: "Enable Pickup All",
    },
    {
      id: "5",
      title: "Disable Pickup All",
    },
    {
      id: "3",
      title: "Enable Delivery All",
    },
    {
      id: "6",
      title: "Disable Delivery All",
    },

    {
      id: "4",
      title: "Disable All",
    },
  ];

  const productFilterByList = [
    {
      id: "1",
      title: "All",
    },
    {
      id: "2",
      title: "Without Image",
    },
  ];

  const filterImageProducts = [
    {
      id: "1",
      title: "Show Product By Images",
    },
    {
      id: "2",
      title: "Show Product By Without Images",
    },
  ];

  const [isTablet, setIsTablet] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const prodcutstatus = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        prodcutstatus.current &&
        !prodcutstatus.current.contains(event.target)
      ) {
        setTransactionDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // listing
  const listingtype = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (listingtype.current && !listingtype.current.contains(event.target)) {
        setlistingTypesDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  //
  const delpicstatus = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (delpicstatus.current && !listingtype.current.contains(event.target)) {
        setdel_picDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Grid container className="box_shadow_input">
        <Grid item xs={12}>
          <CustomHeader>Products</CustomHeader>
          <Grid container sx={{ px: 2.5, pt: 2.5 }}>
            <Grid item xs={12}>
              <InputTextSearch
                placeholder="Search products by Name or UPC Code"
                value={searchId}
                handleChange={handleSearch}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pt: 2.5 }}>
            <Grid item className="mt-5" xs={12}>
              <h1 className="heading">Filter By</h1>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ px: 2.5, pb: 2.5 }}
            spacing={2}
            className="place-items-end"
          >
            <Grid item xs={12} sm={6} md={4}>
              <CategoryListDropDown
                type="category"
                onCategoryChange={handleCategoryChange}
                searchId={searchId}
                selectedStatus={selectedStatus}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Product Status</label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                title={"title"}
                listItem={productStatusList}
                selectedOption={selectedStatusValue}
                onClickHandler={handleOptionClick}
                dropdownFor={"status"}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Listing Type</label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                heading={"Select listing"}
                title={"title"}
                listItem={listingTypeList}
                selectedOption={selectedListingType}
                onClickHandler={handleOptionClick}
                dropdownFor={"listingType"}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label style={{ whiteSpace: "nowrap" }}>
                Enable Product for Delivery/Pickup
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                heading={"Select"}
                title={"title"}
                listItem={deliveryPickupList}
                selectedOption={selectedEmployee}
                onClickHandler={handleOptionClick}
                dropdownFor={"del_pic"}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <label style={{ whiteSpace: "nowrap" }}>Filter By Image</label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                // heading={"All"}
                title={"title"}
                listItem={productFilterByList}
                selectedOption={productByImages}
                onClickHandler={handleOptionClick}
                dropdownFor={"image_listing"}
                disabled={loading}
              />
            </Grid>

            {userTypeData?.login_type === "superadmin" ? (
              <Grid item xs={12} sm={6} md={4}>
                <button
                  style={{ height: "40px", padding: "0px 0px" }}
                  className="quic-btn quic-btn-draft attributeUpdateBTN w-full"
                  onClick={() => setShowModal(true)}
                >
                  Mass Inventory Update
                </button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
      <Suspense fallback={<div></div>}>
        <MassInventoryUpdateModal
          {...{
            showModal,
            handleClose,
          }}
        />
      </Suspense>
    </>
  );
};

export default FilterProduct;
