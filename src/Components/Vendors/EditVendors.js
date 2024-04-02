import React, { useEffect, useState } from 'react';
import axios from "axios";
import EditNewVendor from "../../Assests/Dashboard/Left.svg"
import { fetchVendorsListData } from "../../Redux/features/VendorList/vListSlice";
import Chip from '@mui/material/Chip';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL, EDIT_VENDOR_DATA, UPDATE_VENDOR_DATA } from "../../Constants/Config";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
// import Stack from '@mui/material/Stack';


const EditVendors = ({ setVisible }) => {
const Navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [allvendors, setallvendors] = useState([]);
  const AllVendorsDataState = useSelector((state) => state.vendors)
  const vendorId = searchParams.get('vendorId');
  const [states, setStates] = useState([]);
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [vendorData, setVendorData] = useState({ vendor_data: [] });

   

  async function fetchData() {
    const getvendorData = {
      merchant_id: 'MAL0100CA',
      vendor_id: vendorId,
    };
  
   
    try {
      const response = await axios.post(BASE_URL + EDIT_VENDOR_DATA, getvendorData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

  
      setVendorData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);


  
  useEffect(() => {

    if (!AllVendorsDataState.loading && AllVendorsDataState.vendorListData  && AllVendorsDataState.vendorListData.length >=1) {
      setallvendors(AllVendorsDataState.vendorListData[0])
      // setStates(AllVendorsDataState.vendorListData[2])
      
      const stateArray = AllVendorsDataState.vendorListData[2].map(item => item.State);
      setStates(stateArray)
      // setallvendors(AllVendorsDataState.stateListData[2])
    }
  }, [AllVendorsDataState, AllVendorsDataState.loading, AllVendorsDataState.vendorListData])


  const handleNameChange = (e) => {
    const newName = e.target.value;
    setVendorData((prevData) => ({
      ...prevData,
      vendor_data: [{ ...prevData.vendor_data?.[0], name: newName }],
    }));
  };


  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setVendorData((prevData) => ({
      ...prevData,
      vendor_data: [{ ...prevData.vendor_data?.[0], email: newEmail }],
    }));
  };


  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
  
    
    const numericInput = newPhone.replace(/[^0-9]/g, '');
  
    setVendorData((prevData) => ({
      ...prevData,
      vendor_data: [{ ...prevData.vendor_data?.[0], phone: numericInput }],
    }));
  };
  



  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setVendorData((prevData) => ({
      ...prevData,
      vendor_data: [{ ...prevData.vendor_data?.[0], full_address: newAddress }],
    }));
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setVendorData((prevData) => ({
      ...prevData,
      vendor_data: [{ ...prevData.vendor_data?.[0], city: newCity }],
    }));
  };

  const handleZipChange = (e) => {
    const newZip = e.target.value;
    const numericInput = newZip.replace(/[^0-9]/g, '');
    setVendorData((prevData) => ({
      ...prevData,
      vendor_data: [{ ...prevData.vendor_data?.[0], zip_code: numericInput }],
    }));
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    
    const updatedData = {
      merchant_id:'MAL0100CA',
      vendor_id: vendorId,
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      full_address: e.target.full_address.value,
      city: e.target.city.value,
      zip_code: e.target.zip_code.value,
      state: value || vendorData.vendor_data?.[0]?.state || '', 
      
    };
    
    // console.log(updatedData)

    try {
      const response = await axios.post(BASE_URL + UPDATE_VENDOR_DATA, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Updated Data:', response.data);
      // setVisible("VendorsDetail");

      if (response.data.status === 'false' && response.data.msg === 'Name already exist.') {
        setErrorMessage('Name already exists. Please choose a different name.');
      } else {
        
        setErrorMessage('');

        Navigate(-1)

        
      }

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  return (
    
<div className='q-category-main-page'>
  <div className='box'>
  <br></br>
  <form onSubmit={handleFormSubmit}>
  <div className='q-add-categories-section'>
    <div onClick={() => { Navigate(-1)}} className='q-add-categories-section-header'>
    <img  src={EditNewVendor} alt="Edit-New-Vendors" style={{"cursor":"pointer"}} />
        <span>Edit Vendors</span>
    </div>
    <div className='q-add-categories-section-middle-form'>
      <div className='qvrowmain'>
        <div className='qvrow'>
          <div className='col-qv-4'>
            <div className='input_area'>
              <label htmlFor="vendorName">Vendor Name</label>
              <input type="text" id="name" name="name"  value={vendorData.vendor_data?.[0]?.name}  onChange={handleNameChange} autocomplete="off" placeholder='' required  />
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </div>
          </div>
          <div className='col-qv-4'>
            <div className='input_area'>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={vendorData.vendor_data?.[0]?.email} onChange={handleEmailChange} autocomplete="off" placeholder='' required   />
            </div>
          </div>
          <div className='col-qv-4'>
            <div className='input_area'>
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" name="phone" value={vendorData.vendor_data?.[0]?.phone} onChange={handlePhoneChange}  autocomplete="off" placeholder='' minlength="10" maxlength="10" pattern="[0-9]*" inputmode="numeric" required   />
            </div>
          </div>
        </div>
      </div>
      <div className='qvrowmain'>
        <div className='qvrow'>
          <div className='col-qv-12'>
            <div className='input_area'>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="full_address" value={vendorData.vendor_data?.[0]?.full_address} onChange={handleAddressChange}    placeholder='' />
            </div>
          </div>
        </div>
        {/* <input type="hidden" id="address" name="merchant_id" value={'MAL0100CA'}  onChange={inputChange}   /> */}
        <div className='qvrow'>
          <div className='col-qv-4'>
            <div className='input_area'>
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={vendorData.vendor_data?.[0]?.city} onChange={handleCityChange}    placeholder='' />
            </div>
          </div>
          <div className='col-qv-4'>
            <div className='input_area'>
              <label htmlFor="zip">Zip</label>
              <input type="text" id="zip" name="zip_code" value={vendorData.vendor_data?.[0]?.zip_code}  minlength="5" maxlength="5" onChange={handleZipChange}    placeholder='' />
            </div>
          </div>
         
          <div className='col-qv-4'>
            <div className=' qv_input'>
              <label htmlFor="State">State</label>
              <Autocomplete
                  value={vendorData.vendor_data?.[0]?.state || null}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  size="small"
                  options={states}
                  renderInput={(params) => <TextField {...params}  sx={{
                    margin: "1rem 0rem",
                  }} />}
                />

            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='q-add-categories-section-middle-footer'>
      <button type='submit' className='quic-btn quic-btn-save'>
        Save
      </button>
     <button type='button' onClick={() => { Navigate(-1)}} className='quic-btn quic-btn-cancle'>
        Cancel
      </button>
    </div>
  </div>
</form>
</div>
</div>
  )
  
}

export default EditVendors