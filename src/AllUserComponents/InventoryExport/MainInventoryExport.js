import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import InventoryExportLogic from "./InventoryExportLogic";
import { useAuthDetails } from "../../Common/cookiesHelper";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { Grid } from "@mui/material";
import PasswordShow from "./../../Common/passwordShow";

const MainInventoryExport = () => {
  const [openAlert, setOpenAlert] = useState(true);
  const [MerchantList, setMerchantList] = useState([]);
  const MerchantListData = useSelector((state) => state.ExportInventoryData);
  const { userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  //console.log(MerchantListData);
  const goToTop = () => {
    setsubmitmessage();
  };
  const [selectedStorefrom, setSelectedStorefrom] =
    useState("-- Select Store --");

  const [storeFromDropdownVisible, setStoreFromDropdownVisible] =
    useState(false);

  const myStyles = {
    height: "300px",
    overflow: "auto",
  };

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "storefrom":
        setStoreFromDropdownVisible(!storeFromDropdownVisible);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = async (option, dropdown) => {
    switch (dropdown) {
      case "storefrom":
        if (option === "-- Select Store --") {
          setSelectedStorefrom("-- Select Store --");
          setStoreFromError("This field is required");
          return;
        }
        setSelectedStorefrom(option.title);
        setStoreFromDropdownVisible(false);

        if (option.merchant_id !== null) {
          handleStoreInput({
            target: { name: "store_name_from", value: option.merchant_id },
          });
          setStoreFromError("");
        } else {
          setStoreFromError("This field is required");
        }

        break;
      default:
        break;
    }
  };

  const {
    handleStoreInput,
    handleSubmit,
    submitmessage,
    setsubmitmessage,
    storeFromError,
    setStoreFromError,
  } = InventoryExportLogic();

  useEffect(() => {
    if (!MerchantListData.loading && MerchantListData.MerchantListData) {
      setMerchantList(MerchantListData.MerchantListData);
      // console.log(MerchantList)
    }
  }, [MerchantListData, MerchantListData.loading]);

  const dispatch = useDispatch();

  const getMerchantList = async () => {
    try {
      await dispatch(fetchMerchantsList(userTypeData)).unwrap();
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
    getMerchantList();
  }, []);

  const storefrom =
    MerchantList.length > 0
      ? MerchantList.map((merchant) => ({
          title: `${merchant.name}-${merchant.merchant_id}`,
          merchant_id: merchant.merchant_id,
        }))
      : [];

  return (
    <>
      <div className="box_shadow_div_order">
        <div className="">

          <div className="q-add-categories-section-header">
            <span>
              {" "}
              {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Inventory Export</span>
            </span>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col">

          </div>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={6} className="MainInventory">
              <label className="q-details-page-label">Select Store Name</label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                className="MainInventory-selecteDropdown"
                heading={"-- Select Store --"}
                listItem={storefrom}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectedStorefrom}
                dropdownFor={"storefrom"}
              />
            </Grid>
          </Grid>

          <span
            className="input-error "
            style={{ transform: "translate(15px, -6px)" }}
          >
            {storeFromError && (
              <span className="input-error ">{storeFromError}</span>
            )}
          </span>

          <div
            className="q-add-categories-section-middle-footer "
            style={{ justifyContent: "start" }}
          >
            <button className="save_btn" onClick={handleSubmit}>
              {" "}
              Export{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainInventoryExport;
