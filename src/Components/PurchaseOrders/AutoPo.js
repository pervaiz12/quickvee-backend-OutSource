import React, { useState, useRef } from "react";

import SearchIcon from "../../Assests/Filter/Search.svg";
import DeleteIcon from "../../Assests/Dashboard/deleteIcon.svg";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import { FormControl } from "@mui/material";
import { TextField, InputAdornment, Grid, IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const AutoPo = ({ value, maxLength, onChangeFun, type }) => {
  const [searchId, setSearchId] = useState("select Item");
  const [products, setProducts] = useState([]);
  const [showProductList, setShowProductList] = useState(false);


  const inputRef = useRef(null);

  const handleInputClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 1000, behavior: 'smooth' });
  };




  const handleSearch = () => {
    console.log("helo", showProductList);
    setShowProductList(true);
  };

  // Dummy products
  const dummyProducts = [
    {
      id: 1,
      name: "Monster Bong - v200",
      description: "8â€/Pink",
      qty: 15,
      costPerUnit: 100.0,
      total: 1500.0,
      upc: "HHJJ78789",
    },
    {
      id: 2,
      name: "Another Product",
      description: "8â€/Pink",
      qty: 10,
      costPerUnit: 50.0,
      total: 500.0,
      upc: "ABC123",
    },
    {
      id: 3,
      name: "Vape Product",
      description: "8â€/Pink",
      qty: 10,
      costPerUnit: 50.0,
      total: 500.0,
      upc: "DEF456",
    },
    {
      id: 4,
      name: "Purchase Product",
      description: "8â€/Pink",
      qty: 10,
      costPerUnit: 50.0,
      total: 500.0,
      upc: "GHI789",
    },
  ];
  // const handleSearch = () => {

  //   if (searchId !== "") {
  //     const filteredProducts = dummyProducts.filter(product => {
  //       // Check if the searchValue matches either the ID or name of the product
  //       return product.id === parseInt(searchId) || product.name.toLowerCase().includes(searchId);
  //     });

  //     if (filteredProducts) {
  //       setProducts(filteredProducts);
  //       setShowProductList(true);
  //     } else {
  //       console.log("No matching products found");
  //       setShowProductList(false);
  //     }
  //   } else {
  //     console.log("Please enter a valid ID or name");
  //     setShowProductList(false);
  //   }
  // };

  // console.log("HELLO",searchId)

  const handleInputChange = (event, product) => {
    const inputValue = value !== null ? product.name : event.target.value;
    setSearchId(inputValue);
    // Filter products based on input value
    const filteredProducts = dummyProducts.filter(product =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setProducts(filteredProducts);
    setShowProductList(true);
  };

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
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  const handleContainerClick = (e) => {
    e.preventDefault();
  };

  const handleAutoPoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const handleBlur = () => {
  //   setShowProductList(false); // Hide product list on blur
  // };

  return (
    <div className="auto-po-container">
      <div className="box">
        <div className="box_shadow_div">
          <div className="my-4 px-6">
            <div className="q_searchBar sticky" onClick={handleAutoPoClick}>
              <div className="">
                {/* <input
                  type="text"
                  placeholder="Start typing SKU or Product Name"
                  value={searchId}
                  onChange={handleInputChange}
                  className="w-full py-2 border-none focus:outline-none place_text_search  cursor-pointer"
                /> */}

                <Grid container>
                  <Grid item xs={12}>
                    <Autocomplete
                      fullWidth
                      value={searchId} // Ensure searchId is properly set and controlled
                      onChange={(event, value) => {
                        handleInputChange(event, value);
                        
                      }}
                      options={dummyProducts}
                      getOptionLabel={(product) => product.name}
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
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>

          {showProductList && (
            <div
              className="q-category-bottom-detail-section"
              onClick={handleContainerClick}
            >
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
                  key={product.id}
                  className={`q-category-bottom-categories-single-category  purchase-addpo ${index % 2 === 0 ? "even" : "odd"
                    }`}
                >
                  <p className="purchase-data-item text-[18px]">
                    {product.name}
                    <br />
                    <span className="text-[12px]">{product.description}</span>
                    <br />
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
                  <p className="purchase-data-after mt-3">{product.qty}</p>
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
                    ${product.total.toFixed(2)}
                  </p>
                  <p className="purchase-data-upc mt-3">{product.upc}</p>
                  <p className="purchase-data-delete">
                    <img
                      src={DeleteIcon}
                      alt=""
                      className="w-8 h-8 cursor-pointer"
                      onClick={() => handleDelete(product.id)}
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
