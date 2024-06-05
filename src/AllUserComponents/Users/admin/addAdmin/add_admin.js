import React from "react";
import Add_adminFunctionality from "./add_adminFunctionality";
import leftSvg from "../../../../Assests/Dashboard/Left.svg";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Add_Admin() {
  const {
    handleChange,
    addAdminData,
    handleSubmit,
    handleBlur,
    handleKeyPress,
    loader,
  } = Add_adminFunctionality();

  const navigate = useNavigate();
  return (
    <>
      <div className="q-order-min-page">
        <div className="box" style={{ marginTop: "2.5rem" }}>
          <div className="box_shadow_div">
            <div className="q-add-categories-section-header">
              <span onClick={() => navigate("/users/admin")}>
                <img src={leftSvg} alt="Add-New-Category" />
                <span>Add New Admin</span>
              </span>
            </div>
            <div className="pd_20">
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Owner Name</label>
                    <input
                      className=""
                      type="text"
                      name="owner_name"
                      value={addAdminData.owner_name}
                      onChange={handleChange}
                    />
                    {addAdminData.errors.owner_name && (
                      <span className="error">
                        {addAdminData.errors.owner_name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Email</label>
                    <input
                      className=""
                      type="text"
                      name="email"
                      value={addAdminData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                    />
                    {addAdminData.errors.email && (
                      <span className="error">{addAdminData.errors.email}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Password</label>
                    <input
                      className=""
                      type="password"
                      name="password"
                      value={addAdminData.password}
                      onChange={handleChange}
                    />
                    {addAdminData.errors.password && (
                      <span className="error">
                        {addAdminData.errors.password}
                      </span>
                    )}
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
                      value={addAdminData.phone}
                      maxLength={10}
                      onKeyPress={handleKeyPress}
                    />
                    <label className="error">{addAdminData.errors.phone}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="q-add-categories-section-middle-footer">
              <button className="quic-btn quic-btn-save" onClick={handleSubmit}>
                {loader ? <CircularProgress /> : "Add"}
              </button>
              <button
                onClick={() => navigate("/users/admin")}
                className="quic-btn quic-btn-cancle"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
