import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ViewAdmin(props) {
  return (
    <>
      {props.showAdmin ? (
        <div className="q-custom-modal-container" id="addtributes_">
          <div className="q-custom-modal-content">
            <div className="">
              <p className="q-custom-modal-header ">{props.adminName}</p>
            </div>
            {Array.isArray(props.showMerchantData) ? (
              props.showMerchantData.map((result, index) => {
                return <p key={index}>{result.name}</p>;
              })
            ) : (
              <p>{props.showMerchantData}</p>
            )}
            <span className="input-error"></span>
            <div className="q-add-categories-section-middle-footer">
              <button
                onClick={props.handleCloseAdminModel}
                className="quic-btn quic-btn-cancle"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ViewAdmin;
