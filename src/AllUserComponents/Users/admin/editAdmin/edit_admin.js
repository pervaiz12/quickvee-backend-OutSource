import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditAdminFunctionality from "./editAdminFunctionality";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import AddSvg from "../../../../Assests/Dashboard/Left.svg";
import CircularProgress from "@mui/material/CircularProgress";
import PasswordShow from "../../../../Common/passwordShow";
import Loader from "../../../../CommonComponents/Loader";

export default function EditAdmin({ EditAdminId, setVisible }) {
  const handleClick = () => {
    // setVisible("AdminView")
    navigate(-1);
  };
  const setPositionLoader = {
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  const {
    handleEditAdmin,
    editData,
    handleChangeAdmin,
    handleSubmitAdmin,
    errors,
    handleKeyPress,
    loader,
    loaderEdit,
    handleBlur,
  } = EditAdminFunctionality(handleClick);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { showpPassword, jsxData } = PasswordShow();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleEditAdmin({ admin_id: id, ...userTypeData });
  }, [id]);
  return (
    <>
      {loaderEdit ? (
        <div style={setPositionLoader}>
          <div className="loaderarea">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="box">
          <div className="box_shadow_div">
            <div className="q-add-categories-section-header">
              <span onClick={handleClick}>
                <img src={AddSvg} alt="Add-New-Category" />
                <span>Edit Admin</span>
              </span>
            </div>
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
                      value={editData.owner_name}
                      onChange={handleChangeAdmin}
                    />
                    <label className="error">{errors.owner_name}</label>
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
                      value={editData.email}
                      // value={customerData && customerData.email}
                      // value={store.ownerName}
                      onChange={handleChangeAdmin}
                      onBlur={() => handleBlur("email")}
                      autoComplete="off"
                      readOnly // Set as readonly initially
                      onFocus={(e) => e.target.removeAttribute("readonly")}
                    />
                    <label className="error">{errors.email}</label>
                  </div>
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area password-show-input">
                    <label>Password</label>
                    <input
                      className=""
                      type={showpPassword ? "text" : "password"}
                      name="password1"
                      value={editData.password1}
                      onChange={handleChangeAdmin}
                      autoComplete="off"
                      // value={store.email}
                    />
                    {jsxData(editData.password1)}
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
                      value={editData.phone}
                      onKeyPress={handleKeyPress}
                      maxLength={10}
                      onChange={handleChangeAdmin}
                    />
                    <label className="error">{errors.phone}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="q-add-categories-section-middle-footer">
              <button
                className="quic-btn quic-btn-save"
                onClick={handleSubmitAdmin}
                disabled={loader}
              >
                {loader ? <CircularProgress /> : "Update"}
              </button>
              <button
                // onClick={() => navigate("/users/admin")}
                onClick={handleClick}
                className="quic-btn quic-btn-cancle"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
