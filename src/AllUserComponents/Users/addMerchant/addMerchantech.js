import React, { useMemo } from "react";
import "../../../Styles/Common.css";
// import {Col, Form, Row } from 'react-bootstrap'../../Styles/Common.css
import MerchantFunction from "./UserFunctionality/merchantFunction";
import AddSvg from "../../../Assests/Dashboard/Left.svg";
import { useLocation, useNavigate } from "react-router-dom";
// import Form from 'react-bootstrap/Form';

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
  } = MerchantFunction();

  const location = useLocation();

  console.log("location: ", location);

  const navigate = useNavigate();

  return (
    <>
      <div className="q-order-main-page">
        <div className="box">
          <div className="box_shadow_div">
            <div className="q-add-categories-section-header">
              <span
                onClick={() => {
                  if (location.state?.from) {
                    navigate(location.state?.from);
                  }
                }}
              >
                {location.state?.from && (
                  <img src={AddSvg} alt="Add-New-Category" />
                )}
                <span>Add {location.state && location.state?.heading}</span>
              </span>
            </div>

            <div className="pd_20">
              <div className="qvrow">
                <div className="col-qv-3">
                  <label htmlFor="">User Type</label>
                  <div className="input_rediobutton_area">
                    <input
                      className="inputredio"
                      type="radio"
                      id="radio2"
                      name="radio"
                      value="admin"
                      onClick={onClickUserRadio}
                    />
                    <label htmlFor="radio2">Admin</label>
                  </div>
                  <div className="input_rediobutton_area">
                    <input
                      className="inputredio"
                      type="radio"
                      id="radio1"
                      name="radio"
                      value="merchant"
                      onClick={onClickUserRadio}
                    />
                    <label htmlFor="radio1">Merchant</label>
                  </div>
                </div>
                <span className="error">{radioErros}</span>
              </div>
              <br />

              {!userRadio ? (
                <>
                  <div>
                    <div className="qvrow">
                      <div className="col-qv-6">
                        <div className="input_area">
                          <label>Store Name</label>
                          <input
                            className=""
                            type="text"
                            name="storename"
                            value={store.storename}
                            onChange={handleChange}
                          />
                          {store.errors.storename && (
                            <span className="error">
                              {store.errors.storename}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-qv-6">
                        <div className="input_area">
                          <label>Owner Name</label>
                          <input
                            className=""
                            type="text"
                            name="ownerName"
                            value={store.ownerName}
                            onChange={handleChange}
                          />
                          <span className="error">
                            {store.errors.ownerName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="qvrow">
                      <div className="col-qv-6">
                        <div className="input_area">
                          <label>Email</label>
                          <input
                            className=""
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={store.email}
                            onBlur={() => handleBlur("email")}
                          />
                          <span className="error">{store.errors.email}</span>
                        </div>
                      </div>
                      <div className="col-qv-6">
                        <div className="input_area">
                          <label>password</label>
                          <input
                            className=""
                            type="text"
                            name="password"
                            onChange={handleChange}
                            value={store.password}
                            onBlur={() => handleBlur("password")}
                          />
                          <span className="error">{store.errors.password}</span>
                        </div>
                      </div>
                    </div>
                    <div className="qvrow">
                      <div className="col-qv-6">
                        <div className="input_area">
                          <label>Phone</label>
                          <input
                            className=""
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            value={store.phone}
                            maxLength={10}
                            onKeyPress={handleKeyPress}
                            // placeholder='First Name'
                          />
                          <span className="error">{store.errors.phone}</span>
                        </div>
                      </div>
                      <div className="col-qv-6">
                        <div className="input_area">
                          <label>State</label>
                          <select
                            value={store.state}
                            name="state"
                            onChange={handleChange}
                          >
                            <option value="">Select States</option>
                            {stateList.map((option) => {
                              //     console.log(option)
                              // }
                              return (
                                <option key={option.State} value={option.State}>
                                  {option.State}
                                </option>
                              );
                            })}
                          </select>

                          <label className="error">{store.errors.state}</label>
                        </div>
                      </div>
                    </div>
                    {/* <input
                    type="button"
                    className="blue_btn"
                    value="Submit"
                    onClick={handleSubmit}
                  /> */}
                  </div>
                </>
              ) : (
                <>
                  <div className="qvrow">
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>Select Admin</label>
                        <select value={adminId} onChange={onChangeAdminId}>
                          <option value="">Select an Admin</option>
                          {adminList.map((option) => {
                            return (
                              <option
                                key={option.id}
                                value={option.merchant_id}
                              >
                                {option.name}
                              </option>
                            );
                          })}
                        </select>
                        {errorAdminId && (
                          <span className="error">{errorAdminId}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>Login Pin</label>
                        <input
                          className=""
                          type="text"
                          name="pin"
                          value={merchantStore.pin}
                          onChange={handleChangeMerchant}
                          maxLength={4}
                          onKeyPress={handleKeyPress}
                        />
                        {errorPin && <span className="error">{errorPin}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="qvrow">
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>Store Name</label>
                        <input
                          className=""
                          type="text"
                          name="storename"
                          value={store.storename}
                          onChange={handleChange}
                        />
                        {store.errors.storename && (
                          <span className="error">
                            {store.errors.storename}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>Owner Name</label>
                        <input
                          className=""
                          type="text"
                          name="ownerName"
                          value={store.ownerName}
                          onChange={handleChange}
                        />
                        <span className="error">{store.errors.ownerName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="qvrow">
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>Email</label>
                        <input
                          className=""
                          type="text"
                          name="email"
                          value={store.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                        />
                        <span className="error">{store.errors.email}</span>
                      </div>
                    </div>
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>Password</label>
                        <input
                          className=""
                          type="text"
                          name="password"
                          value={store.password}
                          onChange={handleChange}
                          onBlur={() => handleBlur("password")}
                          // value={merchantStore.mer_password}
                          // onChange={handleChangeMerchant}
                        />
                        <span className="error">{store.errors.password}</span>
                      </div>
                    </div>
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>Phone</label>
                        <input
                          className=""
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          value={store.phone}
                          maxLength={10}
                          onKeyPress={handleKeyPress}
                          // value={merchantStore.mer_phone}
                          // onChange={handleChangeMerchant}
                        />
                        <span className="error">{store.errors.phone}</span>
                      </div>
                    </div>
                    <div className="col-qv-6">
                      <div className="input_area">
                        <label>State</label>
                        <select
                          value={store.state}
                          name="state"
                          onChange={handleChange}
                        >
                          <option value="">Select States</option>
                          {stateList.map((option) => {
                            //     console.log(option)
                            // }
                            return (
                              <option key={option.State} value={option.State}>
                                {option.State}
                              </option>
                            );
                          })}
                        </select>
                        <span className="error">{store.errors.state}</span>
                      </div>
                    </div>
                    {/* <input
                      type="button"
                      className="blue_btn"
                      value="Submit"
                      onClick={handleSubmitMerchant}
                    /> */}
                  </div>
                  {/* <input 
                                type='button'
                                className="blue_btn"
                                value="Submit"
                                onClick={handleSubmit}
                            /> */}
                </>
              )}
            </div>
            <div className="q-add-categories-section-middle-footer">
              <button className="quic-btn quic-btn-save" onClick={handleSubmit}>
                Add
              </button>
              {location.state?.from && (
                <button
                  onClick={() => navigate(`${location.state?.from}`)}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
