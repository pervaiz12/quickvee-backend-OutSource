import React, { useEffect, useState, useCallback } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";

import DeletIcon from "../../Assests/Dashboard/delete.svg";
import Edit from "../../Assests/Dashboard/edit.svg";

import axios from "axios";
import {
  fetchCouponList,
  updateStatus,
  deleteCoupon,
} from "../../Redux/features/Coupon/couponSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useAuthDetails } from "../../Common/cookiesHelper";

import { BASE_URL, COUPON_STATUS_UPDATE } from "../../Constants/Config";

import moment from "moment";
import { Grid } from "@mui/material";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import DeleteModal from "../../reuseableComponents/DeleteModal";
import { priceFormate } from "../../hooks/priceFormate";
import PasswordShow from "../../Common/passwordShow";
import AlertModal from "../../reuseableComponents/AlertModal";
import Skeleton from "react-loading-skeleton";

const CouponDiscount = ({ seVisible, setCouponId }) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();
  const [isChecked, setIsChecked] = useState(true);

  const dispatch = useDispatch();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    getCouponList();
  }, []);
  const getCouponList = async () => {
    try {
      let data = {
        merchant_id,
        ...userTypeData,
      };
      if (data) {
        await dispatch(fetchCouponList(data)).unwrap();
      }
    } catch (error) {
      if (error.status == 401) {
        handleCoockieExpire();
        getUnAutherisedTokenMessage();
      }
    }
  };

  const [couponList, setAllCoupon] = useState([]);
  const AllCouponDataState = useSelector((state) => state.couponList);

  useEffect(() => {
    if (!AllCouponDataState.loading && AllCouponDataState.couponData) {
      setAllCoupon(AllCouponDataState.couponData);
      // console.log(AllCouponDataState.couponData);
    }
  }, [
    AllCouponDataState,
    AllCouponDataState.loading,
    AllCouponDataState.couponData,
  ]);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  const handleCheckboxChange = useCallback(
    async (couponId, isChecked, coupons) => {
      if (+coupons?.flag === 0 && +coupons?.discount === 100) {
        showModal("Discount Percentage must always be less than 100%.");
        return;
      } else if (isChecked) {
        try {
          const data = {
            merchant_id,
            coupon_id: couponId,
            ...userTypeData,
          };
          const { token, ...dataNew } = data;

          const response = axios.post(
            BASE_URL + COUPON_STATUS_UPDATE,
            dataNew,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response) {
            dispatch(
              updateStatus({
                coupon_id: couponId,
                show_online: 1,
                show_offline: 0,
              })
            );
            ToastifyAlert("Updated Successfully", "success");
          }
        } catch (error) {
          console.error("API call failed:", error);
          alert(
            error.response?.data?.message ||
              "Error occurred while updating status"
          );
        }
      }
    },
    [dispatch]
  );


  const [deleteCouponId, setDeleteCouponId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditCoupon = (id) => {
    seVisible("EditCopon");
    setCouponId(id);
  };

  const handleDeleteCoupon = (id) => {
    setDeleteCouponId(id);
    setDeleteModalOpen(true);
  };
  const confirmDeleteCategory = () => {
    if (deleteCouponId) {
      const data = {
        coupon_id: deleteCouponId,
        merchant_id: merchant_id,
        ...userTypeData,
      };
      if (data) {
        dispatch(deleteCoupon(data));
        ToastifyAlert("Deleted Successfully", "success");
      }
    }
    setDeleteCouponId(null);
    setDeleteModalOpen(false);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="q-coupon-bottom-header"
          >
            <Grid item>
              <div>
                <span>Coupon</span>
              </div>
            </Grid>
            <Grid item>
              <Link to={`/coupons/add`}>
                <p
                // onClick={() => seVisible("AddCoupon")}
                >
                  Add New Coupon <img src={AddIcon} alt="add-icon" />
                </p>
              </Link>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ p: 2.5 }}>
            {AllCouponDataState.loading ? (
              <>
                {Object.values(couponList).length >= 1 &&
                  [1, 2, 3, 4].map((coupons, index) => (
                    <Grid item xs={12} sm={6}>
                      <Grid
                        container
                        key={index}
                        className={`q_copuon_header w-full`}
                      >
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ p: 1 }}
                          >
                            <Grid item>
                              <div
                                style={{ padding: 0 }}
                                className="q_coupon_code"
                              >
                                <p>
                                  <Skeleton />
                                </p>
                              </div>
                            </Grid>
                            <Grid item>
                              <Grid container spacing={1}>
                                <Grid item>
                                  <div
                                    style={{ padding: 0 }}
                                    className="q_coupon_code"
                                  >
                                    <p>
                                      <Skeleton />
                                    </p>
                                  </div>
                                </Grid>
                                <Grid item>
                                  <div
                                    style={{ padding: 0 }}
                                    className="q_coupon_code"
                                  >
                                    <p>
                                      <Skeleton />
                                    </p>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container sx={{ px: 1 }}>
                            <Grid item xs={12}>
                              <div
                                style={{ paddingLeft: "0 !important" }}
                                className="q_discount_coupon_Code"
                              >
                                <div className="">
                                  <Skeleton />
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ p: 1 }}
                          >
                            <Grid item>
                              <div
                                style={{ padding: 0 }}
                                className="q_coupon_deatails_validtimes"
                              >
                                <p>
                                  {" "}
                                  <Skeleton />
                                </p>
                              </div>
                            </Grid>
                            <Grid
                              item
                              style={{ padding: 0 }}
                              className="q_coupon_deatails_validtimes"
                            >
                              <p className="q_date_details">
                                <Skeleton />
                              </p>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ px: 1 }}
                          >
                            <Grid
                              item
                              sx={{ p: 0 }}
                              className="q_coupon_discountCode"
                            >
                              <p>
                                {" "}
                                <Skeleton />
                              </p>
                            </Grid>
                            <Grid item>
                              <Skeleton />
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <div className="q_coupon_status_btn">
                                <p>
                                  <Skeleton />
                                </p>

                                <Skeleton />
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </>
            ) : (
              <>
                {Object.values(couponList) &&
                  Object.values(couponList).length >= 1 &&
                  Object.values(couponList).map((coupons, index) => (
                    <Grid item xs={12} sm={6}>
                      <Grid
                        container
                        key={index}
                        className={`q_copuon_header w-full ${
                          coupons.show_online == 1 ? "active" : ""
                        }`}
                      >
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ p: 1 }}
                          >
                            <Grid item>
                              <div
                                style={{ padding: 0 }}
                                className="q_coupon_code"
                              >
                                <p>{coupons.name}</p>
                              </div>
                            </Grid>
                            <Grid item>
                              <Grid container spacing={1}>
                                <Grid item>
                                  <Link
                                    to={`/coupons/edit-coupons/${coupons.id}`}
                                  >
                                    <span
                                    // to={`/coupons/edit-coupons/${coupons.id}`}
                                    // onClick={()=> {handleEditCoupon(coupons.id)}}
                                    >
                                      <img
                                        src={Edit}
                                        alt=""
                                        className="h-8 w-8  cursor-pointer"
                                      />
                                    </span>
                                  </Link>
                                </Grid>
                                <Grid item>
                                  <img
                                    src={DeletIcon}
                                    alt="delet"
                                    className="h-8 w-8 delet-icon"
                                    onClick={() =>
                                      handleDeleteCoupon(coupons.id)
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container sx={{ px: 1 }}>
                            <Grid item xs={12}>
                              <div
                                style={{ paddingLeft: "0 !important" }}
                                className="q_discount_coupon_Code"
                              >
                                <div className="">
                                  {coupons.flag == 1 ? "$" : ""}
                                  {priceFormate(coupons.discount)}{" "}
                                  {coupons.flag == 0 ? "%" : ""} OFF on minimum
                                  order of $
                                  {priceFormate(
                                    parseFloat(coupons.min_amount).toFixed(2)
                                  )}
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ p: 1 }}
                          >
                            <Grid item>
                              <div
                                style={{ padding: 0 }}
                                className="q_coupon_deatails_validtimes"
                              >
                                <p>Valid from</p>
                              </div>
                            </Grid>
                            <Grid
                              item
                              style={{ padding: 0 }}
                              className="q_coupon_deatails_validtimes"
                            >
                              <p className="q_date_details">
                                {/* {moment(coupons.date_valid).format("MM/DD/YYYY")} -{" "} */}
                                {moment(coupons.date_valid).format(
                                  "MMMM D, YYYY"
                                )}{" "}
                                {/* {moment(coupons.time_valid, "HH:mm:ss").format(
                              "hh:mm A"
                            )}{" "} */}
                                to{" "}
                                {/* {moment(coupons.date_expire).format("MM/DD/YYYY")} -{" "} */}
                                {moment(coupons.date_expire).format(
                                  "MMMM D, YYYY"
                                )}{" "}
                                {/* {moment(coupons.time_expire, "HH:mm:ss").format(
                              "hh:mm A"
                            )} */}
                              </p>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ px: 1 }}
                          >
                            <Grid
                              item
                              sx={{ p: 0 }}
                              className="q_coupon_discountCode"
                            >
                              <p>Max Discount</p>
                            </Grid>
                            <Grid item>
                              <p className="q_date_details">
                                $
                                {priceFormate(
                                  parseFloat(coupons.maximum_discount).toFixed(
                                    2
                                  )
                                ) || "0.00"}
                              </p>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <div className="q_coupon_status_btn">
                                <p>Show online</p>

                                <Switch
                                  checked={
                                    coupons.show_online == 1 ? true : false
                                  }
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      coupons.id,
                                      e.target.checked,
                                      coupons
                                    )
                                  }
                                  // disabled={+coupons?.flag === 0 && +coupons?.discount === 100}
                                  sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                      color: "#0A64F9", // Change color when switch is checked
                                    },
                                    "& .MuiSwitch-track": {
                                      backgroundColor: "#0A64F9", // Change background color of the track
                                    },
                                  }}
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <div>
        <DeleteModal
          headerText="Coupon"
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
          }}
          onConfirm={confirmDeleteCategory}
        />
        <AlertModal
          headerText={alertModalHeaderText}
          open={alertModalOpen}
          onClose={() => {
            setAlertModalOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default CouponDiscount;
