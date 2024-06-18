import {
  FormControl,
  Button,
  TextField,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Collapse,
  Alert,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
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
import { useNavigate, Navigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
import { useAuthDetails } from "../../Common/cookiesHelper";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { getAuthInvalidMessage } from "../../Redux/features/Authentication/loginSlice";
// import { Route, useNavigate, Navigate, Outlet } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const inputRefs = useRef({});
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const [loading, setLoading] = useState(false);

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
    handleWrongPasswordError,
  } = LoginLogic(setLoading);
  useEffect(() => {
    setErrorMessage(errorMessageRecord);
  }, []);

  const handleHideErrorMessage = () => {
    setErrorMessage(errorMessageRecord);
    dispatch(getAuthInvalidMessage(""));

    setErrorMessage("");
  };
// ======================================
// console.log(userTypeData)
// console.log(merchant_id)
console.log(LoginGetDashBoardRecordJson)
// useEffect(() => {
//     if (
//       ((LoginGetDashBoardRecordJson?.data?.login_type === "admin" ||
//       LoginGetDashBoardRecordJson?.data?.login_type === "merchant" ||
//       LoginGetDashBoardRecordJson?.data?.login_type === "manager")&&(LoginGetDashBoardRecordJson?.login_type &&
//       LoginGetDashBoardRecordJson?.login_type == "superadmin"))
//       && (merchant_id=="" || merchant_id == undefined )
//     ) {
//       navigate("/users/unapprove");
//     } else if (
//       ((LoginGetDashBoardRecordJson?.data?.login_type === "admin" ||
//       LoginGetDashBoardRecordJson?.data?.login_type === "merchant" ||
//       LoginGetDashBoardRecordJson?.data?.login_type === "manager")&&(LoginGetDashBoardRecordJson?.login_type === "admin" || 
//         LoginGetDashBoardRecordJson?.login_type === "merchant" ||
//         LoginGetDashBoardRecordJson?.login_type === "manager" ||
//         LoginGetDashBoardRecordJson?.login_type == "superadmin")) &&
//       !!merchant_id
//     ) {

//       navigate("/");
//     } else if (
//       ((LoginGetDashBoardRecordJson?.data?.login_type === "admin" ||
//       LoginGetDashBoardRecordJson?.data?.login_type === "merchant" ||
//       LoginGetDashBoardRecordJson?.data?.login_type === "manager")&&(LoginGetDashBoardRecordJson?.login_type === "admin" ||
//         LoginGetDashBoardRecordJson?.data?.login_type === "merchant" ||
//         LoginGetDashBoardRecordJson?.data?.login_type === "manager")&& LoginGetDashBoardRecordJson?.data?.stores.length>=0)
//     ) {
//       console.log('3')
//       navigate("/store");
//     } else {
//       console.log('4')
//       navigate("/login");
//     }
//   }, []);
// ====================================
const getLoginRedirectUrl=()=>{
  if((LoginGetDashBoardRecordJson?.login_type == "superadmin"||
  LoginGetDashBoardRecordJson?.login_type === "admin"|| 
  LoginGetDashBoardRecordJson?.login_type === "merchant" ||
  LoginGetDashBoardRecordJson?.login_type === "manager")
  &&(LoginGetDashBoardRecordJson?.data?.merchant_id !=="")
)
  {
    console.log('1')
    navigate('/')
  }
  else if((LoginGetDashBoardRecordJson?.login_type == "superadmin")
  &&(LoginGetDashBoardRecordJson?.data?.merchant_id =="" || LoginGetDashBoardRecordJson?.data?.merchant_id==undefined))
  {
    console.log('2')
    navigate("/users/unapprove")
  }
  else if((LoginGetDashBoardRecordJson?.login_type == "superadmin")
  &&(LoginGetDashBoardRecordJson?.data?.merchant_id !=="" || LoginGetDashBoardRecordJson?.data?.merchant_id!==undefined))
  {
    console.log("3")
    navigate("/")
  }

}
 useEffect(()=>{
  // getLoginRedirectUrl()

 })
  // ================================================

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
          <Collapse in={errorMessage}>
            <Alert
              severity="error"
              action={
                <IconButton
                  className="error-close-icon"
                  aria-label="close"
                  color="error"
                  size="small"
                  onClick={handleHideErrorMessage}
                >
                  <CloseIcon />
                </IconButton>
              }
              sx={{ mb: 4 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>

          <Link>
            <img
              src={Quickvee}
              className="quickvee-logo-authentication"
              alt="Quickvee"
            />
          </Link>
          <form className="login-customer-form">
            <h1>Merchant Login</h1>

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
                  <span className="input-error">{errors.passwordError}</span>
                </div>
              </div>
            </div>
            <Link
              className="forgot-password"
              underline="always"
              to="/forgot-password"
            >
              Forgot Password ?
            </Link>

            <FormControl fullWidth>
              {
                <QSubmitButton
                  name="submit"
                  handleSubmitForm={handleSubmitForm}
                  loading={loading}
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
