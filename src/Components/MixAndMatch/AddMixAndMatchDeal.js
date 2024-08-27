import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SwitchToBackButton from "../../reuseableComponents/SwitchToBackButton";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useDispatch } from "react-redux";
import { fetchProductsData } from "../../Redux/features/Product/ProductSlice";
import PasswordShow from "../../Common/passwordShow";
import { handleInputNumber } from "../../Constants/utils";
import { addNewDeal } from "../../Redux/features/MixAndMatch/mixAndMatchSlice";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import useDebounce from "../../hooks/useDebouncs";

const AddMixAndMatchDeal = () => {
  const navigate = useNavigate();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();

  const [productOptions, setProductOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const debouncedValue = useDebounce(productName);

  const [dealInfo, setDealInfo] = useState({
    title: "",
    description: "",
    products: [],
    minQty: "0",
    discount: "0.00",
    isPercent: "0",
  });

  const [error, setError] = useState({
    title: "",
    products: "",
    minQty: "",
    discount: "",
  });

  const handleSelectProductOptions = (value, name) => {
    setDealInfo((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  const handleDeleteSelectedOption = (id, name, opt) => {
    const filterOptionItems = dealInfo[name].filter((item) =>
      item.isvarient === "1" ? item.var_id !== opt.var_id : item?.id !== id
    );
    setDealInfo((prev) => ({
      ...prev,
      [name]: filterOptionItems,
    }));
  };

  const handleUpdateError = (updatedErrorValue) => {
    setError((prev) => ({
      ...prev,
      ...updatedErrorValue,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDealInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (type) => {
    setDealInfo((prev) => ({
      ...prev,
      isPercent: type === "amount" ? "0" : "1",
      discount: "",
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let data = {
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
        format: "json",
        category_id: "all",
        show_status: "all",
        name: debouncedValue,
        listing_type: 1,
        offset: 0,
        limit: 100,
        page: 0,
        ...userTypeData,
      };

      try {
        const products = await dispatch(fetchProductsData(data)).unwrap();
        if (products && products.length > 0) {
          const temp = products.filter((product) =>
            dealInfo.isPercent === "0"
              ? parseFloat(product.price) >=
                (parseFloat(dealInfo.discount) || 0)
              : product
          );
          setProductOptions(() => temp);
        }
      } catch (error) {
        if (error.status === 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status === "Network Error") {
          getNetworkError();
        }
      }
    };
    fetchProducts();
  }, [debouncedValue]);

  const handleAddNewDeal = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { title, products, minQty, discount, isPercent, description } =
        dealInfo;

      const bool = [title, minQty, discount].every((item) =>
        Boolean(item.trim())
      );

      if (bool && products.length > 0) {
        // console.log("all ok.. 👍");

        const items = {};
        // console.log("products: ", products);
        products.forEach((item) => {
          if (item.isvarient === "1") {
            if (items[item.id]) {
              items[item.id] = [...items[item.id], item.var_id];
            } else {
              items[item.id] = [item.var_id];
            }
          } else {
            items[item.id] = "";
          }
        });
        // console.log("items: ", items);

        const data = {
          merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
          deal_name: title,
          min_qty: minQty,
          description,
          discount,
          is_percent: isPercent,
          items_id: JSON.stringify(items),
          is_enable: 0,
          mix_id: "",
          ...userTypeData,
        };

        const result = await dispatch(addNewDeal(data)).unwrap();
        if (result) {
          ToastifyAlert("Added Successfully", "success");
          navigate("/mix-and-match");
        } else {
          ToastifyAlert("Something went wrong!", "success");
        }
      } else {
        setError((prev) => ({
          ...prev,
          title: !title ? "Title is required!" : "",
          products: products.length <= 0 ? "Products are required!" : "",
          minQty: !minQty ? "Minimum Quantity is required!" : "",
          discount: !discount ? "Discount is required" : "",
        }));
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="q-add-categories-section">
            <SwitchToBackButton linkTo={"/mix-and-match"} title={"Add Deal"} />
            <form onSubmit={handleAddNewDeal}>
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-coupon-single-input mb-4">
                  <label htmlFor="coupon_name">Deal Name</label>
                  <div className="input_area" style={{ marginBottom: "0px" }}>
                    <BasicTextFields
                      type={"text"}
                      value={dealInfo.title}
                      name="title"
                      onChangeFun={handleInputChange}
                    />
                  </div>
                  {error.title && (
                    <p className="error-message">{error.title}</p>
                  )}
                </div>

                <div className="q-add-coupon-single-input mb-6">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="mt-1"
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    value={dealInfo.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <Grid container spacing={2}>
                  <Grid item md={5} xs={12}>
                    <div className="q_coupon_minium input_area">
                      <label htmlFor="minorder_amt">Minimum Quantity</label>
                      <BasicTextFields
                        type={"text"}
                        value={dealInfo.minQty}
                        onChangeFun={(e) =>
                          handleInputNumber(e, setDealInfo, dealInfo)
                        }
                        placeholder="Enter Minimum Quantity"
                        name="minQty"
                      />
                      {error.minQty && (
                        <p className="error-message">{error.minQty}</p>
                      )}
                    </div>
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <div className="q_coupon_minium  dicount_per_amo">
                      <Grid container>
                        <Grid item xs={5}>
                          <div className="q_coupon_minium input_area">
                            <label htmlFor="discount_amt">
                              Discount Per Item (
                              {dealInfo.isPercent === "1" ? "%" : "$"})
                            </label>
                            <BasicTextFields
                              type={"text"}
                              value={dealInfo.discount}
                              onChangeFun={(e) => {
                                handleInputNumber(e, setDealInfo, dealInfo);
                              }}
                              placeholder="Enter Discount Amount"
                              name="discount"
                            />

                            {error.discount && (
                              <p className="error-message">{error.discount}</p>
                            )}
                          </div>
                        </Grid>

                        <Grid item xs={7}>
                          <div className="AMT_PER_button">
                            <Grid container>
                              <Grid item xs={6}>
                                <div
                                  className={`cursor-pointer amt_btn text-center   ${
                                    dealInfo.isPercent === "0"
                                      ? "bg-[#0A64F9] text-white radius-4"
                                      : ""
                                  }`}
                                  onClick={() => handleTabChange("amount")}
                                >
                                  Amount ($)
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                <div
                                  className={`cursor-pointer amt_btn text-center  ${
                                    dealInfo.isPercent === "1"
                                      ? "bg-[#0A64F9] text-white radius-4"
                                      : ""
                                  }`}
                                  style={{ whiteSpace: "nowrap" }}
                                  onClick={() => handleTabChange("percentage")}
                                >
                                  Percentage (%)
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="q-add-categories-single-input">
                      <SearchableDropdown
                        title="Products"
                        keyName="products"
                        name="title"
                        optionList={productOptions}
                        handleSelectProductOptions={handleSelectProductOptions}
                        handleDeleteSelectedOption={handleDeleteSelectedOption}
                        selectedOption={dealInfo?.products}
                        error={error}
                        handleUpdateError={handleUpdateError}
                        placeholder="Search Products"
                        usingFor="variantProducts"
                        setProductName={setProductName}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save" disabled={loading}>
                  {" "}
                  {loading ? (
                    <>
                      <CircularProgress
                        color={"inherit"}
                        width={15}
                        size={15}
                      />{" "}
                      Add
                    </>
                  ) : (
                    "Add"
                  )}
                </button>
                <Link to={`/mix-and-match`}>
                  <button className="quic-btn quic-btn-cancle">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMixAndMatchDeal;
