import { Box } from "@mui/system";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";
import Table from "react-bootstrap/Table";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import AdminFunctionality from "./adminFunctionality";
const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};
function ViewAdmin({ email, name, userTypeData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    handleCloseAdminModel,
    handleViewAdmin,
    showAdmin,
    showMerchantData,
    adminName,
  } = AdminFunctionality();
  const handleClick = () => {
    handleViewAdmin(email, name, userTypeData);
    console.log("sfdsadffds");
    handleOpen(true);
    // onViewClick(selectedView);
  };
  return (
    <>
      <div>
        <span
          className="categories-items categories-items-btn viewModal-Btn"
          onClick={handleClick}
        >
          View Merchant
        </span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <div className="q-custom-modal-container" id="addtributes_">
              <div className="q-custom-modal-content">
                <div
                  className="q-add-categories-section-header text-[18px]"
                  style={{
                    justifyContent: "space-between",
                    fontFamily: "CircularSTDBook",
                  }}
                >
                  <p className="q-custom-modal-header ">{adminName}</p>
                  <div>
                    <div
                      className="flex justify-between gap-4"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={CrossIcon}
                        alt="icon"
                        className="  quic-btn-cancle w-6 h-6"
                        onClick={() => handleClose()}
                      />
                    </div>
                  </div>
                </div>
                <div className="view-category-item-modal-header viewModal-width">
                  <Table striped>
                    <div className="  p-2 my-2">
                      {Array.isArray(showMerchantData) ? (
                        showMerchantData &&
                        showMerchantData?.map((item, index) => (
                          <>
                            <p
                              className="q_view_modal_details"
                              key={index}
                              style={{
                                fontFamily: "CircularSTDMedium !important",
                              }}
                            >
                              {item?.name}
                            </p>
                          </>
                        ))
                      ) : (
                        <p className="q_view_modal_details">
                          {showMerchantData}
                        </p>
                      )}
                    </div>
                  </Table>
                </div>
                <span className="input-error"></span>
                <div className="q-add-categories-section-middle-footer">
                  <button
                    onClick={handleClose}
                    className="quic-btn quic-btn-cancle"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ViewAdmin;
