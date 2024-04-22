import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";

import { BASE_URL } from "../../Constants/Config";



const ProductRow= ({product ,index,Avail_Online,checkStatus,handleError})=>{
    return <>
      <div className="q-category-bottom-detail-section">
     <div key={index} className="q-attributes-bottom-attriButes-single-attributes">
        
        <p className="product-table-sort"><img src={SortIcon} alt="" className="" /></p>
                 
        <p className="product-table-title"><Link to="/product-add">{product.title}</Link></p>
               
        <p className="product-table-items">{product.category_name}</p>
               
                  
        <div className="product-table-enable-disable">
                  <div className="">
                    <label className="q_resigter_setting_section" style={{color:"#000",fontSize:"18px"}}>Delivery
                      <input type="checkbox"  
                              id={"delivery_check"+product.id}
                              name="delivery_check"
                              checked= {(product.show_type == 0 || product.show_type == 2) ? true : false}
                              value="2"
                              onChange={(event) => {Avail_Online(event);}} 
                      />
                      <span className="checkmark"></span></label>
                    <label className="q_resigter_setting_section" style={{color:"#000",fontSize:"18px"}}>Pickup
                      <input type="checkbox"
                            id={"pickup_check"+product.id}
                            name="pickup_check"
                            checked= {(product.show_type == 0 || product.show_type == 1) ? true : false}
                            value="1"
                            onChange={(event) => {Avail_Online(event);}} 
                      />
                      <span className="checkmark"></span></label>
                  </div>
                  </div>
                  
        <p className="product-table-title">{checkStatus(product.show_status)}    </p>
                 
        <div className="product-table-items ">


                  <div className="flex items-center space-x-2 text-base">
        
                  </div>
                  <div className="mt-3 flex -space-x-2 overflow-hidden">
                    { 
                    product?.media?.split(",").slice(0, 4).map((item, index) => (
                        
                        <img key={index} className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={BASE_URL+"upload/products/MAL0100CA/"+item} onError={handleError}  alt=""/>
                      ))}
                  </div>
                  {( product?.media?.split(",").length>4) ? (
                      <div className="mt-3 text-sm font-medium">
                        <a href="#" className="text-blue-500">+ {product.media.split(",").length - 4 } others</a>
                      </div>
                    ): ''
                  }
                  
                  

                  </div>
        <p className="product-table-btn "><img src={DeleteIcon} alt=" " className="w-10 h-10" /></p>
                </div>
      </div>
    </>
}   

export default ProductRow;