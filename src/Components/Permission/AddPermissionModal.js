import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Box, Button, Modal } from "@mui/material";
import AddIcon from "../../Assests/Category/addIcon.svg";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import { BASE_URL, ADD_UPDATE_PERMISSION } from "../../Constants/Config";
import EditIcon from "../../Assests/Category/editIcon.svg";
import LeftIcon from "../../Assests/Taxes/Left.svg";
import {
  fetchPermissionData
} from "../../Redux/features/Permission/PermissionSlice";
import axios from "axios";

const AddPermissionModal = () => {
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
    width: "fit-content",
  };
  const width = {
    width: "30rem",
  };



  const [permission, setPermission] = useState({
 
    permission: "",
    sub_permission: "",
    
  });

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

  try {
    const res = await axios.post(BASE_URL + ADD_UPDATE_PERMISSION, permission, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const data = await res.data.status;
    const msg = await res.data.message;
    
    
    if (data == "success") {
      alert('Permission Added Successfully !');
      
        dispatch(fetchPermissionData());
      
        setPermission({
          permission: "",
          sub_permission: "",
        
      });

      handleClose();
    } 
     else if (data == "failed" && msg == "Permission and Sub-Permission cannot be empty.") {
      setErrorMessage(msg);
    }
  } catch (error) {
    console.error("API Error:", error);
  }
};











  return (
    <div>
      <div
        className="flex justify-evenly categories-items categories-items-btn"
        onClick={handleOpen}
      >
        <img src={AddIcon} alt="edit-icon" />{" "}
        <span className="categories-items categories-items-btn">
          Add Sub Permission
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
          <div className="q-add-categories-section-header">
            <span onClick={() => handleClose()} style={width}>
              <img src={LeftIcon} alt="Add-New-Category" />
              <div className="col-qv-11">
                <p className="q-custom-modal-header ">
                ADD NEW SUB PERMISSION
                </p>
              </div>
            </span>
          </div>

          {/* </div> */}
          <div className="view-category-item-modal-header">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-middle-form">
               

                <div className="qvrow">
                  <div className="col-qv-6">
                    <div className="input_area">
                      <input type="text" name="sub_permission" placeholder="Sub Permission" onChange={ handleSubPermissionChange}/>
                    </div>
                  </div>

                  <div className="col-qv-6">
                    <div className="input_area">
                      <select
                        name="permission"
                        placeholder="Permission"
                        className="q-custom-input-field"
                        onChange={handlePermissionChange}
                      >
                        <option value="">Select</option>
                        <option value="Register">Register</option>
                        <option value="Store Stats">Store Stats</option>
                        <option value="Users">Users</option>
                        <option value="Inventory">Inventory</option>
                        <option value="Customers">Customers</option>
                        <option value="Coupons">Coupons</option>
                        <option value="Setup">Setup</option>
                        <option value="Dispatch Center">Dispatch Center</option>
                        <option value="Attendance">Attendance</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save">Add</button>

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
  );
};

export default AddPermissionModal;
