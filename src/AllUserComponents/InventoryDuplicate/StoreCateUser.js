import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Collapse, Alert, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import ReCAPTCHA from "./ReCAPTCHA";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import InventoryExportLogic from "./InventoryDuplicatLogic";
import { useAuthDetails } from "../../Common/cookiesHelper";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import AlertModal from "../../reuseableComponents/AlertModal";

const StoreCateUser = () => {
  const [openAlert, setOpenAlert] = useState(true);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

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

  const { userTypeData } = useAuthDetails();

  const [MerchantList, setMerchantList] = useState();
  const MerchantListData = useSelector((state) => state.ExportInventoryData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!MerchantListData.loading && MerchantListData.MerchantListData) {
      setMerchantList(MerchantListData.MerchantListData);
    }
  }, [MerchantListData, MerchantListData.loading]);

  useEffect(() => {
    dispatch(fetchMerchantsList(userTypeData));
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

  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  // const handleOptionClick = async (option, dropdown) => {
  const handleOptionClick = async (value, dropdown) => {
    switch (dropdown) {
      case "copyFrom":
        setSelectedStorefrom(value?.title ? value?.title : value);
        setStoreFromDropdownVisible(false);
        if (value?.id !== null) {
          handleStoreInput({
            target: { name: "store_name_from", value: value?.id },
          });
          setStoreFromError("");
        } else {
          setStoreFromError("This field is required");
        }
        break;
      case "copyTo":
        setSelectedStoreto(value?.title ? value?.title : value);
        setStoreToDropdownVisible(false);
        if (value?.id !== null) {
          handleStoreInput({
            target: { name: "store_name_to", value: value?.id },
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
      //showModal("Please select Store From");
    } else if (selectedStoreto === "-- Select Store --") {
      alert("Please select Store To");
      //showModal("Please select Store To");
    } else {
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
    } else {
      dupplicateSettings(e);
      setSelectedStorefrom("-- Select Store --");
      setSelectedStoreto("-- Select Store --");
    }
  };

  // for change dropdown End

  return (
    <>
      <div className="q-order-main-page">
        <div className=" box_shadow_div_order ">
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
          </div> */}
          <div className="q-add-categories-section-header">
            <span>
              {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Inventory Duplicate</span>
            </span>
          </div>

          <div className="q-order-page-container mx-6 mt-6 md:flex-col d-flex">
            {/* Employee Dropdown */}
            <Grid container spacing={4} className="">
              <Grid item xs={6} sm={12} md={6}>
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter"
                >
                  Copy from this store
                </label>
                <SelectDropDown
                  listItem={
                    MerchantList?.length &&
                    MerchantList?.map((item) => ({
                      title: item?.name,
                      id: item?.merchant_id,
                    }))
                  }
                  heading={"-- Select Store --"}
                  title={"title"}
                  selectedOption={selectedStorefrom}
                  onClickHandler={handleOptionClick}
                  dropdownFor={"copyFrom"}
                  // onClickHandler={(handleOptionClick, "copyFrom")}
                  name="permission"
                />
              </Grid>

              <Grid item xs={6} sm={12} md={6}>
                <label className="q-details-page-label" htmlFor="storetoFilter">
                  Paste to this store
                </label>
                <SelectDropDown
                  listItem={
                    MerchantList?.length &&
                    MerchantList?.map((item) => ({
                      title: item?.name,
                      id: item?.merchant_id,
                    }))
                  }
                  heading={"-- Select Store --"}
                  title={"title"}
                  selectedOption={selectedStoreto}
                  onClickHandler={handleOptionClick}
                  dropdownFor={"copyTo"}
                  name="permission"
                />
              </Grid>
            </Grid>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col d-inline-block"></div>

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
      <AlertModal
      headerText={alertModalHeaderText}
      open={alertModalOpen}
      onClose={() => {setAlertModalOpen(false)}}
       />
    </>
  );
};

export default StoreCateUser;
