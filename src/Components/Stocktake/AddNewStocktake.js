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
import { useState } from "react";
import { Button } from "react-bootstrap";

// end table imports ----------------------------------------------------
import AsyncSelect from "react-select/async";
import { useDispatch } from "react-redux";
import { fetchProductsData } from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import axios from "axios";
import { BASE_URL } from "../../Constants/Config";

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
const AddNewStocktake = ({ setVisible }) => {
  const dispatch = useDispatch();
  const { userTypeData } = useAuthDetails();
  const [selectedProducts, setSelectedProducts] = useState([]);
  console.log("setSelectedProducts", selectedProducts)
  const [productList, setProductList] = useState([
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
      discrepancy_cost: "",
      stocktake_item_id: "",
    },
  ]);
  const handleAddProduct = () => {
    setProductList([
      ...productList,
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
        discrepancy_cost: "",
        stocktake_item_id: "",
      },
    ]);
  };

  const handleDeleteProduct = (index) => {
    const newList = productList.filter((_, i) => i !== index);
    setProductList(newList);
  };

  const loadOptions = async (inputValue) => {
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
      console.log(res);
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

  const handleOnChangeSelectDropDown = async (productId,variantId,index)=>{
    console.log("option.value, option.variantId,index",productId,variantId,index)
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
  }

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
  return (
    <>
      <Grid container className="">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <div className="q-add-categories-section-header">
                <span
                  onClick={() => {
                    setVisible("StocktakeLiat");
                  }}
                  className="text-center items-center"
                >
                  <img
                    src={AddSvg}
                    alt="Add-New-Category"
                    className="h-9 w-9"
                  />
                  <span>New Stocktake</span>
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
                  {productList.map((product, index) => {
                    return (
                      <>
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            <div style={{ position: "relative", zIndex: 100 }}>
                              <AsyncSelect
                                loadOptions={loadOptions}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                onChange={(option)=>{handleOnChangeSelectDropDown(option.value, option.variantId,index)}}
                              />
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            {product.current_qty}
                          </StyledTableCell>
                          <StyledTableCell>{product.new_qty}</StyledTableCell>
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
                    //   setVisible(currentMerchant);
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
                    //   setVisible(currentMerchant);
                  }}
                  className="quic-btn quic-btn-save"
                >
                  Save as Draft
                </button>
              </Grid>
              <Grid item>
                <button
                  className="quic-btn quic-btn-save"
                  //   onClick={handleUpdateMerchant}
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
    </>
  );
};

export default AddNewStocktake;
