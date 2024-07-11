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
import { Link, useNavigate } from "react-router-dom";
import { useAuthDetails } from "../../Common/cookiesHelper";
import AlertModal from "../../reuseableComponents/AlertModal";
import { priceFormate } from "../../hooks/priceFormate";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../Common/passwordShow";
import { Grid } from "@mui/material";

//       table imports ----------------------------------------------------
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
import { SortTableItemsHelperFun } from "../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../Assests/Category/SortingW.svg";
// end table imports ----------------------------------------------------
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
}));

const VendorsDetail = ({ setVisible }) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const navigate = useNavigate();
  const [allvendors, setallvendors] = useState([]);
  const AllVendorsDataState = useSelector((state) => state.vendors);
  const authUserData = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  useEffect(() => {
    getVendorListData();
  }, []);
  const getVendorListData = async () => {
    try {
      let data = {
        merchant_id: merchant_id,
      };
      await dispatch(fetchVendorsListData(data)).unwrap();
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    if (
      !AllVendorsDataState.loading &&
      AllVendorsDataState.vendorListData &&
      AllVendorsDataState.vendorListData.length >= 1
    ) {
      setallvendors(
        AllVendorsDataState.vendorListData[1].map((vendor) => {
          return { ...vendor, status: vendor.enabled === "1" ? 1 : 0 };
        })
      );
    }
  }, [
    AllVendorsDataState,
    AllVendorsDataState.loading,
    AllVendorsDataState.vendorListData,
  ]);
  console.log("AllVendorsDataState", allvendors);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");
  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  const handleUpdateStatus = async (event, label, vendorId) => {
    try {
      const newStatus = event.target.checked ? 1 : 0;
      const updData = {
        // merchant_id: "MAL0100CA",
        merchant_id: merchant_id,
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
      console.log(response);
      if (response.status === 200) {
        // alert("Vendor Status Updated Successfully.");
        ToastifyAlert("Updated Successfully.", "success");
        setallvendors(
          allvendors.map((vendor) => {
            if (vendor.vendor_id === vendorId) {
              return { ...vendor, status: newStatus };
            }
            return vendor; // add return statement here
          })
        );
      } else {
        // alert("something went wrong.");
        showModal("Something went wrong!");
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };
  const handleEditClick = (name, id) => {
    navigate(
      `/vendors/vendor-details/${encodeURIComponent(name)}?vendorId=${id}`
    );
  };
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
  const sortByItemName = (type, name) => {
    const itemWthoutDoller = allvendors.map((item) => {
      const dateString = item.recent_trans;
      const [date, doller] = dateString.split("-");
      return { ...item, recent_trans: date };
    });

    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      itemWthoutDoller,
      type,
      name,
      sortOrder
    );
    const itemWithSortedWitchDoller = sortedItems.map((item) => {
      const originalItem = allvendors.find(
        (vendor) => vendor.vendor_id === item.vendor_id
      );
      return { ...item, recent_trans: originalItem.recent_trans };
    });
    setallvendors(itemWithSortedWitchDoller);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container sx={{}} className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            directon="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <div className="q-category-bottom-header">
                <span>Vendors</span>
              </div>
            </Grid>
            <Grid item>
              <div className="q-category-bottom-header">
                <Link to={`/vendors/add`}>
                  <p>
                    Add Vendors <img src={AddIcon} alt="add-icon" />{" "}
                  </p>
                </Link>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            {AllVendorsDataState.loading ? (
              <>
                <SkeletonTable
                  columns={[
                    "Vendor Name",
                    "Payment Count",
                    "Amount",
                    "Recent Transaction",
                    "Status",
                    "",
                  ]}
                />
              </>
            ) : (
              <>
                <TableContainer>
                  <StyledTable>
                    <TableHead>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("str", "vendor_name")}
                        >
                          <p className="whitespace-nowrap">Vendor Name</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "pay_count")}
                        >
                          <p className="whitespace-nowrap">Payment Count</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "amount")}
                        >
                          <p className="whitespace-nowrap">Amount</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("date", "recent_trans")}
                        >
                          <p className="whitespace-nowrap">
                            Recent Transaction
                          </p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {allvendors && allvendors.length > 0 ? (
                        allvendors.map((singleVendor, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <p>{singleVendor.vendor_name}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{priceFormate(singleVendor.pay_count)}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>
                                $
                                {typeof singleVendor.amount === "number"
                                  ? priceFormate(singleVendor.amount.toFixed(2))
                                  : priceFormate(
                                      parseFloat(singleVendor.amount).toFixed(2)
                                    )}
                              </p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p className="text-[#0A64F9] cursor-pointer">
                                <div
                                  onClick={() => {
                                    handleEditClick(
                                      singleVendor.vendor_name,
                                      singleVendor.vendor_id
                                    );
                                  }}
                                >
                                  {singleVendor.recent_trans}
                                </div>
                              </p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Switch
                                onChange={(event) =>
                                  handleUpdateStatus(
                                    event,
                                    label,
                                    singleVendor.vendor_id
                                  )
                                }
                                {...label}
                                checked={singleVendor.status}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Link
                                to={`/vendors/edit-vendor/${singleVendor.vendor_name}?vendorId=${singleVendor.vendor_id}`}
                              >
                                <img
                                  className="edit_center"
                                  singleVender={singleVendor}
                                  // onClick={() => setVisible("EditVendors")}
                                  src={EditIcon}
                                  alt="Edit"
                                />
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      ) : (
                        <>
                          <div className="p-3">
                            <p>No record found.</p>
                          </div>
                        </>
                      )}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="">
          <div className="q-category-bottom-header-sticky">
            <div className="q-category-bottom-header">
              <span>Vendors</span>
              <Link to={`/vendors-add`}>
           
              </Link>
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
                      <p className="table15">
                        {priceFormate(singleVender.pay_count)}
                      </p>
                      <p className="table15">
                        $
                        {typeof singleVender.amount === "number"
                          ? priceFormate(singleVender.amount.toFixed(2))
                          : priceFormate(
                              parseFloat(singleVender.amount).toFixed(2)
                            )}
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

                          
                        </div>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div> */}
      <AlertModal
        headerText={alertModalHeaderText}
        open={alertModalOpen}
        onClose={() => {
          setAlertModalOpen(false);
        }}
      />
    </>
  );
};

export default VendorsDetail;
