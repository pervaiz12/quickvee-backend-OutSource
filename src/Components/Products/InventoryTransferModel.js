import { Grid, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { styled } from "@mui/system";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import CurrencyInputHelperFun from "../../helperFunctions/CurrencyInputHelperFun";
import Select from "react-select";
import { useAuthDetails } from "../../Common/cookiesHelper";
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
const inventoryTransferData = {
  tostore: "",
  quantity: "",
  price: "",
  description: "",
};
export default function InventoryTransferModel({ productData, varientData,varientName }) {
  console.log("productData", productData);
  console.log("productData", varientData);
  console.log("productData varientName", varientName);
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;

  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const [inventoryTransferState, setInventoryTransferState] = useState(
    inventoryTransferData
  );
  const [errors, setErrors] = useState({});
  console.log("inventoryTransferState", inventoryTransferState);
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
          parseInt(value) > parseInt(productData.quantity)
        ) {
          errorMsg = "Quantity not greater than current quantity";
        }
        break;
      case "price":
        if (!value) {
          errorMsg = "Price is required";
        } else if (isNaN(value) || parseFloat(value) <= 0) {
          errorMsg = "Price must be a positive number";
        }
        break;
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
  const handleSubmit = () => {
    const validationErrors = {};

    for (const field in inventoryTransferState) {
      validateField(field, inventoryTransferState[field]);
      if (errors[field]) {
        validationErrors[field] = errors[field];
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      const data ={
        product_name:productData.title,
        fromstore:merchant_id,
      }
      console.log("Form submitted", inventoryTransferState);
    } else {
      console.log("Validation errors", validationErrors);
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
              <p className="heading">{`${productData.title} ${varientName}` } </p>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pt: 1 }}>
            <Grid item xs={4} className="varient-input-wrapper">
              <label>Select Store</label>
              <Select
                options={JSON.parse(localStorage.getItem("AllStore"))
                  ?.filter((item) => item.merchant_id !== merchant_id)
                  .map((item) => ({
                    value: item.id,
                    label: item.name,
                    merchant_id: item.merchant_id,
                  }))}
                onChange={handleOptionClick}
                styles={customStyles}
              />
              {errors.tostore && (
                <p style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.tostore}
                </p>
              )}
            </Grid>
            <Grid item xs={4} className="varient-input-wrapper">
              <label>Enter Quantity</label>
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
              <label>Enter Price</label>
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
            </Grid>
          </Grid>
          <Grid container sx={{ px: 3 }}>
            <Grid item xs={12}>
              <div className="box">
                <div className="variant-attributes-container">
                  <div className="q-add-categories-section-middle-footer  ">
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
                        //   disabled={loading}
                      >
                        {/* {loading ? (
                    <Box className="loader-box">
                      <CircularProgress />
                    </Box>
                  ) : (
                    ""
                  )} */}
                        Update
                      </button>
                      <button
                        className="quic-btn quic-btn-cancle"
                        //   onClick={handleCloseEditModal}
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
