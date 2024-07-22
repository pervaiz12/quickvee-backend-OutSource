import { Box } from "@mui/system";
import { useState } from "react";

import Modal from "@mui/material/Modal";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import { Grid } from "@mui/material";
import BasicTextFields from "../../../reuseableComponents/TextInputField";

const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};
const EditCashModel = ({
  changeReceivingAmount,
  newReceivingAmount,
  handleAddReceivingAmount,
  data,
  setNewOrderAmount,
  setNewOrderId,

}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (id, amt) => {
    handleOpen(true);
    setNewOrderId(id);
    setNewOrderAmount(amt);
  };

  const hadleSaveClick =()=>{
    handleAddReceivingAmount()
    handleClose()
  }
  return (
    <>
      <div>
        <span
          className="categories-items categories-items-btn "
          onClick={() => handleClick(data.order_id, data.amt)}
        >
          <img
            class="edit_center"
            order-id="${data.order_id}"
            order-amt="${data.amt}"
            src="/static/media/editIcon.4dccb72a9324ddcac62b9a41d0a042db.svg"
            alt="Edit"
          />
        </span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="view-category-item-modal" style={myStyles}>
            <div
              className="q-add-categories-section-header text-[18px]"
              style={{
                justifyContent: "space-between",
                fontFamily: "CircularSTDBook",
              }}
            >
              <p className=""> Cash Recieving</p>
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
            <Grid container>
              <Grid item sx={{ p: 2.5 }} xs={12}>
                <BasicTextFields
                  placeholder={"Enter Amount"}
                  value={newReceivingAmount}
                  onChangeFun={changeReceivingAmount}
                  type={"number"}
                //   onKeyPressFun={handleKeyPress}
                  //   sx={{ pt: 0.5 }}
                />
                {/* {emailError && <p className="error">{emailError}</p>} */}
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{ px: 2.5, pb: 2.5 }}
                >
                  <Grid item sx={{ px: 2.5 }}>
                    <button
                      onClick={ hadleSaveClick}
                      className="quic-btn quic-btn-save"
                    >
                      save
                    </button>
                  </Grid>
                  <Grid item>
                    <button
                      onClick={handleClose}
                      className="quic-btn quic-btn-cancle"
                    >
                      Cancel
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default EditCashModel;
