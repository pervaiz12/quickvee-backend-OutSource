import React, { useEffect } from 'react';
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import {fetchCategoriesData} from "../../Redux/features/Categories/categoriesSlice"
import { useSelector , useDispatch } from 'react-redux';

import ResciveIcon from '../../Assests/Dashboard/rescived.svg';
import VoicIcon from '../../Assests/Dashboard/void.svg';
import ActiveIcon from '../../Assests/Dashboard/active.svg';

const PurchaseTable = ({ seVisible }) => {

  const dispatch = useDispatch();
useEffect(() => {
let data= {
  "merchant_id":"MAL0100CA"
}
if(data){
  dispatch(fetchCategoriesData(data))
}

}, [])


  return (
    <>
      <div className='q-category-bottom-detail-section'>
        <div className='q-category-bottom-header-sticky'>
          <div className='q-category-bottom-header'>
            <span>Purchase Order</span>
            <p onClick={() => seVisible("CategoryAlert")}>Add New PO <img src={AddIcon} alt="add-icon" /> </p>
          </div>
          <div className='q-category-bottom-categories-header'>
            <p className='categories-sort' >Order#</p>
            <p className='categories-sort' >Status</p>
            <p className='categories-sort' >Received</p>

            <p className='categories-sort' >Total Qty</p>
            <p className='categories-title' >Vender Name</p>
            <p className='categories-items'>Total Cost</p>
            <p className='categories-items'>Due</p>
            <p className='categories-items'>Last Update</p>
            <p className='categories-items'>Received At</p>
          </div>
        </div>
        <div className='q-category-bottom-categories-listing'>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'>PO0001</p>
            <p className='categories-sort text-[#17B11D]'>Received</p>
            <p className='categories-sort'><img src={ResciveIcon} alt='add-icon'  /></p>
            <p className='categories-sort'>100</p>
            <p className='categories-title'>United Distro </p> 
            <p className='categories-title'>$1000.84</p>
            <p className='categories-title'>05/25/23</p>
            <p className='categories-title'>05/10/23</p>
            <p className='categories-title'>05/15/23</p>
     
            
          </div>
        
      
        </div>
        <div className='q-category-bottom-categories-listing'>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'>PO0001</p>
            <p className='categories-sort text-[#FF8800]'>Partial</p>
            <p className='categories-sort'><img src={VoicIcon} alt='add-icon'  /></p>
            <p className='categories-sort'>100</p>
            <p className='categories-title'>United Distro </p> 
            <p className='categories-title'>$1000.84</p>
            <p className='categories-title'>05/25/23</p>
            <p className='categories-title'>05/10/23</p>
            <p className='categories-title'>05/15/23</p>
     
            
          </div>
        
      
        </div>

        <div className='q-category-bottom-categories-listing'>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'>PO0001</p>
            <p className='categories-sort text-[#0A64F9]'>Active</p>
            <p className='categories-sort'><img src={ActiveIcon} alt='add-icon'  /></p>
            <p className='categories-sort'>100</p>
            <p className='categories-title'>United Distro </p> 
            <p className='categories-title'>$1000.84</p>
            <p className='categories-title'>05/25/23</p>
            <p className='categories-title'>05/10/23</p>
            <p className='categories-title'>05/15/23</p>
     
            
          </div>
        
      
        </div>
        <div className='q-category-bottom-categories-listing'>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'>PO0001</p>
            <p className='categories-sort text-[#646464]'>Draft</p>
            <p className='categories-sort'></p>
            <p className='categories-sort'>100</p>
            <p className='categories-title'>United Distro </p> 
            <p className='categories-title'>$1000.84</p>
            <p className='categories-title'>05/25/23</p>
            <p className='categories-title'>05/10/23</p>
            <p className='categories-title'>05/15/23</p>
     
            
          </div>
        
      
        </div>
        <div className='q-category-bottom-categories-listing'>
          <div className='q-category-bottom-categories-single-category'>
            <p className='categories-sort'>PO0001</p>
            <p className='categories-sort text-[#F90A0A]'>Void</p>
            <p className='categories-sort'></p>
            <p className='categories-sort'>100</p>
            <p className='categories-title'>United Distro </p> 
            <p className='categories-title'>$1000.84</p>
            <p className='categories-title'>05/25/23</p>
            <p className='categories-title'>05/10/23</p>
            <p className='categories-title'>05/15/23</p>
     
            
          </div>
        
      
        </div>

      </div>

    </>
  )
}

export default PurchaseTable