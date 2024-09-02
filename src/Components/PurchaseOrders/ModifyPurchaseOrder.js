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
import AsyncSelect from "react-select/async";
import DeleteIcon from "../../Assests/Dashboard/deleteIcon.svg";
import { fetchPurchaseOrderById } from "../../Redux/features/PurchaseOrder/purchaseOrderByIdSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import dayjs from "dayjs";
import { fetchProductsData } from "../../Redux/features/Product/ProductSlice";
import {
  BASE_URL,
  DELETE_PO_ITEM,
  SAVE_PO,
  UPDATE_PO,
} from "../../Constants/Config";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { createdAt, disableZeroOnFirstIndex } from "../../Constants/utils";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteModal from "../../reuseableComponents/DeleteModal";
import PasswordShow from "./../../Common/passwordShow";
import SwitchToBackButton from "../../reuseableComponents/SwitchToBackButton";

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

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
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
    zIndex: 9999,
    position: "absolute",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "black" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
    height: 40,
    minHeight: 40,
    "&:hover": {
      borderColor: state.isFocused ? "black" : provided["&:hover"].borderColor,
    },
  }),
  input: (provided) => ({
    ...provided,
    "&:focus": {
      borderColor: "black",
      outline: "none",
    },
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const ModifyPurchaseOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();

  const [purchaseInfo, setPurchaseInfo] = useState({
    issuedDate: null,
    stockDate: null,
    email: "",
    reference: "",
    selectedVendor: "",
    vendorId: "",
  });

  const [loaders, setLoaders] = useState({
    autoPo: false,
    saveAsDraft: false,
    createPo: false,
  });

  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [purchaseInfoErrors, setPurchaseInfoErrors] = useState({
    issuedDate: "",
    stockDate: "",
    email: "",
    selectedVendor: "",
    reference: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const getPO_ID = localStorage.getItem("PO_id");

  const puchaseOrderDetail = useSelector(
    (state) => state.purchaseOrderById.purchaseOrderDetail
  );
  useEffect(() => {
    setPurchaseInfo((prev) => ({
      ...prev,
      issuedDate:
        puchaseOrderDetail?.issued_date &&
        puchaseOrderDetail?.issued_date !== "0000-00-00"
          ? dayjs(puchaseOrderDetail?.issued_date)
          : null,
      stockDate:
        puchaseOrderDetail?.stock_date &&
        puchaseOrderDetail?.stock_date !== "0000-00-00"
          ? dayjs(puchaseOrderDetail?.stock_date)
          : null,
      email:
        puchaseOrderDetail?.email && puchaseOrderDetail?.email !== "null"
          ? puchaseOrderDetail?.email
          : "",
      reference: puchaseOrderDetail?.reference,
      selectedVendor: puchaseOrderDetail?.vendor_name,
      vendorId: puchaseOrderDetail?.vendor_id,
    }));

    if (
      puchaseOrderDetail.order_items &&
      puchaseOrderDetail.order_items.length > 0
    ) {
      // console.log("po items: ", puchaseOrderDetail.order_items);
      const data = puchaseOrderDetail.order_items.map((item) => ({
        ...item,
        order_item_id: item.id,
        newPrice: item.cost_per_item,
        newQty:
          item.recieved_status === "2" ? item.required_qty : item.pending_qty,
        finalQty:
          (Number(item.item_qty) || 0) + (Number(item.pending_qty) || 0),
        finalPrice: item.total_pricing,
      }));

      setSelectedProducts(data);
    }
  }, [puchaseOrderDetail]);

  // fetching Purchase Order details
  const getPurchaseOrderDetails = async () => {
    try {
      const data = {
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
        po_id: id,
        ...userTypeData,
      };
      await dispatch(fetchPurchaseOrderById(data)).unwrap();
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    getPurchaseOrderDetails();
  }, []);

  // check each product has required data
  const validateProducts = () => {
    const bool = selectedProducts.every(
      (product) =>
        product.id &&
        (product.title || product.product_title) &&
        Number(product.newQty) > 0 &&
        parseFloat(product.newPrice) > 0
    );

    return bool;
  };

  const displayErrors = () => {
    const updatedData = selectedProducts.map((product) => ({
      ...product,
      titleError: !Boolean(product.title) && !Boolean(product.product_title),
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

  // removing from local state
  const removeItem = (productId) => {
    const updatedProducts = selectedProducts?.filter(
      (prod) => prod.id !== productId
    );
    setSelectedProducts(updatedProducts);
  };

  // deleting a purchase order item api
  const deletePOItem = async (productId) => {
    try {
      const { token } = userTypeData;
      const formData = new FormData();
      formData.append(
        "merchant_id",
        LoginGetDashBoardRecordJson?.data?.merchant_id
      );
      formData.append("po_item_id", productId);
      formData.append("token_id", userTypeData.token_id);
      formData.append("login_type", userTypeData.login_type);

      const response = await axios.post(BASE_URL + DELETE_PO_ITEM, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  const confirmDeleteProduct = () => {
    setDeletedProducts((prev) => [...prev, productToDelete.id]);
    removeItem(productToDelete.id);
    setDeleteModalOpen(() => false);
  };

  const handleDelete = (product) => {
    // if product has po_id then removing from Local state as well as from backend
    if (product.po_id) {
      setProductToDelete(product);
      setDeleteModalOpen(() => true);
    } else {
      removeItem(product.id);
    }
  };

  // date format MM/DD/YYYY if issued date is wrong
  const getDate = () => {
    const defaultDate = puchaseOrderDetail?.issued_date;
    const d = new Date(defaultDate);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const mm = month >= 10 ? month : `0${month}`;

    return `${mm}/${date}/${year}`;
  };

  const handleDate = (date, type) => {
    const dayjsDate = dayjs(date); // Convert to dayjs object
    // const formattedStartDate = dayjsDate.format("YYYY-MM-DD");

    setPurchaseInfo((prev) => ({
      ...prev,
      [type]: dayjsDate,
    }));

    if (type === "issuedDate") {
      const defaultIssuedDate = dayjs(puchaseOrderDetail?.issued_date);
      const selectedIssuedDate = dayjs(dayjsDate).startOf("day");

      const issuedDateLessThanDefaultIssuedDate =
        selectedIssuedDate.isBefore(defaultIssuedDate);
      const essueDateCheck = dayjs(selectedIssuedDate).format("YYYY-MM-DD");
      const currentDate = dayjs().startOf("day");
      const issuedDateIsFine = !selectedIssuedDate.isBefore(currentDate);
      console.log(issuedDateIsFine);

      setPurchaseInfoErrors((prev) => ({
        ...prev,
        issuedDate:
          puchaseOrderDetail.is_draft === "1" &&
          issuedDateLessThanDefaultIssuedDate
            ? `Issued Date cannot be older than ${getDate()}`
            : essueDateCheck == "Invalid Date"
              ? "Issued Date is required or Invalid"
              : issuedDateIsFine == false
                ? `Issued Date cannot be older than present date`
                : "",
        stockDate: "",
      }));
    }

    if (type === "stockDate") {
      const selectedStockDate = dayjs(dayjsDate).startOf("day");
      const stockDateLessThanIssuedDate = selectedStockDate.isBefore(
        purchaseInfo.issuedDate
      );

      if (!dayjsDate || !dayjsDate.isValid()) {
        return;
      }

      setPurchaseInfoErrors((prev) => ({
        ...prev,
        stockDate: stockDateLessThanIssuedDate
          ? "Stock Due date cannot be older than issued date"
          : "",
      }));
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
          email: Boolean(value.trim()) || value === "" ? "" : prev.email,
        }));
        break;
      default:
        setPurchaseInfo((prev) => prev);
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
        limit: 25,
        name: inputValue,
        page: 0,
        ...userTypeData,
      };

      const res = await dispatch(fetchProductsData(name_data));

      const data = res.payload
        ?.filter((prod) => prod.upc && prod.upc !== "")
        ?.map((prod) => ({
          label: prod.title,
          value: prod.id,
          variantId: prod.isvarient === "1" ? prod.var_id : null,
        }));

      // console.log("api data: ", data);

      const filterProducts =
        data &&
        data.length > 0 &&
        data.filter((product) => {
          const productExists =
            selectedProducts &&
            selectedProducts.length > 0 &&
            selectedProducts.find((item) => {
              const productIdMatching = item.product_id === product.value;

              // item is variant
              if (
                (item.isvarient === "1" || Number(item.variant_id) > 0) &&
                product.variantId
              ) {
                const variantIdMatching = item.variant_id === product.variantId;
                return variantIdMatching && productIdMatching;
              } else {
                return productIdMatching;
              }
            });

          return !Boolean(productExists);
        });

      // console.log("filtered Products: ", filterProducts);

      return filterProducts;
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
      formData.append("id", productId);
      formData.append("login_type", userTypeData.login_type);

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
        note: "",
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

          obj.variant_id = variantId;
          obj.isvarient = "1";
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
          obj.product_id = product.id;

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
        ? Number(e.target.value) +
          (Number(prod.item_qty) || Number(prod.quantity) || 0)
        : type === "newPrice" && Number(prod.newQty)
          ? (Number(prod.item_qty) || Number(prod.quantity) || 0) +
            Number(prod.newQty)
          : Number(prod.item_qty) || Number(prod.quantity)
            ? Number(prod.item_qty) || Number(prod.quantity)
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
              type === "note" ? prod.finalPrice : getFinalPrice(type, prod, e),
            finalQty:
              type === "note" ? prod.finalQty : getFinalQty(type, prod, e),
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

  // modifying purchase order api
  const isValidStockDate = () => {
    let isCheckvalidDate = purchaseInfo?.stockDate?.format("YYYY-MM-DD");
    if (isCheckvalidDate == "Invalid Date") {
      setPurchaseInfoErrors((prev) => ({
        ...prev,
        stockDate: "Invalid Stock Due",
      }));
      return true;
    } else {
      return false;
    }
  };

  const modifyPurchaseOrder = async (isDraft) => {
    if (loading) return;

    const { issuedDate, stockDate, selectedVendor, email } = purchaseInfo;
    let isCheckValidstockDate = isValidStockDate();

    if (selectedProducts.length <= 0) {
      ToastifyAlert("No Products to update!", "error");
      return;
    }

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

    if (purchaseInfoDetails && issuedDate && validateProducts()) {
      const { issuedDate, stockDate, email, selectedVendor, reference } =
        purchaseInfoErrors;
      if (
        issuedDate == "" &&
        stockDate == "" &&
        email == "" &&
        selectedVendor == "" &&
        reference == "" &&
        isCheckValidstockDate == false
      ) {
        try {
          setLoading(() => true);
          const orderItems = selectedProducts?.map((prod) => ({
            product_id:
              prod.variant || prod.variant_id ? prod.product_id : prod.id,
            variant_id: prod.variant
              ? prod.id
              : Number(prod.variant_id) > 0
                ? prod.variant_id
                : "",
            required_qty:
              prod?.recieved_status && prod?.recieved_status === "2"
                ? 0
                : prod?.newQty.toString(),
            // after_qty: (Number(prod.quantity) + Number(prod.newQty)).toString(),
            after_qty: Number(prod.finalQty).toString(),
            cost_per_item: prod.newPrice.toString(),
            total_pricing: prod.finalPrice.toString(), // Number(prod.newQty) * parseFloat(prod.newPrice),
            upc: prod.upc,
            note: prod.note,
            order_item_id: prod.order_item_id ? prod.order_item_id : "",
            recieved_status: prod?.recieved_status
              ? prod?.recieved_status
              : "0",
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
          formData.append("po_id", id);
          formData.append("vendor_id", Number(purchaseInfo?.vendorId));
          let DataIssue =
            dayjs(purchaseInfo?.issuedDate).format("YYYY-MM-DD") ==
            "Invalid Date"
              ? ""
              : dayjs(purchaseInfo?.issuedDate).format("YYYY-MM-DD");

          let stockDateDeu =
            purchaseInfo.stockDate?.format("YYYY-MM-DD") == "Invalid Date"
              ? ""
              : purchaseInfo.stockDate?.format("YYYY-MM-DD");

          formData.append(
            "issue_date",
            DataIssue !== ""
              ? dayjs(purchaseInfo?.issuedDate).format("YYYY-MM-DD")
              : "0000-00-00"
          );
          formData.append(
            "stock_date",
            stockDateDeu == ""
              ? "0000-00-00"
              : !!purchaseInfo.stockDate
                ? purchaseInfo.stockDate?.format("YYYY-MM-DD")
                : "0000-00-00"
          );
          formData.append("reference", purchaseInfo?.reference);
          formData.append(
            "received_status",
            puchaseOrderDetail?.received_status
          );
          formData.append("is_draft", isDraft);
          formData.append(
            "created_at",
            puchaseOrderDetail?.created_at
              ? puchaseOrderDetail?.created_at
              : "0000-00-00 00:00:00"
          );
          formData.append("updated_at", createdAt(new Date()));
          formData.append("vendor_email", purchaseInfo?.email);
          formData.append("order_items", JSON.stringify(orderItemsObject));
          formData.append("token_id", userTypeData.token_id);
          formData.append("login_type", userTypeData.login_type);

          const response = await axios.post(BASE_URL + UPDATE_PO, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Use data?.token directly
            },
          });

          // deleting product items if any from PO
          if (deletedProducts.length > 0) {
            deletedProducts.forEach((item) => deletePOItem(item));
          }

          if (response.data.status) {
            ToastifyAlert(response.data.message, "success");
            navigate("/purchase-data");
          } else {
            ToastifyAlert(response.data.message, "error");
          }
        } catch (error) {
          if (error?.status == 401 || error?.response?.status === 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error.status == "Network Error") {
            getNetworkError();
          }
        } finally {
          setLoading(() => false);
        }
      }
    } else {
      if (!purchaseInfoDetails || !issuedDate) {
        setPurchaseInfoErrors((prev) => ({
          ...prev,
          issuedDate: issuedDate ? "" : "Issued Date is required",
          selectedVendor: selectedVendor ? "" : "Vendor is required",
        }));
      }

      if (!validateProducts()) {
        displayErrors();
      }
    }
  };

  const handleQuantity = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <>
      {/* purchase order basic info */}
      <div className="box">
        <div className="box_shadow_div">
          <SwitchToBackButton
            linkTo={"/purchase-data"}
            title={`Edit Purchase Order  (${getPO_ID})`}
          />
          {/* <div className="q-add-categories-section-header">
            <span onClick={() => navigate("/purchase-data")}>
              <img src={backIcon} alt="Add New Category" className="w-6 h-6" />
              <span>Edit Purchase Order</span>
            </span>
          </div> */}

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
                      className="issued-date default-border-color"
                      size="small"
                      slotProps={{
                        textField: {
                          size: "small",
                          onKeyPress: (e) => e.preventDefault(),
                        },
                      }}
                      format={"MM/DD/YYYY"}
                      // disablePast={puchaseOrderDetail.is_draft === "0"}
                      shouldDisableDate={(date) => {
                        return (
                          dayjs(date) < dayjs(puchaseOrderDetail?.issued_date)
                        );
                      }}
                      onChange={(newDate) => {
                        handleDate(newDate, "issuedDate");
                        setPurchaseInfo((prev) => ({
                          ...prev,
                          stockDate: null,
                        }));
                      }}
                      value={purchaseInfo.issuedDate}
                      disablePast
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
                      className="stock-due-date default-border-color"
                      size="small"
                      slotProps={{
                        textField: {
                          size: "small",
                          onKeyPress: (e) => e.preventDefault(),
                        },
                      }}
                      // disablePast={puchaseOrderDetail.is_draft === "0"}
                      format={"MM/DD/YYYY"}
                      shouldDisableDate={(date) => {
                        return dayjs(date) < dayjs(purchaseInfo.issuedDate);
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

      {/* products section */}
      <div className="auto-po-container">
        <div className="box">
          <div className="box_shadow_div" style={{ overflow: "unset" }}>
            <Grid container className="z-index-1">
              <TableContainer
                sx={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
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
                            {product.order_item_id ? (
                              <>
                                <p className="font-normal text-[16px] mb-0">
                                  {product?.product_title
                                    ? product?.product_title
                                    : product?.title
                                      ? product?.title
                                      : "NULL"}
                                </p>

                                <p className="font-light text-[15px] mb-2">
                                  {product.variant_title
                                    ? product.variant_title
                                    : product.variant
                                      ? product.variant
                                      : null}
                                </p>
                              </>
                            ) : (
                              <>
                                <span
                                  title={
                                    product.variant
                                      ? `${product.title} ~ ${product.variant}`
                                      : `${product.title}`
                                  }
                                >
                                  <AsyncSelect
                                    isDisabled={selectedProducts.some(
                                      (item) =>
                                        item.title !== "" &&
                                        index !== selectedProducts.length - 1
                                    )}
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
                                  />
                                </span>
                                {product.titleError && (
                                  <p className="error-message">
                                    Please select a Product
                                  </p>
                                )}
                              </>
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
                            disabled={product.recieved_status === "2"}
                            onKeyPress={handleQuantity}
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
                            disabled={
                              product.recieved_status === "2" ||
                              product.recieved_status === "1"
                            }
                          />
                          {product.priceError && (
                            <p className="error-message">
                              Cost Per Item is required
                            </p>
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="text-[16px]">
                            ${parseFloat(product?.finalPrice).toFixed(2)}
                          </p>
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
                            value={product.note}
                            onChange={(e) =>
                              handleProduct(e, product.id, "note")
                            }
                            placeholder="Note"
                            variant="outlined"
                            size="small"
                            disabled={product.recieved_status === "2"}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          {((product?.recieved_status === "0" ||
                            !product.po_id) &&
                            selectedProducts.length > 1) ||
                          puchaseOrderDetail.is_draft === "1" ? (
                            <img
                              src={DeleteIcon}
                              alt=""
                              className="w-8 h-8 cursor-pointer"
                              onClick={() => handleDelete(product)}
                              title="Delete"
                            />
                          ) : null}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
            <div className="flex justify-between py-7 px-6">
              <div className="button-container start gap-4">
                {puchaseOrderDetail.is_draft === "1" ? (
                  <button
                    onClick={() => modifyPurchaseOrder("1")}
                    className="quic-btn quic-btn-draft attributeUpdateBTN"
                    disabled={
                      loaders.saveAsDraft || loaders.createPo || loading
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
                ) : null}
                <button
                  onClick={handleAddProduct}
                  className="quic-btn quic-btn-add"
                >
                  Add Product
                </button>
              </div>
              <div className="button-container end gap-4">
                {puchaseOrderDetail.is_draft === "1" ? (
                  <button
                    className="quic-btn quic-btn-save attributeUpdateBTN"
                    onClick={() => modifyPurchaseOrder("0")}
                    disabled={
                      loaders.saveAsDraft || loaders.createPo || loading
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
                ) : (
                  <button
                    className="quic-btn quic-btn-save attributeUpdateBTN"
                    onClick={() => modifyPurchaseOrder("0")}
                    disabled={
                      loaders.saveAsDraft || loaders.createPo || loading
                    }
                  >
                    {loading && (
                      <CircularProgress
                        color={"inherit"}
                        className="loaderIcon"
                        width={15}
                        size={15}
                      />
                    )}{" "}
                    Update
                  </button>
                )}

                <button
                  onClick={() => navigate("/purchase-data")}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        headerText="Product"
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={confirmDeleteProduct}
      />
    </>
  );
};

export default ModifyPurchaseOrder;
