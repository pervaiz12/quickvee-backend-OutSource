import { Checkbox, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SwitchToBackButton from "../../reuseableComponents/SwitchToBackButton";
import LotteryForm from "./LotteryForm";
import LotteryCategory from "./LotteryCategory";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { useDispatch } from "react-redux";
import {
  addProduct,
  checkProductTitle,
  checkUpcCodeSingle,
  editProductData,
  fetchProductsDataById,
} from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PasswordShow from "../../Common/passwordShow";
import CurrencyInputHelperFun from "../../helperFunctions/CurrencyInputHelperFun";
import { checkUniqueUpcCode } from "./checkUniqueUpcCode";
import { CheckUniqueProductTitle } from "./CheckUniqueProductTitle";

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
  const path = location.pathname;
  const pathSegments = path.split("/");
  const action = pathSegments[3];

  const { id } = useParams();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [fetchDataLoading, setFetchDataLoading] = useState(false);
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const [formValues, setFormValues] = useState({
    title: "",
    price: "",
    quantity: "",
    collection: [],
    upc: "",
    trackqnty: "1",
    is_lottery: "1",
  });
  const [existedTitleAndUpc, setExistedTitleAndUpc] = useState({
    title: "",
    upc: "",
  });

  let titleTimeoutId;

  const fetchProductDataById = async () => {
    setFetchDataLoading(true);
    const formData = new FormData();
    formData.append(
      "merchant_id",
      LoginGetDashBoardRecordJson?.data?.merchant_id
    );
    formData.append("id", id);
    formData.append("login_type", userTypeData?.login_type);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("token", userTypeData?.token);

    if (!!id) {
      try {
        const res = await dispatch(fetchProductsDataById(formData)).unwrap();
        if (res?.message === "Success") {
          // setProductData(res?.data?.productdata);
          setFormValues({
            title: res?.data?.productdata.title,
            price: res?.data?.productdata.price,
            quantity: res?.data?.productdata.quantity,
            collection: [],
            upc: res?.data?.productdata.upc,
            trackqnty: res?.data?.productdata?.trackqnty,
            is_lottery: "1",
            productid: res?.data?.productdata?.id,
          });
          setExistedTitleAndUpc({
            title: res?.data?.productdata?.title,
            upc: res?.data?.productdata?.upc,
          });
          setCollectionForEditProductData(
            res?.data?.productdata?.cotegory.split(",") || []
          );
        }
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      } finally {
        setFetchDataLoading(false);
      }
    }
  };

  const [loader, setLoader] = useState(false);
  const [formError, setFormError] = useState({});
  const [collectionForEditProductData, setCollectionForEditProductData] =
    useState([]);

  useEffect(() => {
    fetchProductDataById();
  }, [location]);

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

  async function handleInputChanges(event) {
    const { name, value, type, checked } = event.target;

    if (name === "title") {
      if (action !== "update-lottery" || existedTitleAndUpc?.title !== value) {
        CheckUniqueProductTitle(
          value,
          formValues,
          LoginGetDashBoardRecordJson,
          userTypeData,
          titleTimeoutId,
          dispatch,
          setFormError,
          checkProductTitle,
          setLoader
        );
      }
    }

    if (name === "upc") {
      if (action !== "update-lottery" || existedTitleAndUpc?.upc !== value) {
        checkUniqueUpcCode(
          value,
          name,
          LoginGetDashBoardRecordJson,
          action,
          id,
          userTypeData,
          titleTimeoutId,
          dispatch,
          checkUpcCodeSingle,
          setFormError,
          setLoader
          
        );
      }
    }
    const formattedValue =
      name === "price"
        ? CurrencyInputHelperFun(value)
        : name === "quantity"
          ? value.replace(/[^\d]/g, "")
          : value;

    setFormValues((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? (checked === true ? "1" : "0") : formattedValue,
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
    if (formError.title === "title already exists") {
      errors.title = "title already exists";
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
    if (formError.upc === "upc already exists") {
      errors.upc = "upc already exists";
    }

    return errors;
  }

  async function handleSubmit() {
    // Validate the form
    const validationErrors = validateForm();
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

      const response =
        action === "update-lottery"
          ? await dispatch(editProductData(formdata)).unwrap()
          : await dispatch(addProduct(formdata)).unwrap();

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
              <SwitchToBackButton
                title={
                  action === "update-lottery"
                    ? "Edit Lottery"
                    : "Add New Lottery"
                }
                linkTo={-1}
              />
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
                collectionForEditProductData={collectionForEditProductData}
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
