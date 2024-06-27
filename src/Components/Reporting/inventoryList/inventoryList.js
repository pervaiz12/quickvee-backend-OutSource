import React from "react";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import InventoryLogic from "./InventoryLogic";
import Pagination from "./pagination";
export default function InventoryList() {
  const {
    handleChangeInventory,
    inventory,
    handleBlur,
    category,
    handleOptionClick,
    selectedCategory,
    message,
    searchProduct,
    handleLoadMore,
    laodMoreData,
    loader,
    sortByItemName
  } = InventoryLogic();
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12} >
          {/* <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">
                Top Sellers - Overall Top 10
              </div>
            </Grid>
          </Grid> */}
          {/* <Grid container sx={{ px: 2.5 }}>
            <Grid xs={12} sm={6} md={4}>
              <div className="q_details_header ">Filter by</div>
            </Grid>
          </Grid> */}
          <Grid container sx={{p:2.5}}>
            <Grid item xs={12}>
            <h1 style={{marginBottom:0}} className="heading ">Inventory List Report</h1>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }} >
            
            <Grid item xs={12} sm={6} md={4}>
              
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Search Product
              </label>

              {/* <div className=" qvrowmain my-1">
                      <label htmlFor="email">Email Address</label>
                    </div> */}
              <BasicTextFields
                type={"text"}
                name="product"
                value={inventory}
                placeholder="Search Product"
                onChangeFun={handleChangeInventory}
                required={"required"}
                onBlurFunction={() => handleBlur("product")}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="limitFilter">
                Limit
              </label>
              <SelectDropDown
                // listItem={limitList.map((item) => ({ title: item }))}
                title={"title"}
                dropdownFor={"limit"}
                // selectedOption={selectedLimitType}
                // onClickHandler={handleOptionClick}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="limitFilter">
                Category
              </label>
              <SelectDropDown
                heading={"All"}
                listItem={category}
                title={"title"}
                dropdownFor={"category"}
                selectedOption={selectedCategory}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Pagination
            searchProduct={searchProduct}
            message={message}
            handleLoadMore={handleLoadMore}
            laodMoreData={laodMoreData}
            loader={loader}
            sortByItemName={sortByItemName}
          />
        </Grid>
      </Grid>
    </>
  );
}
