import React, { useEffect, useState } from "react";
import axios from "axios";
import AddNewVendors from "../../Assests/Dashboard/Left.svg";
import { fetchVendorsListData } from "../../Redux/features/VendorList/vListSlice";
import Chip from "@mui/material/Chip";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL, ADD_VENDOR_DATA } from "../../Constants/Config";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { FormControl, Grid } from "@mui/material";
// import Stack from '@mui/material/Stack';
import CreatableSelect from "react-select/creatable";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
const AddVendors = ({ setVisible }) => {
  const [allvendors, setallvendors] = useState([]);

  const [states, setStates] = useState([]);

  console.log("states", states);
  const AllVendorsDataState = useSelector((state) => state.vendors);

  const [value, setValue] = useState();

  const handleAutocompleteChange = (event) => {
    handleSelectedVendor(event?.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    dispatch(fetchVendorsListData(data));
  }, []);

  const [vendor, setVendor] = useState({
    vendor_name: "",
    email: "",
    phone: "",
    merchant_id: "",
    full_address: "",
    city: "",
    zip_code: "",
    state: "",
  });
  const inputChange = (e) => {
    const { name, value } = e.target;
    setVendor((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (
      !AllVendorsDataState.loading &&
      AllVendorsDataState.vendorListData &&
      AllVendorsDataState.vendorListData.length >= 1
    ) {
      setallvendors(AllVendorsDataState.vendorListData[0]);
      // setStates(AllVendorsDataState.vendorListData[2])

      const stateArray = AllVendorsDataState.vendorListData[2].map(
        (item) => item.State
      );
      setStates(stateArray);
    }
  }, [
    AllVendorsDataState,
    AllVendorsDataState.loading,
    AllVendorsDataState.vendorListData,
  ]);

  const handleEmailChange = (newEmail) => {
    setVendor({
      ...vendor,
      email: newEmail,
      // phone: newPhone,
    });
  };

  const handlePhoneChange = (newPhone) => {
    // Remove non-numeric characters from the input
    const numericInput = newPhone.replace(/[^0-9]/g, "");

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
    const numericInput = newZip.replace(/[^0-9]/g, "");
    setVendor({
      ...vendor,
      zip_code: numericInput,
    });
  };

  const handleSelectedVendor = (selectedOption) => {
    const matchedObject = allvendors.find(
      (vendor) => vendor.name === selectedOption
    );

    if (matchedObject) {
      setVendor({
        phone: matchedObject.phone,
        email: matchedObject.email,
        vendor_name: matchedObject.name,
        merchant_id: "MAL0100CA",
        vendor_id: matchedObject.id,
        city: matchedObject.city,
        zip_code: matchedObject.zip_code,
        full_address: matchedObject.full_address,
        state: matchedObject.state,
      });
    } else {
      // If no match is found, set name to the entered value
      setVendor({
        phone: "",
        email: "",
        vendor_name: selectedOption,
        merchant_id: "MAL0100CA",
        full_address: "",
        vendor_id: "",
        city: "",
        zip_code: "",
        // state:''
      });
    }
  };
  const handleSetVendorStateChange = (newState) => {
    console.log("setVendorStateChange", newState);
    setVendor((preState) => ({
      ...preState,
      state: newState["title"],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const state = value;
    // Assuming `vendor` is an object that you want to send in the request
    let updatedVendor = { ...vendor };

    const response = await axios.post(
      BASE_URL + ADD_VENDOR_DATA,
      updatedVendor,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response) {
      setVisible("VendorsDetail");

      // alert(response.data.message);
    } else {
      console.error(response);
      // alert(response.data.message);
    }
  };

  return (
    <>
      <Grid container className="box">
        <Grid item xs={12} className="q-add-categories-section">
          <Grid container>
            <Grid item xs={12}>
              <div className="q-add-categories-section-header">
                <span onClick={() => setVisible("VendorsDetail")}>
                  <img src={AddNewVendors} alt="Add-New-Vendors" />
                  <span>Add New Vendors</span>
                </span>
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: 3 }}>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className=" qvrowmain my-1">
                      <label htmlFor="vendorName">Vendor Name</label>
                    </div>
                    <CreatableSelect
                      isClearable
                      onChange={handleAutocompleteChange}
                      options={allvendors.map((option, index) => {
                        return {
                          value: option.name,
                          label: option?.name,
                        };
                      })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className=" qvrowmain my-1">
                      <label htmlFor="email">Email Address</label>
                    </div>
                    <BasicTextFields
                      type={"email"}
                      name="email"
                      value={vendor.email}
                      placeholder="Email Address"
                      onChangeFun={inputChange}
                      required={"required"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="qvrowmain my-1">
                      <label htmlFor="phone">Phone Number</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      placeholder="Phone Number"
                      required={"required"}
                      name={"phone"}
                      onChangeFun={inputChange}
                      value={vendor.phone}
                      maxLength={10}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 0 }} spacing={2}>
                  <Grid item xs={12}>
                    <div className=" qvrowmain my-1">
                      <label htmlFor="address">Address</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"full_address"}
                      placeholder="Address Line 1"
                      onChangeFun={inputChange}
                      value={vendor.full_address}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 0 }} spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="qvrowmain my-1">
                      <label htmlFor="city">City</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"city"}
                      value={vendor.city}
                      placeholder="City"
                      onChangeFun={inputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="my-1 qvrowmain">
                      <label htmlFor="zip">Zip</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name="zip_code"
                      value={vendor.zip_code}
                      placeholder="Zip"
                      onChangeFun={inputChange}
                      maxLength={5}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="my-1 qvrowmain">
                      <label htmlFor="State">State</label>
                    </div>
                    <SelectDropDown
                      listItem={states.map((item) => ({ title: item }))}
                      title={"title"}
                      selectedOption={vendor.state}
                      onClickHandler={handleSetVendorStateChange}
                      name={"state"}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  xs={12}
                  sx={{ marginTop: 3 }}
                >
                  <button type="submit" className="quic-btn quic-btn-save me-3">
                    Save
                  </button>
                  <button
                    onClick={() => setVisible("VendorsDetail")}
                    className="quic-btn quic-btn-cancle"
                  >
                    Cancel
                  </button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="q-add-categories-section">
            <div className="q-add-categories-section-header">
              <span onClick={() => setVisible("VendorsDetail")}>
                <img src={AddNewVendors} alt="Add-New-Vendors" />
                <span>Add New Vendors</span>
              </span>
            </div>
            <Grid container className="px-5" spacing={2}>
              <Grid item xs={4}>
                <div className=" qvrowmain">
                  <label htmlFor="vendorName">Vendor Name</label>
                </div>

                <CreatableSelect
                  className="my-5"
                  isClearable
                  onChange={handleAutocompleteChange}
                  options={allvendors.map((option, index) => {
                    return {
                      value: option.name,
                      label: option?.name,
                    };
                  })}
                />
              </Grid>
              <Grid item xs={4}>
                <div className="my-5 qvrowmain">
                  <label htmlFor="email">Email Address</label>
                </div>
                <BasicTextFields
                  type={"email"}
                  name="email"
                  value={vendor.email}
                  placeholder="Email Address"
                  onChangeFun={inputChange}
                  required={"required"}
                />
              </Grid>
              <Grid item xs={4}>
                <div className="my-5 qvrowmain">
                  <label htmlFor="phone">Phone Number</label>
                </div>
                <BasicTextFields
                  type={"text"}
                  placeholder="Phone Number"
                  required={"required"}
                  name={"phone"}
                  onChangeFun={inputChange}
                  value={vendor.phone}
                  maxLength={10}
                />
              </Grid>
            </Grid>
            <div className="q-add-categories-section-middle-form">
              <div className="qvrowmain">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className="mb-4 qvrowmain">
                      <label htmlFor="address">Address</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"full_address"}
                      placeholder="Address Line 1"
                      onChangeFun={inputChange}
                      value={vendor.full_address}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <div className="my-5 qvrowmain">
                      <label htmlFor="city">City</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name={"city"}
                      value={vendor.city}
                      placeholder="City"
                      onChangeFun={inputChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <div className="my-5 qvrowmain">
                      <label htmlFor="zip">Zip</label>
                    </div>
                    <BasicTextFields
                      type={"text"}
                      name="zip_code"
                      value={vendor.zip_code}
                      placeholder="Zip"
                      onChangeFun={inputChange}
                      maxLength={5}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <div className="my-5 qvrowmain">
                      <label htmlFor="State">State</label>
                    </div>
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
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="q-add-categories-section-middle-footer">
              <button type="submit" className="quic-btn quic-btn-save">
                Save
              </button>
              <button
                onClick={() => setVisible("VendorsDetail")}
                className="quic-btn quic-btn-cancle"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default AddVendors;
