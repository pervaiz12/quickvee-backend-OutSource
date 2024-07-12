import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownIcon from "../../Assests/Dashboard/Down.svg";
// import {fetchMerchantsList} from "../../Redux/features/ExportInventory/ExportInventorySlice";
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
          {/* <div className="alert">
              {submitmessage && (
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    top: "2rem",
                    marginLeft: "auto",
                  }}
                  className={submitmessage ? "form-submit-info-message" : ""}
                >
                  <Collapse in={openAlert}>
                    <Alert
                      severity="info"
                      action={
                        <IconButton
                          className="info-close-icon"
                          aria-label="close"
                          color="info"
                          size="small"
                          onClick={goToTop}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      {submitmessage}
                    </Alert>
                  </Collapse>
                </Box>
              )}
            </div> */}
          <div className="q-add-categories-section-header">
            <span>
              {" "}
              {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Inventory Export</span>
            </span>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col">
            {/* <div className="col-qv-6 mt-6">
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter"
                >
                  Select Store Name
                </label>
                <div className="custom-dropdown">
                  <div
                    className="custom-dropdown-header"
                    onClick={() => toggleDropdown("storefrom")}
                  >
                    <span className="selected-option mt-1">
                      {selectedStorefrom}
                    </span>
                    <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                  </div>
                  {storeFromDropdownVisible && (
                    <div className="dropdown-content" style={myStyles}>
                      <div
                        onClick={() =>
                          handleOptionClick(
                            { label: "-- Select Store --", merchant_id: null },
                            "storefrom"
                          )
                        }
                      >
                        -- Select Store --
                      </div>
                      {MerchantList?.length &&
                        MerchantList?.map((merchant) => (
                          <div
                            key={merchant.id}
                            onClick={() =>
                              handleOptionClick(
                                {
                                  label:
                                    merchant.name + "-" + merchant.merchant_id,
                                  merchant_id: merchant.merchant_id,
                                },
                                "storefrom"
                              )
                            }
                          >
                            {merchant.name}-{merchant.merchant_id}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <span className="input-error ">
                  {storeFromError && (
                    <span className="input-error ">{storeFromError}</span>
                  )}
                </span>
              </div> */}
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
