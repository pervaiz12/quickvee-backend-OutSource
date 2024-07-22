import React from "react";
import Add_adminFunctionality from "./add_adminFunctionality";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import PasswordShow from "../../../../Common/passwordShow";
import SwitchToBackButton from "../../../../reuseableComponents/SwitchToBackButton";

export default function Add_Admin({ setVisible }) {
  const {
    handleChange,
    addAdminData,
    handleSubmit,
    handleBlur,
    handleKeyPress,
    keyEnter,
    loader,
    handleBlurPassword,
  } = Add_adminFunctionality({ setVisible });
  const handleKeyPressNew = (event) => {
    const allowedChars = /^\S+$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  };
  const navigate = useNavigate();
  const { showpPassword, jsxData } = PasswordShow();
  return (
    <>
      <div className="q-order-min-page">
        <div className="box" style={{ marginTop: "2.5rem" }}>
          <div className="box_shadow_div">
            <SwitchToBackButton linkTo={-1} title={"Add New Admin"} />
            <div className="pd_20">
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>
                      Owner Name<span className="Asterisk_error">*</span>
                    </label>
                    <input
                      className=""
                      type="text"
                      name="owner_name"
                      value={addAdminData.owner_name}
                      onChange={handleChange}
                      onKeyDown={keyEnter}
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
                    <label>
                      Email<span className="Asterisk_error">*</span>
                    </label>
                    <input
                      className=""
                      type="text"
                      name="email"
                      value={addAdminData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      autoComplete="off"
                      readOnly
                      onFocus={(e) => e.target.removeAttribute("readonly")}
                      onKeyDown={keyEnter}
                    />
                    {addAdminData.errors.email && (
                      <span className="error">{addAdminData.errors.email}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area password-show-input">
                    <label>
                      Password
                      <span className="Asterisk_error">*</span>
                    </label>
                    <input
                      className=""
                      type={showpPassword ? "text" : "password"}
                      name="password"
                      value={addAdminData.password}
                      onChange={handleChange}
                      onKeyDown={keyEnter}
                      onBlur={() => handleBlurPassword("password")}
                      onKeyPress={handleKeyPressNew}
                    />
                    {jsxData(addAdminData.password)}
                    {addAdminData.errors.password && (
                      <span className="error">
                        {addAdminData.errors.password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>
                      Phone
                      {/* <span className="Asterisk_error">*</span> */}
                    </label>
                    <input
                      className=""
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      value={addAdminData.phone}
                      maxLength={10}
                      onKeyPress={handleKeyPress}
                      onKeyDown={keyEnter}
                    />
                    <label className="error">{addAdminData.errors.phone}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="q-add-categories-section-middle-footer">
              <button
                className="quic-btn quic-btn-save attributeUpdateBTN"
                onClick={handleSubmit}
                disabled={loader}
              >
                {loader ? (
                  <>
                    <CircularProgress
                      color={"inherit"}
                      className="loaderIcon"
                      width={15}
                      size={15}
                    />{" "}
                    Add
                  </>
                ) : (
                  "Add"
                )}
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
