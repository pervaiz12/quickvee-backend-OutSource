import React, { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import Viewarrow from "../../Assests/Vendors/viewarrow.png";
import EditIcon from "../../Assests/Category/editIcon.svg";

import { fetchVendorsListData } from "../../Redux/features/VendorList/vListSlice";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL, STATUS_UPD_VENDORS } from "../../Constants/Config";
import ViewItemsModal from "./ViewItemsModal";
// import EditVendorsModal from './EditVendorsModal';
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import { useAuthDetails } from "../../Common/cookiesHelper";
import AlertModal from "../../reuseableComponents/AlertModal";
const VendorsDetail = ({ setVisible }) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();

  const [allvendors, setallvendors] = useState([]);
  const AllVendorsDataState = useSelector((state) => state.vendors);
  const authUserData = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  useEffect(() => {
    let data = {
      merchant_id: merchant_id,
    };
    dispatch(fetchVendorsListData(data));
  }, []);

  useEffect(() => {
    if (
      !AllVendorsDataState.loading &&
      AllVendorsDataState.vendorListData &&
      AllVendorsDataState.vendorListData.length >= 1
    ) {
      setallvendors(AllVendorsDataState.vendorListData[1]);
    }
  }, [
    AllVendorsDataState,
    AllVendorsDataState.loading,
    AllVendorsDataState.vendorListData,
  ]);

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");
  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  const handleUpdateStatus = async (event, label, vendorId) => {
    const updData = {
      // merchant_id: "MAL0100CA",
      status: event.target.checked ? 1 : 0,
      id: vendorId,
    };
    const { token, ...otherUserData } = userTypeData;
    const response = await axios.post(
      BASE_URL + STATUS_UPD_VENDORS,
      { ...updData, ...otherUserData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      // alert("Vendor Status Updated Successfully.");
      showModal("Vendor Status Updated Successfully.");
    } else {
      // alert("something went wrong.");
      showModal("Something went wrong !");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      <div className="box" >
        <div className="">
          <div className="q-category-bottom-header-sticky">
            <div className="q-category-bottom-header">
              <span>Vendors</span>
              <p onClick={() => setVisible("AddVendors")}>
                Add Vendors <img src={AddIcon} alt="add-icon" />{" "}
              </p>
            </div>
            <div className="q-category-bottom-categories-header">
              <p className="table20">Vendor Name</p>
              <p className="table15">Payment Count</p>
              <p className="table15">Amount</p>
              <p className="table30">Recent Transaction</p>
              <p className="table20">Status</p>
            </div>
          </div>
          <div className="q-category-bottom-categories-listing">
            {allvendors &&
              allvendors.length >= 1 &&
              allvendors.map((singleVender, index) => {
                return (
                  <div

                  // to={`/vendors/vendor-details/${singleVender.vendor_name}?vendorId=${singleVender.vendor_id}`}
                  >
                    <div
                      className="q-category-bottom-categories-single-category"
                      key={index}
                    >
                      <p className="table20">{singleVender.vendor_name}</p>
                      <p className="table15">{singleVender.pay_count}</p>
                      <p className="table15">
                        $
                        {typeof singleVender.amount === "number"
                          ? singleVender.amount.toFixed(2)
                          : parseFloat(singleVender.amount).toFixed(2)}
                      </p>

                      <p className="table30">
                        <Link
                          to={`/vendors/vendor-details/${encodeURIComponent(
                            singleVender.vendor_name
                          )}?vendorId=${singleVender.vendor_id}`}
                        >
                          {singleVender.recent_trans}
                        </Link>
                      </p>
                      <p className="table20">
                        <div className="qvrow">
                          <div className="col-qv-4">
                            {/* Set the checked prop based on singleVender.enabled */}

                            <Switch
                              onChange={(event) =>
                                handleUpdateStatus(
                                  event,
                                  label,
                                  singleVender.vendor_id
                                )
                              }
                              {...label}
                              defaultChecked={singleVender.enabled === "1"}
                            />
                          </div>
                          <div className="col-qv-4">
                            {/* <Link to={`/vendors/vendor-details/${singleVender.vendor_name}?vendorId=${singleVender.vendor_id}`}>
                      <img 
                          className='view_arrow' 
                          src={Viewarrow} 
                          alt="View" 
                      />
                      </Link> */}
                          </div>

                          <div className="col-qv-4">
                            <Link
                              to={`/vendors/edit-vendor/${singleVender.vendor_name}?vendorId=${singleVender.vendor_id}`}
                            >
                              <img
                                className="edit_center"
                                singleVender={singleVender}
                                // onClick={() => setVisible("EditVendors")}
                                src={EditIcon}
                                alt="Edit"
                              />
                            </Link>
                          </div>

                          {/* <div className='col-qv-4'>
                    <Link to={`/vendors/vendor-details/${singleVender.vendor_name}?vendorId=${singleVender.vendor_id}`}>
                      <img 
                          className='view_arrow' 
                          src={Viewarrow} 
                          alt="View" 
                      />
                      </Link>
                    </div> */}
                        </div>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <AlertModal
      headerText={alertModalHeaderText}
      open={alertModalOpen}
      onClose={() => {setAlertModalOpen(false)}}
       />
    </>
  );
};

export default VendorsDetail;
