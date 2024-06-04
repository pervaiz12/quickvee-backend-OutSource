import React, { useState, useEffect } from "react";
import { TextField, Grid, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import backIcon from "../../Assests/Dashboard/Left.svg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import AsyncSelect from "react-select/async";
import DeleteIcon from "../../Assests/Dashboard/deleteIcon.svg";
import { fetchPurchaseOrderById } from "../../Redux/features/PurchaseOrder/purchaseOrderByIdSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import dayjs from "dayjs";
import { fetchProductsData } from "../../Redux/features/Product/ProductSlice";
import { BASE_URL } from "../../Constants/Config";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme({
  components: {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreIcon,
      },
      styleOverrides: {
        root: {
          ".MuiSvgIcon-root": {
            color: "black",
          },
        },
      },
    },
  },
});

const ModifyPurchaseOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userTypeData } = useAuthDetails();

  const [purchaseInfo, setPurchaseInfo] = useState({
    issuedDate: null,
    stockDate: null,
    email: "",
    reference: "",
    selectedVendor: "",
    vendorId: "",
  });

  const [purchaseInfoErrors, setPurchaseInfoErrors] = useState({
    issuedDate: "",
    stockDate: "",
    email: "",
    selectedVendor: "",
    reference: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  const puchaseOrderDetail = useSelector(
    (state) => state.purchaseOrderById.purchaseOrderDetail
  );

  useEffect(() => {
    console.log("puchaseOrderDetail: ", puchaseOrderDetail);

    setPurchaseInfo((prev) => ({
      ...prev,
      issuedDate: puchaseOrderDetail?.issued_date
        ? dayjs(puchaseOrderDetail?.issued_date)
        : null,
      stockDate: puchaseOrderDetail?.stock_date
        ? dayjs(puchaseOrderDetail?.stock_date)
        : null,
      email: puchaseOrderDetail?.email,
      reference: puchaseOrderDetail?.reference,
      selectedVendor: puchaseOrderDetail?.vendor_name,
      vendorId: puchaseOrderDetail?.vendor_id,
    }));

    if (
      puchaseOrderDetail.order_items &&
      puchaseOrderDetail.order_items.length > 0
    ) {
      const data = puchaseOrderDetail.order_items.map((item) => ({
        ...item,
        newPrice: item.cost_per_item,
        newQty: item.pending_qty,
        finalQty:
          (Number(item.item_qty) || 0) + (Number(item.pending_qty) || 0),
        finalPrice: item.total_pricing,
      }));
      setSelectedProducts(data);
    }
  }, [puchaseOrderDetail]);

  // fetching Purchase Order details
  useEffect(() => {
    const data = { merchant_id: "MAL0100CA", po_id: id, ...userTypeData };
    dispatch(fetchPurchaseOrderById(data));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      const updatedProducts = selectedProducts?.filter(
        (product) => product.id !== id
      );
      setSelectedProducts(updatedProducts);
    }
  };

  const handleDate = (date, type) => {
    const dayjsDate = dayjs(date); // Convert to dayjs object
    const formattedStartDate = dayjsDate.format("YYYY-MM-DD");
    setPurchaseInfo((prev) => ({
      ...prev,
      [type]: formattedStartDate,
    }));

    if (type === "issuedDate" && purchaseInfoErrors.issuedDate) {
      setPurchaseInfoErrors((prev) => ({ ...prev, issuedDate: "" }));
    }

    if (type === "stockDate" && purchaseInfoErrors.stockDate) {
      setPurchaseInfoErrors((prev) => ({ ...prev, stockDate: "" }));
    }
  };

  const handleValue = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case "reference":
        setPurchaseInfo((prev) => ({ ...prev, reference: value }));
        break;
      case "email":
        setPurchaseInfo((prev) => ({ ...prev, email: value }));
        setPurchaseInfoErrors((prev) => ({
          ...prev,
          email: Boolean(value.trim()) ? "" : prev.email,
        }));
        break;
      default:
        setPurchaseInfo((prev) => prev);
    }
  };

  // generating product options once user searches any product name
  const productOptions = async (inputValue) => {
    if (inputValue && inputValue.length > 2) {
      let name_data = {
        merchant_id: "MAL0100CA",
        category_id: "all",
        show_status: "all",
        listing_type: 1,
        offset: 0,
        limit: 100000,
        name: inputValue,
        page: 0,
        ...userTypeData,
      };

      const res = await dispatch(fetchProductsData(name_data));

      const data = res.payload
        ?.filter((prod) =>
          prod.title.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((prod) => ({
          label: prod.title,
          value: prod.id,
          variantId: prod.isvarient === "1" ? prod.var_id : null,
        }))
        .filter((prod) => {
          const productFound = selectedProducts.find(
            (product) =>
              (product.variant &&
                product.id === prod.variantId &&
                product.product_id === prod.value) ||
              (!product.variant && product.id === prod.value)
          );

          return !productFound;
        });

      return data;
    }
  };

  // on selecting a new product from dropdown fetching its details...
  const getProductData = async (productId, variantId) => {
    try {
      const formData = new FormData();
      formData.append("merchant_id", "MAL0100CA");
      formData.append("id", productId);
      const response = await axios.post(
        BASE_URL + "Product_api_react/get_productdata_ById",
        formData
      );

      let obj = {
        notes: "",
        newQty: "",
        newPrice: "",
        finalPrice: "0.00",
        finalQty: 0,
      };

      if (response.data.status) {
        if (variantId && response.data.data.product_variants.length > 0) {
          const product = response.data.data.product_variants.find(
            (prod) => prod.id === variantId
          );

          obj.newPrice =
            parseFloat(product.price) > 0 ? parseFloat(product.price) : 0;
          obj.finalQty = Number(product.quantity) ?? 0;

          setSelectedProducts((prev) => [
            { ...product, ...obj, title: response.data.data.productdata.title },
            ...prev,
          ]);
        } else {
          const product = response.data.data.productdata;

          obj.newPrice =
            parseFloat(product.price) > 0 ? parseFloat(product.price) : 0;
          obj.finalQty = Number(product.quantity) ?? 0;

          setSelectedProducts((prev) => [{ ...product, ...obj }, ...prev]);
        }
      } else {
        console.log("Product Not available!");
      }
    } catch (e) {
      console.log("e: ", e);
    }
  };

  // handling price of product items, 0.00 format
  const handleProductPrice = (e) => {
    const { value } = e.target;

    let val = value.replace(/[^\d]/g, "");

    if (val === "") {
      return "0.00";
    }

    val = val.replace(/^0+/, "");

    while (val.length < 3) {
      val = "0" + val;
    }

    const integerPart = val.slice(0, val.length - 2);
    const decimalPart = val.slice(val.length - 2);
    const formattedValue = `${integerPart}.${decimalPart}`;

    return formattedValue;
  };

  // helper fn
  const getFinalPrice = (type, prod, e) => {
    const amount = handleProductPrice(e);

    const temp =
      type === "newPrice" && parseFloat(amount) > 0 && Number(prod.newQty) > 0
        ? parseFloat(amount) * Number(prod.newQty)
        : type === "newQty" &&
            Number(e.target.value) > 0 &&
            parseFloat(prod.newPrice) > 0
          ? Number(e.target.value) * parseFloat(prod.newPrice)
          : "0.00";

    const res = parseFloat(temp).toFixed(2);
    return res;
  };

  // helper fn
  const getFinalQty = (type, prod, e) => {
    const temp =
      type === "newQty" && Number(e.target.value)
        ? Number(e.target.value) + (Number(prod.item_qty) || 0)
        : type === "newPrice" && Number(prod.newQty)
          ? (Number(prod.item_qty) || 0) + Number(prod.newQty)
          : Number(prod.item_qty)
            ? Number(prod.item_qty)
            : 0;

    return temp;
  };

  // inside the selected products for PO, whenever its Note, Qty or Price is changed this fn is called.
  const handleProduct = (e, productId, type) => {
    const updatedProducts = selectedProducts.map((prod) =>
      prod.id === productId
        ? {
            ...prod,
            [type]:
              type === "newPrice" ? handleProductPrice(e) : e.target.value,
            finalPrice:
              type === "notes" ? prod.finalPrice : getFinalPrice(type, prod, e),
            finalQty:
              type === "notes" ? prod.finalQty : getFinalQty(type, prod, e),
            priceError:
              type === "newPrice" && e.target.value && prod.priceError
                ? ""
                : prod.priceError,
            qtyError:
              type === "newQty" && e.target.value && prod.qtyError
                ? ""
                : prod.qtyError,
          }
        : prod
    );
    setSelectedProducts(() => updatedProducts);
  };

  return (
    <>
      {/* purchase order basic info */}
      <div className="box">
        <div className="box_shadow_div">
          <div className="q-add-categories-section-header">
            <span onClick={() => navigate("/purchase-data")}>
              <img src={backIcon} alt="Add New Category" className="w-6 h-6" />
              <span>Edit Purchase Order</span>
            </span>
          </div>

          <div>
            <div className="px-6 py-7">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <label>Vendor</label>
                  <FormControl fullWidth>
                    <ThemeProvider theme={theme}>
                      <Select
                        size="small"
                        value={purchaseInfo?.selectedVendor}
                        displayEmpty
                        defaultValue={purchaseInfo?.selectedVendor}
                      >
                        <MenuItem value={purchaseInfo?.selectedVendor}>
                          {purchaseInfo?.selectedVendor}
                        </MenuItem>
                      </Select>
                    </ThemeProvider>
                  </FormControl>

                  {purchaseInfoErrors.selectedVendor && (
                    <p className="error-message">
                      {purchaseInfoErrors.selectedVendor}
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label>Issued Date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{ paddingTop: 0 }}
                      components={["DatePicker"]}
                    >
                      <DatePicker
                        sx={{ width: "100%" }}
                        className="issued-date"
                        size="small"
                        slotProps={{
                          textField: {
                            size: "small",
                          },
                        }}
                        format={"MM/DD/YYYY"}
                        disablePast
                        onChange={(newDate) => {
                          handleDate(newDate, "issuedDate");
                          setPurchaseInfo((prev) => ({
                            ...prev,
                            stockDate: null,
                          }));
                        }}
                        value={purchaseInfo.issuedDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {purchaseInfoErrors.issuedDate && (
                    <p className="error-message">
                      {purchaseInfoErrors.issuedDate}
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label>Stock Due</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{ paddingTop: 0 }}
                      components={["DatePicker"]}
                    >
                      <DatePicker
                        sx={{ width: "100%" }}
                        className="stock-due-date"
                        size="small"
                        slotProps={{
                          textField: {
                            size: "small",
                          },
                        }}
                        disablePast
                        format={"MM/DD/YYYY"}
                        shouldDisableDate={(date) => {
                          return date < dayjs(purchaseInfo.issuedDate);
                        }}
                        onChange={(newDate) => handleDate(newDate, "stockDate")}
                        value={purchaseInfo.stockDate}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {purchaseInfoErrors.stockDate && (
                    <p className="error-message">
                      {purchaseInfoErrors.stockDate}
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label>Reference</label>
                  <BasicTextFields
                    value={purchaseInfo.reference}
                    onChangeFun={handleValue}
                    name={"reference"}
                    type={"text"}
                    required={true}
                    placeholder={"Note or Info or Invoice Number"}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label>Vendor Email</label>
                  <BasicTextFields
                    value={purchaseInfo.email}
                    onChangeFun={handleValue}
                    name={"email"}
                    type={"email"}
                    required={true}
                    placeholder={"Vendor Email Address"}
                  />
                  {purchaseInfoErrors.email && (
                    <p className="error-message">{purchaseInfoErrors.email}</p>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>

      {/* products section */}
      <div className="auto-po-container">
        <div className="box">
          <div className="box_shadow_div" style={{ overflow: "unset" }}>
            <div className="mt-4 px-6">
              <div className="q_searchBar sticky">
                <Grid container>
                  <Grid item xs={12}>
                    <AsyncSelect
                      closeMenuOnSelect={true}
                      value={null}
                      loadOptions={productOptions}
                      onChange={(option) => {
                        getProductData(option.value, option.variantId);
                      }}
                      placeholder="Search Product by Title"
                    />
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className="q-category-bottom-detail-section">
              {selectedProducts.length > 0 && (
                <>
                  <div className="q-add-purchase-section-header">
                    <p className="purchase-data-item">Item Name</p>
                    <p className="purchase-data-qty">Qty</p>
                    <p className="purchase-data-after">After</p>
                    <p className="purchase-data-unit">Cost Per Unit</p>
                    <p className="purchase-data-total">Total</p>
                    <p className="purchase-data-upc">UPC</p>
                    <p className="purchase-data-delete"></p>
                  </div>
                  {selectedProducts.map((product, index) => (
                    <div
                      key={product?.id}
                      className={`q-category-bottom-categories-single-category purchase-addpo d-flex gap-2 ${
                        index % 2 === 0 ? "even" : "odd"
                      }`}
                    >
                      <p className="purchase-data-item text-[16px]">
                        {product.product_title
                          ? product.product_title
                          : product.title
                            ? product.title
                            : ""}
                        <br />
                        {product.variant_title ? (
                          <>
                            <span className="text-[14px]">
                              {product.variant_title}
                            </span>
                            <br />
                          </>
                        ) : null}
                        <TextField
                          id="outlined-basic"
                          inputProps={{ type: "text" }}
                          value={product.notes}
                          onChange={(e) =>
                            handleProduct(e, product.id, "notes")
                          }
                          placeholder="Add Note"
                          variant="outlined"
                          size="small"
                        />
                      </p>
                      <p className="purchase-data-qty">
                        <Grid container>
                          <Grid item xs={10}>
                            <FormControl fullWidth>
                              <TextField
                                id="outlined-basic"
                                value={product.newQty}
                                inputProps={{
                                  type: "number",
                                }}
                                onChange={(e) => {
                                  if (e.target.value >= 0) {
                                    handleProduct(e, product.id, "newQty");
                                  }
                                }}
                                variant="outlined"
                                size="small"
                              />
                              {product.qtyError && (
                                <p className="error-message">Qty is required</p>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </p>
                      <p className="purchase-data-after mt-3">
                        {product?.finalQty}
                      </p>
                      <p className="purchase-data-unit">
                        <Grid container>
                          <Grid item xs={10}>
                            <FormControl fullWidth>
                              <TextField
                                id="outlined-basic"
                                value={product.newPrice}
                                inputProps={{ type: "number" }}
                                onChange={(e) => {
                                  handleProduct(e, product.id, "newPrice");
                                }}
                                variant="outlined"
                                size="small"
                              />
                              {product.priceError && (
                                <p className="error-message">
                                  Cost Per Item is required
                                </p>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </p>
                      <p className="purchase-data-total mt-3">
                        ${product?.finalPrice}
                      </p>
                      <p className="purchase-data-upc mt-3">{product?.upc}</p>
                      <p className="purchase-data-delete">
                        <img
                          src={DeleteIcon}
                          alt=""
                          className="w-8 h-8 cursor-pointer"
                          onClick={() => handleDelete(product?.id)}
                        />
                      </p>
                    </div>
                  ))}
                </>
              )}
              <div className="flex justify-end py-4 px-4">
                {/* {selectedProducts.length > 0 && ( */}
                <div className="button-container end gap-4">
                  <button
                    className="quic-btn quic-btn-save"
                    // onClick={() => savePurchaseOrder("0")}
                  >
                    Update
                  </button>
                  <button
                    // onClick={handleCancel}
                    className="quic-btn quic-btn-cancle"
                  >
                    Cancel
                  </button>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyPurchaseOrder;
