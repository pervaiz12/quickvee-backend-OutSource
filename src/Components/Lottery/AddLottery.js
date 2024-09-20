import { Checkbox, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SwitchToBackButton from "../../reuseableComponents/SwitchToBackButton";
import LotteryForm from "./LotteryForm";
import LotteryCategory from "./LotteryCategory";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { useLocation, useNavigate } from "react-router-dom";

const characters = "0123456789";
function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default function AddLottery() {
  const navigate = useNavigate();
  const location = useLocation();
  const { EditProductData } = location.state || {};
  console.log("EditProductData", EditProductData);
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    quantity: "",
    collection: [],
    upc: "",
    trackqnty: "1",
    is_lottery: "1",
  });
  console.log("formValues", formValues);
  const [loader, setLoader] = useState(false);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (EditProductData) {
      setFormValues({
        ...EditProductData,
        collection: EditProductData.collection || [],
      });
    }
  }, [EditProductData]);

  const handleGenerateUPC = () => {
    setFormValues((prevState) => ({
      ...prevState,
      upc: generateString(20),
    }));
    setFormError((prevState) => ({
      ...prevState,
      upc: null,
    }));
  };
  const handleInputUPC = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      upc: event.target.value,
    }));
  };

  function handleInputChanges(event) {
    const { name, value, type, checked } = event.target;
    console.log(checked);
    setFormValues((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked === true ? "1" : "0") : value,
    }));
    setFormError((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (
        name === "title" ||
        name === "price" ||
        name === "quantity" ||
        name === "upc"
      ) {
        delete newErrors[name];
      }
      return newErrors;
    });
  }

  function validateForm() {
    const errors = {};

    // Check if product name is provided
    if (!formValues.title) {
      errors.title = "Product name is required";
    }

    // Check if price is provided and is a valid number
    if (!formValues.price || isNaN(formValues.price) || formValues.price <= 0) {
      errors.price = "A valid price is required";
    }

    // Check if quantity is a valid number
    if (
      !formValues.quantity ||
      isNaN(formValues.quantity) ||
      formValues.quantity <= 0
    ) {
      errors.quantity = "A valid quantity is required";
    }

    // Check if a collection is selected
    if (!formValues.collection.length) {
      errors.collection = "At least one collection is required";
    }
    if (!formValues.upc) {
      errors.upc = "upc is required";
    }

    return errors;
  }

  async function handleSubmit() {
    // Validate the form
    const validationErrors = validateForm();
    console.log("formValues: 1", formValues);
    // If there are validation errors, update the error state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setFormError(validationErrors);
      setLoader(false);
      return;
    }
    // Proceed with form submission logic, e.g., API call
    try {
      setLoader(true);
      const { collection: categoryList, ...data1 } = formValues;
      const category1 = categoryList.map((i) => i.id).toString();
      // dummy values not part of lottery
      const dummyValues = {
        costperItem: "",
        description: "",
        is_tobacco: "",
        compare_price: "",
        margin: "",
        profit: "",
        tags: "",
        brand: "",
        ischargeTax: "",
        sku: "",
        isstockcontinue: "",
        category: "",
        isvarient: "",
        mediaimg: "",
        food_stampable: "",
        product_doc: "",
        show_status: "",
        created_on: "",
        admin_id: "",
        env: "",
        custom_code: "",
        reorder_qty: "",
        reorder_level: "",
        reorder_cost: "",
        disable: "",
      };
      const data = {
        ...data1,
        collection: category1,
        ...userTypeData,
        ...dummyValues,
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      };
      const formdata = new FormData();
      for (let i in data) {
        formdata.append(i, data[i]);
      }

      const response = await dispatch(addProduct(formdata)).unwrap();
      console.log("response: ", response);
      if (response.data.status === true) {
        ToastifyAlert(response.data.message, "success");
        navigate(-1);
      } else {
        ToastifyAlert(response.data.update_message, "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoader(false);
  }

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <SwitchToBackButton title={"Add New Lottery"} linkTo={-1} />
            </Grid>
            <Grid item xs={12} sx={{ p: 2.5 }}>
              <LotteryForm
                formError={formError}
                formValues={formValues}
                handleInputChanges={handleInputChanges}
              />
            </Grid>
            <Grid item xs={12} sx={{ px: 2.5, pb: 2.5 }}>
              <LotteryCategory
                formError={formError}
                setFormError={setFormError}
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                formValues={formValues}
                setFormValues={setFormValues}
              />
            </Grid>
            <Grid
              item
              xs={12}
              className="flex items-center gap-2"
              sx={{ px: 2.5, pb: 2.5 }}
            >
              <Checkbox
                name="trackqnty"
                checked={formValues.trackqnty === "1" ? true : false}
                onChange={handleInputChanges}
                sx={{
                  color: "grey",
                  "&.Mui-checked": {
                    color: "#1ec26b",
                  },
                  width: "20px",
                }}
              />
              <p style={{ marginBottom: 0 }} className="heading">
                Track Quantity
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              className="flex items-center gap-2"
              sx={{ px: 2.5, pb: 2.5 }}
            >
              <Grid container direction={"row"}>
                <Grid item xs sx={{ mr: 2 }}>
                  <BasicTextFields
                    sx={{ mt: 0.5 }}
                    type={""}
                    name="upc"
                    value={formValues.upc}
                    placeholder="Lottery Name"
                    onChangeFun={handleInputChanges}
                  />
                  {formError.upc && (
                    <span className="error">{formError.upc}</span>
                  )}
                </Grid>
                <Grid item>
                  <button
                    onClick={handleGenerateUPC}
                    className="quic-btn quic-btn-save attributeUpdateBTN"
                  >
                    Generate UPC
                  </button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ pt: 2.5 }}>
              <div className="q-add-categories-section-middle-footer">
                <button
                  className="quic-btn quic-btn-save attributeUpdateBTN"
                  onClick={handleSubmit}
                  disabled={loader}
                >
                  {loader ? (
                    <>
                      <CircularProgress
                        color={"inherit"}
                        className="loaderIcon"
                        width={15}
                        size={15}
                      />{" "}
                      Submit
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
