import { Box } from "@mui/system";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import { CircularProgress, Grid } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import CurrencyInputHelperFun from "../../helperFunctions/CurrencyInputHelperFun";
import { BASE_URL, VENDOR_UPDATE_DETAILS } from "../../Constants/Config";
import { useAuthDetails } from "../../Common/cookiesHelper";
import axios from "axios";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};

export default function EditTransactionAmountRemark({
  vendor,
  dateRangeState,
  handleGetReport,
}) {
  const [open, setOpen] = useState(false);
  const [vendorData, setVendorData] = useState(vendor);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    console.log("sfdsadffds");
    handleOpen(true);
  };
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const handleonChangeFunction = (e) => {
    const { value, name } = e.target;
    console.log("value: " + value);
    setVendorData((preState) => ({
      ...preState,
      [name]: name === "pay_amount" ? CurrencyInputHelperFun(value) : value,
    }));
  };

  const handleUpdate = async (e) => {
    console.log("update");
    e.preventDefault();
    function formatDate(date) {
      const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return date.toLocaleString("en-US", options);
    }
    const data = {
      merchant_id: merchant_id,
      det_id: vendorData.id,
      amount: vendorData.pay_amount,
      remark: vendorData.remark,
      vendor_id: vendorData.vendor_id,
      //   start: formatDate(new Date()),
      //   end: formatDate(new Date()),
    };

    try {
      setLoading(true);
      const { token, ...otherUserData } = userTypeData;
      const response = await axios.post(
        BASE_URL + VENDOR_UPDATE_DETAILS,
        { ...data, ...otherUserData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "true") {
        setLoading(false);
        console.log(response.data);

        handleGetReport(dateRangeState);
        handleClose();
        ToastifyAlert("Upadated successfully", "success");
      } else {
        ToastifyAlert("Something wrong", "error");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <img
        className="edit_center cursor-pointer"
        // singleVender={singleVendor}
        onClick={handleClick}
        src={EditIcon}
        alt="Edit"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="view-category-item-modal" style={myStyles}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 2.5 }}
            className="q-add-categories-section-header "
          >
            <Grid item>
              <p
                className="text-[18px]"
                style={{ fontFamily: "CircularSTDBook" }}
              >
                Edit Vendor Details
              </p>
            </Grid>
            <Grid item>
              <img
                src={CrossIcon}
                alt="icon"
                className="  quic-btn-cancle w-6 h-6"
                onClick={() => handleClose()}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pt: 2 }}>
            <Grid item xs={12}>
              <label>Amount</label>
              <BasicTextFields
                sx={{ pt: 0.5 }}
                value={vendorData.pay_amount}
                onChangeFun={handleonChangeFunction}
                name={"pay_amount"}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ p: 2.5 }}>
            <Grid item xs={12}>
              <label>More Information</label>
              <BasicTextFields
                sx={{ pt: 0.5 }}
                value={vendorData.remark}
                onChangeFun={handleonChangeFunction}
                name={"remark"}
                multiline={true}
                rows={4}
                maxRows={4}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{}}
          >
            <Grid item>
              <div className="q-add-categories-section-middle-footer">
                <button
                  onClick={(e) => {
                    handleUpdate(e);
                  }}
                  className="quic-btn quic-btn-save w-44"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress
                      color={"inherit"}
                      className=""
                      width={15}
                      size={15}
                    />
                  ) : (
                    "Update"
                  )}
                </button>
                <button onClick={handleClose} class="quic-btn quic-btn-cancle">
                  Cancel
                </button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
