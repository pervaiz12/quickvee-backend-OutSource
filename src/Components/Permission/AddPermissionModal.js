import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Box, Button, Grid, Modal } from "@mui/material";
import AddIcon from "../../Assests/Category/addIcon.svg";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import { BASE_URL, ADD_UPDATE_PERMISSION } from "../../Constants/Config";
import EditIcon from "../../Assests/Category/editIcon.svg";
import LeftIcon from "../../Assests/Taxes/Left.svg";
import { fetchPermissionData } from "../../Redux/features/Permission/PermissionSlice";
import axios from "axios";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { toast } from "react-toastify";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

const AddPermissionModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const { userTypeData } = useAuthDetails();

  const { token, ...userTypeDataAlter } = userTypeData;
  const [states, setStates] = useState([
    "Select",
    "Register",
    " Store Stats",
    "Users",
    "Inventory",
    "Customers",
    "Coupons",
    "Setup",
    " Dispatch Center",
    "Attendance",
  ]);

  const myStyles = {
    width: "60%",
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
    setPermission((prevState) => ({
      ...prevState,
      ["permission"]: e?.title,
    }));
  };

  //Handle Sub Permission's
  const handleSubPermissionChange = (e) => {
    const { name, value } = e?.target;
    setPermission((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        BASE_URL + ADD_UPDATE_PERMISSION,
        { ...permission, ...userTypeDataAlter },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.data.status;
      const msg = await res.data.message;

      if (data == "success") {
        ToastifyAlert("Permission Added Successfully!", "success");

        dispatch(fetchPermissionData(userTypeData));

        setPermission({
          permission: "",
          sub_permission: "",
        });

        handleClose();
      } else if (
        data == "failed" &&
        msg == "Permission and Sub-Permission cannot be empty."
      ) {
        ToastifyAlert(msg, "warn");
      }
    } catch (error) {
      ToastifyAlert("Error!", "error");
    }
  };

  return (
    <div>
      <div
        className="flex justify-evenly categories-items categories-items-btn"
        onClick={handleOpen}
      >
        <p>
          Add Sub Permission
          <img
            src="/static/media/addIcon.554c6e38782178cf6d445d3838e59ad3.svg"
            alt="add-icon"
          />
        </p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="view-category-item-modal" style={myStyles}>
          <div
            class="q-add-categories-section-header text-[18px]"
            style={{
              justifyContent: "space-between",
              fontFamily: "CircularSTDBook",
            }}
          >
            <span>
              <span>Add New Sub Permission</span>
            </span>
            <div>
              <img
                src="/static/media/cross.02a286778a0b1b3162ac5e3858cdc5f1.svg"
                alt="icon"
                class="  quic-btn-cancle w-6 h-6"
                style={{ cursor: "pointer" }}
                onClick={() => handleClose()}
              />
            </div>
          </div>

          {/* </div> */}
          <div className="view-category-item-modal-header">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-middle-form">
                <div className="qvrow">
                  {/* <div className="col-qv-6"> */}
                  <Grid item xs={12} sm={6} md={6}>
                    <div className=" qvrowmain my-1">
                      <label htmlFor="email">Sub Permission</label>
                    </div>
                    <BasicTextFields
                      type="text"
                      name="sub_permission"
                      placeholder="Sub Permission"
                      onChangeFun={handleSubPermissionChange}
                    />
                  </Grid>
                  {/* </div> */}

                  {/* <div className="col-qv-6"> */}
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="my-1 qvrowmain">
                      <label htmlFor="State">Permission</label>
                    </div>
                    <SelectDropDown
                      listItem={states.map((item) => ({ title: item }))}
                      title={"title"}
                      selectedOption={permission?.permission}
                      // heading={"Select"}
                      onClickHandler={handlePermissionChange}
                      name="permission"
                    />
                  </Grid>
                  {/* </div> */}
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
