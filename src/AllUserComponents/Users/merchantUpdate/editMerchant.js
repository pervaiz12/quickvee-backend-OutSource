import React, { useEffect, useMemo } from "react";
import EditMerchantFunctionality from "./editMerchantFunctionality";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import AddSvg from "../../../Assests/Dashboard/Left.svg";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import PasswordShow from "../../../Common/passwordShow";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
// import { useParams } from 'react-router-dom';
export default function EditMerchant({
  merchantId,
  currentMerchant,
  setVisible,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  const {
    getEditMerchantData,
    getEditMerchant,
    handleChangePaymentMode,
    paymentModeOnline,
    paymentModeOffline,
    handleUpdateMerchant,
    handleChangeMerchant,
    paymentCredits,
    setEditMerchant,
    message,
    successMessagehandle,
    handleKeyPress,
    inventory,
    inventoryApprove,
    errors,
    loader,
  } = EditMerchantFunctionality();
  const { id } = useParams();
  const ids = !!merchantId ? merchantId : id;
  useEffect(() => {
    let data = { id: ids, ...userTypeData };
    getEditMerchantData(data);
  }, [ids]);
  const { showpPassword, handleMouseDown, handleMouseUp, jsxData } =
    PasswordShow();
  const accountTtype = [
    {
      value: "0",
      title: "Live Account",
      name: "live_account",
    },
    {
      value: "1",
      title: "Sandbox Account",
      name: "live_account",
    },
  ];
  const selectedAccountType = useMemo(() => {
    const result = accountTtype.find(
      (account) => account.value === getEditMerchant?.live_account
    );
    return result && result.title ? result.title : null;
  }, [getEditMerchant]);

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <div className="q-add-categories-section-header">
                <span
                  onClick={() => {
                    // setVisible(currentMerchant);
                    navigate(-1);
                  }}
                  className="text-center items-center"
                >
                  <img
                    src={AddSvg}
                    alt="Add-New-Category"
                    className="h-9 w-9"
                  />
                  <span>Edit Merchant</span>
                </span>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ px: 2.5, py: 2.5 }}>
            <Grid item xs={12} sm={6}>
              <label>User name</label>
              <BasicTextFields
                type="text"
                name="username"
                value={getEditMerchant.username}
                disable={true}
                sx={{ pt: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Store Name</label>
              <BasicTextFields
                name="name"
                value={getEditMerchant.name}
                onChangeFun={handleChangeMerchant}
                sx={{ pt: 0.5 }}
                required={true}
              />
              {errors.name_error && (
                <label className="input-error">{errors.name_error}</label>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label>Merchant ID</label>
              <BasicTextFields
                type="text"
                value={getEditMerchant.merchant_id}
                disable={true}
                sx={{ pt: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="password-show-input">
                <label>Reset Password</label>
                <BasicTextFields
                  type={showpPassword ? "text" : "password"}
                  name="newPassword"
                  value={getEditMerchant.newPassword}
                  onChangeFun={handleChangeMerchant}
                  sx={{ pt: 0.5 }}
                  autoCompleteOff="off"
                />
                {jsxData(getEditMerchant.newPassword)}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Owner Name</label>
              <BasicTextFields
                type="text"
                name="owner_name"
                required={true}
                value={
                  getEditMerchant.owner_name !== ""
                    ? getEditMerchant.owner_name
                    : ""
                }
                onChangeFun={handleChangeMerchant}
                sx={{ pt: 0.5 }}
              />
              {errors.owner_name && (
                <label className="input-error">{errors.owner_name}</label>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label>Account Type</label>
              <SelectDropDown
                name="live_account"
                selectedOption={selectedAccountType}
                listItem={accountTtype}
                title={"title"}
                onClickHandler={handleChangeMerchant}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Inventory Approval</label>
              <Switch checked={inventory} onChange={inventoryApprove} />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ px: 2.5, pt: 1.2 }}>
            <Grid item xs={12}>
              <h3>Address</h3>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6}>
              <label>Address Line 1</label>
              <BasicTextFields
                type="text"
                name="a_address_line_1"
                value={getEditMerchant.a_address_line_1}
                onChangeFun={handleChangeMerchant}
                sx={{ pt: 0.5 }}
              />
              {errors.a_address_line_1 && (
                <label className="input-error">{errors.a_address_line_1}</label>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Address Line 2</label>
              <BasicTextFields
                type="text"
                name="a_address_line_2"
                value={getEditMerchant.a_address_line_2}
                onChangeFun={handleChangeMerchant}
                sx={{ pt: 0.5 }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6}>
              <label>Phone</label>
              <BasicTextFields
                type="text"
                name="a_phone"
                value={getEditMerchant.a_phone}
                onChangeFun={handleChangeMerchant}
                onKeyPressFun={handleKeyPress}
                maxLength={10}
                sx={{ pt: 0.5 }}
              />
              {errors.a_phone && (
                <label className="input-error">{errors.a_phone}</label>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {" "}
              <label>City</label>
              <BasicTextFields
                type="text"
                name="a_city"
                value={getEditMerchant.a_city}
                onChangeFun={handleChangeMerchant}
                sx={{ pt: 0.5 }}
              />
              {errors.a_city && (
                <label className="input-error">{errors.a_city}</label>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6}>
              <label>Zip Code</label>
              <BasicTextFields
                type="text"
                name="a_zip"
                value={getEditMerchant.a_zip}
                onChangeFun={handleChangeMerchant}
                maxLength={6}
                onKeyPressFun={handleKeyPress}
                sx={{ pt: 0.5 }}
              />
              {errors.a_zip && (
                <label className="input-error">{errors.a_zip}</label>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>State</label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                selectedOption={getEditMerchant.a_state}
                listItem={getEditMerchant.states.map((state) => ({
                  title: state.State,
                  name: "a_state",
                  value: state.State,
                }))}
                title={"title"}
                onClickHandler={handleChangeMerchant}
              />
              {errors.a_state && (
                <label className="input-error">{errors.a_state}</label>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item>
              <div className="input_rediobutton_area">
                <input
                  className="inputredio"
                  type="radio"
                  id="radio1"
                  name="radio"
                  value="1"
                  onChange={handleChangePaymentMode}
                  checked={paymentCredits}
                />
                <label htmlFor="radio1">CREDITS CARDS ONLY</label>
              </div>
            </Grid>
            <Grid item>
              <div className="input_rediobutton_area">
                <input
                  className="inputredio"
                  type="radio"
                  id="radio2"
                  name="radio"
                  value="0"
                  onChange={handleChangePaymentMode}
                  checked={paymentModeOffline}
                />
                <label htmlFor="radio2">CASH ONLY</label>
              </div>
            </Grid>
            <Grid item>
              <div className="input_rediobutton_area">
                <input
                  className="inputredio"
                  type="radio"
                  id="radio3"
                  name="radio"
                  value="2"
                  onChange={handleChangePaymentMode}
                  checked={paymentModeOnline}
                />
                <label htmlFor="radio3">CASH AND CREDITS CARDS ONLY</label>
              </div>
            </Grid>
          </Grid>
          {paymentModeOnline || paymentCredits ? (
            <>
              <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
                <Grid item xs={12} sm={6}>
                  <label>API KEY</label>
                  <BasicTextFields
                    type="text"
                    name="merchant_token"
                    value={getEditMerchant.merchant_token}
                    onChangeFun={handleChangeMerchant}
                    sx={{ pt: 0.5 }}
                  />
                  {errors.merchant_token && (
                    <span className="input-error">{errors.merchant_token}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>USA PIN</label>
                  <BasicTextFields
                    type="text"
                    name="usa_pin"
                    value={getEditMerchant.usa_pin}
                    onChangeFun={handleChangeMerchant}
                    sx={{ pt: 0.5 }}
                  />
                  {errors.usa_pin && (
                    <label className="input-error">{errors.usa_pin}</label>
                  )}
                </Grid>
              </Grid>
            </>
          ) : (
            ""
          )}
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ px: 2.5, pb: 2.5 }}
          >
            <Grid item sx={{ px: 2.5 }}>
              <button
                className="quic-btn quic-btn-save "
                onClick={handleUpdateMerchant}
                disabled={loader}
              >
                {loader ? <CircularProgress color="inherit" /> : "Update"}
              </button>
            </Grid>
            <Grid item>
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="quic-btn quic-btn-cancle"
              >
                Cancel
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
