import React, { useEffect, useState } from 'react';
import axios from "axios";
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import Viewarrow from "../../Assests/Vendors/viewarrow.png"
import EditIcon from "../../Assests/Category/editIcon.svg";
import { fetchVendorsListData } from "../../Redux/features/VendorList/vListSlice";
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL, STATUS_UPD_VENDORS } from "../../Constants/Config";
import ViewItemsModal from './ViewItemsModal';
// import EditVendorsModal from './EditVendorsModal';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';

const VendorsDetail = ({ setVisible }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };


  const [allvendors, setallvendors] = useState([])
  const AllVendorsDataState = useSelector((state) => state.vendors)
  const authUserData = useSelector((state) => state.authUser)
  const dispatch = useDispatch();


  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    }
    dispatch(fetchVendorsListData(data))

  }, [])

  useEffect(() => {

    if (!AllVendorsDataState.loading && AllVendorsDataState.vendorListData && AllVendorsDataState.vendorListData.length >= 1) {
      setallvendors(AllVendorsDataState.vendorListData[1])
      console.log(AllVendorsDataState.vendorListData)
    }
  }, [AllVendorsDataState, AllVendorsDataState.loading, AllVendorsDataState.vendorListData])



  const handleUpdateStatus = async (event, label, vendorId) => {

    const updData = {
      // merchant_id: "MAL0100CA",
      status: event.target.checked ? 1 : 0,
      id: vendorId,
    };


    const response = await axios.post(BASE_URL + STATUS_UPD_VENDORS, updData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response) {
      alert("Vendor Status Updated Successfully.")
    } else {
      alert("something went wrong.");
    }

    // console.log();

  };




  return (
    <>
    <div className='box'>
      <div className='q-category-bottom-detail-section'>
        <div className='q-category-bottom-header-sticky'>
          <div className='q-category-bottom-header'>
            <span>Vendors</span>
            <p onClick={() => setVisible("AddVendors")}>Add Vendors <img src={AddIcon} alt="add-icon" /> </p>
          </div>
          <div className='q-category-bottom-categories-header'>
            <p className='table20' >Vendor Name</p>
            <p className='table15'>Payment Count</p>
            <p className='table15'>Amount</p>
            <p className='table30'>Recent Transaction</p>
            <p className='table20'>Status</p>
          </div>
        </div>
        <div className='q-category-bottom-categories-listing'>

          {
            allvendors && allvendors.length >= 1 && allvendors.map((singleVender, index) => (
              <div className='q-category-bottom-categories-single-category' key={index}>
                <p className='table20'>{singleVender.vendor_name}</p>
                <p className='table15'>{singleVender.pay_count}</p>
                <p className='table15'>
                  ${typeof singleVender.amount === 'number' ? singleVender.amount.toFixed(2) : parseFloat(singleVender.amount).toFixed(2)}
                </p>
                <p className='table30'>{singleVender.recent_trans}</p>
                <p className='table20'>
                  <div className='qvrow'>
                    <div className='col-qv-4'>
                      {/* Set the checked prop based on singleVender.enabled */}

                      <Switch
                        onChange={(event) => handleUpdateStatus(event, label, singleVender.vendor_id)}
                        {...label}
                        defaultChecked={singleVender.enabled === "1"}
                      />

                    </div>
                    
                    <div className='col-qv-4'>
                    <Link to={`/vendors/edit-vendor/${singleVender.vendor_name}?vendorId=${singleVender.vendor_id}`}>
                     
                      <img
                        className='edit_center'
                        singleVender={singleVender}
                        // onClick={() => setVisible("EditVendors")}
                        src={EditIcon}
                        alt="Edit"
                      />
                    </Link></div>

                    <div className='col-qv-4'>
                    <Link to={`/vendors/vendor-details/${singleVender.vendor_name}?vendorId=${singleVender.vendor_id}`}>
                      <img 
                          className='view_arrow' 
                          src={Viewarrow} 
                          alt="View" 
                      />
                      </Link>
                    </div>
                  </div>
                </p>
              </div>
            ))
          }





        </div>

      </div>
      </div>

    </>
  )
}

export default VendorsDetail