import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChangePasswordForm from "./ChangePasswordForm";
import InfoFunction from "./infoFunctionality/infoFunction";
import CustomHeader from "../../reuseableComponents/CustomHeader";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};

export default function ChangePasswordModal() {
  const {
    onPasswordInputChange,
    handleSubmitChangePassword,
    passwordInput,
    passwordError,
    handleBlurPassword,
    handleCloseModel,
    loader,
    handleClose,
    open,
    handleOpen,
  } = InfoFunction();
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => {
  //   setOpen(false);
  //   handleCloseModel();
  // };

  return (
    <>
      <div>
        <button className="text-[#0A64F9]" onClick={handleOpen}>
          Change Password
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="view-category-item-modal" sx={myStyles}>
            <div
              className="q-add-categories-section-header text-[18px]"
              style={{
                justifyContent: "space-between",
                fontFamily: "CircularSTDBook",
              }}
            >
              <p className="">Change Password</p>
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

            <ChangePasswordForm
              onPasswordInputChange={onPasswordInputChange}
              handleSubmitChangePassword={handleSubmitChangePassword}
              passwordInput={passwordInput}
              passwordError={passwordError}
              handleBlurPassword={handleBlurPassword}
              handleClose={handleClose}
              loader={loader}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
}
