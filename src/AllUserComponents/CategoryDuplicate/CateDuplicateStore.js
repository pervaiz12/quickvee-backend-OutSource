import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import CrossIcons from "../../Assests/MultipleUserIcon/crossIcons.svg";
import axios from "axios";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import {
  BASE_URL,
  LIST_ALL_CATEGORIES_MECHANT_ID,
  CATEGORY_INVENTORY_DUPLICATE,
} from "../../Constants/Config";

const CateDuplicateStore = () => {
  const [selectedStorefrom, setSelectedStorefrom] =
    useState("-- Select Store --");
  const [selectedStoreto, setSelectedStoreto] = useState("-- Select Store --");
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const [storefrom, setStorefrom] = useState();
  const [storeto, setStoreto] = useState();

  const [storeFromError, setStoreFromError] = useState("");
  const [storeToError, setStoreToError] = useState("");

  const handleOptionClick = async (option, dropdown) => {
    switch (dropdown) {
      case "storefrom":
        setSelectedStorefrom(option.label);
        setStoreFromDropdownVisible(false);

        // Fetch additional data based on the selected merchant's ID
        if (option.merchant_id !== "-- Select Store --") {
          const data = {
            merchant_id: option.merchant_id,
          };
          try {
            const response = await axios.post(
              BASE_URL + LIST_ALL_CATEGORIES_MECHANT_ID,
              data,
              { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (response.data.status === "Success") {
              const newCategoryOptions = response.data.result.map(
                (category) => ({
                  value: category.title,
                  label: category.title,
                })
              );
              setStorefrom(option.merchant_id);
              setCategoryOptions(newCategoryOptions);
              setSelectedCategories([]);
            } else if (
              response.data.status === "Failed" &&
              response.data.msg === "No Categorys found"
            ) {
              setCategoryOptions([
                { value: "No categories found", label: "No categories found" },
              ]);
              setSelectedCategories([]);
            }
          } catch (error) {
            console.error("API Error:", error);
          }
        }
        if (option.label == "-- Select Store --") {
          setStoreFromError("This field is required");
        } else {
          setStoreFromError("");
        }
        break;
      case "storeto":
        setSelectedStoreto(option.label);
        setStoreToDropdownVisible(false);
        if (option.merchant_id !== "-- Select Store --") {
          setStoreto(option.merchant_id);
        }

        if (option.label == "-- Select Store --") {
          setStoreToError("This field is required");
        } else {
          setStoreToError("");
        }

        break;
      default:
        break;
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const [categoryOptions, setCategoryOptions] = useState([
    { value: "Select Category", label: "Select Category" },
  ]);

  const [isSelectClicked, setIsSelectClicked] = useState(false);

  const handleSelectClick = () => {
    setIsSelectClicked(true);
  };

  const handleSelectBlur = () => {
    setIsSelectClicked(false);
  };

  // const handleCancelClick = () => {
  //   setSelectedCategories([]);
  // };
  const handleCancelClick = (removedValue) => {
    const newSelectedCategories = selectedCategories.filter(
      (category) => category.value !== removedValue
    );
    setSelectedCategories(newSelectedCategories);
  };

  // for fetch mearcahnt list start
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

  const myStyles = {
    height: "300px",
    overflow: "auto",
  };

  const [openAlert, setOpenAlert] = useState(true);
  const [submitmessage, setsubmitmessage] = useState();
  const goToTop = () => {
    setsubmitmessage();
  };

  const dupplicateCategoryInventory = async (e) => {
    e.preventDefault();

    if (selectedStorefrom === "-- Select Store --") {
      alert("Please select Store From");
    } else if (selectedStoreto === "-- Select Store --") {
      alert("Please select Store To");
    } else if (selectedStorefrom === selectedStoreto) {
      alert("Both the selected store are same.");
    } else {
      const upcCheckbox = document.getElementById("upc_check");

      // Check if the checkbox is present and get its value
      const isUpcChecked = upcCheckbox ? upcCheckbox.checked : false;
      const categoryValues = selectedCategories.map(
        (category) => category.value
      );
      if (categoryValues.length === 0) {
        alert("Please select at least one category");
        return;
      } else if (categoryValues.includes("No categories found")) {
        alert("No categories found is not a Category");
        return;
      }

      const data = {
        store_name_from: storefrom,
        store_name_to: storeto,
        category_name: categoryValues,
        upc_check: isUpcChecked,
      };

      try {
        const response = await axios.post(
          BASE_URL + CATEGORY_INVENTORY_DUPLICATE,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.status === "Success") {
          setsubmitmessage(response.data.msg);
          setSelectedStorefrom("-- Select Store --");
          setSelectedStoreto("-- Select Store --");
          setStorefrom(null);
          setStoreto(null);
          setCategoryOptions([
            { value: "Select Category", label: "Select Category" },
          ]);
          setSelectedCategories([]);
          setIsSelectClicked(false);
        } else if (response.data.status === "Failed") {
          setsubmitmessage(response.data.msg);
        }
      } catch (error) {
        // console.log('33 catch err');
        return new Error(error);
      }
    }
  };
  const goToClose = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <div className="q-order-main-page">
        <div className="q-add-categories-section">
          <div className="alert">
            <Box
              sx={{
                width: "100%",
                position: "relative",
                top: "2rem",
                marginLeft: "auto",
              }}
            >
              <Collapse in={openAlert}>
                <Alert
                  severity="info"
                  sx={{ mb: 2 }}
                >
                  The existing Variants of the selected Store 2 Must be same as
                  selected Store 1 Variants.
                </Alert>
              </Collapse>
            </Box>
          </div>
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
              <span>Category Duplicate</span>
            </span>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col">
            {/* StoreFrom Dropdown */}
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
              {/* Multiple Select Categories */}
              <div
                className={`py-4 ${isSelectClicked ? "select-clicked" : ""}`}
              >
                <label
                  className="q-details-page-label mt-2"
                  htmlFor="categoryFilter"
                >
                  Select Categories
                </label>

                <Select
                  className="py-2"
                  isMulti
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  options={categoryOptions}
                  isCreatable={true}
                  onClick={handleSelectClick}
                  onBlur={handleSelectBlur}
                  components={{
                    MultiValue: ({ data, innerProps }) => (
                      <div
                        className="css-wsp0cs-MultiValueGeneric"
                        {...innerProps}
                      >
                        {data.label}
                        <button
                          type="button"
                          className="cancel-button "
                          onClick={() => handleCancelClick(data.value)}
                        >
                          <img
                            src={CrossIcons}
                            alt=""
                            className="w-4 h-4 ml-6 pt-1"
                          />
                        </button>
                      </div>
                    ),
                    IndicatorsContainer: ({ children }) => (
                      <div className="css-1xc3v61-indicatorContainer">
                        {children}
                      </div>
                    ),
                    Control: ({ children, innerProps }) => (
                      <div
                        className={`css-13cymwt-control ${
                          isSelectClicked ? "select-clicked" : ""
                        }`}
                        {...innerProps}
                      >
                        {children}
                      </div>
                    ),
                  }}
                />
              </div>

              <div className="">
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
                <span className="input-error ">
                  {storeToError && (
                    <span className="input-error ">{storeToError}</span>
                  )}
                </span>
              </div>
            </div>
          </div>


          <div className="q-add-inventory-section-header mx-2">
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
                Want to Replicate UPC's for inventory
                <input type="checkbox" id="upc_check" name="upc_check" />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
          </div>

          <div
            className="q-add-categories-section-middle-footer "
            style={{ justifyContent: "start" }}
          >
            <button
              className="quic-btn quic-btn-save"
              onClick={dupplicateCategoryInventory}
            >
              Duplicate Inventory
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CateDuplicateStore;
