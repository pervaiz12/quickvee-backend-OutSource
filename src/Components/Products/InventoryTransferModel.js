import { CircularProgress, Grid, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { Box, styled } from "@mui/system";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CurrencyInputHelperFun from "../../helperFunctions/CurrencyInputHelperFun";
import Select from "react-select";
import { useAuthDetails } from "../../Common/cookiesHelper";
import axios from "axios";
import { BASE_URL, TRANSFER_INVENTORY } from "../../Constants/Config";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: CircularSTDBook !important;
    font-weight: 400;

    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    &:hover {
      border-color: black;
    }
    &:focus {
      border-color: black;
    }
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

export default function InventoryTransferModel({
  productData,
  varientData,
  varientName,
  handleCloseEditModal,
  fetchProductDataById,
  varientIndex,
}) {
  const inventoryTransferData = {
    quantity:
      varientData.length > 0
        ? varientData.find((varient) => varient.variant === varientName)
            .quantity
        : productData.quantity,
    price:
      varientData.length > 0
        ? varientData.find((varient) => varient.variant === varientName)
            .costperItem
        : productData.costperItem,
    description: "Inventory Transfer",
    tostore: "",
  };
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;

  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const [inventoryTransferState, setInventoryTransferState] = useState(
    inventoryTransferData
  );

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && !/^\d*$/.test(value)) {
      return;
    }
    setInventoryTransferState((prevState) => ({
      ...prevState,
      [name]: name === "price" ? CurrencyInputHelperFun(value) : value,
    }));

    validateField(name, value);
  };
  const handleOptionClick = (value) => {
    if (!value || !value.merchant_id) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tostore: "Please select a valid store",
      }));
      return;
    }
    setInventoryTransferState((prevState) => ({
      ...prevState,
      tostore: value.merchant_id,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      tostore: "",
    }));
  };
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "quantity":
        if (!value) {
          errorMsg = "Quantity is required";
        } else if (isNaN(value) || parseInt(value) <= 0) {
          errorMsg = "Quantity must be a positive number";
        } else if (
          isNaN(value) ||
          parseInt(value) >
            parseInt(
              varientData.length > 0
                ? varientData.find((varient) => varient.variant === varientName)
                    .quantity
                : productData.quantity
            )
        ) {
          errorMsg = `Maximun Transfer Quantity is ${parseInt(
            varientData.length > 0
              ? varientData.find((varient) => varient.variant === varientName)
                  .quantity
              : productData.quantity
          )}`;
        }
        break;
      // case "price":
      //   if (!value) {
      //     errorMsg = "Price is required";
      //   } else if (isNaN(value) || parseFloat(value) <= 0) {
      //     errorMsg = "Price must be a positive number";
      //   }
      //   break;
      case "tostore":
        if (!value) {
          errorMsg = "Store selection is required";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };
  const [msgAPI, setmsgAPi] = useState("");

  const handleSubmit = async () => {
    const validationErrors = {};

    // Run validation for all fields
    for (const field in inventoryTransferState) {
      validateField(field, inventoryTransferState[field]);
    }

    // Check if there are any errors
    for (const field in errors) {
      if (errors[field]) {
        validationErrors[field] = errors[field];
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      const data = {
        ...inventoryTransferState,
        fromstore: merchant_id,
        product_name: productData.title,
        variant_name: varientName,
        upc:
          varientData.length > 0
            ? varientData?.find((varient) => varient?.id === varientIndex)
                ?.upc || "" : productData.upc || "",
        merchant_id,
        ...userTypeData,
      };
      try {
        setLoading(true);
        const response = await axios.post(BASE_URL + TRANSFER_INVENTORY, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userTypeData?.token}`,
          },
        });
        if (response.data.status === true) {
          ToastifyAlert("Updated Successfully", "success");
          setmsgAPi("");
          await fetchProductDataById();
          handleCloseEditModal();
        } else if (
          response.data.status === false &&
          response.data.message === "Product not found in selected Store "
        ) {
          setmsgAPi("Product not found in the selected store.");
          // ToastifyAlert(response.data.message, "error");
        }
      } catch (error) {
        console.error("Error during submission:", error);
        setmsgAPi("");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation errors", validationErrors);
      setErrors(validationErrors);
    }
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      position: "absolute",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
      height: "200px",
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
      height: 40,
      minHeight: 40,
      marginTop: "5px",
      "&:hover": {
        borderColor: "black" ? "black" : provided["&:hover"].borderColor,
      },
    }),
    input: (provided) => ({
      ...provided,
      "&:focus": {
        borderColor: "black",
        outline: "none",
      },
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px", // Ensure the inner list also has a max-height
    }),
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container sx={{ px: 2.5, pt: 2.5 }}>
            <Grid item xs={12}>
              <p className="heading">
                {productData.title} {varientName ? `- ${varientName}` : ""}{" "}
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pt: 1 }}>
            <Grid item xs={4} className="varient-input-wrapper">
              <label style={{ marginBottom: "20px" }}>Select Store</label>
              <Select
                options={JSON.parse(localStorage.getItem("AllStore"))
                  ?.filter((item) => item.merchant_id !== merchant_id)
                  .map((item) => ({
                    value: item.id,
                    label: item.name,
                    merchant_id: item.merchant_id,
                  }))}
                onChange={handleOptionClick}
                placeholder="Search..."
                styles={customStyles}
              />
              {errors.tostore && (
                <p style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.tostore}
                </p>
              )}
            </Grid>
            <Grid item xs={4} className="varient-input-wrapper">
              <label>Transfer Quantity</label>
              <BasicTextFields
                name="quantity"
                value={inventoryTransferState.quantity}
                onChangeFun={onChangeHandler}
                maxLength={6}
                sx={{ pt: 0.5 }}
              />
              {errors.quantity && (
                <p style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.quantity}
                </p>
              )}
            </Grid>
            <Grid item xs={4} className="varient-input-wrapper">
              <label>Cost Per Item</label>
              <BasicTextFields
                name="price"
                value={inventoryTransferState.price}
                onChangeFun={onChangeHandler}
                maxLength={8}
                sx={{ pt: 0.5 }}
              />
              {errors.price && (
                <p style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.price}
                </p>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{ px: 3, py: 2.5 }}>
            <Grid item xs={12}>
              <Textarea
                name="description"
                onChange={onChangeHandler}
                value={inventoryTransferState.description}
                minRows={5}
                placeholder="Description..."
              />
              {msgAPI && <p className="error-message">{msgAPI}</p>}
            </Grid>
          </Grid>
          <Grid container sx={{ px: 3 }}>
            <Grid item xs={12}>
              <div className="box">
                <div className="variant-attributes-container">
                  <div
                    style={{ paddingRight: 0 }}
                    className="q-add-categories-section-middle-footer  "
                  >
                    <div
                      style={{ padding: "0px" }}
                      className="q-category-bottom-header"
                    >
                      <button
                        className="quic-btn quic-btn-update submit-btn-click"
                        style={{
                          backgroundColor: "#0A64F9",
                        }}
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <Box className="loader-box">
                            <CircularProgress />
                          </Box>
                        ) : (
                          ""
                        )}
                        Update
                      </button>
                      <button
                        className="quic-btn quic-btn-cancle"
                        onClick={handleCloseEditModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
