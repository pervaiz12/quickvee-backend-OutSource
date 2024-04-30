import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";

import { BASE_URL } from "../../Constants/Config";

const ProductRow = ({
  product,
  index,
  Avail_Online,
  checkStatus,
  handleError,
}) => {


   const getStatusColorClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };
  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div
          key={index}
          className="q-attributes-bottom-attriButes-single-attributes"
        >
          <p className="product-table-sort purchaseData">
            <img src={SortIcon} alt="" className="" />
          </p>

          <p className="product-table-title purchaseData">
            <Link to="/product-add">{product.title}</Link>
          </p>

          <p className="product-table-items purchaseData">{product.category_name}</p>

          <div className="product-table-enable-disable purchaseData">
            <div className="">
              <label
                className="q_resigter_setting_section purchaseData"
                style={{ color: "#000", fontSize: "18px" }}
              >
                Delivery
                <input
                  type="checkbox"
                  id={"delivery_check" + product.id}
                  name="delivery_check"
                  checked={
                    product.show_type == 0 || product.show_type == 2
                      ? true
                      : false
                  }
                  value="2"
                  onChange={(event) => {
                    Avail_Online(event);
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label
                className="q_resigter_setting_section purchaseData"
                style={{ color: "#000", fontSize: "18px" }}
              >
                Pickup
                <input
                  type="checkbox"
                  id={"pickup_check" + product.id}
                  name="pickup_check"
                  checked={
                    product.show_type == 0 || product.show_type == 1
                      ? true
                      : false
                  }
                  value="1"
                  onChange={(event) => {
                    Avail_Online(event);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>

          <p className="product-table-title purchaseData" style={{ color: checkStatus(product.show_status).color }}>
            {checkStatus(product.show_status).text}
          </p>
          <div className="product-table-items ">
          
            <div className="mt-0 flex relative overflow-hidden">
              {product?.media
                ?.split(",")
                .slice(0, 4)
                .map((item, index) => (
                  <img
                    key={index}
                    className={`inline-block h-12 w-12 ring-2 ring-white rounded-full absolute${index === 3 ? 'opacity-50 ' : ''}`}
                    src={BASE_URL + "upload/products/MAL0100CA/" + item}
                    onError={handleError}
                    alt=""
                    style={{left:`${index*26}px`}}
                  />
                ))}
            </div>
            {product?.media?.split(",").length > 4 && (
              <div className="product_img_section">
               <a href="#" className="textMsg">
                  + {product.media.split(",").length - 4}<br/> Images
                </a> 
              </div>
            )}

           
          </div>
          <p className="product-table-btn ">
            <img src={DeleteIcon} alt=" " className="w-8 h-8" />
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductRow;
