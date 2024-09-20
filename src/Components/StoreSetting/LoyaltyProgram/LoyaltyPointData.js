import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeletIcon from "../../../Assests/Dashboard/delete.svg";
import Edit from "../../../Assests/Dashboard/edit.svg";
import dayjs from "dayjs";
import Switch from "@mui/material/Switch";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import DeleteModal from "../../../reuseableComponents/DeleteModal";
import SmallLoader from "../../../Assests/Loader/loading-Animation.gif";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
export default function LoyaltyPointData(props) {
  // console.log("props.loyaltyProgramList", props.loyaltyProgramList);
  //   ===============================================
  // const startDate = dayjs("2023-08-22");
  // const endDate = dayjs("2024-08-08");

  // // // Calculate the difference in days between the dates
  // const differenceInDays = endDate.diff(startDate, "day");

  // // // Format the dates
  // const formattedStartDate = startDate.format("DD MMM, YYYY");
  // const formattedEndDate = endDate.format("DD MMM, YYYY");
  // console.log(formattedStartDate, "formattedStartDate");
  // console.log(formattedEndDate, "formattedStartDate");
  // console.log(differenceInDays, "differenceInDays");
  // ==================================================
  // const testData = [
  //   {
  //     id: "1",
  //     name: "test 1",
  //     date_expire: "2023-08-22",
  //     date_valid: "2024-08-20",
  //   },
  //   {
  //     id: "2",
  //     name: "test 2",
  //     date_expire: "2023-08-14",
  //     date_valid: "2024-08-12",
  //   },
  // ];

  // ===========================================
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ px: 2.5, pt: 1.5 }}>
            <Grid item xs={12}>
              <div className="store-setting-gry Admin_std">
                Current Points Awarded Per Dollar Spent
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12}>
              <BasicTextFields
                type={"text"}
                value={props.InventorAwardedPoints?.CurrentDollarSpent}
                name={"dayCount"}
                onChangeFun={props.handleDollarValue}
                disable={true}
                // onKeyPressFun={handleKeyPress}
                maxLength={2}
                // handlePaste={handlePaste}
              />
              {/* {advancedayCount && (
                      <p className="error-message pt-1">{advancedayCount}</p>
                    )} */}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
          <Grid item xs={12} sm={6}>
            <label>Points Awarded Per Dollar Spent</label>
            <BasicTextFields
              type="text"
              placeholder="$1 ="
              name="DollarSpent"
              maxLength={8}
              // id="delvery_setup"
              // name="default_delvery_setup"
              value={props.InventorAwardedPoints?.DollarSpent}
              onChangeFun={props.handleDollarValue}
              // onChangeFun={setDelveryChange}
            />
            <span className="input-error">
              {props.errorMessageLoyality.pointAwardedError}
            </span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Point Redemption Value</label>
            <BasicTextFields
              type="text"
              placeholder=""
              maxLength={8}
              name="RedemptionValue"
              // id="delvery_setup"
              // value={delveryRates}
              value={props.InventorAwardedPoints?.RedemptionValue}
              onChangeFun={props.handleDollarValue}
              // onChangeFun={setDeleveryRate}
            />
            <span className="input-error">
              {props.errorMessageLoyality.PointRedemptionError}
            </span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Minimum Points Redemption</label>
            <BasicTextFields
              type="text"
              placeholder="Minimum Points Redemption"
              maxLength={8}
              name="MinRedemption"
              // name="default_delvery_setup"
              // id="delvery_setup"
              // value={delveryRates}
              value={props.InventorAwardedPoints?.MinRedemption}
              onChangeFun={props.handleDollarValue}

              // onChangeFun={setDeleveryRate}
            />
            <span className="input-error">
              {props.errorMessageLoyality.MinimumPointRedemptionError}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ px: 2.5, pb: 2.5 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="q-coupon-bottom-header"
          >
            <Grid item>
              <div>
                <span>Bonus Point Promotions</span>
              </div>
            </Grid>
            <Grid item>
              <Link
              //    to={`/coupons/add`}
              >
                <p onClick={() => props.handleModalOpen()}>
                  Add Bonus point Promotions{" "}
                  <img src={AddIcon} alt="add-icon" />
                </p>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* --------------list here */}
        <Grid container spacing={3} sx={{ p: 2.5 }}>
          {/* --------------list here */}
          {props.dataLoadingApi ? (
            <>
              {[1, 2, 3, 4].map((coupons, index) => (
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
                          <div style={{ padding: 0 }} className="q_coupon_code">
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
          ) : Array.isArray(props.SwitchList) &&
            props.SwitchList?.length > 0 ? (
            props.SwitchList?.map((res, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Grid
                  container
                  // 1 == 1 ? "active" : ""
                  className={`q_copuon_header w-full ${1 == 1 ? "" : ""}`}
                >
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ p: 1, borderBottom: "1px solid #0000001f" }}
                    >
                      <Grid item>
                        <div
                          style={{ padding: 0 }}
                          className="q_discount_coupon_Code"
                        >
                          <p>{res?.promotion_name}</p>
                        </div>
                      </Grid>

                      <Grid item>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Link
                              onClick={() =>
                                props.onClickEditIcon(res?.promotion_id)
                              }
                            >
                              <span>
                                <img
                                  src={Edit}
                                  alt=""
                                  className="h-8 w-8  cursor-pointer"
                                />
                              </span>
                            </Link>
                          </Grid>
                          <Grid item>
                            {res?.promotion_id == props.deleteTableId &&
                            props.deleteLoader ? (
                              <img src={SmallLoader} alt="loading" />
                            ) : (
                              <img
                                src={DeletIcon}
                                alt="delete"
                                className="h-8 w-8 delet-icon"
                                onClick={() =>
                                  props.handleDeleteLoyalty(res?.promotion_id)
                                }
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* ======== */}
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
                          <p>Bonus Point Promotion</p>
                        </div>
                      </Grid>
                      <Grid
                        item
                        style={{ padding: 0 }}
                        className="q_coupon_deatails_validtimes"
                      >
                        <p className="q_date_details">
                          $1= {res?.bonus_points}
                        </p>
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
                          <p>Validity Dates</p>
                        </div>
                      </Grid>
                      <Grid
                        item
                        style={{ padding: 0 }}
                        className="q_coupon_deatails_validtimes"
                      >
                        <p className="q_date_details">
                          {moment(res.start_date).format("MMM D, YYYY")} -{" "}
                          {moment(res.end_date).format("MMM D, YYYY")}{" "}
                        </p>
                      </Grid>
                    </Grid>
                    {/* = */}
                    {/* ============ */}
                    <Grid container>
                      <Grid item xs={12}>
                        <div className="q_coupon_status_btn">
                          <p>Enable/Disable</p>

                          <Switch
                            checked={
                              res?.enable_promotion
                              // : false
                            }
                            onChange={() =>
                              props.handleChangeSwitch(res?.promotion_id)
                            }
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#0A64F9",
                              },
                              "& .MuiSwitch-track": {
                                backgroundColor: "#0A64F9",
                              },
                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                    {/* =========== */}
                  </Grid>
                </Grid>
              </Grid>
            ))
          ) : (
            ""
          )}
          {Array.isArray(props.SwitchList) &&
            props.SwitchList?.length == 0 &&
            !props.dataLoadingApi && <NoDataFound table={true} />}
        </Grid>
        <Grid container sx={{ display: "block" }}>
          <div className="q-add-categories-section-middle-footer">
            <button
              className="quic-btn quic-btn-save"
              disabled={props.loaderSave}
              onClick={props.handleSaveData}
            >
              {" "}
              {props.loaderSave ? (
                <>
                  <CircularProgress color={"inherit"} width={15} size={15} />
                  Save
                </>
              ) : (
                <>Save</>
              )}
            </button>
          </div>
        </Grid>

        {/* </Grid> */}
      </Grid>
      <DeleteModal
        headerText="Loyalty Program"
        otherMSG=""
        open={props.deleteModalOpen}
        onClose={props.handleClosedModal}
        onConfirm={props.confirmDeleteCategory}
      />
    </>
  );
}
