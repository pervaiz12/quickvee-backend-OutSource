import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import ReCAPTCHA from "./ReCAPTCHA";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import InventoryExportLogic from "./InventoryDuplicatLogic";

const StoreCateUser = () => {
  const [openAlert, setOpenAlert] = useState(true);

  const goToTop = () => {
    setsubmitmessage();
  };
  const {
    handleStoreInput,
    dupplicateInventory,
    dupplicateSettings,
    submitmessage,
    setsubmitmessage,
    values,
  } = InventoryExportLogic();

  const [MerchantList, setMerchantList] = useState();
  const MerchantListData = useSelector((state) => state.ExportInventoryData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!MerchantListData.loading && MerchantListData.MerchantListData) {
      setMerchantList(MerchantListData.MerchantListData);
    }
  }, [MerchantListData, MerchantListData.loading]);

  useEffect(() => {
    dispatch(fetchMerchantsList());
  }, []);

  // for change dropdown start
  const myStyles = {
    height: "300px",
    overflow: "auto",
  };
  const [selectedStorefrom, setSelectedStorefrom] =
    useState("-- Select Store --");
  const [selectedStoreto, setSelectedStoreto] = useState("-- Select Store --");
  const [storeFromDropdownVisible, setStoreFromDropdownVisible] =
    useState(false);
  const [storeToDropdownVisible, setStoreToDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "storefrom":
        setStoreFromDropdownVisible(!storeFromDropdownVisible);
        break;
      case "storeto":
        setStoreToDropdownVisible(!storeToDropdownVisible);
        break;
      default:
        break;
    }
  };

  const [storeFromError, setStoreFromError] = useState("");
  const [storeToError, setStoreToError] = useState("");

  const handleOptionClick = async (option, dropdown) => {
    switch (dropdown) {
      case "storefrom":
        setSelectedStorefrom(option.label);
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
        case "storeto":
          setSelectedStoreto(option.label);
          setStoreToDropdownVisible(false);
          if (option.merchant_id !== null) {
            handleStoreInput({
              target: { name: "store_name_to", value: option.merchant_id },
            });
            setStoreToError("");
          } else {
            setStoreToError("This field is required");
        }
        break;
      default:
        break;
    }
  };

  const dupplicateInventoryHandler = (e) => {

    if (selectedStorefrom === "-- Select Store --") {
      alert("Please select Store From");
    } else if (selectedStoreto === "-- Select Store --") {
      alert("Please select Store To");
    } else{
      dupplicateInventory(e);
      setSelectedStorefrom("-- Select Store --");
      setSelectedStoreto("-- Select Store --");

    }
  };
  
  const dupplicateSettingsHandler = (e) => {
    if (selectedStorefrom === "-- Select Store --") {
      alert("Please select Store From");
    } else if (selectedStoreto === "-- Select Store --") {
      alert("Please select Store To");
    } else{
      dupplicateSettings(e);
      setSelectedStorefrom("-- Select Store --");
      setSelectedStoreto("-- Select Store --");
    }
  };

  // for change dropdown End

  return (
    <>
      <div className="q-order-main-page">
        <div className="q-add-categories-section">
          <div className="alert">
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
                    severity="success"
                    action={
                      <IconButton
                        className="info-close-icon"
                        aria-label="close"
                        color="success"
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
          </div>
          <div className="q-add-categories-section-header">
            <span>
              {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Inventory Duplicate</span>
            </span>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col">
            {/* Employee Dropdown */}

            <div className="col-qv-6 mt-6">
              <label className="q-details-page-label" htmlFor="storefromFilter">
                Copy from this store
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
                    {MerchantList &&
                      MerchantList.map((merchant) => (
                        <div
                          key={merchant.id}
                          onClick={() =>
                            handleOptionClick(
                              {
                                label: merchant.name,
                                merchant_id: merchant.merchant_id,
                              },
                              "storefrom"
                            )
                          }
                        >
                          {merchant.name}
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
            </div>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col">
            <div className="col-qv-6">
              <div className="input_area">
                <label className="q-details-page-label" htmlFor="storetoFilter">
                  Paste to this store
                </label>
                <div className="custom-dropdown">
                  <div
                    className="custom-dropdown-header"
                    onClick={() => toggleDropdown("storeto")}
                  >
                    <span className="selected-option mt-1">
                      {selectedStoreto}
                    </span>
                    <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                  </div>
                  {storeToDropdownVisible && (
                    <div className="dropdown-content" style={myStyles}>
                      <div
                        onClick={() =>
                          handleOptionClick(
                            { label: "-- Select Store --", merchant_id: null },
                            "storeto"
                          )
                        }
                      >
                        -- Select Store --
                      </div>
                      {MerchantList &&
                        MerchantList.map((merchant) => (
                          <div
                            key={merchant.id}
                            onClick={() =>
                              handleOptionClick(
                                {
                                  label: merchant.name,
                                  merchant_id: merchant.merchant_id,
                                },
                                "storeto"
                              )
                            }
                          >
                            {merchant.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <span className="input-error">
                {storeToError && (
                  <span className="input-error">{storeToError}</span>
                )}
              </span>
              </div>
            </div>
          </div>

          <div className="q-add-inventory-section-header mx-2">
            <div class="qv_checkbox">
              <label class="qv_checkbox_add_checkmark_label">
                Want to Replicated UPC's for inventory
                <input
                  type="checkbox"
                  id="upc_check"
                  name="upc_check"
                  value={values.upc_check}
                  onChange={handleStoreInput}
                />
                <span class="qv_add_checkmark"></span>
              </label>
              <span className="input-error">
                {values.errors.upc_check !== "" ? values.errors.upc_check : ""}
              </span>
            </div>
          </div>

          <div
            className="q-add-categories-section-middle-footer "
            style={{ justifyContent: "start" }}
          >
            <button
              className="quic-btn quic-btn-save"
              // onClick={dupplicateInventory}
              onClick={(e) => dupplicateInventoryHandler(e)}
            >
              Duplicate Inventory
            </button>
            <button
              className="quic-btn quic-btn-cancle"
              // onClick={dupplicateSettings}
              onClick={(e) => dupplicateSettingsHandler(e)}
            >
              Duplicate setting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreCateUser;
