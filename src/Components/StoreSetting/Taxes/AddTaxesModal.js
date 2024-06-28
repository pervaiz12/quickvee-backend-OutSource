import React, { useState, useEffect } from "react";

import { Box, Button, Modal } from "@mui/material";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import LeftIcon from "../../../Assests/Taxes/Left.svg";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import axios from "axios";
import { fetchtaxesData } from "../../../Redux/features/Taxes/taxesSlice";
import { useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { BASE_URL, ADD_TAXES } from "../../../Constants/Config";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import TextField from "@mui/material/TextField";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
const AddTaxesModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTaxes({
      title: "",
      percent: "",
    });
    setErrorMessage("")
    setOpen(false);
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTitleMessage, setErrorTitleMessage] = useState("");

  const dispatch = useDispatch();

  const myStyles = {
    width: "58rem",
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const width = {
    width: "6.5rem",
  };

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const [taxes, setTaxes] = useState({
    title: "",
    percent: "",
    merchant_id: merchant_id,
    token_id: userTypeData?.token_id,
    login_type: userTypeData?.login_type,
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[A-Za-z0-9 ]*$/ ;
    if (name === "title"){
      if (regex.test(value)) {
        setTaxes({ ...taxes, title: value });
      }
    }else{
      setTaxes((preValue) => {
        return {
          ...preValue,
          // [name]: value,
          [name]: name === "percent" ? formatPercent(value) : value,
        };
      });

    }

  };
  const formatPercent = (value) => {
    if (value.match(/^\d{0,2}$/)) {
      return value;
    } else if (value.match(/^\d{3,}$/)) {
      return value.slice(0, 2) + "." + value.slice(2);
    } else if (value.match(/^\d{0,2}\.\d{0,2}$/)) {
      return value;
    }
  };
  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9.]+$/;

    if (!regex.test(keyValue)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", taxes.title);
    formData.append("percent", taxes.percent);
    formData.append("merchant_id", merchant_id);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("login_type", userTypeData?.login_type);

    try {
      const res = await axios.post(BASE_URL + ADD_TAXES, formData, {
        headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${userTypeData?.token}`, },
      });
      const data = await res.data.status;
      const update_message = await res.data.msg;
      // console.log(update_message)
      // alert(update_message);
      if (data == "Success") {
        // alert(update_message);
        ToastifyAlert("Added Successfully", "success");
        let data = {
          merchant_id: merchant_id,
          ...userTypeData
        };
        if (data) {
          dispatch(fetchtaxesData(data));
        }
        setTaxes({
          title: "",
          percent: "",
          merchant_id: merchant_id,
        });

        handleClose();
      } else if (
        data == "Failed" &&
        update_message == "DefaultTax Taxes Already Exist"
      ) {
        setErrorMessage("*The name is already exist");
      } else if (data == "Failed" && update_message == "*Please enter Title") {
        setErrorMessage(update_message);
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
        <p className="mr-2">Add Tax</p>
        <span className="categories-items categories-items-btn">
          <img src={AddIcon} alt="edit-icon" />{" "}
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
          <div className="q-add-categories-section-header" style={{justifyContent:"space-between"}}>
            
              <span style={{cursor:"unset"}}>Add Tax</span>
            
            <div className="float-right">
              <img src={CrossIcon} alt="icon" className="quic-btn-cancle w-6 h-6 cursor-pointer" onClick={() => handleClose()} />
              </div>
          </div>

          {/* </div> */}
          <div className="view-category-item-modal-header">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-categories-single-input">
                  <label for="title">Title</label>
                  {/* <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={inputChange}
                    value={taxes.title}
                  /> */}
                </div>
                  <BasicTextFields
                    value={taxes.title}
                    onChangeFun={inputChange}
                    placeholder="Enter Title"
                    name="title"
                    type="text"
                    required={true}
                  />
                {errorMessage && (
                  <span className="error-message" style={{ color: "red" }}>
                    {errorMessage}
                  </span>
                )}

                <div className="q-add-categories-single-input mt-4">
                  <label for="Percentage">Percentage</label>
                  {/* <input
                    type="text"
                    id="percent"
                    maxlength="5"
                    min="0.00"
                    max="99.99"
                    name="percent"
                    value={taxes.percent}
                    placeholder="00.00"
                    onChange={inputChange}
                    onKeyPress={handleKeyPress}
                  /> */}
                </div>
                  <TextField
                    id="outlined-basic"
                    name="percent"
                    value={taxes.percent}
                    inputProps={{ maxLength: 5, type: "text" }}
                    onChange={inputChange}
                    placeholder="00.00"
                    variant="outlined"
                    size="small"
                    required={true}
                    onKeyPress={handleKeyPress}
                  />
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save">Save</button>

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

export default AddTaxesModal;
