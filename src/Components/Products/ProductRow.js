import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";

import { BASE_URL } from "../../Constants/Config";



const ProductRow= ({product ,index,Avail_Online,checkStatus,handleError})=>{
    return <>
     <div key={index} className="q-attributes-bottom-attriButes-single-attributes">
                  <p className="categories-sort"><img src={SortIcon} alt="" className="" /></p>
                  <p className="categories-sort"></p>
                  <p className="categories-title"><Link to="/product-add">{product.title}</Link></p>
                  <p className="categories-sort"></p>
                  <p className="categories-title">{product.category_name}</p>
                  <p className="categories-sort"></p>
                  
                  <div className="categories-title">
                  <div className="flex flex-wrap gap-3 ">
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
                  <p className="categories-sort"></p>
                  <p className="categories-title">{checkStatus(product.show_status)}    </p>
                  <p className="categories-sort"></p>
                  <div className="categories-items" style={{width:"50%"}}>


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
                  <p className=""><img src={DeleteIcon} alt=" " className="w-16 h-16" /></p>
                </div>
    </>
}   

export default ProductRow;