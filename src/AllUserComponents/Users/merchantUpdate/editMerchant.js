import React, { useEffect } from "react";
import EditMerchantFunctionality from "./editMerchantFunctionality";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import AddSvg from "../../../Assests/Dashboard/Left.svg";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import PasswordShow from "../../../Common/passwordShow";
export default function EditMerchant() {
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
  } = EditMerchantFunctionality();
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {
    let data = { id, ...userTypeData };

    getEditMerchantData(data);
  }, [id]);
  const { showpPassword, handleMouseDown, handleMouseUp, jsxData } =
    PasswordShow();

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <div className="q-add-categories-section-header">
                <span onClick={() => {}} className="text-center items-center">
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
                sx={{pt:0.5}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Name</label>
              <BasicTextFields
                name="name"
                value={getEditMerchant.name}
                onChangeFun={handleChangeMerchant}
                sx={{pt:0.5}}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label>Merchant ID</label>
              <BasicTextFields
                type="text"
                value={getEditMerchant.merchant_id}
                disable={true}
                sx={{pt:0.5}}
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
                  sx={{pt:0.5}}
                />
                {jsxData(getEditMerchant.newPassword)}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className="box">
        <div className="box_shadow_div">
          <div className="pd_20">
            {/* {successMessagehandle ? (
            <Alert severity="success">{message}</Alert>
          ) : (
            ""
          )} */}

            <h1 className="heading">Edit Merchant</h1>
            <div>
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>User name</label>
                    <input
                      className="merchant-disabled"
                      type="text"
                      name="username"
                      value={getEditMerchant.username}
                      // onChange={handleChangeMerchant}
                      disabled
                    />
                  </div>
                </div>

                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Name</label>
                    <input
                      className=""
                      type="text"
                      name="name"
                      value={getEditMerchant.name}
                      onChange={handleChangeMerchant}
                    />
                  </div>
                  {/* <label>{store.errors.ownerName}</label> */}
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-4">
                  <div className="input_area">
                    <label>Merchant ID</label>
                    <input
                      className="merchant-disabled"
                      type="text"
                      value={getEditMerchant.merchant_id}
                      disabled
                    />
                  </div>
                  {/* <label>{store.errors.email}</label> */}
                </div>
                <div className="col-qv-4">
                  <div className="input_area">
                    <label>Reset Password</label>
                    <input
                      className=""
                      type="password"
                      name="newPassword"
                      value={getEditMerchant.newPassword}
                      onChange={handleChangeMerchant}
                      autoComplete="off"
                    />
                  </div>
                  {/* <label>{store.errors.password}</label> */}
                </div>
                <div className="col-qv-4">
                  <div className="input_area">
                    <label>Owner Name</label>
                    <input
                      className=""
                      type="text"
                      name="owner_name"
                      value={
                        getEditMerchant.owner_name !== ""
                          ? getEditMerchant.owner_name
                          : ""
                      }
                      onChange={handleChangeMerchant}
                    />
                  </div>
                  {/* <label>{store.errors.password}</label> */}
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-4">
                  <div className="input_area">
                    <label>Account Type</label>
                    <select
                      name="live_account"
                      value={getEditMerchant.live_account}
                      onChange={handleChangeMerchant}
                    >
                      <option value="0">Live Account</option>
                      <option value="1">Sand box Account</option>
                    </select>
                  </div>
                  {/* {errorAdminId && <span>{errorAdminId}</span>} */}
                </div>
                <div className="col-qv-4">
                  <div className="input_area">
                    <label>Inventory Approval</label>
                    <Switch checked={inventory} onChange={inventoryApprove} />
                    {/* <input
                              className=''
                              type='text'
                              name="pin"
                              // value={merchantStore.pin}
                              // onChange={handleChangeMerchant}
                          /> */}
                  </div>
                  {/* {errorPin && <span>{errorPin}</span>} */}
                </div>
                {/* <div className="col-qv-4">
                <div className="input_area">
                  <label>Current OTP</label>
                  <input
                    className="merchant-disabled"
                    type="text"
                    name="otp"
                    value={getEditMerchant.otp}
                    disabled
                  />
                </div>
               
              </div> */}
              </div>
              <div className="qvrow">
                <h3>Address</h3>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Address Line1</label>
                    <input
                      className=""
                      type="text"
                      name="a_address_line_1"
                      value={getEditMerchant.a_address_line_1}
                      onChange={handleChangeMerchant}
                    />
                  </div>
                </div>

                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Address Line2</label>
                    <input
                      className=""
                      type="text"
                      name="a_address_line_2"
                      value={getEditMerchant.a_address_line_2}
                      onChange={handleChangeMerchant}
                    />
                  </div>
                  {/* <label>{store.errors.ownerName}</label> */}
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Phone</label>
                    <input
                      className=""
                      type="text"
                      name="a_phone"
                      value={getEditMerchant.a_phone}
                      onChange={handleChangeMerchant}
                      onKeyPress={handleKeyPress}
                      maxLength={10}
                    />
                  </div>
                  {/* <label>{store.errors.ownerName}</label> */}
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>City</label>
                    <input
                      className=""
                      type="text"
                      name="a_city"
                      value={getEditMerchant.a_city}
                      onChange={handleChangeMerchant}
                    />
                  </div>
                  {/* <label>{store.errors.ownerName}</label> */}
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Zip Code</label>
                    <input
                      className=""
                      type="text"
                      name="a_zip"
                      value={getEditMerchant.a_zip}
                      onChange={handleChangeMerchant}
                      maxLength={6}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  {/* <label>{store.errors.ownerName}</label> */}
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>State</label>
                    <select
                      value={
                        getEditMerchant.a_state !== ""
                          ? getEditMerchant.a_state
                          : ""
                      }
                      name="a_state"
                      onChange={handleChangeMerchant}
                    >
                      <option value="">Select States</option>
                      {getEditMerchant.states.map((option, index) => {
                        return (
                          <option key={index} value={option.State}>
                            {option.State}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* <label>{store.errors.ownerName}</label> */}
                </div>

                <div className="col-qv-12">
                  <div className="mb20">
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
                      <label htmlFor="radio3">
                        CASH AND CREDITS CARDS ONLY
                      </label>
                    </div>
                    {/* <label>{radioErros}</label> */}
                  </div>
                </div>
                {paymentModeOnline || paymentCredits ? (
                  <div className="qvrow">
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>API KEY</label>
                        <input
                          className=""
                          type="text"
                          name="merchant_token"
                          value={getEditMerchant.merchant_token}
                          onChange={handleChangeMerchant}
                        />
                      </div>
                      <label className="input-error">
                        {errors.merchant_token}
                      </label>
                    </div>

                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>USA PIN</label>
                        <input
                          className=""
                          type="text"
                          name="usa_pin"
                          value={getEditMerchant.usa_pin}
                          onChange={handleChangeMerchant}
                        />
                      </div>
                      <label className="input-error">{errors.usa_pin}</label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <br />
              <input
                type="button"
                className="blue_btn"
                value="Update"
                onClick={handleUpdateMerchant}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
