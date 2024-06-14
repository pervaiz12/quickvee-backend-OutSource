import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LeftArrow from "../../Assests/Vendors/LeftArrow.svg"
import { useLocation,useNavigate } from "react-router-dom";
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
  const Navigate = useNavigate()
  const {handleCoockieExpire,getUnAutherisedTokenMessage}=PasswordShow()
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorId = searchParams.get("vendorId");
  const vendor_name = decodeURIComponent(location.pathname.split("/").pop());

  // date range

  const [modalData, setModalData] = useState(null);

  // vendor modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayAmount, setSelectedPayAmount] = useState(0);
  const [selectedRemark, setSelectedRemark] = useState();
  const AllVendorsDataState = useSelector((state) => state.vendors);
  const [selectedVendor, setSelectedVendor] = useState(false);
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
    } catch (error) {
      handleCoockieExpire()
      getUnAutherisedTokenMessage()
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
            headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${userTypeData?.token}` },
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
    setDeleteId(id)
    setDeleteVendorId(vendorId)
    setDeleteModalOpen(true);
  };

  const confirmDeleteCategory = async () => {
    if(deleteId){
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
            headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${userTypeData?.token}` },
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
    setDeleteId(null)
    setDeleteVendorId(null)
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
      <Grid container sx={{ paddingTop: 2 }}>
          <DateRangeComponent onDateRangeChange={handleGetReport} />
      </Grid>
      <Grid
        container
        sx={{ marginTop: 2 }}
        className="q-add-categories-section"
      >
        <Grid xs={12} item>
          <Grid item xs={12}>
            <div className="q-add-categories-section-header">
              <span onClick={()=>{Navigate(-1)}}>
                <img src={LeftArrow}  />
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
                ]}
                vendorDetails={vendorDetails}
                handleDeleteClick={handleDeleteClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="q-category-main-page">
        <div className="box">
          <br></br>
          <form>
            <div className="q-add-categories-section">
              <div className="q-add-categories-section-header">
                <span>
                  <span>Vendor Payout Details</span>
                </span>
              </div>
              <div className="q-add-categories-section-middle-form">
                <div className="qvrowmain">
                  <div className="qvrow">
                    <div className="col-qv-4">
                      <div className="q-add-categories-single-input qv_input">
                      
                        <div className="q-add-categories-single-input qv_input">
                          <label htmlFor="State">Date Range</label>
                          <Autocomplete
                            value={value}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                              setInputValue(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={options}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                            onChange={handleOptionChange}
                          />
                        </div>
                        {showDateRangePicker && (
                          <div className="qvrow">
                            <div className="col-qv-12">
                              <div className="input_area">
                                <label>Start & End Date</label>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DateRangePicker
                                    startText="Start Date"
                                    endText="End Date"
                                    value={[dayjs(startDate), dayjs(endDate)]}
                                    onChange={(newValue) => {
                                      // Check if newValue is not null
                                      if (newValue[0]) {
                                        setStartDate(newValue[0].toDate());
                                      }
                                      // Check if newValue is not null
                                      if (newValue[1]) {
                                        setEndDate(newValue[1].toDate());
                                      }
                                    }}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="qvrow">
                    <div className="col-qv-12">
                      <div className="q-add-categories-section-middle-footer">
                        <button
                          className="quic-btn quic-btn-save"
                          type="button"
                          onClick={handleGetReport}
                        >
                          Get Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vendor_payout_header">
                <p className="vendor_payout_sr">Sr No.</p>
                <p className="vendor_payout_amount">Amount</p>
                <p className="vendor_payout_transaction">Transaction Date</p>
                <p className="vendor_payout_remark">Remark</p>
                <p className="vendor_payout_edit">Edit</p>
                <p className="vendor_payout_delete">Delete</p>
              </div>
              <div className="vendor_payout_listing">
                {vendorDetails.length === 0 ? (
                  <p className="vendor_payout_listing_single">No data found</p>
                ) : (
                  <>
                    {vendorDetails.map((vendor, index) => (
                      <div
                        key={vendor.id}
                        className="vendor_payout_listing_single"
                      >
                        <p className="vendor_payout_sr">{index + 1}</p>
                        <p className="vendor_payout_amount">
                          ${vendor.pay_amount}
                        </p>
                        <p className="vendor_payout_transaction">
                          {new Date(vendor.updated_datetime).toLocaleString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </p>
                        <p className="vendor_payout_remark">
                          {vendor.remark || "N/A"}
                        </p>
                        <p
                          className="vendor_payout_edit"
                          onClick={() =>
                            openModal(
                              vendor.pay_amount,
                              vendor.id,
                              vendor.remark
                            )
                          }
                        >
                          <img src={EditIcon} alt="edit-icon" />
                        </p>
                        <p className="vendor_payout_delete">
                          <img
                            src={DeleteIcon}
                            alt="delete-icon"
                            onClick={() =>
                              handleDeleteClick(vendor.id, vendor.vendor_id)
                            }
                          />
                        </p>
                      </div>
                    ))}
                    <div className="vendor_payout_listing_single total_payout">
                      <p className="vendor_payout_sr">Total: </p>
                      <p className="vendor_payout_amount">
                        ${calculateTotal()}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {showModal && (
                <div className="q-custom-modal-container" id="addemployee">
              
                  <div className="q-custom-modal-content modal_custom">
              
                    <div className="">
                      <p className="q-custom-modal-header ">
                        Update Vendor Details
                        <img
                          src={CrossIcon}
                          alt="icon"
                          className="ml-auto mb-4"
                          onClick={closeModal}
                        />
                      </p>
                    </div>
       
                    <div className="qvrow">
                      <div className="col-qv-12">
                        <div className="input_area">
                          <label>Amount</label>
                          <input
                            type="text"
                            name="amount"
                            placeholder="Amount"
                            value={selectedPayAmount}
                            onChange={handleAmountChange}
                            className="q-custom-input-field"
                            maxLength={8}
                          />
                          <span className="input-error">
                         
                          </span>
                        </div>
                      </div>
                      <div className="col-qv-12">
                        <div className="input_area">
                          <label>More Information </label>

                          <textarea
                            type="text"
                            name="remark"
                            value={selectedRemark}
                            onChange={handleRemarkChange}
                            rows={5}
                            placeholder="More Information"
                            className="q-custom-input-field"
                          ></textarea>
                          <span className="input-error">
                        
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="q-add-categories-section-middle-footer plr0">
                      <button
                        className="quic-btn quic-btn-save"
                        type="button"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        onClick={closeModal}
                        className="quic-btn quic-btn-cancle"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div> */}

        <DeleteModal
            headerText="Vendor Details"
            open={deleteModalOpen}
            onClose={() => {setDeleteModalOpen(false)}}
            onConfirm={confirmDeleteCategory}
          />
    </>
  );
};

export default SingleVendorsDetail;
