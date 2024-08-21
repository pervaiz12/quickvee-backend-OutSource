import React, { useEffect, useState } from "react";
import DeleteIcon from "../../Assests/Dashboard/deleteIcon.svg";
import { TextField, Grid, FormControl } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchProductsData } from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import AsyncSelect from "react-select/async";
import { AUTO_PO_LIST, BASE_URL, SAVE_PO } from "../../Constants/Config";
import axios from "axios";
import { createdAt, disableZeroOnFirstIndex } from "../../Constants/utils";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import PasswordShow from "./../../Common/passwordShow";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
    padding: "16px 20px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
    padding: "16px 20px",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
  "& td, & th": {
    border: "none",
  },
}));

const customStyles = {
  menu: (provided) => ({
    ...provided,
    cursor: "pointer",
    zIndex: 9999,
    position: "absolute",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor:
      state.isFocused || state.isHovered ? "black" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
    height: 40, 
      minHeight: 40,
    "&:hover": {
      borderColor: "black",
    },
  }),
  input: (provided) => ({
    ...provided,
    "&:focus": {
      borderColor: "black",
      outline: "none",
    },
  }),
};

const AutoPo = ({ purchaseInfo, setPurchaseInfoErrors }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const initialState = [
    {
      id: "",
      variantId: "",
      title: "",
      variant: "",
      notes: "",
      newQty: "",
      qtyError: "",
      finalQty: "0",
      newPrice: "",
      priceError: "",
      finalPrice: "0.00",
      upc: "",
    },
  ];
  const [selectedProducts, setSelectedProducts] = useState(initialState);

  const [loaders, setLoaders] = useState({
    autoPo: false,
    saveAsDraft: false,
    createPo: false,
  });

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

  const handleCancel = () => {
    navigate("/purchase-data");
  };

  const handleDelete = (index) => {
    const updatedProducts = selectedProducts?.filter(
      (product, idx) => idx !== index
    );
    setSelectedProducts(updatedProducts);
  };

  useEffect(() => {
    productOptions(" ");
  }, [selectedProducts.length]);

  // check each product has required data
  const validateProducts = () => {
    const bool = selectedProducts.every(
      (product) =>
        product.id &&
        product.title &&
        Number(product.newQty) > 0 &&
        parseFloat(product.newPrice) > 0
    );

    return bool;
  };

  const displayErrors = () => {
    const updatedData = selectedProducts.map((product) => ({
      ...product,
      titleError: !Boolean(product.title),
      qtyError: !Boolean(product.newQty) || Number(product.newQty) <= 0,
      priceError:
        !Boolean(product.newPrice) || parseFloat(product.newPrice) <= 0,
    }));

    setSelectedProducts(updatedData);
  };

  // helper fn for adding a new product
  const handleAddProduct = () => {
    if (validateProducts()) {
      const newObj = {
        id: "",
        variantId: "",
        title: "",
        variant: "",
        notes: "",
        newQty: "",
        qtyError: false,
        finalQty: "0",
        newPrice: "",
        priceError: false,
        finalPrice: "0.00",
        upc: "",
      };
      setSelectedProducts((prev) => [...prev, newObj]);
    } else {
      displayErrors();
    }
  };

  // generating product options once user searches any product name
  const productOptions = async (inputValue) => {
    try {
      let name_data = {
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
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
      // console.log("api data: ", res.payload);

      const data = res.payload
        ?.filter((prod) => prod.upc && prod.upc !== "")
        ?.map((prod) => ({
          label: prod.title,
          value: prod.id,
          variantId: prod.isvarient === "1" ? prod.var_id : null,
        }));

      const filteredProducts =
        data &&
        data.length > 0 &&
        data.filter((prod) => {
          const productFound =
            selectedProducts &&
            selectedProducts.length > 0 &&
            selectedProducts.find(
              (product) =>
                (product.id &&
                  product.product_id &&
                  product.id === prod.variantId &&
                  product.product_id === prod.value) ||
                (product.id && !product.product_id && product.id === prod.value)
            );

          return !productFound;
        });

      // console.log("filteredProducts: ", filteredProducts);

      return filteredProducts || [];
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  // on selecting a new product from dropdown fetching its details...
  const getProductData = async (productId, variantId, index) => {
    try {
      const { token } = userTypeData;
      const formData = new FormData();
      formData.append(
        "merchant_id",
        LoginGetDashBoardRecordJson?.data?.merchant_id
      );
      formData.append("token_id", userTypeData.token_id);
      formData.append("login_type", userTypeData.login_type);
      formData.append("id", productId);

      const response = await axios.post(
        BASE_URL + "Product_api_react/get_productdata_ById",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let obj = {
        notes: "",
        newQty: 1,
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
            parseFloat(product.costperItem) > 0
              ? parseFloat(product.costperItem)
              : 0;
          obj.finalPrice = obj.newPrice;
          obj.finalQty = product.quantity ? Number(product.quantity) + 1 : 1;

          const updatedData = selectedProducts.map((item, idx) =>
            idx === index
              ? {
                  ...product,
                  ...obj,
                  title: response.data.data.productdata.title,
                }
              : item
          );

          setSelectedProducts(updatedData);
        } else {
          const product = response.data.data.productdata;

          obj.newPrice =
            parseFloat(product.costperItem) > 0
              ? parseFloat(product.costperItem)
              : 0;
          obj.finalPrice = obj.newPrice;
          obj.finalQty = product.quantity ? Number(product.quantity) + 1 : 1;

          const updatedData = selectedProducts.map((item, idx) =>
            idx === index
              ? {
                  ...product,
                  ...obj,
                }
              : item
          );

          setSelectedProducts(updatedData);
        }
      } else {
        console.log("Product Not available!");
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
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
        ? Number(e.target.value) + (Number(prod.quantity) || 0)
        : type === "newPrice" && Number(prod.newQty)
          ? (Number(prod.quantity) || 0) + Number(prod.newQty)
          : Number(prod.quantity)
            ? Number(prod.quantity)
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

  // api for creating a new purchase order
  const savePurchaseOrder = async (isDraft) => {
    try {
      setLoaders((prev) => ({
        ...prev,
        createPo: isDraft === "0",
        saveAsDraft: isDraft === "1",
      }));

      const { issuedDate, stockDate, selectedVendor, email } = purchaseInfo;

      const currentDate = dayjs().startOf("day");
      const selectedIssuedDate = dayjs(issuedDate).startOf("day");

      const issuedDateIsFine = !selectedIssuedDate.isBefore(currentDate);

      // validating purchase order info dataset
      const purchaseInfoDetails = [selectedVendor].every((a) =>
        Boolean(a && a.trim())
      );

      let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const emailIsValid = email ? emailRegex.test(email) : true;

      if (email && !emailIsValid) {
        setPurchaseInfoErrors((prev) => ({
          ...prev,
          email: "Please fill valid email",
        }));
        return;
      }

      if (purchaseInfoDetails && validateProducts() && issuedDateIsFine) {
        try {
          const orderItems = selectedProducts.map((prod) => ({
            product_id: prod.variant ? prod.product_id : prod.id,
            variant_id: prod.variant ? prod.id : "",
            required_qty: prod.newQty.toString(),
            after_qty: (Number(prod.quantity) + Number(prod.newQty)).toString(),
            cost_per_item: prod.newPrice.toString(),
            total_pricing: prod.finalPrice.toString(), // Number(prod.newQty) * parseFloat(prod.newPrice),
            upc: prod.upc,
            note: prod.notes,
            title: prod.title
          }));

          const orderItemsObject = orderItems?.reduce((acc, curr, index) => {
            acc[index] = curr;
            return acc;
          }, {});

          const { token } = userTypeData;

          const formData = new FormData();
          formData.append(
            "merchant_id",
            LoginGetDashBoardRecordJson?.data?.merchant_id
          );
          formData.append(
            "admin_id",
            LoginGetDashBoardRecordJson?.data?.merchant_id
          );
          formData.append("vendor_id", Number(purchaseInfo?.vendorId));
          formData.append("issue_date", issuedDate?.format("YYYY-MM-DD"));
          formData.append(
            "stock_date",
            stockDate ? stockDate?.format("YYYY-MM-DD") : "0000-00-00"
          );
          formData.append("reference", purchaseInfo?.reference);
          formData.append("is_draft", isDraft);
          formData.append("created_at", createdAt(new Date()));
          formData.append("vendor_email", purchaseInfo?.email);
          formData.append("order_items", JSON.stringify(orderItemsObject));
          formData.append("token_id", userTypeData.token_id);
          formData.append("login_type", userTypeData.login_type);

          const response = await axios.post(
            BASE_URL + SAVE_PO,
          //  "https://www.quickvee.net/Zoho_po/save_po",
            formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Use data?.token directly
            },
          });

          // console.log("response: ", response);
          if (response.data.status) {
            ToastifyAlert(response.data.message, "success");
            navigate("/purchase-data");
          } else {
            ToastifyAlert(response.data.message, "error");
          }
        } catch (error) {
          if (error.status == 401 || error.response.status === 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error.status == "Network Error") {
            getNetworkError();
          }
        }
      } else {
        if (!purchaseInfoDetails || !issuedDateIsFine) {
          setPurchaseInfoErrors((prev) => ({
            ...prev,
            issuedDate:
              issuedDate && issuedDateIsFine
                ? ""
                : issuedDate && !issuedDateIsFine
                  ? "Issued Date cannot be older than present date"
                  : "Issued Date is required",
            // stockDate: stockDate ? "" : "Stock Due Date is required",
            // email: email ? "" : "Email is required",
            selectedVendor: selectedVendor ? "" : "Vendor is required",
          }));
        }

        if (!validateProducts()) {
          displayErrors();
        }
      }
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoaders((prev) => ({
        ...prev,
        createPo: false,
        saveAsDraft: false,
      }));
    }
  };

  const numberOrOne = (num) => (num && Number(num) > 0 ? Number(num) : 1);

  // Fetching Auto PO list
  const handleAutoPO = async () => {
    try {
      setLoaders((prev) => ({ ...prev, autoPo: true }));
      if (Number(purchaseInfo?.vendorId)) {
        const formData = new FormData();
        formData.append(
          "merchant_id",
          LoginGetDashBoardRecordJson?.data?.merchant_id
        );
        formData.append(
          "admin_id",
          LoginGetDashBoardRecordJson?.data?.merchant_id
        );
        formData.append("login_type", userTypeData.login_type);
        formData.append("token_id", userTypeData.token_id);
        formData.append("vendor_id", Number(purchaseInfo?.vendorId));

        const { token } = userTypeData;
        const response = await axios.post(BASE_URL + AUTO_PO_LIST, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        });

        if (response.data.status && response.data.result.length > 0) {
          const productsWithUPC = response.data.result.filter(
            (prod) => prod.upc && prod.upc !== ""
          );
          if (productsWithUPC.length > 0) {
            const temp = response.data.result.map((prod) => {
              const newPrice =
                prod.preferd_vendor_cost &&
                parseFloat(prod.preferd_vendor_cost) > 0
                  ? parseFloat(prod.preferd_vendor_cost)
                  : prod.costperItem && parseFloat(prod.costperItem) > 0
                    ? parseFloat(prod.costperItem)
                    : 0;

              const finalPrice =
                numberOrOne(prod.reorder_qty) *
                (prod.preferd_vendor_cost &&
                parseFloat(prod.preferd_vendor_cost) > 0
                  ? parseFloat(prod.preferd_vendor_cost)
                  : prod.costperItem && parseFloat(prod.costperItem) > 0
                    ? parseFloat(prod.costperItem)
                    : 0);

              const productObject = {
                upc: prod.upc,
                id: prod.variant_id ? prod.variant_id : prod.product_id,
                product_id: prod.variant_id ? prod.product_id : "",
                quantity: prod.item_qty || 0,
                newQty: numberOrOne(prod.reorder_qty),
                newPrice,
                finalQty:
                  (Number(prod.item_qty) || 0) + numberOrOne(prod.reorder_qty),
                finalPrice,
                notes: "",
                title: prod.product_title,
                variant: prod.variant
                  ? prod.variant
                  : prod.variant_title
                    ? prod.variant_title
                    : "",
              };

              return productObject;
            });

            setSelectedProducts(temp);
          } else {
            ToastifyAlert("No Product List Found", "error");
          }
        } else if (!response.data.status) {
          setSelectedProducts(initialState);
          ToastifyAlert(response.data.message, "error");
        }
      } else {
        ToastifyAlert("Please Select a Vendor", "error");
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    } finally {
      setLoaders((prev) => ({ ...prev, autoPo: false }));
    }
  };

  return (
    <div className="auto-po-container">
      <div className="box">
        <div className="box_shadow_div" style={{ overflow: "unset" }}>
          <Grid container className="z-index-1">
            <TableContainer
              sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
            >
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Item Name</StyledTableCell>
                  <StyledTableCell>Qty</StyledTableCell>
                  <StyledTableCell>After</StyledTableCell>
                  <StyledTableCell>Cost Per Item</StyledTableCell>
                  <StyledTableCell>Total</StyledTableCell>
                  <StyledTableCell>UPC</StyledTableCell>
                  <StyledTableCell>Note</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((product, index) => (
                    <StyledTableRow key={product?.id}>
                      <StyledTableCell sx={{ width: "30%" }}>
                        <>
                          <span
                            title={
                              product.variant
                                ? `${product.title} ~ ${product.variant}`
                                : `${product.title}`
                            }
                          >
                            <AsyncSelect
                              closeMenuOnSelect={true}
                              defaultOptions
                              styles={customStyles}
                              menuPortalTarget={document.body}
                              value={{
                                label: product.variant
                                  ? `${product.title} ~ ${product.variant}`
                                  : `${product.title}`,
                                value: product.id,
                              }}
                              loadOptions={productOptions}
                              onChange={(option) => {
                                getProductData(
                                  option.value,
                                  option.variantId,
                                  index
                                );
                              }}
                              placeholder="Search Product by Title or UPC"
                            />{" "}
                          </span>
                          {product.titleError && (
                            <p className="error-message">
                              Please select a Product
                            </p>
                          )}
                        </>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "black",
                              },
                            },
                          }}
                          id="outlined-basic"
                          value={product.newQty}
                          inputProps={{
                            type: "text",
                          }}
                          onChange={(e) => {
                            if (
                              e.target.value >= 0 &&
                              e.target.value.length <= 6 &&
                              !isNaN(e.target.value)
                            ) {
                              const disable = disableZeroOnFirstIndex(
                                e.target.value
                              );
                              if (disable) return;
                              handleProduct(e, product.id, "newQty");
                            }
                          }}
                          variant="outlined"
                          size="small"
                        />
                        {product.qtyError && (
                          <p className="error-message">Qty is required</p>
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        <p className="text-[16px]">{product?.finalQty}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "black",
                              },
                            },
                          }}
                          id="outlined-basic"
                          value={parseFloat(product.newPrice).toFixed(2)}
                          inputProps={{ type: "number" }}
                          onChange={(e) => {
                            if (e.target.value.length <= 9) {
                              handleProduct(e, product.id, "newPrice");
                            }
                          }}
                          variant="outlined"
                          size="small"
                        />
                        {product.priceError && (
                          <p className="error-message">
                            Cost Per Item is required
                          </p>
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        <p className="text-[16px]">${product?.finalPrice}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p className="text-[16px]">{product?.upc}</p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "black",
                              },
                            },
                          }}
                          id="outlined-basic"
                          inputProps={{ type: "text" }}
                          value={product.notes}
                          onChange={(e) =>
                            handleProduct(e, product.id, "notes")
                          }
                          placeholder="Note"
                          variant="outlined"
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        {selectedProducts.length > 1 && (
                          <img
                            src={DeleteIcon}
                            alt=""
                            className="w-8 h-8 cursor-pointer"
                            onClick={() => handleDelete(index)}
                          />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>

          {purchaseInfo.selectedVendor || selectedProducts.length > 0 ? (
            <div
              className="flex justify-between w-full"
              style={{ padding: "20px" }}
            >
              <div className="button-container start gap-4">
                {purchaseInfo.selectedVendor && (
                  <button
                    onClick={handleAutoPO}
                    className="quic-btn quic-btn-add attributeUpdateBTN"
                    disabled={
                      loaders.autoPo || loaders.createPo || loaders.saveAsDraft
                    }
                  >
                    {loaders.autoPo && (
                      <CircularProgress
                        color={"inherit"}
                        className="loaderIcon"
                        width={15}
                        size={15}
                      />
                    )}{" "}
                    Auto PO
                  </button>
                )}
                {selectedProducts.length > 0 && (
                  <button
                    onClick={() => savePurchaseOrder("1")}
                    className="quic-btn quic-btn-draft attributeUpdateBTN"
                    disabled={
                      loaders.autoPo || loaders.createPo || loaders.saveAsDraft
                    }
                  >
                    {loaders.saveAsDraft && (
                      <CircularProgress
                        color={"inherit"}
                        className="loaderIcon"
                        width={15}
                        size={15}
                      />
                    )}{" "}
                    Save as Draft
                  </button>
                )}
                <button
                  onClick={handleAddProduct}
                  className="quic-btn quic-btn-add"
                >
                  Add Product
                </button>
              </div>
              {selectedProducts.length > 0 && (
                <div className="button-container end gap-4">
                  <button
                    className="quic-btn quic-btn-save attributeUpdateBTN"
                    onClick={() => savePurchaseOrder("0")}
                    disabled={
                      loaders.autoPo || loaders.createPo || loaders.saveAsDraft
                    }
                  >
                    {loaders.createPo && (
                      <CircularProgress
                        color={"inherit"}
                        className="loaderIcon"
                        width={15}
                        size={15}
                      />
                    )}{" "}
                    Create
                  </button>
                  <button
                    onClick={handleCancel}
                    className="quic-btn quic-btn-cancle"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AutoPo;
