import React, { useEffect } from "react";
import axios from "axios";
import Validate from "./validationFile/validate";
import { useSelector, useDispatch } from "react-redux"; //,localAuthCheck
// import { fetchLoginData,handleCheckOTP,handleSubmitOtp,localAuthCheck,getAuthSessionRecord } from "../../Redux/features/Authentication/loginSlice";

// import {localAuthCheck} from  "../../Redux/features/Authentication/loginSlice";
import {
  handleUserType,
  getAuthInvalidMessage,
} from "../../Redux/features/Authentication/loginSlice";
import { LOGIN_AUTHENICATE_API, BASE_URL } from "../../Constants/Config";

import { useNavigate } from "react-router-dom";

export default function LoginLogic() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    otp: "",
  });
  // const errorToken = useSelector(
  //   (selector) => selector?.loginAuthentication?.errors
  // );
  // console.log(errorToken);
  const [errors, setErrors] = React.useState({
    usernameError: "",
    passwordError: "",
    otpError: "",
  });
  const { UsernameValidate, validatePassword, validateForm, validateOTP } =
    Validate({ formData, setErrors, errors });
  const [errorMessage, setErrorMessage] = React.useState("");
  // const authEmailValidate=useSelector((state)=>state?.loginAuthEmailCheck)
  // const authEmailValidate=useSelector((state)=>state?.loginAuthEmailCheck)authEmailValidate?.CoockieEmailValidate
  // console.log(authEmailValidate)
  // let AuthEmailValidateCheck=Cookies.get('emailValidateOtp');

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
  const ValidOtpRes = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };
  const handleWrongPasswordError = () => {
    // setTimeout(() => {
    //   setErrorMessage("");
    // }, 10000);
  };
  // const handleSubmitForm=async(e)=>{
  //     e.preventDefault();
  //     let isValidateForm=validateForm()
  //     if(!isValidateForm)
  //     {

  //         let emailValidate=await handleBlur('username')

  //         if(errors.passwordError=="" && errors.usernameError=="")
  //         {
  //             if(emailValidate)
  //             {
  //               // fa_completed:!!AuthEmailValidateCheck? AuthEmailValidateCheck:''
  //               // --------------------------------------------------------------
  //               if(!authEmailValidate?.CoockieEmailValidate && authEmailValidate?.CoockieEmailValidate ==undefined)
  //                 // if(!authEmailValidate?.CoockieEmailValidate)
  //                 {
  //                     if(!authEmailValidate?.checkemailValidate)
  //                     {
  //                       let data={username:formData.username,password:formData.password,merchant_login:'merchant_login',fa_completed:''}
  //                       console.log(data)
  //                       dispatch(fetchLoginData(data))

  //                     }
  //                     else{
  //                       if(!isValidateForm)
  //                       {
  //                         let data={email:formData.username,otp:formData.otp}
  //                          dispatch(handleCheckOTP(data)).then(isValidateotp => {

  //                           if(isValidateotp?.payload)
  //                           {
  //                             let data={username:formData.username,password:formData.password,merchant_login:'merchant_login',otp:formData.otp,ref:''}
  //                             dispatch(handleSubmitOtp(data))
  //                           }else{
  //                             setErrorMessage('Invalid Otp')
  //                              ValidOtpRes()
  //                           }

  //                       })
  //                       .catch(error => {
  //                           console.error(error);
  //                       });

  //                       }

  //                     }
  //               }else{
  //                 let data={username:formData.username,password:formData.password,merchant_login:'merchant_login',otp:"",ref:''}
  //                 console.log(data)
  //                 console.log("heloo coockie")
  //                 console.log(isValidateForm)

  //               }
  //               // ============================================================

  //             }

  //         }
  //     }

  // }
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let isValidateForm = validateForm();
    if (!isValidateForm) {
      // console.log('hello')
      // console.log(formData)
      let data = { username: formData.username, password: formData.password };
      dispatch(handleUserType(data)).then((res) => {
        if (res?.payload?.status == false) {
          dispatch(getAuthInvalidMessage(res?.payload?.msg));
          setErrorMessage(res?.payload?.msg);
          handleWrongPasswordError();
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
              navigate(`/users/view/unapprove`);
            }
          }
        }
      });

      //  dispatch(handleUserType(data)).then(response=>{
      //   console.log(response?.payload)
      //  })
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
    // // handleSubmitFormPlace,
    // authEmailValidate,
    // errorMessage,
  };
}
