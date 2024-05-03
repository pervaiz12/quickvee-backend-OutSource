import React, { useState } from "react";

import PurchaseTable from "./PurchaseTable";

import { AiOutlineSearch } from "react-icons/ai";
import AddPo from "./AddPo";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import { Grid } from "@mui/material";

const MainPurchase = () => {
  const [visible, seVisible] = useState("PurchaseTable");
  const [searchId, setSearchId] = useState(""); // State to track search ID

  const inputChange = (e) => {
    setSearchId(e.target.value);
    // console.log(searchId)
  };

  return (
    <>
      <div className="q-category-main-page">
        <div className="box">
          <div className="box_shadow_input">
            <Grid container className="py-5">
              <Grid item xs={12} className="px-5 ">
                <InputTextSearch 
                  placeholder="Search Purchase Order"
                  value={searchId}
                  handleChange={inputChange}
                  // handleSearchButton={''}
                />
              </Grid>
            </Grid>
            {/* <div className="q_main_data_range">
              <div className="q_searchBar">
                <div className="flex border  rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search Purchase Order"
                    value={searchId}
                    onChange={inputChange}
                    className="w-full px-4 py-2 border-none focus:outline-none place_text_search"
                  />

                  <button className="text-black px-4 py-2 focus:outline-none text-2xl">
                    <AiOutlineSearch className="h- w-8  text-[#231F20]" />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="q-category-main-page">
        <div className="box">
          {visible === "PurchaseTable" && (
            <PurchaseTable seVisible={seVisible} searchId={searchId} />
          )}
        </div>
      </div>
      {/* {visible === "AddPo" && <AddPo seVisible={seVisible} />} */}
    </>
  );
};

export default MainPurchase;
