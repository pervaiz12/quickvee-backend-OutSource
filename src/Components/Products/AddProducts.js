import React from "react";
// import { AiOutlineSearch } from "react-icons/ai";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
// import DownIcon from "../../Assests/Dashboard/Down.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../Products/data";
import VariantAttributes from "./VariantAttributes";

const AddProducts = () => {
  const animatedComponents = makeAnimated();

  return (
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
            <label htmlFor="tax">Taxes</label>

            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={colourOptions}
              isMulti
              options={colourOptions}
            />
          </div>

          <div className="q-add-categories-single-input">
            <label htmlFor="related-product">Related Products</label>

            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={{}}
              isMulti
              options={colourOptions}
            />
          </div>

          <div className="q-add-categories-single-input">
            <div className="related-product">Product Images</div>
            <div className="q_product_image">
              Select Default Image if in case some color image is not available.
            </div>

            <div class="flex items-center justify-start border-2 border-dashed border-[#BFBFBF] bg-white rounded-lg my-6  relative  cursor-pointer py-8 px-5">
              <div
                class="flex-column px-6 py-8 mr-2 text-center block"
                style={{
                  border: "1px solid #0A64F9",
                  textAlign: "-webkit-center",
                }}
              >
                <img
                  src="/static/media/upload.d0340e89a6b522da802f2f2890864a13.svg"
                  alt="Default"
                  className=""
                />
                <span className="text-[#0A64F9] font-normal text-sm">
                  Choose Files
                </span>
              </div>
              <div class="q-add-categories-single-input">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  class="default-img-inputfield"
                />
              </div>
            </div>
          </div>

          <div className="">
            <VariantAttributes />
          </div>

          <div className="q-add-categories-section-middle-footer">
            <div className="q-category-bottom-header-sticky">
              <button className="quic-btn quic-btn-save">Update</button>
              <button className="quic-btn quic-btn-cancle">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
