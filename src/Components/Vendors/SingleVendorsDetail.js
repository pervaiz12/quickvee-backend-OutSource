import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LeftArrow from "../../Assests/Vendors/LeftArrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/Common.css";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  BASE_URL,
  GET_VENDOR_DETAILS,
  UPDATE_SINGLE_VENDOR_DATA,
  DELETE_SINGLE_VENDOR_DATA,
} from "../../Constants/Config";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import dayjs from "dayjs";
import DateRangeComponent from "../../reuseableComponents/DateRangeComponent";
import { Grid } from "@mui/material";
import CustomizedTable from "./CustomizedTable";
import { useSelector } from "react-redux";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useParams } from "react-router-dom";
import DeleteModal from "../../reuseableComponents/DeleteModal";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../Common/passwordShow";
const options = [
  "Select Range",
  "Today",
  "Yesterday",
  "Last 7 Days",
  "This Month",
  "Custom",
];

const SingleVendorsDetail = ({ setVisible }) => {
  const Navigate = useNavigate();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorId = searchParams.get("vendorId");
  const vendor_name = decodeURIComponent(location.pathname.split("/").pop());
  const [dateRangeState, setDateRangeState] = useState();
  console.log("dateRangeState", dateRangeState);
  // date range

  const [modalData, setModalData] = useState(null);

  // vendor modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayAmount, setSelectedPayAmount] = useState(0);
  const [selectedRemark, setSelectedRemark] = useState();
  const AllVendorsDataState = useSelector((state) => state.vendors);
  const [selectedVendor, setSelectedVendor] = useState(false);
  const [total, setTotal] = useState(0);
  console.log("selectedVendor", selectedVendor);

  const openModal = (payAmount, id, remark) => {
    setShowModal(true);
    setModalData({ payAmount, id, remark });
    setSelectedPayAmount(payAmount);
    setSelectedRemark(remark);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [vendorDetails, setVendorDetails] = useState([]);

  const handleGetReport = async (dateRangeData) => {
    setDateRangeState(dateRangeData);
    const { start_date, end_date } = dateRangeData;

    try {
      const { token, ...otherUserData } = userTypeData;
      const data = {
        // merchant_id: 'MAL0100CA',
        id: vendorId,
        start_date: start_date,
        end_date: end_date,
        ...otherUserData,
      };

      const response = await axios.post(BASE_URL + GET_VENDOR_DETAILS, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setVendorDetails(response.data.vendor_details);
      const total = response.data.vendor_details.reduce((acc, curr) => {
        console.log(curr.pay_amount);
        return acc + (curr.pay_amount ? parseFloat(curr.pay_amount) : 0);
      }, 0);
      setTotal(total);
      console.log(response.data.vendor_details);
    } catch (error) {
      handleCoockieExpire();
      getUnAutherisedTokenMessage();
    }
  };

  const handleAmountChange = (event) => {
    setSelectedPayAmount(event.target.value);
  };

  const handleRemarkChange = (event) => {
    setSelectedRemark(event.target.value);
  };

  const handleUpdate = async () => {
    if (modalData) {
      const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const { payAmount, id } = modalData;

      const updSingleVendor = {
        merchant_id: merchant_id,
        vendor_id: vendorId,
        det_id: id,
        start: currentDateTime,
        end: currentDateTime,
        amount: selectedPayAmount,
        remark: selectedRemark,
        token_id: userTypeData?.token_id,
        login_type: userTypeData?.login_type,
      };

      try {
        const response = await axios.post(
          BASE_URL + UPDATE_SINGLE_VENDOR_DATA,
          updSingleVendor,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userTypeData?.token}`,
            },
          }
        );

        if (response) {
          ToastifyAlert("Vendor Details", "success");
          const updatedDetails = vendorDetails.map((vendor) => {
            const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
            if (vendor.id === id) {
              return {
                ...vendor,
                pay_amount: selectedPayAmount,
                updated_datetime: currentDateTime,
                remark: selectedRemark,
              };
            }
            return vendor;
          });

          setVendorDetails(updatedDetails);
        } else {
          console.error(response);
        }

        // Close the modal
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [deleteId, setDeleteId] = useState(null);
  const [deleteVendorId, setDeleteVendorId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = (id, vendorId) => {
    setDeleteId(id);
    setDeleteVendorId(vendorId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCategory = async () => {
    if (deleteId) {
      const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const delSingleVendor = {
        merchant_id: merchant_id,
        id: deleteId,
        vendor_id: deleteVendorId,
        start: currentDateTime,
        end: currentDateTime,
        token_id: userTypeData?.token_id,
        login_type: userTypeData?.login_type,
      };

      try {
        const response = await axios.post(
          BASE_URL + DELETE_SINGLE_VENDOR_DATA,
          delSingleVendor,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userTypeData?.token}`,
            },
          }
        );

        if (response) {
          const updatedVendorDetails = vendorDetails.filter(
            (vendor) => vendor.id !== deleteId
          );
          setVendorDetails(updatedVendorDetails);

          // alert(response.data.message);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setDeleteId(null);
    setDeleteVendorId(null);
    setDeleteModalOpen(false);
  };

  function calculateTotal() {
    let total = 0;
    vendorDetails.forEach((vendor) => {
      total += parseFloat(vendor.pay_amount);
    });
    return total.toFixed(2); // Optionally, you can use toFixed to limit the decimal places to 2
  }

  return (
    <>
      <Grid container sx={{ paddingY: 2 }}>
        <DateRangeComponent onDateRangeChange={handleGetReport} />
      </Grid>
      <Grid
        container
        sx={{ marginY: 2 }}
        className="q-add-categories-section"
      >
        <Grid xs={12} item> 
          <Grid item xs={12}>
            <div className="q-add-categories-section-header">
              <span
                onClick={() => {
                  Navigate(-1);
                }}
              >
                <img src={LeftArrow} />
                <span>{vendor_name}</span>
              </span>
            </div>
          </Grid>
          <Grid container >
            <Grid item xs={12}>
              <CustomizedTable
                tableRowData={[
                  "Sr No.",
                  "Amount",
                  "Transaction Date",
                  "Remark",
                  "",
                  "",
                ]}
                vendorDetails={vendorDetails}
                handleDeleteClick={handleDeleteClick}
                dateRangeState={dateRangeState}
                handleGetReport={handleGetReport}
                total={total}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DeleteModal
        headerText="Vendor Details"
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={confirmDeleteCategory}
      />
    </>
  );
};

export default SingleVendorsDetail;
