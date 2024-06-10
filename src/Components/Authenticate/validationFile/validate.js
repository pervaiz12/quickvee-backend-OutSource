import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Validate({ formData, setErrors, errors }) {
  // const authEmailValidate=useSelector((state)=>state?.loginAuthEmailCheck)
  let emailValidate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  // let Passwordregex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  // let Passwordregex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/

  function UsernameValidate(value, name) {
    let error = "";

    if (value.trim() === "") {
      error = `Please fill the ${name} field`;
    }
    // else if(!emailValidate.test(value))
    // {
    //     error=`Please fill valid ${name} field`
    // }
    return error;
  }
  function validatePassword(value, name) {
    let error = "";
    if (value.trim() === "") {
      error = `Please fill the ${name} field`;
    }
    // else if(!Passwordregex.test(value))
    // {
    //     error="Minimum six Character and aleast one number and special one character allowed"
    // }
    return error;
  }
  function validateOTP(value, name) {
    let error = "";
    if (value.trim() === "") {
      error = `Please fill the ${name} field`;
    }
    return error;
  }
  const validateForm = () => {
    let error = false;
    let errorMessage = { errors };
    if (formData.username == "") {
      errorMessage.usernameError = "Please fill the user field";
      error = true;
    }
    if (formData.password == "") {
      errorMessage.passwordError = "Please fill the password field";
      error = true;
    }
    // (authEmailValidate?.checkemailValidate || authEmailValidate?.localEmailValidate=="true" ) && (!authEmailValidate?.checkemailValidate || authEmailValidate?.localEmailValidate=="true")
    // if((formData.otp=="") && (authEmailValidate?.checkemailValidate ))
    // {
    //     errorMessage.otpError="Please fill the otp field"
    //     error=true

    // }
    setErrors({ ...errors, ...errorMessage });
    if (!error) {
      return false;
    } else {
      return true;
    }
  };

  return { UsernameValidate, validatePassword, validateForm, validateOTP };
}
