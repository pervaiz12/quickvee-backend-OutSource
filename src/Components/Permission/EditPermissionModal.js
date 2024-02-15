import React, { useState, useEffect } from "react";

import { Box, Button, Modal } from "@mui/material";
import {
  fetchPermissionData
} from "../../Redux/features/Permission/PermissionSlice";
import { useDispatch } from "react-redux";

import axios from "axios";
import { Form } from "react-bootstrap";
import EditIcon from "../../Assests/Category/editIcon.svg";
import LeftIcon from "../../Assests/Taxes/Left.svg";
import { CodeSharp } from "@mui/icons-material";

import { BASE_URL, ADD_UPDATE_PERMISSION } from "../../Constants/Config";



const EditPermissionModal = ({selected})  =>{
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();


  const myStyles = {
    width: "50rem",
    transform: "translate(25rem, 4.5rem)",
    maxHeight: "85vh", 
    overflowY: "auto",  
  };
  const mycur = {
    cursor: "pointer",
    width: "fit-content"
  }
  const width = {
    width: "13.6rem",
  };
  // console.log("fhfgvhgf",selected)

 

  const [permission, setPermission] = useState({
    id: "",
    permission: "",
    sub_permission: "",
    
  });
  useEffect(() => {
    if (selected) {
      setPermission({
        id: selected.id,
        permission: selected.permission,
        sub_permission: selected.sub_permission,
        
      });
    }
  }, [selected]);

  
// console.log("jhfgkshd",permission.id)





//Handle Select Permission's
const handlePermissionChange = (e) => {
  const { name, value } = e.target;
  setPermission((prevState) => ({
    ...prevState,
    [name]: value,
  }));
  // console.log("name and value", name, value);
};


//Handle Sub Permission's
const handleSubPermissionChange = (e) => {
  const { name, value } = e.target;
  setPermission((prevState) => ({
    ...prevState,
    [name]: value,
  }));
  // console.log("name and value", name, value);
};

const handleSubmit = async (e) => {
  e.preventDefault();

    const formData = new FormData();

    // Append your tax data
    formData.append("id", permission.id);
    formData.append("permission", permission.permission);
    formData.append("sub_permission", permission.sub_permission);
    
    // console.log(formData)
    try {
      // Make your API request with axios
      const response = await axios.post(BASE_URL+ADD_UPDATE_PERMISSION, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle the response as needed
      const update_message = response.data.status
      const msg = response.data.message;
      // console.log(update_message);
      if(update_message == "success"){
        // alert(msg)
        dispatch(fetchPermissionData());
        handleClose();
      }else if(update_message == "failed" && msg == "Permission and Sub-Permission cannot be empty."){
        alert("*Please enter Permission and Sub Permission")
        setErrorMessage(msg);
      }

    

      // Close the modal or perform any other actions
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle errors as needed
    }
  // } 
};







  return (
    <div>
      <div className="flex justify-evenly categories-items categories-items-btn" onClick={handleOpen}>
        <span  className="categories-items categories-items-btn"     >
        <img src={EditIcon} alt="edit-icon" />{" "}
      </span>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="view-category-item-modal" style={myStyles}>
          {/* <div className='view-category-item-modal-header'> */}
          <div className="q-add-categories-section-header" >
            <span onClick={() => handleClose()} style={width}>
              <img src={LeftIcon} alt="Add-New-Category" />
              <span>EDIT SUB PERMISSION</span>
            </span>
          </div>

          {/* </div> */}
          <div className="view-category-item-modal-header">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-middle-form">
               

                <div className="qvrow">
                  <div className="col-qv-6">
                    <div className="input_area">
                      <input type="text" name="sub_permission" placeholder="Sub Permission" 
                      value={permission.sub_permission} onChange={ handleSubPermissionChange}
                      />
                    </div>
                    {errorMessage && (
                  <span className="error-message" style={{ color: "red" }}>
                    {errorMessage}
                  </span>
                )}
                  </div>

                  <div className="col-qv-6">
                    <div className="input_area">
                      <select
                        name="permission"
                        placeholder="Permission"
                        className="q-custom-input-field"
                        value={permission.permission || ""}
                        onChange={handlePermissionChange}
                      >
                        <option value="">Select</option>
                        <option value="Register" selected={permission.permission == "Register"} >Register</option>
                        <option value="Store Stats" selected={permission.permission == "Store Stats"}>Store Stats</option>
                        <option value="Users" selected={permission.permission == "Users"}>Users</option>
                        <option value="Inventory" selected={permission.permission == "Inventory"}>Inventory</option>
                        <option value="Customers" selected={permission.permission == "Customers"}>Customers</option>
                        <option value="Coupons" selected={permission.permission == "Coupons"}>Coupons</option>
                        <option value="Setup" selected={permission.permission == "Setup"}>Setup</option>
                        <option value="Dispatch Center" selected={permission.permission == "Dispatch Center"}>Dispatch Center</option>
                        <option value="Attendance" selected={permission.permission == "Attendance"}>Attendance</option>
                      </select>
                    </div>
                    {errorMessage && (
                  <span className="error-message" style={{ color: "red" }}>
                    {errorMessage}
                  </span>
                )}
                  </div>
                </div>
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save" >Update</button>

                <button
                  onClick={() => handleClose()}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default EditPermissionModal