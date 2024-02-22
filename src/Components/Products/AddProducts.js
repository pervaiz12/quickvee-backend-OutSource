import React, { useState } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
// import DownIcon from "../../Assests/Dashboard/Down.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../Products/data";
import VariantAttributes from "./VariantAttributes";
import SearchIcon from "../../Assests/Filter/Search.svg";

const AddProducts = () => {
  const [searchId, setSearchId] = useState(""); // State to track search ID

  const handleSearch = () => {
    console.log("Search ID:", searchId);
  };
  const myStyles = {
    height: "300px",
    overflow: "auto",
  };

  const animatedComponents = makeAnimated();

  return (
    <>
      <div className="q-attributes-main-page">
        <div className="q-add-categories-section">
          <div className="q-add-categories-section-header">
            <span>
              <img src={AddNewCategory} alt="Add-New-Category" />
              <span>Add Product</span>
            </span>
          </div>
          <div className="q-add-categories-section-middle-form">
            <div className="q-add-categories-single-input">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" />
            </div>

            <div className="q-add-categories-single-input">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
              ></textarea>
            </div>

            <div className="q-add-categories-single-input">
              <label htmlFor="category">Category</label>
              <div
                className=""
                style={{ border: "1px solid #818181", borderRadius: "4px" }}
              >
                <input
                  type="text"
                  id="title"
                  name="title"
                  style={{ border: "none", width: "100%" }}
                />

                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <img
                    src={SearchIcon}
                    alt="Search"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  />
                </div>
               
              </div>
            </div>
          </div>
        </div>
      
      {/* 
          <div className="">
            <VariantAttributes />
          </div> */}

      <div className="q-add-categories-section-middle-footer">
        <div className="q-category-bottom-header-sticky">
          <button className="quic-btn quic-btn-save">Update</button>
          <button className="quic-btn quic-btn-cancle">Cancel</button>
        </div>
      </div>
      </div>
      
     
    </>
  );
};

export default AddProducts;
