import {
  FormControl,
  Button,
  TextField,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LoginLogic from "./loginLogic";
import TextInput from "./commonField/textInput";
import QSubmitButton from "./commonField/QSubmitButton";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../Styles/loginAuth.css";
// import Quickvee from "../../../Assets/LoginScreen/quickveeLogo.svg";handleSubmitFormPlace
import Quickvee from "../../Assests/LoginScreen/quickveeLogo.svg";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
import { useAuthDetails } from "../../Common/cookiesHelper";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();

  const { LoginGetDashBoardRecordJson, LoginAllStore } = useAuthDetails();
  const inputRefs = useRef({});

  const errorMessageRecord = useSelector(
    (state) => state?.loginAuthentication?.errors
  );

  const {
    handleChangeLogin,
    handleSubmitForm,
    formData,
    errors,
    handleBlur,
    setErrorMessage,
    errorMessage,
  } = LoginLogic();

  const handleHideErrorMessage = () => {
    setErrorMessage(errorMessageRecord);
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };
  useEffect(() => {
    handleHideErrorMessage();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleTouchStart = () => {
    setShowPassword(true);
  };

  const handleTouchEnd = () => {
    setShowPassword(false);
  };

  return (
    <>
      <div className="main-authentication-component">
        <div className=" login-customer-form ">
          <Link>
            <img
              src={Quickvee}
              className="quickvee-logo-authentication"
              alt="Quickvee"
            />
          </Link>
          <form className="login-customer-form">
            <h1>Merchant Login</h1>
            <span>{errorMessage}</span>
            <div
              style={{
                width: "300px",
              }}
            >
              <div className="row">
                <div
                  className="col-md-12"
                  style={{ position: "relative", marginBottom: "24px" }}
                >
                  <FormControl fullWidth>
                    <TextInput
                      label="Username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChangeLogin}
                      handleBlur={handleBlur}
                    />
                  </FormControl>
                  <span className="input-error">{errors.usernameError}</span>
                </div>
                <div
                  className="col-md-12"
                  style={{ position: "relative", marginBottom: "24px" }}
                >
                  <FormControl fullWidth>
                    <TextField
                      className="input-field"
                      label="Password"
                      variant="outlined"
                      // size="small"
                      autoComplete="off"
                      type={showPassword === true ? "text" : "password"}
                      onChange={handleChangeLogin}
                      name="password"
                      value={formData.password}
                      inputProps={{
                        "data-field": "password",
                        autoComplete: "off",
                        ref: (input) => (inputRefs.current["password"] = input), // Store the ref in a ref object
                        selectionstart: formData.password,
                      }}
                    />
                  </FormControl>
                  <span
                    className="show-hide-button"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                  >
                    {" "}
                    {showPassword === true && formData?.password?.length > 0
                      ? "Hide"
                      : "Show"}{" "}
                  </span>
                  {/* <FormControl fullWidth>
                    <TextInput
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChangeLogin}
                    />
                  </FormControl> */}
                  <span className="input-error">{errors.passwordError}</span>
                </div>
                {/* {
                                //    (authEmailValidate?.checkemailValidate && authEmailValidate?.CoockieEmailValidate !=="true" ) 
                                //    && (!authEmailValidate?.checkemailValidate && authEmailValidate?.CoockieEmailValidate !=="true")

                                !authEmailValidate?.CoockieEmailValidate ?
                                 authEmailValidate?.checkemailValidate 
                                ?
                                
                            <div
                                className="col-md-12"
                                style={{ position: 'relative', marginBottom: '24px' }}
                            >
                                <FormControl fullWidth>
                                <TextInput
                                label="otp"
                                name="otp"
                                type="text"
                                value={formData.otp.replace(/[^0-9]/g, '')}
                                onChange={handleChangeLogin}
                                />
                                </FormControl>
                                <span className="input-error">{errors.otpError}</span>
                            </div>
                            :''
                            :''
                            } */}
              </div>
            </div>

            <FormControl fullWidth>
              {
                //  (authEmailValidate?.checkemailValidate || authEmailValidate?.localEmailValidate=="true" ) && (!authEmailValidate?.checkemailValidate || authEmailValidate?.localEmailValidate=="true")
                // authEmailValidate?.EmailValidateOtp ?
                // <QSubmitButton name="submit" handleSubmitForm={handleSubmitFormPlace} />
                // :
                <QSubmitButton
                  name="submit"
                  handleSubmitForm={handleSubmitForm}
                />
              }
            </FormControl>
          </form>
        </div>
        <div className="wrapper"></div>
      </div>
    </>
  );
}
