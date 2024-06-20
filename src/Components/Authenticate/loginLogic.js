import React, { useEffect, useState } from "react";
import axios from "axios";
import Validate from "./validationFile/validate";
import { useSelector, useDispatch } from "react-redux";

import {
  handleUserType,
  getAuthInvalidMessage,
} from "../../Redux/features/Authentication/loginSlice";
import { LOGIN_AUTHENICATE_API, BASE_URL } from "../../Constants/Config";

import { useNavigate } from "react-router-dom";

export default function LoginLogic(setLoading) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = React.useState({
    usernameError: "",
    passwordError: "",
    otpError: "",
  });
  const { UsernameValidate, validatePassword, validateForm, validateOTP } =
    Validate({ formData, setErrors, errors });
  const [errorMessage, setErrorMessage] = React.useState("");

  const emailValidate = async (userdata) => {
    const data = { username: userdata };
    try {
      const response = await axios.post(
        BASE_URL + LOGIN_AUTHENICATE_API,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error validating email:", error.message);
      throw error;
    }
  };
  const handleBlur = async (name) => {
    let error = false;
    // console.log(formData.username)
    if (formData.username.toLowerCase() !== "superadmin") {
      if (name === "username") {
        if (errors.usernameError == "") {
          let result = await emailValidate(formData.username);
          if (!result) {
            setErrors({
              ...errors,
              usernameError: "Invalid emailId",
            });
            error = true;
          } else {
            error = false;
          }
          if (error) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  };

  const handleChangeLogin = async (e) => {
    const { name, value } = e.target;
    if (name == "username") {
      let userError = UsernameValidate(value, name);
      setErrors({
        ...errors,
        usernameError: userError,
      });
    }
    if (name == "password") {
      let userError = validatePassword(value, name);
      setErrors({
        ...errors,
        passwordError: userError,
      });
    }
    if (name == "otp") {
      const numericValue = value.replace(/[^0-9]/g, "");

      let userError = validateOTP(numericValue, name);
      setErrors({
        ...errors,
        otpError: userError,
      });
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // ==============
  const keyEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setFormData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));

      handleSubmitForm(event);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyEnter);
    return () => {
      document.removeEventListener("keydown", keyEnter);
    };
  }, [formData]);

  // ==============

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(() => true);
      let isValidateForm = validateForm();
      if (!isValidateForm) {
        let data = { username: formData.username, password: formData.password };
        await dispatch(handleUserType(data)).then(async (res) => {
          if (res?.payload?.status == false) {
            await dispatch(getAuthInvalidMessage(res?.payload?.msg));
            setErrorMessage(res?.payload?.msg);
          } else {
            if (res?.payload?.login_type !== "superadmin") {
              if (res?.payload?.status == true) {
                if (res?.payload?.final_login == 0) {
                  navigate(`/store`);
                } else {
                  navigate(`/`);
                }
              }
            } else {
              if (res?.payload?.status == true) {
                navigate(`/users/unapprove`);
              }
            }
          }
        });
      }
    } catch (error) {
      console.log("Error: ", e);
    } finally {
      setLoading(() => false);
    }
  };
  return {
    handleChangeLogin,
    handleSubmitForm,
    formData,
    errors,
    handleBlur,
    setErrorMessage,
    errorMessage,
    keyEnter,
  };
}
