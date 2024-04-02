import React, { useEffect, useState } from 'react';
import axios from "axios";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useLocation } from 'react-router-dom';
import "../../Styles/Common.css";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BASE_URL, GET_VENDOR_DETAILS,UPDATE_SINGLE_VENDOR_DATA,DELETE_SINGLE_VENDOR_DATA} from "../../Constants/Config";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import dayjs from 'dayjs';


const options = ['Select Range','Today', 'Yesterday', 'Last 7 Days', 'This Month', 'Custom'];


const SingleVendorsDetail = ({ setVisible }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorId = searchParams.get('vendorId');
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');


// date range
  const [showDateRangePicker, setShowDateRangePicker] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [modalData, setModalData] = useState(null);

  
// vendor modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayAmount, setSelectedPayAmount] = useState(0);
  const [selectedRemark, setSelectedRemark] = useState();

  const openModal = (payAmount, id,remark) => {
    setShowModal(true);
    setModalData({ payAmount, id, remark});
    setSelectedPayAmount(payAmount);
    setSelectedRemark(remark);

    // console.log(remark)
  };


  const closeModal = () => {
    setShowModal(false);
  };






  const handleOptionChange = (event, newValue) => {
    setValue(newValue);
  
    switch (newValue) {
      case 'Today':
        setStartDate(dayjs().startOf('day').toDate());
        setEndDate(dayjs().endOf('day').toDate());
        break;
      case 'Yesterday':
        setStartDate(dayjs().subtract(1, 'day').startOf('day').toDate());
        setEndDate(dayjs().subtract(1, 'day').endOf('day').toDate());
        break;
      case 'Last 7 Days':
        setStartDate(dayjs().subtract(6, 'days').startOf('day').toDate());
        setEndDate(dayjs().endOf('day').toDate());
        break;
      case 'This Month':
        setStartDate(dayjs().startOf('month').toDate());
        setEndDate(dayjs().endOf('day').toDate());
        break;
      case 'Custom':
        // You can handle custom logic here
        break;
      default:
        break;
    }
  
    setShowDateRangePicker(newValue === 'Custom');
  };



  const [vendorDetails, setVendorDetails] = useState([]);

  const handleGetReport = async () => {
    try {
      const formattedStartDate = startDate ? dayjs(startDate).format('YYYY-MM-DD') : null;
      const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DD') : null;
  
      const queryParams = {
        // merchant_id: 'MAL0100CA',
        id: vendorId,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      };
  
      const response = await axios.get(BASE_URL + GET_VENDOR_DETAILS, {
        params: queryParams,
      });
  
      
      setVendorDetails(response.data.vendor_details);
  
     
      console.log(response.data);
    } catch (error) {
      
      console.error('Error:', error);
    }
  };


  const handleAmountChange = (event) => {
    setSelectedPayAmount(event.target.value);
  };


  const handleRemarkChange = (event) => {
    setSelectedRemark(event.target.value);
  };


  const handleUpdate = async () => {

    if (modalData) {
      const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const { payAmount, id } = modalData;
  
      const updSingleVendor = {
        merchant_id: 'MAL0100CA',
        vendor_id: vendorId,
        det_id: id,
        start: currentDateTime,
        end: currentDateTime,
        amount: selectedPayAmount,
        remark: selectedRemark,
      };

      // console.log(updSingleVendor)
  
      try {
        const response = await axios.post(BASE_URL + UPDATE_SINGLE_VENDOR_DATA, updSingleVendor, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response) {

          const updatedDetails = vendorDetails.map(vendor => {
            const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
            if (vendor.id === id) {
              return {
                ...vendor,
                pay_amount: selectedPayAmount,
                updated_datetime: currentDateTime,
                remark: selectedRemark,
              };
            }
            return vendor;
          });

          setVendorDetails(updatedDetails);


          console.log(response);
        } else {
          console.error(response);
        }
  
        // Close the modal
        closeModal();
        
  
      } catch (error) {
        console.error(error);
      }
    }
  };


  
  const handleDeleteClick = async (id,vendorId) => {

    const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  
    const delSingleVendor = {
      merchant_id: 'MAL0100CA',
      id: id,
      vendor_id:vendorId,
      start: currentDateTime,
      end: currentDateTime,
    };

    // console.log(delSingleVendor)


    try {
      const response = await axios.post(BASE_URL + DELETE_SINGLE_VENDOR_DATA, delSingleVendor, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {

        const updatedVendorDetails = vendorDetails.filter(vendor => vendor.id !== id);
        setVendorDetails(updatedVendorDetails);

        console.log(response);
        // alert(response.data.message);
      } else {
        console.error(response);
      }

      
      

    } catch (error) {
      console.error(error);
    }

    
  };
  



  function calculateTotal() {
    let total = 0;
    vendorDetails.forEach((vendor) => {
      total += parseFloat(vendor.pay_amount);
    });
    return total.toFixed(2); // Optionally, you can use toFixed to limit the decimal places to 2
  }
  
  
  
  

   
  return (
<div className='q-category-main-page'>
  <div className='box'>
<br></br>
  <form >
  <div className='q-add-categories-section'>
    <div className='q-add-categories-section-header'>
      <span>
        <span>Vendor Payout Details</span>
      </span>
    </div>
    <div className='q-add-categories-section-middle-form'>
      <div className='qvrowmain'>
        <div className='qvrow'>
          <div className='col-qv-4'>
          <div className='q-add-categories-single-input qv_input'>
              {/* <label htmlFor="State">Date Range</label> */}
              <div className='q-add-categories-single-input qv_input'>
              <label htmlFor="State">Date Range</label>
              <Autocomplete
                value={value}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
                onChange={handleOptionChange}
              />
            </div>
            {showDateRangePicker && (
              <div className='qvrow'>
                <div className='col-qv-12'>
                  <div className="input_area">
                    <label>Start & End Date</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateRangePicker
                        startText="Start Date"
                        endText="End Date"
                        value={[dayjs(startDate), dayjs(endDate)]}
                        onChange={(newValue) => {
                          // Check if newValue is not null
                          if (newValue[0]) {
                            setStartDate(newValue[0].toDate());
                          }
                          // Check if newValue is not null
                          if (newValue[1]) {
                            setEndDate(newValue[1].toDate());
                          }
                        }}
                      />
                    </LocalizationProvider>


                          </div>
                        </div>
                      </div>
                    )}


            </div>
          </div>
        </div>
      
        <div className='qvrow'>
            <div className='col-qv-12'>
                <div className='q-add-categories-section-middle-footer'>
                    <button className='quic-btn quic-btn-save' type='button' onClick={handleGetReport}>Get Report</button>
                </div>
            </div>
        </div>

      </div>
    </div>
    <div className='vendor_payout_header'>
          <p className='vendor_payout_sr'>Sr No.</p>
          <p className='vendor_payout_amount'>Amount</p>
          <p className='vendor_payout_transaction'>Transaction Date</p>
          <p className='vendor_payout_remark'>Remark</p>
          <p className='vendor_payout_edit'>Edit</p>
          <p className='vendor_payout_delete'>Delete</p>
        </div>
        <div className='vendor_payout_listing'>
            {vendorDetails.length === 0 ? (
              <p className='vendor_payout_listing_single'>No data found</p>
            ) : (
              <>
            {vendorDetails.map((vendor, index) => (
              <div key={vendor.id} className='vendor_payout_listing_single'>
                <p className='vendor_payout_sr'>{index + 1}</p>
                <p className='vendor_payout_amount'>${vendor.pay_amount}</p>
                <p className='vendor_payout_transaction'>
                  {new Date(vendor.updated_datetime).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </p>
                <p className='vendor_payout_remark'>{vendor.remark || 'N/A'}</p>
                <p className='vendor_payout_edit' onClick={() => openModal(
                  vendor.pay_amount,
                  vendor.id,
                  vendor.remark,
                )}>
                  <img  src={EditIcon} alt="edit-icon"/>
                </p>
                <p className='vendor_payout_delete'>
                  <img  src={DeleteIcon} alt="delete-icon"
                    onClick={() => handleDeleteClick(vendor.id, vendor.vendor_id)}
                  />
                </p>
              </div>
            ))}
            <div className='vendor_payout_listing_single total_payout'>
              <p className='vendor_payout_sr'>Total: </p>
              <p className='vendor_payout_amount'>${calculateTotal()}</p>
            </div>
          </>
        )}
        </div>

      
        {showModal && (
        <div className="q-custom-modal-container" id="addemployee">
        {/* Your modal JSX */}
        <div className="q-custom-modal-content modal_custom">
          {/* Your modal content */}
          <div className="">
            <p className="q-custom-modal-header ">
              Update Vendor Details
              <img
                src={CrossIcon}
                alt="icon"
                className="ml-auto mb-4"
                onClick={closeModal}
              />
            </p>
          </div>
          {/* ... other modal content ... */}
            <div className="qvrow">
                <div className="col-qv-12">
                    <div className="input_area">
                        <label>Amount</label>
                        <input
                            type="text"
                            name="amount"
                            placeholder="Amount"
                            value={selectedPayAmount}
                            onChange={handleAmountChange}
                            className="q-custom-input-field"
                            maxLength={8}
                        />
                        <span className="input-error">
                            {/* {values.errors.firstname !== "" ? values.errors.firstname : ""} */}
                        </span>
                    </div>
                </div>
                <div className="col-qv-12">
                    <div className="input_area">
                        <label>More Information  </label>

                        <textarea
                            type="text"
                            name="remark"
                            value={selectedRemark}
                            onChange={handleRemarkChange}
                            rows={5}
                            placeholder="More Information"
                            className="q-custom-input-field"
                        ></textarea>
                        <span className="input-error">
                            {/* {values.errors.lastname !== "" ? values.errors.lastname : ""} */}
                        </span>
                    </div>
                </div>
            </div>
            <div className="q-add-categories-section-middle-footer plr0">
                <button
                    className="quic-btn quic-btn-save" type='button' onClick={handleUpdate}
                >
                Update
                </button>
                <button
                onClick={closeModal}
                className="quic-btn quic-btn-cancle"
                >
                Cancel
                </button>
            </div>
        </div>
      </div>
      )}
      
  </div>
</form>
</div>
</div>
  )
  
}

export default SingleVendorsDetail