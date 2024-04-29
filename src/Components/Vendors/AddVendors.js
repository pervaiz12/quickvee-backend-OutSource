import React, { useEffect, useState } from 'react';
import axios from "axios";
import AddNewVendors from "../../Assests/Dashboard/Left.svg"
import { fetchVendorsListData } from "../../Redux/features/VendorList/vListSlice";
import Chip from '@mui/material/Chip';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL, ADD_VENDOR_DATA } from "../../Constants/Config";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';


const AddVendors = ({ setVisible }) => {

  const [allvendors, setallvendors] = useState([]);
  const [states, setStates] = useState([]);
  const AllVendorsDataState = useSelector((state) => state.vendors)
  
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');


  const [selectedVendor, setSelectedVendor] = useState([]);

  const handleAutocompleteChange = (event, value) => {
    if (value && value.length > 1) {
      // Display an alert or error message
      alert('Please select only one vendor.');
      // Remove the second selected value
      const updatedValue = [value[0]];
      setSelectedVendor(updatedValue);
    } else if (value && value.length === 1) {
      const selectedOption = value[0];
      handleSelectedVendor(event, selectedOption);
      setSelectedVendor(value);
    } else {
      setSelectedVendor([]);
    }

  }

  const handleFilter = (filterType) => {
    console.log('Selected filter:', filterType);

  };

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 995);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


   
  const [vendor, setVendor] = useState({
    vendor_name: '',
    email: '',
    phone: '',
    merchant_id: '',
    address: '',
    city:'',
    zip_code:'',
    full_address:'',
    
});

const inputChange = (e) => {
  const { name, value } = e.target;
  setVendor((preValue) => {
      return {
          ...preValue,
          [name]: value,
      };
  })
}




  

  useEffect(() => {

    if (!AllVendorsDataState.loading && AllVendorsDataState.vendorListData  && AllVendorsDataState.vendorListData.length >=1) {
      setallvendors(AllVendorsDataState.vendorListData[0])
      // setStates(AllVendorsDataState.vendorListData[2])
      
      const stateArray = AllVendorsDataState.vendorListData[2].map(item => item.State);
      setStates(stateArray)
      
    }
  }, [AllVendorsDataState, AllVendorsDataState.loading, AllVendorsDataState.vendorListData])

  

  const handleEmailChange = (newEmail) => {
    setVendor({
      ...vendor,
      email: newEmail,
      // phone: newPhone,
    });
  };

  const handlePhoneChange = (newPhone) => {
    // Remove non-numeric characters from the input
    const numericInput = newPhone.replace(/[^0-9]/g, '');
  
    // Update the state with the cleaned input
    setVendor({
      ...vendor,
      phone: numericInput,
    });
  };


  const handleCityChange = (newCity) => {
    setVendor({
      ...vendor,
      city: newCity,
      // phone: newPhone,
    });
  };

  const handleZipChange = (newZip) => {
    const numericInput = newZip.replace(/[^0-9]/g, '');
    setVendor({
      ...vendor,
      zip_code: numericInput,
    });
  };


  const handleSelectedVendor = (event, selectedOption) => {
    const matchedObject = allvendors.find((vendor) => vendor.name === selectedOption);
    
  
    if (matchedObject) {
      // console.log(matchedObject);
      setVendor({
        phone: matchedObject.phone,
        email: matchedObject.email,
        vendor_name: matchedObject.name,
        merchant_id: 'MAL0100CA',
        vendor_id: matchedObject.id,
        city: matchedObject.city,
        zip_code: matchedObject.zip_code,
        // state:stateValue,
      });
    } else {
      // If no match is found, set name to the entered value
      setVendor({
        phone: '',
        email: '',
        vendor_name: selectedOption,
        merchant_id: 'MAL0100CA',
        vendor_id: '',
        city: '',
        zip_code: '',
        // state:''

      });
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const state = value;
    // Assuming `vendor` is an object that you want to send in the request
    let updatedVendor = { ...vendor, state };

    // console.log(updatedVendor);



    const response = await axios.post(BASE_URL + ADD_VENDOR_DATA, updatedVendor, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    if (response) {
      setVisible("VendorsDetail");
      console.log(response);
      // alert(response.data.message);
    } else {
      console.error(response);
      // alert(response.data.message);
    }
  };
  


  

  return (
    <>
    <div className='box'>
  <form onSubmit={handleSubmit}>
  <div className='q-add-categories-section'>
    <div className='q-add-categories-section-header'>
      <span onClick={() => setVisible("VendorsDetail")}>
        <img src={AddNewVendors} alt="Add-New-Vendors" />
        <span>Add New Vendors</span>
      </span>
    </div>
    <div className='q-add-categories-section-middle-form'>
      <div className='qvrowmain'>
        <div className='qvrow'>
                  <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
            <div className=''>
              <label htmlFor="vendorName">Vendor Name</label>
              <Autocomplete
                  multiple
                  id="size-small-standard"
                  size="small"
                  className='vander_name_auto'
                  options={allvendors.map((option) => option.name)}
                  value={selectedVendor}
                  freeSolo
                  onChange={handleAutocompleteChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="" placeholder="Vendor Name" />
                  )}
                />

            </div>
          </div>
           <div className={`Card_admin ${isTablet ? "col-qv-12" : "col-qv-4"}`}>
            <div className='input_area'>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={vendor.email } autocomplete="off" placeholder='Email Address' required  onChange={(e) => handleEmailChange(e.target.value)} />
            </div>
          </div>
          <div className='col-qv-4'>
            <div className='input_area'>
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" name="phone" value={vendor.phone} autocomplete="off" placeholder='Phone Number' minlength="10" maxlength="10" pattern="[0-9]*" inputmode="numeric" required  onChange={(e) => handlePhoneChange(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className='qvrowmain'>
        <div className='qvrow'>
          <div className='col-qv-12'>
            <div className='input_area'>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="full_address" value={vendor.full_address}  onChange={inputChange}  placeholder='Address Line 1' />
            </div>
          </div>
        </div>
        {/* <input type="hidden" id="address" name="merchant_id" value={'MAL0100CA'}  onChange={inputChange}   /> */}
        <div className='qvrow'>
          <div className='col-qv-4'>
            <div className='input_area'>
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={vendor.city}   onChange={(e) => handleCityChange(e.target.value)} placeholder='City' />
            </div>
          </div>
          <div className='col-qv-4'>
            <div className='input_area'>
              <label htmlFor="zip">Zip</label>
              <input type="text" id="zip" name="zip_code" value={vendor.zip_code} minlength="5" maxlength="5" onChange={(e) => handleZipChange(e.target.value)}    placeholder='Zip' />
            </div>
          </div>
         
          <div className='col-qv-4'>
            <div className=' qv_input'>
              <label htmlFor="State">State</label>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                className="vander_state"
                options={states}
                size="small"
                renderInput={(params) => <TextField {...params}  sx={{
                  margin: "1rem 0rem",
                }}  />}
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
      <button onClick={() => setVisible("VendorsDetail")} className='quic-btn quic-btn-cancle'>
        Cancel
      </button>
    </div>
  </div>
</form>
</div>
</>

  )
  
}

export default AddVendors