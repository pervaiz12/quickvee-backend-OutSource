import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  BASE_URL,
  GET_EDIT_ADMIN,
  UPDATE_ADMIN_RECORD,
} from "../../../../Constants/Config";
import { useNavigate } from "react-router-dom";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../../CommonComponents/ToastifyAlert";

const EditAdminFunctionality = (handleClick) => {
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    owner_name: "",
    email: "",
    password1: "",
    phone: "",
    password: "",
  });
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const [errors, setErrors] = useState({
    owner_name: "",
    phone: "",
    email: "",
  });
  const [loader, setLoader] = useState(false);

  const handleEditAdmin = async (data) => {
    const { token, ...newData } = data;
    // console.log(newData)
    // const dataNew={admin_id:data,newData}
    await axios
      .post(BASE_URL + GET_EDIT_ADMIN, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status == 200) {
           console.log(response.data.message[0])
          setEditData({ password1: "", ...response.data.message[0] });
        }
      });
  };
  const handleChangeAdmin = (e) => {
    const { name, value } = e.target;
    let updatedErrors = { ...errors };
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    console.log(editData)

    if (name === "owner_name") {
      // updatedErrors[name] = value === "" ? `please fill the ${name} field` : "";
      updatedErrors[name] =
        value.trim() === ""
          ? `Please fill in the ${name} field`
          : value[0] === " "
            ? `The ${name} field cannot start with a space`
            : "";
    }
    if (name == "email") {
      console.log(value)
      updatedErrors[name] =
        value === ""
          ? `Please fill the ${name} field`
          : !emailRegex.test(value)
            ? "Please fill valid email"
            : "";
    }
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue == "") {
        updatedErrors[name] = `Please fill the ${name} field`;
      } else if (numericValue.length !== 10) {
        updatedErrors[name] = "Phone number must be 10 digits";
      } else {
        updatedErrors[name] = "";
      }
      //   updatedErrors['phone'] = value === "" ? `please fill the ${name} field` : '';
    }

    setErrors(updatedErrors);
    // const trimmedValue = value.replace(/^\s+|\s+$/g, '')
    setEditData((prevCustomerData) => ({
      ...prevCustomerData,
      // [name]: trimmedValue,
      [name]: value,
    }));

    // setEditData({...editData,[name]:value})
  };
  const handleKeyPress = (e) => {
    // Allow only numeric characters (key codes 48 to 57) and backspace (key code 8)
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };
  const validateForm = () => {
    let error = false;
    let updatedErrors = { ...errors };
    if (editData.owner_name == "") {
      updatedErrors.owner_name = "Please fill the owner_name field";
      error = true;
    }
    if (editData.email == "") {
      updatedErrors.email = "Please fill the email field";
      error = true;
    }
    if (editData.phone == "") {
      updatedErrors.phone = "Please fill the phone field";
      error = true;
    }

    // setErrors({ ...errors, updatedErrors });
    setErrors(updatedErrors);
    // console.log(errors);
    if (error == true) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    const { token, ...newData } = userTypeData;
    // console.log(newData)
    const data = {
      admin_id: editData.id,
      name: editData.owner_name.trim(),
      owner_name: editData.owner_name.trim(),
      password: editData.password1.trim(),
      phone: editData.phone,
      email: editData.email.trim(),
      ...newData,
    };
    let validate = Object.values(errors).filter((error) => error !== "").length;
    const validateBlank = validateForm();
    if (validateBlank) {
      if (validate == 0) {
        setLoader(true);
        await axios
          .post(BASE_URL + UPDATE_ADMIN_RECORD, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setLoader(false);
            setEditData({
              owner_name: "",
              email: "",
              password: "",
              phone: "",
              password: "",
            });
            ToastifyAlert(result?.data?.message, "success");
            handleClick();
            // navigate("/users/admin");
          });
      }
    }
  };
  return {
    handleEditAdmin,
    editData,
    handleChangeAdmin,
    handleSubmitAdmin,
    errors,
    handleKeyPress,
    loader,
  };
};
export default EditAdminFunctionality;
