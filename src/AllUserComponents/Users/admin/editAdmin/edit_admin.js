import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditAdminFunctionality from "./editAdminFunctionality";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import AddSvg from "../../../../Assests/Dashboard/Left.svg";

export default function EditAdmin() {
  const {
    handleEditAdmin,
    editData,
    handleChangeAdmin,
    handleSubmitAdmin,
    errors,
    handleKeyPress,
  } = EditAdminFunctionality();
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleEditAdmin({ admin_id: id, ...userTypeData });
  }, [id]);

  return (
    <div className="box">
      <div className="box_shadow_div">
        <div className="q-add-categories-section-header">
          <span onClick={() => navigate("/users/admin")}>
            <img src={AddSvg} alt="Add-New-Category" />
            <span>Edit Admin</span>
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
                  value={editData.owner_name}
                  onChange={handleChangeAdmin}
                />
                <label className="error">{errors.owner_name}</label>
              </div>
            </div>

            <div className="col-qv-6">
              <div className="input_area">
                <label>Email</label>
                <input
                  className=""
                  type="text"
                  name="email"
                  value={editData.email}
                  // value={customerData && customerData.email}
                  // value={store.ownerName}
                  onChange={handleChangeAdmin}
                />
                <label className="error">{errors.email}</label>
              </div>
            </div>
          </div>
          <div className="qvrow">
            <div className="col-qv-6">
              <div className="input_area">
                <label>Password</label>
                <input
                  className=""
                  type="text"
                  name="password1"
                  value={editData.password1}
                  onChange={handleChangeAdmin}
                  // value={store.email}
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
          >
            Edit
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
  );
}
