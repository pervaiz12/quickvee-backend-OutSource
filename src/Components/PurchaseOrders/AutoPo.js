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

const AutoPo = ({ purchaseInfo, setPurchaseInfoErrors, seVisible }) => {
  const dispatch = useDispatch();

  const { userTypeData } = useAuthDetails();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    console.log("purchaseInfo: ", purchaseInfo);
  }, [purchaseInfo]);

  useEffect(() => {
    console.log("selectedProducts: ", selectedProducts);
  }, [selectedProducts]);

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
      seVisible("PurchaseTable");
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
    const { issuedDate, stockDate, selectedVendor } = purchaseInfo;

    // validating purchase order info dataset
    const purchaseInfoDetails = [issuedDate, stockDate, selectedVendor].every(
      (a) => Boolean(a && a.trim())
    );

    // validating purchase order products dataset
    const validateProducts = selectedProducts.every(
      (prod) => prod.newQty && prod.newPrice
    );

    if (purchaseInfoDetails && validateProducts) {
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
        formData.append("merchant_id", "MAL0100CA");
        formData.append("admin_id", "MAL0100CA");
        formData.append("vendor_id", Number(purchaseInfo?.vendorId));
        formData.append("issue_date", purchaseInfo?.issuedDate);
        formData.append("stock_date", purchaseInfo?.stockDate);
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
          seVisible("PurchaseTable");
        } else {
          ToastifyAlert(response.data.message, "error");
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    } else {
      if (!purchaseInfoDetails) {
        setPurchaseInfoErrors((prev) => ({
          ...prev,
          issuedDate: issuedDate ? "" : "Issued Date is required",
          stockDate: stockDate ? "" : "Stock Due Date is required",
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
  };

  // Fetching Auto PO list
  const handleAutoPO = async () => {
    try {
      if (Number(purchaseInfo?.vendorId)) {
        const formData = new FormData();
        formData.append("merchant_id", "MAL0100CA");
        formData.append("admin_id", "MAL0100CA");
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
    }
  };

  return (
    <div className="auto-po-container">
      <div className="box">
        <div className="box_shadow_div" style={{ overflow: "unset" }}>
          <div className="mt-4 px-6">
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
                    placeholder="Search Product by Title"
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          <div className="q-category-bottom-detail-section z-index-1">
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
                      {product?.title}
                      <br />
                      {product.variant ? (
                        <>
                          <span className="text-[14px]">{product.variant}</span>
                          <br />
                        </>
                      ) : null}
                      <TextField
                        id="outlined-basic"
                        inputProps={{ type: "text" }}
                        value={product.notes}
                        onChange={(e) => handleProduct(e, product.id, "notes")}
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
            <div className="flex justify-between py-4 px-4">
              <div className="button-container start gap-4">
                {purchaseInfo.selectedVendor && (
                  <button
                    onClick={handleAutoPO}
                    className="quic-btn quic-btn-add"
                  >
                    Auto PO
                  </button>
                )}
                {selectedProducts.length > 0 && (
                  <button
                    onClick={() => savePurchaseOrder("1")}
                    className="quic-btn quic-btn-draft"
                  >
                    Save as Draft
                  </button>
                )}
              </div>
              {selectedProducts.length > 0 && (
                <div className="button-container end gap-4">
                  <button
                    className="quic-btn quic-btn-save"
                    onClick={() => savePurchaseOrder("0")}
                  >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPo;
