import React, { useState } from 'react'
import EditIcon from "../../../Assests/Category/editIcon.svg";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import EditEmployeeFormLogic from "../../../Components/StoreSetting/AddEmployee/EditEmployeeFormLogic";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const EditEmployeeModal =  ({employee, states , employeeList}) => {
    // const [open, setOpen] = useState(false);
    const handleOpen = () => setShowModal(true);
    // const handleClose = () => setShowModal(false);
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //     setShowModal(true);
    //   };
    const closeModal = () => {
        setShowModal(false);
        values.errors.firstname = "";
        values.errors.lastname = "";
        values.errors.state = "";
        values.errors.city = "";
        values.errors.phone = "";
        values.errors.city = "";
        values.errors.zipcode = "";
      };

    const {
        handleEditEmployeeInput,
        handlePhoneInput,
        handlePinInput,
        handleZipInput,
        values,
        handleEditEmployee,
        submitmessage,
        showModal , 
        setShowModal ,
        scrollRef,
        setsubmitmessage,
      } = EditEmployeeFormLogic({employee, employeeList});

      const myStyles = {
        // width: "58rem",
        position: "absolute",
        top: "47%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "unset"
      };

    return <>
        <div>
            <div className='box'>
        <span className='categories-items categories-items-btn' onClick={handleOpen}> <img src={EditIcon} alt="edit-icon" /> </span>
        {showModal && (
          <div className="q-custom-modal-container" id="addemployee">
            <div className="q-custom-modal-content modal_custom" style={myStyles}>

              {/* <div className="">
                <p className="q-custom-modal-header ">
                  Edit Employee
                  <img
                    src={CrossIcon}
                    alt="icon"
                    className="ml-auto mb-4"
                    onClick={closeModal}
                  />
                </p>
              </div> */}
              <div className="q-add-categories-section-header" style={{justifyContent:"space-between"}}>
                <span style={{cursor:"unset"}}>Edit Employee</span>
                    <div className="">
                        <img src={CrossIcon} alt="icon" className="quic-btn-cancle w-6 h-6 cursor-pointer" onClick={closeModal} />
                    </div>
                </div>
                <div className="p-6">

              <div className="qvrow ">
                <div className="col-qv-4">
                    <div className="input_area text-left">
                        <label>First Name</label>
                        {/* <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={values.firstname}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={values.firstname}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                        <span className="input-error">
                            {values.errors.firstname !== "" ? values.errors.firstname : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area text-left">
                        <label>Last Name</label>
                        {/* <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={values.lastname}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={values.lastname}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                         <span className="input-error">
                            {values.errors.lastname !== "" ? values.errors.lastname : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area text-left">
                        <label>Email Address</label>
                        {/* <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                        <span className="input-error">
                            {values.errors.email !== "" ? values.errors.email : ""}
                        </span>
                    </div>
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-4">
                    <div className="input_area text-left">
                        <label>Phone Number</label>
                        {/* <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={values.phone}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="phone"
                            placeholder="Phone"
                            value={values.phone}
                            inputProps={{ maxLength: 10 }}
                            onChange={handlePhoneInput}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                        <span className="input-error">
                            {values.errors.phone !== "" ? values.errors.phone : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area text-left">
                        <label>PIN</label>
                        {/* <input
                            type="text"
                            name="pin"
                            placeholder="Pin"
                            value={values.pin}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="pin"
                            placeholder="Pin"
                            value={values.pin}
                            onChange={handlePinInput}
                            inputProps={{ maxLength: 4 }}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                        <span className="input-error">
                            {values.errors.pin !== "" ? values.errors.pin : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area text-left">
                        <label>Wages ($/hr)</label>
                        {/* <input
                            type="text"
                            name="wages"
                            placeholder="Wages Per Hour"
                            value={values.wages}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="wages"
                            placeholder="Wages Per Hour"
                            value={values.wages}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                        <span className="input-error">
                            {values.errors.wages !== "" ? values.errors.wages : ""}
                        </span>
                    </div>
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-12">
                    <div className="input_area text-left">
                        <label>Address</label>
                        {/* <input
                            type="text"
                            name="address_line_1"
                            placeholder="Address"
                            value={values.address_line_1}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="address_line_1"
                            placeholder="Address"
                            value={values.address_line_1}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                        <span className="input-error">
                            {values.errors.address_line_1 !== "" ? values.errors.address_line_1 : ""}
                        </span>
                    </div>
                </div>
                          
                <div className="col-qv-4">
                    <div className="input_area ">
                        {/* <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={values.city}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="city"
                            placeholder="City"
                            value={values.city}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                        <span className="input-error">
                            {values.errors.city !== "" ? values.errors.city : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area ">
                        {/* <input
                            type="text"
                            name="zipcode"
                            placeholder="Zip"
                            value={values.zipcode}
                            onChange={handleEditEmployeeInput}
                            className="q-custom-input-field"
                        /> */}
                        <TextField
                          id="outlined-basic"
                          type="text"
                            name="zipcode"
                            placeholder="Zip"
                            value={values.zipcode}
                            onChange={handleZipInput}
                            inputProps={{ maxLength: 5 }}
                            className="q-custom-input-field"
                            variant="outlined"
                            size="small"
                        />
                        <span className="input-error">
                            {values.errors.zipcode !== "" ? values.errors.zipcode : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area addEmployeeState text-left">
                    {/* <select
                        name="state"
                        placeholder="state"
                        className="q-custom-input-field"
                        onChange={handleEditEmployeeInput}
                        >
                        <option value="" >Select a state</option>
                        {states && states.map((state, index) => (
                            <option key={index} value={state.State} selected={(values.state === state.State ) ? 'selected' : '' } >{state.State}</option>
                        ))}
                    </select> */}
                    <Select size="small"  name="state"  value={values.state} onChange={handleEditEmployeeInput} className="q-custom-input-field"  displayEmpty >
                        <MenuItem value="">Select a state</MenuItem>
                        {states && states.map((state, index) => (
                            <MenuItem key={index} value={state.State} selected={(values.state === state.State ) ? 'selected' : '' }>
                                {state.State}
                            </MenuItem>
                        ))}
                    </Select>
                        
                        <span className="input-error">
                            {values.errors.state !== "" ? values.errors.state : ""}
                        </span>
                    </div>
                </div>
                
              </div>
              <div className="q-add-categories-section-middle-footer plr0">
                <button
                    onClick={handleEditEmployee}
                    className="quic-btn quic-btn-save"
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
          </div>
        )}
        
        </div>
        </div>
    
    </>
}

export default EditEmployeeModal;