import React, { useEffect, useState } from "react";
import DeleteIcon from "../../Assests/Dashboard/deleteIcon.svg";
import { TextField, Grid, FormControl } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchProductsData } from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import AsyncSelect from "react-select/async";
import { AUTO_PO_LIST, BASE_URL, SAVE_PO } from "../../Constants/Config";
import axios from "axios";
import { createdAt } from "../../Constants/utils";
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

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AutoPo = ({ purchaseInfo, setPurchaseInfoErrors }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const [selectedProducts, setSelectedProducts] = useState([]);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all products?"
    );
    if (confirmDelete) {
      setSelectedProducts([]);
      navigate("/purchase-data");
    }
  };

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

  // generating product options once user searches any product name
  const productOptions = async (inputValue) => {
    if (inputValue && inputValue.length > 2) {
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

      // ?.filter((prod) =>
      //   prod.title.toLowerCase().includes(inputValue.toLowerCase())
      // )

      const data = res.payload
        ?.map((prod) => ({
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
      formData.append(
        "merchant_id",
        LoginGetDashBoardRecordJson?.data?.merchant_id
      );
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
            parseFloat(product.costperItem) > 0
              ? parseFloat(product.costperItem)
              : 0;
          obj.finalQty = Number(product.quantity) ?? 0;

          setSelectedProducts((prev) => [
            { ...product, ...obj, title: response.data.data.productdata.title },
            ...prev,
          ]);
        } else {
          const product = response.data.data.productdata;

          obj.newPrice =
            parseFloat(product.costperItem) > 0
              ? parseFloat(product.costperItem)
              : 0;
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

      const { issuedDate, stockDate, selectedVendor } = purchaseInfo;

      const currentDate = dayjs().startOf("day");
      const selectedIssuedDate = dayjs(issuedDate).startOf("day");

      const issuedDateIsFine = !selectedIssuedDate.isBefore(currentDate);

      // validating purchase order info dataset
      const purchaseInfoDetails = [selectedVendor].every((a) =>
        Boolean(a && a.trim())
      );

      // issuedDate, stockDate,  need to handle this dates..

      // validating purchase order products dataset
      const validateProducts = selectedProducts.every(
        (prod) => prod.newQty && prod.newPrice
      );

      if (purchaseInfoDetails && validateProducts && issuedDateIsFine) {
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

          const response = await axios.post(BASE_URL + SAVE_PO, formData, {
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
        } catch (e) {
          console.log("Error: ", e);
        }
      } else {
        // console.log("issuedDate: ", issuedDate);
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

        if (!validateProducts) {
          const temp = selectedProducts.map((prod) =>
            !prod.newQty || !prod.newPrice
              ? {
                  ...prod,
                  priceError: !prod.newPrice ? "Cost Per Item is required" : "",
                  qtyError: !prod.newQty ? "Quantity is required" : "",
                }
              : prod
          );

          setSelectedProducts(() => temp);
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

        // console.log("response: ", response);
        if (response.data.status && response.data.result.length > 0) {
          const temp = response.data.result.map((prod) => ({
            upc: prod.upc,
            id: prod.variant_id ? prod.variant_id : prod.product_id,
            product_id: prod.variant_id ? prod.product_id : "",
            quantity: prod.item_qty,
            newQty: prod.reorder_qty || 0,
            newPrice: prod.costperItem || 0,
            finalQty:
              (Number(prod.item_qty) || 0) + (Number(prod.reorder_qty) || 0),
            finalPrice:
              (Number(prod.reorder_qty) || 0) * (Number(prod.costperItem) || 0),
            notes: "",
            title: prod.product_title,
            variant: prod.variant ? prod.variant : "",
          }));

          // console.log("temp: ", temp);

          setSelectedProducts(temp);
        } else if (!response.data.status) {
          ToastifyAlert(response.data.message, "error");
        }
      } else {
        ToastifyAlert("Please Select a Vendor", "error");
      }
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoaders((prev) => ({ ...prev, autoPo: false }));
    }
  };

  return (
    <div className="auto-po-container">
      <div className="box">
        <div className="box_shadow_div" style={{ overflow: "unset" }}>
          <div className="py-7 px-6">
            <div className="q_searchBar sticky z-index-2">
              <Grid container>
                <Grid item xs={12}>
                  <AsyncSelect
                    closeMenuOnSelect={true}
                    value={null}
                    loadOptions={productOptions}
                    onChange={(option) => {
                      getProductData(option.value, option.variantId);
                    }}
                    placeholder="Search Product by Title or UPC"
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          {/* {selectedProducts.length > 0 ? (
            <div className="z-index-1">
              {selectedProducts.length > 0 && (
                <>
                  <div className="flex border-b border-[#e8e8e8] py-4 px-6">
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
                      className={`flex border-b border-[#e8e8e8] py-5 px-6 purchase-addpo d-flex gap-2 ${
                        index % 2 === 0 ? "even" : "odd"
                      }`}
                    >
                      <p className="purchase-data-item text-[16px]">
                        {product?.title}
                        <br />
                        {product.variant ? (
                          <>
                            <span className="text-[14px]">
                              {product.variant}
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
              <div className="flex justify-between py-4 px-6">
                <div className="button-container start gap-4">
                  {purchaseInfo.selectedVendor && (
                    <button
                      onClick={handleAutoPO}
                      className="quic-btn quic-btn-add"
                      disabled={loaders.autoPo}
                    >
                      {loaders.autoPo ? (
                        <CircularProgress color={"inherit"} size={18} />
                      ) : (
                        "Auto PO"
                      )}
                    </button>
                  )}
                  {selectedProducts.length > 0 && (
                    <button
                      onClick={() => savePurchaseOrder("1")}
                      className="quic-btn quic-btn-draft"
                    >
                      {loaders.autoPo ? (
                        <CircularProgress color={"inherit"} size={18} />
                      ) : (
                        "Save as Draft"
                      )}
                    </button>
                  )}
                </div>
                {selectedProducts.length > 0 && (
                  <div className="button-container end gap-4">
                    <button
                      className="quic-btn quic-btn-save"
                      onClick={() => savePurchaseOrder("0")}
                    >
                      {loaders.autoPo ? (
                        <CircularProgress color={"inherit"} size={18} />
                      ) : (
                        "Create"
                      )}
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
            </div>
          ) : null} */}

          {selectedProducts.length > 0 ? (
            <Grid container className="z-index-1">
              <TableContainer>
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
                    {/* <StyledTableCell>Note</StyledTableCell> */}
                    <StyledTableCell></StyledTableCell>
                  </TableHead>
                  <TableBody>
                    {selectedProducts.map((product) => (
                      <StyledTableRow key={product?.id}>
                        <StyledTableCell>
                          <>
                            <p className="font-normal text-[16px] mb-0">
                              {product?.title}
                            </p>
                            <p className="font-light text-[15px] mb-3">
                              {product.variant ? product.variant : null}
                            </p>
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
                          </>
                        </StyledTableCell>
                        <StyledTableCell>
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
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="text-[16px]">{product?.finalQty}</p>
                        </StyledTableCell>
                        <StyledTableCell>
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
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="text-[16px]">${product?.finalPrice}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <p className="text-[16px]">{product?.upc}</p>
                        </StyledTableCell>
                        <StyledTableCell>
                          <img
                            src={DeleteIcon}
                            alt=""
                            className="w-8 h-8 cursor-pointer"
                            onClick={() => handleDelete(product?.id)}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
          ) : null}
          {purchaseInfo.selectedVendor || selectedProducts.length > 0 ? (
            <div className="flex justify-between w-full py-4 px-6">
              <div className="button-container start gap-4">
                {purchaseInfo.selectedVendor && (
                  <button
                    onClick={handleAutoPO}
                    className="quic-btn quic-btn-add"
                    disabled={loaders.autoPo}
                  >
                    {loaders.autoPo ? (
                      <CircularProgress color={"inherit"} size={18} />
                    ) : (
                      "Auto PO"
                    )}
                  </button>
                )}
                {selectedProducts.length > 0 && (
                  <button
                    onClick={() => savePurchaseOrder("1")}
                    className="quic-btn quic-btn-draft"
                  >
                    {loaders.saveAsDraft ? (
                      <CircularProgress color={"inherit"} size={18} />
                    ) : (
                      "Save as Draft"
                    )}
                  </button>
                )}
              </div>
              {selectedProducts.length > 0 && (
                <div className="button-container end gap-4">
                  <button
                    className="quic-btn quic-btn-save"
                    onClick={() => savePurchaseOrder("0")}
                  >
                    {loaders.createPo ? (
                      <CircularProgress color={"inherit"} size={18} />
                    ) : (
                      "Create"
                    )}
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
