import { Box } from "@mui/system";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";
import Table from "react-bootstrap/Table";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import ManagerFunctionality from "./managerFunctionality";
const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};
function ViewMerchant({ data, userTypeData }) {
  //  ========================= DEFINED STATES =================
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("sfdsadffds", open);
  const [itemsData, setItemsData] = useState([]);
  const {
    setShowMerchant,
    showMerchant,
    handleViewMerchant,
    handleCloseMerchantModel,
    showMerchantData,
    name,
  } = ManagerFunctionality();
  //  ===================== END OF DEFINED STATES =================

  // ========================= HANDLER FUNCTIONS =================

  const handleClick = () => {
    console.log("sfdsadffds");
    handleOpen(true);
    // onViewClick(selectedView);
    handleViewMerchant(data.merchant_id, data.name, userTypeData);
  };

  //  ================= END OF HANDLER FUNCTIONS =================
  console.log("showMerchantData", showMerchantData);
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
          <Box className="view-category-item-modal" style={myStyles}>
            <div
              className="q-add-categories-section-header text-[18px]"
              style={{
                justifyContent: "space-between",
                fontFamily: "CircularSTDBook",
              }}
            >
              <span>
                <span>{data?.name} </span>
              </span>
              <div>
                <div className="flex justify-between gap-4">
                  {/* <select className="custom-selecter cursor-pointer">
                    <option>Recently Added</option>
                    <option> Month</option>
                    <option>Weeks</option>
                  </select> */}

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
              {showMerchantData && showMerchantData.length >= 1 ? (
                <Table striped>
                  <div className="  p-2 my-2">
                    {showMerchantData &&
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
                      ))}
                  </div>
                </Table>
              ) : (
                <p className="pl-5">No product data available</p>
              )}
            </div>

            <div className="q-add-categories-section-middles-footer">
              <button
                onClick={() => handleClose()}

                className="quic-btn quic-btn-ok"

               

              >
                Ok{" "}
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ViewMerchant;
