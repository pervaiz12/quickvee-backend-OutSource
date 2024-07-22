import React, { useEffect, useState } from "react";
import "../../../../Styles/Common.css";
import EditCustomerFunction from "./editCustomerFunction";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

import { BrowserRouter as Router, useParams } from "react-router-dom";

export default function EditCustomer() {
  const {
    handleEditData,
    customerData,
    handleChange,
    customerRadio,
    AdminRadio,
    merchantRadio,
    handleChangeRadio,
    handleSubmitCustomerRecord,
    handleKeyPress,
    errors,
    loader,
  } = EditCustomerFunction();
  const { userTypeData } = useAuthDetails();

  const { id } = useParams();
  useEffect(() => {
    handleEditData({ id, ...userTypeData });
  }, [id]);
  return (
    <div className="box">
      <div className="box_shadow_div">
        <div className="pd_20">
          <h1 className="heading">Edit Customer</h1>

          <div>
            <div className="qvrow">
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Name</label>
                  <input
                    className=""
                    type="text"
                    name="name"
                    value={customerData.name}
                    onChange={handleChange}
                  />
                  <label className="error">{errors.name}</label>
                </div>
              </div>

              <div className="col-qv-6">
                <div className="input_area">
                  <label>Email</label>
                  <input
                    className=""
                    type="text"
                    name="email"
                    value={customerData && customerData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="qvrow">
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Re-set</label>
                  <input
                    className=""
                    type="text"
                    name="reSet"
                    onChange={handleChange}
                    value={customerData.reSet}
                  />
                </div>
              </div>
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Phone</label>
                  <input
                    className=""
                    type="text"
                    name="phone"
                    value={customerData && customerData.phone}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    maxLength={10}
                  />
                  <label className="error">{errors.phone}</label>
                </div>
              </div>
            </div>

            <input
              type="button"
              className="blue_btn"
              value={
                loader ? (
                  <Box className="loader-box">
                    <CircularProgress sx={{ width: "10px" }} />
                  </Box>
                ) : (
                  "Submit"
                )
              }
              onClick={handleSubmitCustomerRecord}
            />
            <div className="col-qv-6">
              <div className="input_rediobutton_area">
                <input
                  className="inputredio"
                  type="radio"
                  id="radio2"
                  name="radio"
                  value="admin"
                  checked={AdminRadio}
                  onChange={handleChangeRadio}
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
                  checked={merchantRadio}
                  onChange={handleChangeRadio}
                />
                <label htmlFor="radio1">Merchant</label>
              </div>
              <div className="input_rediobutton_area">
                <input
                  className="inputredio"
                  type="radio"
                  id="radio3"
                  name="radio"
                  value="customer"
                  checked={customerRadio}
                  onChange={handleChangeRadio}
                />
                <label htmlFor="radio3">Customer</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
