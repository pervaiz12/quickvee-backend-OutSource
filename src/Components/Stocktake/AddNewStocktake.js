import { CircularProgress, Grid } from "@mui/material";
import AddSvg from "../../Assests/Dashboard/Left.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
//       table imports ----------------------------------------------------
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

// end table imports ----------------------------------------------------
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import axios from "axios";
import { BASE_URL, CREATE_UPDATE_STOCKTAKE } from "../../Constants/Config";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import DeleteModal from "../../reuseableComponents/DeleteModal";
import AlertModal from "../../reuseableComponents/AlertModal";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { fetchSingleStocktakeData } from "../../Redux/features/Stocktake/StocktakeListSlice";
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
    fontFamily: "CircularSTDMedium",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDMedium",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));
const AddNewStocktake = ({
  setVisible,
  // singleStocktakeState,
  // setSingleStocktakeState,
  // gotDatafromPo,
  getSingleStocktakeData,
  // merchant_id,
  // setDataFromPo,
}) => {
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const singleStocktakeStateFromRedux = useSelector(
    (state) => state.stocktakeList
  );
  // console.log("singleStocktakeStateFromRedux", singleStocktakeStateFromRedux);

  const [singleStocktakeState, setSingleStocktakeState] = useState();

  const [gotDatafromPo, setDataFromPo] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("singleStocktakeStateFromRedux", singleStocktakeState);
  // console.log("gotDatafromPo", gotDatafromPo);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [initialDropdownProducts, setInitialDropdownProducts] = useState([]);
  console.log("initialDropdownProducts", initialDropdownProducts);
  const [stocktake_items, setProductList] = useState([
    {
      upc: "",
      category_id: "",
      product_id: "",
      variant_id: "",
      product_name: "",
      variant: "",
      current_qty: "",
      new_qty: "",
      discrepancy: "",
      discrepancy_cost: "0",
      stocktake_item_id: "",
      price: "",
    },
  ]);

  const location = useLocation();
  // console.log("location", location.pathname);
  const { id } = useParams();

  // console.log("stock id",id)
  useEffect(() => {
    if (id && location.pathname !== "/stocktake/AddStocktake") {
      dispatch(fetchSingleStocktakeData({ merchant_id, id, userTypeData }));
    }
  }, [id]);

  useEffect(() => {
    if (
      !singleStocktakeStateFromRedux.loading &&
      singleStocktakeStateFromRedux.singleStocktakeState &&
      location.pathname !== "/stocktake/AddStocktake"
    ) {
      setSingleStocktakeState(
        singleStocktakeStateFromRedux.singleStocktakeState
      );
    }
  }, [
    singleStocktakeStateFromRedux.loading,
    singleStocktakeStateFromRedux.singleStocktakeState,
  ]);

  useEffect(() => {
    if (
      !singleStocktakeStateFromRedux.loading &&
      singleStocktakeStateFromRedux.gotDatafromPo
    ) {
      setDataFromPo(singleStocktakeStateFromRedux.gotDatafromPo);
    }
  }, [
    singleStocktakeStateFromRedux.loading,
    singleStocktakeStateFromRedux.gotDatafromPo,
  ]);

  useEffect(() => {
    if (singleStocktakeState) {
      const newStocktakeItems = singleStocktakeState?.stocktake_item.map(
        (item, index) => ({
          upc: item.upc || "", //
          category_id: item.category_id || "", //
          product_id: item.product_id || "", //
          variant_id: item.variant_id || "", //
          product_name: item.product_name || "", //
          variant: item.variant || "", //
          current_qty: item.current_qty || "", //
          new_qty: item.new_qty || "", //
          discrepancy: item.discrepancy || "", //
          discrepancy_cost: item.discrepancy_cost || "0", //
          stocktake_item_id: item.id || "",
          price: gotDatafromPo[index]?.price || "",
        })
      );
      setProductList(newStocktakeItems);
    }
  }, [singleStocktakeState]);
  
  // useEffect(() => {
   
  //   loadOptions(" ");
  // }, []);

  const loadOptions = async (inputValue) => {
    let name_data = {
      merchant_id: merchant_id,
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
    setSelectedProducts(res.payload);
    const data = res.payload?.map((prod) => ({
      label: prod.title,
      value: prod.var_id || prod.id,
      variantId: prod.isvarient === "1" ? prod.var_id : null,
      prodId: prod.id,
    }));
    console.log("loadOptions", data);
    return data;
  };
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

  const [errorMessages, setErrorMessages] = useState([]);
  const validate = () => {
    const errors = [];
    let isValid = true;
    stocktake_items.forEach((item, index) => {
      const itemErrors = {};
      if (!item.product_name) {
        itemErrors.product_name = "Please select item.";
        isValid = false;
      }
      if (!item.new_qty) {
        itemErrors.new_qty = "Please enter new quantity.";
        isValid = false;
      }
      errors[index] = itemErrors;
    });
    setErrorMessages(errors);
    return isValid;
  };
  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };
  // console.log("setSelectedProductsList", stocktake_items);
  // console.log("setSelectedProducts", selectedProducts);
  const handleAddProduct = () => {
    if (validate()) {
      setProductList([
        ...stocktake_items,
        {
          upc: "",
          category_id: "", //
          product_id: "",
          variant_id: "",
          product_name: "", //
          variant: "",
          current_qty: "",
          new_qty: "",
          discrepancy: "0",
          discrepancy_cost: "0",
          stocktake_item_id: "",
          price: "",
        },
      ]);
      setErrorMessages([]);
    }
  };

  const handleDeleteProduct = (index) => {
    // const newList = stocktake_items.filter((_, i) => i !== index);
    // setProductList(newList);
    setDeleteCategoryId(index);
    setDeleteModalOpen(true);
  };
  // console.log(
  //   "confirmDeleteCategorysingleStocktakeState",
  //   singleStocktakeState.stocktake_item
  // );
  const confirmDeleteCategory = async () => {
    // Check if the singleStocktakeState object and stocktake_item array are present
    if (
      !singleStocktakeState ||
      !singleStocktakeState.stocktake_item ||
      singleStocktakeState.stocktake_item.length === 0
    ) {
      // If singleStocktakeState or stocktake_item array is empty, filter the stocktake_items array and update the state
      const newList = stocktake_items.filter((_, i) => i !== deleteCategoryId);
      setProductList(newList);

      // Close the delete modal
      setDeleteModalOpen(false);
      return;
    }

    try {
      const { token, ...otherUserData } = userTypeData;
      const filteredStocktakeItems = singleStocktakeState.stocktake_item.filter(
        (_, i) => i !== deleteCategoryId
      );

      const total_qty = filteredStocktakeItems.reduce(
        (sum, item) => sum + Number(item.new_qty || 0),
        0
      );
      const total_discrepancy_cost = filteredStocktakeItems.reduce(
        (sum, item) => sum + Number(item.discrepancy_cost || 0),
        0
      );
      const total_discrepancy = filteredStocktakeItems.reduce(
        (sum, item) => sum + Number(item.discrepancy || 0),
        0
      );

      // Check if the item to be deleted is in the original stocktake_item list
      const itemToDelete = stocktake_items[deleteCategoryId];
      // console.log("itemToDelete ",itemToDelete)
      const isOriginalItem = singleStocktakeState.stocktake_item.some(
        (item) => item.id === itemToDelete.stocktake_item_id
      );
      // console.log("isOriginalItem isOriginalItem ",isOriginalItem)
      if (isOriginalItem) {
        const formData = {
          merchant_id: merchant_id,
          stocktake_id: singleStocktakeState.id,
          stocktake_item_id: itemToDelete.stocktake_item_id,
          total_qty,
          total_discrepancy,
          total_discrepancy_cost: total_discrepancy_cost.toFixed(2),
        };

        const response = await axios.post(
          BASE_URL + "Stocktake_react_api/delete_stocktake_item",
          { ...formData, ...otherUserData },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          const newList = stocktake_items.filter(
            (_, i) => i !== deleteCategoryId
          );
          setProductList(newList);
          setSingleStocktakeState({
            ...singleStocktakeState,
            stocktake_item: filteredStocktakeItems,
            total_qty: total_qty,
            total_discrepancy: total_discrepancy,
            total_discrepancy_cost: total_discrepancy_cost,
          });
          // setProductList(newList);
          ToastifyAlert(response.data.message, "success");
        } else {
          console.log("Product Not available!");
          ToastifyAlert(response.data.message, "error");
        }
      } else {
        // If the item is newly added, just remove it from the list
        const newList = stocktake_items.filter(
          (_, i) => i !== deleteCategoryId
        );
        setProductList(newList);
      }
    } catch (e) {
      console.log("e: ", e);
    }

    setDeleteCategoryId(null);
    setDeleteModalOpen(false);
  };

  const handleNewQtyChange = (e, index) => {
    const { value } = e.target;
    setProductList((prevList) => {
      const updatedList = [...prevList];
      const currentQty = updatedList[index].current_qty;
      const newQty = value;
      const unitPrice = updatedList[index]?.price;
      const discrepancy = newQty ? newQty - currentQty : 0;
      const discrepancyCost = discrepancy * unitPrice;

      updatedList[index] = {
        ...updatedList[index],
        new_qty: newQty,
        discrepancy: discrepancy,
        discrepancy_cost: discrepancyCost,
      };
      return updatedList;
    });
    setErrorMessages((prevErrors) => {
      const updatedErrors = [...prevErrors];
      if (!value) {
        updatedErrors[index] = {
          ...updatedErrors[index],
          new_qty: "Please enter new quantity.",
        };
      } else {
        delete updatedErrors[index]?.new_qty;
      }
      return updatedErrors;
    });
  };
  const handleOnChangeSelectDropDown = async (productId, variantId, index) => {
    console.log("onChangeSelectDropDown", productId, variantId);
    const productExists = stocktake_items.some((item) =>
      item.variant !== ""
        ? item.variant_id === variantId
        : item.product_id === productId
    );
    // console.log("Product exists", productExists);
    if (productExists) {
      // Show an error message or handle it as needed
      showModal("Product is already added.");

      return;
    }
    try {
      const formData = new FormData();
      formData.append("merchant_id", merchant_id);
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
          console.log(
            "Product variant",
            response.data.data.product_variants,
            "variantId",
            variantId
          );

          obj.newPrice =
            parseFloat(product.price) > 0 ? parseFloat(product.price) : 0;
          obj.finalQty = Number(product.quantity) ?? 0;
          const sortedProduct = selectedProducts.find(
            (prod) => prod.var_id === product.id
          );

          // console.log("Sorted products", sortedProduct);
          setProductList((prevList) => {
            const updatedList = [...prevList];
            updatedList[index] = {
              ...updatedList[index],
              upc: product?.upc || "", //
              category_id: sortedProduct?.cotegory || "", //
              product_id: product?.product_id || "", //
              variant_id: product?.id || "", //
              product_name: sortedProduct?.title || "", //
              variant: product?.variant || "", //
              current_qty: product?.quantity || "", //
              stocktake_item_id: "0" || "",
              price: product?.price || "",
              new_qty: "",
              discrepancy: "0",
              // variant_id: "",
            };
            return updatedList;
          });
        } else {
          const product = response.data.data.productdata;
          console.log("product price", product);
          obj.newPrice =
            parseFloat(product.price) > 0 ? parseFloat(product.price) : 0;
          obj.finalQty = Number(product.quantity) ?? 0;

          setProductList((prevList) => {
            const updatedList = [...prevList];
            updatedList[index] = {
              ...updatedList[index],
              upc: product.upc || "", //
              category_id: selectedProducts[0]?.cotegory || "", //
              product_id: product.id || "", //
              product_name: product.title || "", //
              current_qty: product.quantity || "", //
              stocktake_item_id: "0" || "",
              price: product?.price || "",
              new_qty: "",
              discrepancy: "0",
            };
            return updatedList;
          });
        }
      } else {
        console.log("Product Not available!");
      }
    } catch (e) {
      console.log("e: ", e);
    }
    setErrorMessages((prevErrors) => {
      const updatedErrors = [...prevErrors];
      if (!productId) {
        updatedErrors[index] = {
          ...updatedErrors[index],
          product_name: "Please select item.",
        };
      } else {
        delete updatedErrors[index]?.product_name;
      }
      return updatedErrors;
    });
  };

  const handleCreateStocktake = async (stocktakeStatus) => {
    if (validate()) {
      const total_qty = stocktake_items.reduce(
        (sum, item) => sum + Number(item.new_qty || 0),
        0
      );
      const total_discrepancy_cost = stocktake_items.reduce(
        (sum, item) => sum + Number(item.discrepancy_cost || 0),
        0
      );
      const total_discrepancy = stocktake_items.reduce(
        (sum, item) => sum + Number(item.discrepancy || 0),
        0
      );
      const padToTwoDigits = (num) => num.toString().padStart(2, "0");
      const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = padToTwoDigits(date.getMonth() + 1);
        const day = padToTwoDigits(date.getDate());
        const hours = padToTwoDigits(date.getHours());
        const minutes = padToTwoDigits(date.getMinutes());
        const seconds = padToTwoDigits(date.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };
      const datetime = formatDateTime(new Date());
      const updatedStocktakeItem = stocktake_items?.reduce(
        (acc, curr, index) => {
          acc[index] = curr;
          return acc;
        },
        {}
      );
      const stocktakeData = {
        merchant_id: merchant_id, //
        total_qty,
        total_discrepancy_cost: total_discrepancy_cost.toFixed(2),
        total_discrepancy, //
        status: stocktakeStatus,
        datetime: datetime,
        stocktake_items: JSON.stringify(updatedStocktakeItem),
        stocktake_id: singleStocktakeState ? singleStocktakeState.id : "0", //
      };

      // console.log("stocktakeData", stocktakeData);
      try {
        const { token, ...otherUserData } = userTypeData;
        const response = await axios.post(
          BASE_URL + CREATE_UPDATE_STOCKTAKE,
          { ...stocktakeData, ...otherUserData },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          ToastifyAlert(response.data.message, "success");
        } else {
          ToastifyAlert(response.data.message, "error");
        }
      } catch (error) {
        console.error("Error creating stocktake:", error);
      }
      // setVisible("StocktakeList");
      navigate(-1);
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
    }),
  };

  const handleKeyPress = (e) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };
  // console.log("singleStocktakeState", singleStocktakeState);
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <div className="q-add-categories-section-header">
                <span
                  onClick={() => {
                    // setVisible("StocktakeList");
                    navigate(-1);
                    setSingleStocktakeState();
                  }}
                  className="text-center items-center"
                >
                  <img
                    src={AddSvg}
                    alt="Add-New-Category"
                    className="h-9 w-9"
                  />
                  <span>
                    {singleStocktakeState ? "Update" : "New"} Stocktake
                  </span>
                  <p className="px-2">
                    {singleStocktakeState && singleStocktakeState?.st_id}
                  </p>
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ py: 2.5 }}>
          <Grid item xs={12}>
            <TableContainer>
              <StyledTable aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell>Current Qty</StyledTableCell>
                  <StyledTableCell>New Qty</StyledTableCell>
                  <StyledTableCell>Discrepency</StyledTableCell>
                  <StyledTableCell>UPC</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableHead>
                <TableBody>
                  {stocktake_items.map((product, index) => {
                    return (
                      <>
                        <StyledTableRow key={index}>
                          <StyledTableCell sx={{ width: "40%" }}>
                            <div style={{ position: "relative", zIndex: 100 }}>
                              {/* <Button>
                                {product.product_name || product.title}
                              </Button> */}
                              <AsyncSelect
                                loadOptions={loadOptions}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                onChange={(option) => {
                                  handleOnChangeSelectDropDown(
                                    option.prodId,
                                    option.variantId,
                                    index
                                  );
                                }}
                                value={{
                                  label: product && product?.product_name,
                                  value:
                                    (product && product?.var_id) || product?.id,
                                }}
                              />
                              {errorMessages[index]?.product_name && (
                                <div className="error">
                                  {errorMessages[index].product_name}
                                </div>
                              )}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            {product.current_qty}
                          </StyledTableCell>
                          <StyledTableCell sx={{ width: "15%" }}>
                            <BasicTextFields
                              value={product.new_qty}
                              onChangeFun={(e) => {
                                handleNewQtyChange(e, index);
                              }}
                              onKeyPressFun={handleKeyPress}
                            />
                            {errorMessages[index]?.new_qty && (
                              <div className="error">
                                {errorMessages[index].new_qty}
                              </div>
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {product.discrepancy}
                          </StyledTableCell>
                          <StyledTableCell>{product.upc}</StyledTableCell>
                          <StyledTableCell>
                            <img
                              src={DeleteIcon}
                              onClick={() => handleDeleteProduct(index)}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    );
                  })}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2.5 }}
        >
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <button
                  onClick={() => {
                    // setVisible("StocktakeList");
                    navigate(-1);
                  }}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </Grid>
              <Grid item>
                <button
                  className="quic-btn quic-btn-save"
                  onClick={handleAddProduct}
                  //   disabled={loader}
                >
                  Add
                  {/* {loader ? <CircularProgress /> : "Update"} */}
                </button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <button
                  onClick={() => {
                    handleCreateStocktake("1");
                  }}
                  className="quic-btn quic-btn-save"
                >
                  Save as Draft
                </button>
              </Grid>
              <Grid item>
                <button
                  className="quic-btn quic-btn-save"
                  onClick={() => {
                    handleCreateStocktake("0");
                  }}
                  //   disabled={loader}
                >
                  Create
                  {/* {loader ? <CircularProgress /> : "Update"} */}
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DeleteModal
        headerText="Stocktake"
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={confirmDeleteCategory}
      />
      <AlertModal
        headerText={alertModalHeaderText}
        open={alertModalOpen}
        onClose={() => {
          setAlertModalOpen(false);
        }}
      />
    </>
  );
};

export default AddNewStocktake;
