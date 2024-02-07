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
  LIST_ALL_PRODUCTS,
  PRODUCT_INVENTORY_DUPLICATE,
} from "../../Constants/Config";

const ProductDuplicateStore = () => {
  const [selectedStorefrom, setSelectedStorefrom] =
    useState("-- Select Store --");
  const [selectedStoreto, setSelectedStoreto] = useState("-- Select Store --");
  const [selectedProducts, setselectedProducts] = useState([]);

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
              BASE_URL + LIST_ALL_PRODUCTS,
              data,
              { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (response.data.status === "Success") {
              const newProductOptions = response.data.result.map(
                (product) => ({
                  value: product.id,
                  label: product.title,
                })
              );
              setStorefrom(option.merchant_id);
              setProductOptions(newProductOptions);
              setselectedProducts([]);
            } else if (
              response.data.status === "Failed" &&
              response.data.msg === "No Products found"
            ) {
              setProductOptions([
                { value: "No Products found", label: "No Products found" },
              ]);
              setselectedProducts([]);
            }
          } catch (error) {
            console.error("API Error:", error);
          }
        }
        break;
      case "storeto":
        setSelectedStoreto(option.label);
        setStoreToDropdownVisible(false);
        if (option.merchant_id !== "-- Select Store --") {
          setStoreto(option.merchant_id);
        }

        break;
      default:
        break;
    }
  };

  const handleProductChange = (selectedOptions) => {
    const MAX_OPTIONS = 5;
    if (selectedOptions.length <= MAX_OPTIONS) {
      setselectedProducts(selectedOptions);
    } else {
      alert("You can select up to 5 options.");
    }
    // setselectedProducts(selectedOptions);
  };

  const [productOptions, setProductOptions] = useState([
    { value: "Select Product", label: "Select Product" },
  ]);

  const [isSelectClicked, setIsSelectClicked] = useState(false);

  const handleSelectClick = () => {
    setIsSelectClicked(true);
  };

  const handleSelectBlur = () => {
    setIsSelectClicked(false);
  };

  // const handleCancelClick = () => {
  //   setselectedProducts([]);
  // };
  const handleCancelClick = (removedValue) => {
    const newSelectedProducts = selectedProducts.filter(
      (product) => product.value !== removedValue
    );
    setselectedProducts(newSelectedProducts);
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
  const [excludedproducts, setexcludedproducts] = useState();
  const goToTop = () => {
    setsubmitmessage();
    setexcludedproducts();
  };

  const dupplicateProductInventory = async (e) => {
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
      const productValues = selectedProducts.map(
        (product) => product.value
      );
      if (productValues.length === 0) {
        alert("Please select at least one Product");
        return;
      } else if (productValues.includes("No Products found")) {
        alert("No Products found is not a Product");
        return;
      }

      const data = {
        store_name_from: storefrom,
        store_name_to: storeto,
        product_id: productValues,
        upc_check: isUpcChecked,
      };

      try {
        const response = await axios.post(
          BASE_URL + PRODUCT_INVENTORY_DUPLICATE,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
       
        if (response.data.status == true) {
          const temp_excludedproducts = response.data.existing_products;
          const commaSeparatedString = temp_excludedproducts.join(", ");
          setexcludedproducts(commaSeparatedString);
          setsubmitmessage("Products Copied successfully ");
          setSelectedStorefrom("-- Select Store --");
          setSelectedStoreto("-- Select Store --");
          setStorefrom(null);
          setStoreto(null);
          setProductOptions([
            { value: "Select Product", label: "Select Product" },
          ]);
          setselectedProducts([]);
          setIsSelectClicked(false);
        } else if (response.data.status === "Failed") {
          setsubmitmessage("Something Went Wrong");
        }
      } catch (error) {
        // console.log('33 catch err');
        return new Error(error);
      }
    }
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
                className="form-submit-info-message"
              >
                <Collapse in={openAlert}>
                  <Alert
                    severity="info"
                   
                    sx={{ mb: 2 }}
                  >
                    The existing Attributes of the selected Store 2 Must be same as selected Store 1 Variants.
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
          </div>

          <div className="alert">
            {excludedproducts && (
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  top: "2rem",
                  marginLeft: "auto",
                }}
                className={excludedproducts ? "form-submit-info-message" : ""}
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
                    Excluded products : {excludedproducts}
                  </Alert>
                </Collapse>
              </Box>
            )}
          </div>

          <div className="q-add-categories-section-header">
            <span>
              <span>Product Duplicate</span>
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
              {/* Multiple Select Categories */}
              <div
                className={`py-4 ${isSelectClicked ? "select-clicked" : ""}`}
              >
                <label
                  className="q-details-page-label mt-2"
                  htmlFor="categoryFilter"
                >
                  Select Products
                </label>

                <Select
                  className="py-2"
                  isMulti
                  value={selectedProducts}
                  onChange={handleProductChange}
                  options={productOptions}
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
              </div>
            </div>
          </div>

          <div className="q-order-page-filter mt-6"></div>

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
              onClick={dupplicateProductInventory}
            >
              Duplicate Inventory
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDuplicateStore;
