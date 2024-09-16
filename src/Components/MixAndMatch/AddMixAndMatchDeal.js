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
import {
  addNewDeal,
  mixAndMatchPricingDealsList,
} from "../../Redux/features/MixAndMatch/mixAndMatchSlice";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import useDebounce from "../../hooks/useDebouncs";
import { useSelector } from "react-redux";

const AddMixAndMatchDeal = () => {
  const navigate = useNavigate();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const { mixAndMatchDeals } = useSelector((state) => state.mixAndMatchList);
  const dispatch = useDispatch();

  const [productOptions, setProductOptions] = useState([]); // fpr products dropdown options
  const [products, setProducts] = useState([]); // for api products
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(false);
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

  // Fetching all Mix and Pricing Deals
  useEffect(() => {
    const getMixAndMatchPricingDeals = async () => {
      try {
        const data = {
          ...userTypeData,
          merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
        };
        await dispatch(mixAndMatchPricingDealsList(data)).unwrap();
      } catch (error) {
        if (error.status == 401) {
          handleCoockieExpire();
          getUnAutherisedTokenMessage();
        }
      }
    };

    getMixAndMatchPricingDeals();
  }, []);

  // Fetching Products Data
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
        limit: 50,
        page: 0,
        ...userTypeData,
      };

      try {
        setOptionsLoading(true);
        const productsData = await dispatch(fetchProductsData(data)).unwrap();
        setProducts(() => productsData);
      } catch (error) {
        if (error.status === 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status === "Network Error") {
          getNetworkError();
        }
      } finally {
        setOptionsLoading(false);
      }
    };
    fetchProducts();
  }, [debouncedValue]);

  // setting dropdown product options via api
  useEffect(() => {
    // filtering based on the price & discount
    const productsList = products.filter((product) =>
      dealInfo.isPercent === "0"
        ? parseFloat(product.price) >= dealInfo.discount
        : product
    );
    setProductOptions(productsList);
    // console.log("1st update... ", productsList);
  }, [products, dealInfo.isPercent, dealInfo.discount]);

  // Filtering Product Options
  useEffect(() => {
    const filterProducts = (productsList) => {
      const filterByDiscount = (productsData) => {
        const data = productsData.filter((product) => {
          const result =
            dealInfo.isPercent === "0"
              ? parseFloat(product.price) >=
                (parseFloat(dealInfo.discount) || 0)
              : product;
          return result;
        });

        return data;
      };

      let temp = [];

      if (mixAndMatchDeals && mixAndMatchDeals.length > 0) {
        const data = productsList.filter((product) => {
          let alreadyInDeal = false;
          for (let i = 0; i < mixAndMatchDeals.length; i++) {
            const itemsIdObject = JSON.parse(mixAndMatchDeals[i]?.items_id);
            for (let key in itemsIdObject) {
              // if product is a variant product
              if (
                product.isvarient === "1" &&
                key === product.id &&
                itemsIdObject[key].includes(product.var_id)
              ) {
                alreadyInDeal = true;
              }

              // if product is not a variant product
              if (product.isvarient === "0" && key === product.id) {
                alreadyInDeal = true;
              }
            }
          }

          return !alreadyInDeal;
        });

        temp = dealInfo.isPercent === "0" ? filterByDiscount(data) : data;
      } else {
        temp =
          dealInfo.isPercent === "0"
            ? filterByDiscount(productsList)
            : productsList;
      }

      return temp;
    };

    // removing products from Product Options whose price is less than discount price & already in another deal
    if (products && products.length > 0) {
      const temp = filterProducts(products);
      // console.log("dropdown product options: ", temp);
      setProductOptions(() => temp);
    }

    // removing products from already Selected Products whose price is less than discount price & already in another deal
    if (dealInfo.products && dealInfo.products.length > 0) {
      setDealInfo((prev) => ({
        ...prev,
        products: filterProducts(prev.products),
      }));
    }
  }, [dealInfo.discount, products, dealInfo.isPercent, mixAndMatchDeals]);

  // handling description
  useEffect(() => {
    const description = `Buy ${dealInfo.minQty} get ${
      dealInfo.isPercent === "1"
        ? `${dealInfo.discount}%`
        : `$${dealInfo.discount}`
    } off each`;

    setDealInfo((prev) => ({ ...prev, description }));
  }, [dealInfo.discount, dealInfo.isPercent, dealInfo.minQty]);

  // Selecting a Product Option
  const handleSelectProductOptions = (value, name) => {
    setDealInfo((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  // Deleting Selected Product Option
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

  // All Inputs handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDealInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Discount & Percentage Tab handling
  const handleTabChange = (type) => {
    setDealInfo((prev) => ({
      ...prev,
      isPercent: type === "amount" ? "0" : "1",
      discount: type === "amount" ? "0.00" : "0",
    }));
  };

  // Adding New Deal function
  const handleAddNewDeal = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { title, products, minQty, discount, isPercent, description } =
        dealInfo;

      if (
        Boolean(title.trim()) &&
        minQty > 0 &&
        parseFloat(discount) > 0 &&
        products.length > 0
      ) {
        try {
          const items = {};
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

          const data = {
            merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
            deal_name: title,
            min_qty: minQty,
            description,
            discount,
            is_percent: isPercent,
            items_id: JSON.stringify(items),
            is_enable: 1,
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
        } catch (error) {
          if (error?.status == 401 || error?.response?.status === 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error?.status == "Network Error") {
            getNetworkError();
          }
        }
      } else {
        setError((prev) => ({
          ...prev,
          title: !title ? "Deal name is required!" : "",
          products: products.length <= 0 ? "Products are required!" : "",
          minQty: !minQty || minQty <= 0 ? "Minimum quantity is required!" : "",
          discount:
            !discount || parseFloat(discount) <= 0
              ? "Discount per item is required"
              : "",
        }));
      }
    } catch (error) {
      console.log("error: ", error);
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
            <form>
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-coupon-single-input mb-4">
                  <label htmlFor="coupon_name">Deal Name</label>
                  <div className="input_area" style={{ marginBottom: "0px" }}>
                    <BasicTextFields
                      type={"text"}
                      maxLength={100}
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
                  <div className="input_area" style={{ marginBottom: "0px" }}>
                    <BasicTextFields
                      type={"text"}
                      value={dealInfo.description}
                      name="description"
                      readOnly={true}
                    />
                  </div>
                </div>
                <Grid container spacing={2}>
                  <Grid item md={5} xs={12}>
                    <div className="q_coupon_minium input_area">
                      <label htmlFor="minorder_amt">Minimum Quantity</label>
                      <BasicTextFields
                        type={"text"}
                        maxLength={6}
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
                              maxLength={9}
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
                        optionsLoading={optionsLoading}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button
                  className="quic-btn quic-btn-save"
                  onClick={handleAddNewDeal}
                  // type="submit"
                  disabled={loading}
                >
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
