import React from "react";
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
import { Link } from "react-router-dom";
import QSubmitButton from "../commonField/QSubmitButton";
import TextInput from "../commonField/textInput";
import Quickvee from "../../../Assests/LoginScreen/quickveeLogo.svg";
import ForgetPasswordLogic from "./forgetPasswordLogic";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";

// /commonField/QSubmitButton

export default function ForgetPassword() {
  const {
    handleOnChange,
    email,
    handleSubmitData,
    errors,
    message,
    handleHideErrorMessage,
    status,
  } = ForgetPasswordLogic();

  return (
    <>
      <div className="main-authentication-component">
        <div className=" login-customer-form ">
          <Collapse in={message}>
            <Alert
              severity={status !== 1 ? "error" : "success"}
              action={
                <IconButton
                  className="error-close-icon"
                  aria-label="close"
                  color={status !== 1 ? "error" : "inherit"}
                  size="small"
                  onClick={handleHideErrorMessage}
                >
                  {status !== 1 ? (
                    <CloseIcon />
                  ) : (
                    <CloseIcon fontSize="inherit" />
                  )}
                </IconButton>
              }
              sx={{ mb: 4 }}
            >
              {message}
            </Alert>
          </Collapse>

          <Link to="/login">
            <img
              src={Quickvee}
              className="quickvee-logo-authentication"
              alt="Quickvee"
            />
          </Link>
          <form className="login-customer-form">
            <h1>Forget Password</h1>
            <span className="sub-heading-from">
              To reset your password, please enter your Email ID &amp; follow
              the instructions.
            </span>

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
                      label="Email"
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      //   handleBlur={handleBlur}
                    />
                  </FormControl>
                  <span className="input-error">{errors?.email}</span>
                </div>
                {/* <div
                  className="col-md-12"
                  style={{ position: "relative", marginBottom: "24px" }}
                >
                  <FormControl fullWidth>
                    <TextField
                      className="input-field"
                      label="Password"
                      variant="outlined"
                      size="small"
                      autoComplete="off"
                        type={showPassword === true ? "text" : "password"}
                        onChange={handleChangeLogin}
                      name="password"
                        value={formData.password}
                        inputProps={{
                          "data-field": "password",
                          autoComplete: "off",
                          ref: (input) => (inputRefs.current["password"] = input),
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
                  <span className="input-error">
                    {errors.passwordError}
                  </span>
                </div> */}
              </div>
            </div>

            <FormControl fullWidth>
              {
                <QSubmitButton
                  name="submit"
                  handleSubmitForm={handleSubmitData}
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
