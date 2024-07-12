import React, { useMemo, useState } from "react";
import "../../../Styles/Common.css";
// import {Col, Form, Row } from 'react-bootstrap'../../Styles/Common.css
import MerchantFunction from "./UserFunctionality/merchantFunction";
import AddSvg from "../../../Assests/Dashboard/Left.svg";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
// import Form from 'react-bootstrap/Form';
import PasswordShow from "../../../Common/passwordShow";
import { Grid } from "@mui/material";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import SwitchToBackButton from '../../../reuseableComponents/SwitchToBackButton';

export default function AddMerchan() {
  const {
    handleChange,
    store,
    handleSubmit,
    onClickUserRadio,
    userRadio,
    handleChangeMerchant,
    handleBlur,
    merchantStore,
    radioErros,
    stateList,
    adminList,
    adminId,
    onChangeAdminId,
    handleSubmitMerchant,
    errorAdminId,
    errorPin,
    handleKeyPress,
    loader,
    keyEnter,
    handleBlurStoreFound,
  } = MerchantFunction();

  const navigate = useNavigate();

  const { showpPassword, handleMouseDown, handleMouseUp, jsxData } =
    PasswordShow();

  const location = useLocation();

  // console.log("location: ", location);

  const [selectedState, setSelectedState] = useState("Select State");

  const handleChangedState = (option) => {
    if (option !== "Select State") {
      handleChange(option);
      setSelectedState(option.title);
    }
  };

  // const [showpPassword, setShowPassword] = useState(false);

  // const navigate = useNavigate();

  // const handleMouseDown = () => {
  //   setShowPassword(true);
  // };

  // const handleMouseUp = () => {
  //   setShowPassword(false);
  // };
  const handleKeyPressNew = (event) => {
    const allowedChars = /^\S+$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <SwitchToBackButton
                linkTo={location.state?.from}
                title={`Add ${location.state && location.state?.heading}`}
              />
              {/* <div className="q-add-categories-section-header">
                <span
                  onClick={() => {
                    if (location.state?.from) {
                      navigate(location.state?.from);
                    }
                  }}
                  className="text-center items-center"
                >
                  {location.state?.from && (
                    <img
                      src={AddSvg}
                      alt="Add-New-Category"
                      className="h-9 w-9"
                    />
                  )}
                  <span>Add {location.state && location.state?.heading}</span>
                </span>
              </div> */}
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pt: 2.5 }}>
            <Grid item xs={12}>
              <label htmlFor="">
                User Type <span className="Asterisk_error">*</span>
              </label>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12}>
              <div className="input_rediobutton_area">
                <input
                  className="inputredio"
                  type="radio"
                  id="radio1"
                  name="radio"
                  value="merchant"
                  onClick={onClickUserRadio}
                  checked={userRadio}
                />
                <label htmlFor="radio1">Merchant</label>
                <div className="error">{radioErros}</div>
              </div>
            </Grid>
          </Grid>
          {!userRadio ? (
            <>
              {" "}
              <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
                <Grid item xs={12} sm={6}>
                  <label>
                    Store Name <span className="Asterisk_error">*</span>
                  </label>
                  <BasicTextFields
                    type="text"
                    name="storename"
                    value={store.storename}
                    sx={{ pt: 0.5 }}
                    onChangeFun={handleChange}
                  />
                  {store.errors.storename && (
                    <span className="error">{store.errors.storename}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                    Owner Name <span className="Asterisk_error">*</span>
                  </label>
                  <BasicTextFields
                    type="text"
                    name="ownerName"
                    value={store.ownerName}
                    onChangeFun={handleChange}
                    sx={{ pt: 0.5 }}
                    onBlurFunction={() => handleBlur("ownerName")}
                  />
                  {store.errors.ownerName && (
                    <span className="error">{store.errors.ownerName}</span>
                  )}
                </Grid>
              </Grid>
              <Grid container sx={{ px: 2.5, pb: 2.5 }} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <label>Email</label>
                  <BasicTextFields
                    type="text"
                    name="email"
                    onChangeFun={handleChange}
                    value={store.email}
                    onBlurFunction={() => handleBlur("email")}
                    sx={{ pt: 0.5 }}
                  />
                  {store.errors.email && (
                    <span className="error">{store.errors.email}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="password-show-input">
                    <label>Password</label>
                    <BasicTextFields
                      type={showpPassword ? "text" : "password"}
                      name="password"
                      onChangeFun={handleChange}
                      onBlurFunction={() => handleBlur("password")}
                      value={store.password}
                      sx={{ pt: 0.5 }}
                    />
                    {jsxData(store.password)}
                  </div>
                  {store.errors.password && (
                    <span className="error">{store.errors.password}</span>
                  )}
                </Grid>
              </Grid>
              <Grid container sx={{ px: 2.5, pb: 2.5 }} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <label>Phone</label>
                  <BasicTextFields
                    type="text"
                    name="phone"
                    onChangeFun={handleChange}
                    value={store.phone}
                    maxLength={10}
                    onKeyPressFun={handleKeyPress}
                    sx={{ pt: 0.5 }}
                  />
                  {store.errors.phone && (
                    <span className="error">{store.errors.phone}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>State</label>
                  <SelectDropDown
                    default_title={"Select States"}
                    listItem={stateList}
                    title={"State"}
                    onClickHandler={handleChange}
                    sx={{ pt: 0.5 }}
                  />
                  {store.errors.state && (
                    <span className="error">{store.errors.state}</span>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ px: 2.5, pb: 2.5 }}
              >
                <Grid item>
                  <button
                    className="quic-btn quic-btn-save"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </Grid>
                {location.state?.from && (
                  <Grid>
                    <button
                      onClick={() => navigate(`${location.state?.from}`)}
                      className="quic-btn quic-btn-cancle"
                    >
                      Cancel
                    </button>
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <>
              <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
                <Grid item xs={12} sm={6}>
                  <label>
                    Store Name <span className="Asterisk_error">*</span>
                  </label>
                  <BasicTextFields
                    type="text"
                    name="storename"
                    value={store.storename}
                    onChangeFun={handleChange}
                    sx={{ pt: 0.5 }}
                    onKeyDown={keyEnter}
                    onBlurFunction={() => handleBlurStoreFound("storename")}
                  />
                  {store.errors.storename && (
                    <span className="error">{store.errors.storename}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                    Owner Name <span className="Asterisk_error">*</span>
                  </label>
                  <BasicTextFields
                    type="text"
                    name="ownerName"
                    value={store.ownerName}
                    onChangeFun={handleChange}
                    sx={{ pt: 0.5 }}
                    onKeyDown={keyEnter}
                  />
                  {store.errors.ownerName && (
                    <span className="error">{store.errors.ownerName}</span>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
                <Grid item xs={12} sm={6}>
                  <label>
                    Email <span className="Asterisk_error">*</span>
                  </label>
                  <BasicTextFields
                    type="text"
                    name="email"
                    value={store.email}
                    onChangeFun={handleChange}
                    onBlurFunction={() => handleBlur("email")}
                    autoComplete="off"
                    readOnly
                    onFocusData={(e) => e.target.removeAttribute("readonly")}
                    onKeyDown={keyEnter}
                  />
                  {/* <input
                    className=""
                    type="text"
                    name="email"
                    value={store.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    autoComplete="off"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute("readonly")}
                  /> */}
                  {store.errors.email && (
                    <span className="error">{store.errors.email}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="password-show-input">
                    <label>
                      Password <span className="Asterisk_error">*</span>
                    </label>
                    <BasicTextFields
                      type={showpPassword ? "text" : "password"}
                      name="password"
                      value={store.password}
                      onChangeFun={handleChange}
                      onBlurFunction={() => handleBlur("password")}
                      sx={{ pt: 0.5, pt: 0 }}
                      onKeyDown={keyEnter}
                      onKeyPressFun={handleKeyPressNew}
                    />
                    {jsxData(store.password)}
                  </div>
                  {store.errors.password && (
                    <span className="error">{store.errors.password}</span>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
                <Grid item xs={12} sm={6}>
                  <label>
                    Phone<span className="Asterisk_error">*</span>
                  </label>
                  <BasicTextFields
                    className=""
                    type="text"
                    name="phone"
                    onChangeFun={handleChange}
                    value={store.phone}
                    maxLength={10}
                    onKeyPressFun={handleKeyPress}
                    sx={{ pt: 0.5 }}
                    onKeyDown={keyEnter}
                  />
                  {store.errors.phone && (
                    <span className="error">{store.errors.phone}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                    State <span className="Asterisk_error">*</span>
                  </label>
                  <SelectDropDown
                    heading={"Select State"}
                    selectedOption={selectedState}
                    listItem={stateList.map((state) => ({
                      title: state.State,
                      name: "state",
                    }))}
                    title={"title"}
                    onClickHandler={handleChangedState}
                    handleChange
                    sx={{ pt: 0.5 }}
                  />
                  {store.errors.state && (
                    <span className="error">{store.errors.state}</span>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ px: 2.5, pb: 2.5 }}
              >
                <Grid item sx={{ px: 2 }}>
                  <button
                    className="quic-btn quic-btn-save"
                    onClick={handleSubmitMerchant}
                    disabled={loader}
                  >
                    {loader ? <CircularProgress color={"inherit"} /> : "Add"}
                  </button>
                </Grid>
                {location.state?.from && (
                  <Grid item>
                    <button
                      onClick={() => navigate(`${location.state?.from}`)}
                      className="quic-btn quic-btn-cancle"
                    >
                      Cancel
                    </button>
                  </Grid>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
