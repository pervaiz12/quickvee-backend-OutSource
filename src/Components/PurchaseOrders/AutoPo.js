import React, { useState, useRef, useEffect, useMemo } from "react";

import SearchIcon from "../../Assests/Filter/Search.svg";
import DeleteIcon from "../../Assests/Dashboard/deleteIcon.svg";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import { FormControl } from "@mui/material";
import { TextField, InputAdornment, Grid, IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  fetchProductsData,
} from "../../Redux/features/Product/ProductSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import AsyncSelect from "react-select/async";

const AutoPo = ({ value, maxLength, onChangeFun, type }) => {
  const dispatch = useDispatch();

  const { userTypeData } = useAuthDetails();

  const [searchId, setSearchId] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductList, setShowProductList] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const allProducts = useSelector(
    (state) => state.productsListData?.productsData
  );

  const inputRef = useRef(null);

  const handleInputClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 1000, behavior: "smooth" });
    // console.log("hi..");
  };

  // Dummy products
  // const dummyProducts = [
  //   {
  //     id: 1,
  //     name: "Monster Bong - v200",
  //     description: "8â€/Pink",
  //     qty: 15,
  //     costPerUnit: 100.0,
  //     total: 1500.0,
  //     upc: "HHJJ78789",
  //   },
  //   {
  //     id: 2,
  //     name: "Another Product",
  //     description: "8â€/Pink",
  //     qty: 10,
  //     costPerUnit: 50.0,
  //     total: 500.0,
  //     upc: "ABC123",
  //   },
  //   {
  //     id: 3,
  //     name: "Vape Product",
  //     description: "8â€/Pink",
  //     qty: 10,
  //     costPerUnit: 50.0,
  //     total: 500.0,
  //     upc: "DEF456",
  //   },
  //   {
  //     id: 4,
  //     name: "Purchase Product",
  //     description: "8â€/Pink",
  //     qty: 10,
  //     costPerUnit: 50.0,
  //     total: 500.0,
  //     upc: "GHI789",
  //   },
  // ];

  // const handleInputChange = (event, product) => {
  //   const inputValue = value !== null ? product?.name : event.target.value;

  //   console.log("inputValue: ", inputValue, product);
  //   if (inputValue) {
  //     setSearchId(inputValue);

  //     let name_data = {
  //       merchant_id: "MAL0100CA",
  //       category_id: "all",
  //       show_status: "all",
  //       listing_type: 1,
  //       offset: 0,
  //       limit: 100000,
  //       name: inputValue,
  //       page: 0,
  //       ...userTypeData,
  //     };

  //     dispatch(fetchProductsData(name_data));
  //   }
  // };

  // useEffect(() => {
  //   if (allProducts && allProducts.length > 0) {
  //     // const filteredProducts = allProducts?.filter((product) =>
  //     //   product.name.toLowerCase().includes(searchId.toLowerCase())
  //     // );

  //     console.log("allProducts: ", allProducts);

  //     setProducts(allProducts ?? []);
  //     setShowProductList(true);
  //     // console.log("showing products list...");
  //   }
  // }, [allProducts]);

  // setting products for Purchase Order
  useEffect(() => {
    if (selectedProducts.length > 0 && allProducts.length > 0) {
      setShowProductList(() => true);

      // console.log("allProducts: ", allProducts);
      // console.log("selectedProducts: ", selectedProducts);

      let filterProducts = [];
      selectedProducts.forEach((prod) => {
        allProducts.forEach((item) => {
          if (item.var_id === prod.value || item.id === prod.value) {
            filterProducts.push(item);
          }
        });
      });

      // console.log("filterProducts: ", filterProducts);
      setProducts(() => filterProducts);
    }
  }, [selectedProducts, allProducts]);

  const handleCancel = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all products?"
    );
    if (confirmDelete) {
      setProducts([]);
      setShowProductList(false);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      const updatedProducts = products?.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  const handleAutoPoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      // console.log("res: ", res.payload);

      const data = res.payload
        ?.filter((prod) =>
          prod.title.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((prod) => ({
          label: prod.title,
          value: prod.isvarient === "1" ? prod.var_id : prod.id,
        }));

      return data;
    }
  };

  return (
    <div className="auto-po-container">
      <div className="box">
        <div className="box_shadow_div" style={{ overflow: "unset" }}>
          <div className="my-4 px-6">
            <div className="q_searchBar sticky" onClick={handleAutoPoClick}>
              <Grid container>
                <Grid item xs={12}>
                  <AsyncSelect
                    closeMenuOnSelect={false}
                    value={null}
                    loadOptions={productOptions}
                    onChange={(option) =>
                      setSelectedProducts((prev) => [...prev, option])
                    }
                    placeholder="Search Product by Title"
                  />
                  {/* <Autocomplete
                    fullWidth
                    value={searchId} // Ensure searchId is properly set and controlled
                    onChange={(event, value) => {
                      console.log("hoho");
                      handleInputChange(event, value);
                    }}
                    options={allProducts}
                    getOptionLabel={(product) => product.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={inputRef}
                        fullWidth
                        variant="outlined"
                        placeholder="Search for a product..."
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton edge="start" aria-label="search">
                                <img
                                  src={SearchIcon}
                                  alt="Search"
                                  className="px-2"
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onClick={handleInputClick}
                      />
                    )}
                  /> */}
                </Grid>
              </Grid>
            </div>
          </div>
          {showProductList && (
            <div className="q-category-bottom-detail-section">
              <div className="q-add-purchase-section-header">
                <p className="purchase-data-item">Item Name</p>
                <p className="purchase-data-qty">Qty</p>
                <p className="purchase-data-after">After</p>
                <p className="purchase-data-unit">Cost Per Unit</p>
                <p className="purchase-data-total">Total</p>
                <p className="purchase-data-upc">UPC</p>
                <p className="purchase-data-delete"></p>
              </div>
              {products.map((product, index) => (
                <div
                  key={product?.id}
                  className={`q-category-bottom-categories-single-category  purchase-addpo ${
                    index % 2 === 0 ? "even" : "odd"
                  }`}
                >
                  <p className="purchase-data-item text-[18px]">
                    {product?.title}
                    <br />
                    {/* <span className="text-[12px]">{product?.description}</span> */}
                    {/* <br /> */}
                    <a href="" className="add_notes_purchase_data">
                      Add Note
                    </a>
                  </p>
                  <p className="purchase-data-qty">
                    <Grid container>
                      <Grid item xs={10}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-basic"
                            value={value}
                            inputProps={{ maxLength: maxLength, type: type }}
                            onChange={onChangeFun}
                            variant="outlined"
                            size="small"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </p>
                  <p className="purchase-data-after mt-3">{product?.qty}</p>
                  <p className="purchase-data-unit">
                    <Grid container>
                      <Grid item xs={10}>
                        <FormControl fullWidth>
                          <TextField
                            id="outlined-basic"
                            value={value}
                            inputProps={{ maxLength: maxLength, type: type }}
                            onChange={onChangeFun}
                            variant="outlined"
                            size="small"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </p>
                  <p className="purchase-data-total mt-3">
                    ${product?.total?.toFixed(2)}
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
              <div className="flex justify-between py-4 px-4">
                <div className="button-container start gap-4">
                  <button className="quic-btn quic-btn-add">Auto PO</button>
                  <button className="quic-btn quic-btn-draft">
                    Save as Draft
                  </button>
                </div>
                <div className="button-container end gap-4">
                  <button className="quic-btn quic-btn-save">Create</button>
                  <button
                    onClick={handleCancel}
                    className="quic-btn quic-btn-cancle"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoPo;
