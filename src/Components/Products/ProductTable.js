import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
// import EditIcon from "../../Assests/Category/editIcon.svg";
 import SortIcon from "../../Assests/Category/Sorting.svg";
const ProductTable = ({  }) => {


  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div className="">
          <div className="q-category-bottom-header">
            <span>Products</span>
            <p className="">
            <Link to="/product-add">
              Add New Product
              </Link>
              <Link to="/product-add">
                <img src={AddIcon} alt="add-icon" />
              </Link>
            </p>
          </div>
          <div className="q-category-bottom-detail-section">
        <div className="q-category-bottom-header-sticky">
          <div className="q-category-bottom-header">
            <p className="categories-sort">Sort</p>
            <p className="categories-title">Title</p>
            <p className="categories-sort"></p>
            <p className="categories-items">Category</p>
            <p className="categories-sort"></p>
            <p className="categories-enable-disable" style={{width:"71%"}}>Enable online ordering?</p>
            <p className="categories-items" style={{width:"50%"}}>Images</p>
            <p className=""></p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="categories-sort"><img src={SortIcon} alt="" className="" /></p>
            <p className="categories-title">Mobile</p>
            <p className="categories-sort"></p>
            <p className="categories-title">product</p>
            <p className="categories-sort"></p>
            <p className="categories-enable-disable" style={{width:"71%"}}>
              <div className="flex flex-col">
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Delivery
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  checked= {{}}
                  value={{}}
                  onChange={{}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Pickup
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  checked={{}}
                  value={{}}
                  onChange={{}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            </div>
            </p>
            <p className="categories-items" style={{width:"50%"}}>


            <div class="flex items-center space-x-2 text-base">
   
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>

            </p>
            <p className=""><img src={DeleteIcon} alt=" " className="w-16 h-16" /></p>
          </div>
          <div className="q-category-bottom-categories-single-category">
            <p className="categories-sort"><img src={SortIcon} alt="" className="" /></p>
            <p className="categories-title">Mobile</p>
            <p className="categories-sort"></p>
            <p className="categories-title">product</p>
            <p className="categories-sort"></p>
            <p className="categories-enable-disable" style={{width:"71%"}}>
              <div className="flex flex-col">
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Delivery
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  checked= {{}}
                  value={{}}
                  onChange={{}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Pickup
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  checked={{}}
                  value={{}}
                  onChange={{}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            </div>
            </p>
            <p className="categories-items" style={{width:"50%"}}>


            <div class="flex items-center space-x-2 text-base">
   
  </div>
  <div class="mt-3 flex -space-x-2 overflow-hidden">
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
  </div>
  <div class="mt-3 text-sm font-medium">
    <a href="#" class="text-blue-500">+ 198 others</a>
  </div>

            </p>
            <p className=""><img src={DeleteIcon} alt=" " className="w-16 h-16"  /></p>
          </div>
        
          <div className="q-category-bottom-categories-single-category">
            <p className="categories-sort"><img src={SortIcon} alt="" className="" /></p>
            <p className="categories-title">Mobile</p>
            <p className="categories-sort"></p>
            <p className="categories-title">product</p>
            <p className="categories-sort"></p>
            <p className="categories-enable-disable" style={{width:"71%"}}>
              <div className="flex flex-col">
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Delivery
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  checked= {{}}
                  value={{}}
                  onChange={{}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Pickup
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  checked={{}}
                  value={{}}
                  onChange={{}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            </div>
            </p>
            <p className="categories-items" style={{width:"50%"}}>


<div class="flex items-center space-x-2 text-base">

</div>
<div class="mt-3 flex -space-x-2 overflow-hidden">
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
</div>
<div class="mt-3 text-sm font-medium">
<a href="#" class="text-blue-500">+ 198 others</a>
</div>

</p>
            <p className=""><img src={DeleteIcon} alt=" " className="w-16 h-16"  /></p>
          </div>
          <div className="q-attributes-bottom-attriButes-single-attributes">
            <p className="categories-sort"><img src={SortIcon} alt="" className="" /></p>
            <p className="categories-title">Mobile</p>
            <p className="categories-sort"></p>
            <p className="categories-title">product</p>
            <p className="categories-sort"></p>
            <p className="categories-enable-disable" style={{width:"71%"}}>
              <div className="flex flex-col">
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Delivery
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  checked= {{}}
                  value={{}}
                  onChange={{}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Pickup
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  checked={{}}
                  value={{}}
                  onChange={{}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            </div>
            </p>
            <p className="categories-items" style={{width:"50%"}}>


<div class="flex items-center space-x-2 text-base">

</div>
<div class="mt-3 flex -space-x-2 overflow-hidden">
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
<img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
</div>
<div class="mt-3 text-sm font-medium">
<a href="#" class="text-blue-500">+ 198 others</a>
</div>

</p>
            <p className=""><img src={DeleteIcon} alt=" " className="w-16 h-16"  /></p>
          </div>
        </div>
        </div>
        </div>
        </div>
    </>
  );
};

export default ProductTable;
