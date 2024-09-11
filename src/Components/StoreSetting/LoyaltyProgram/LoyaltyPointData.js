import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeletIcon from "../../../Assests/Dashboard/delete.svg";
import Edit from "../../../Assests/Dashboard/edit.svg";
import dayjs from "dayjs";

export default function LoyaltyPointData(props) {
  //   =========================================
  // const startDate = dayjs("2023-08-22");
  // const endDate = dayjs("2024-08-08");

  // // Calculate the difference in days between the dates
  // const differenceInDays = endDate.diff(startDate, "day");

  // // Format the dates
  // const formattedStartDate = startDate.format("DD MMM, YYYY");
  // const formattedEndDate = endDate.format("DD MMM, YYYY");
  // console.log(formattedStartDate, "formattedStartDate");
  // console.log(formattedEndDate, "formattedStartDate");
  // console.log(differenceInDays, "differenceInDays");
  const testData = [
    {
      id: "1",
      name: "test 1",
      date_expire: "2023-08-22",
      date_valid: "2024-08-20",
    },
    {
      id: "2",
      name: "test 2",
      date_expire: "2023-08-14",
      date_valid: "2024-08-12",
    },
  ];

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
                // value={orderState?.dayCount}
                name={"dayCount"}
                // onChangeFun={handleOrderChange}
                // disable={!orderState?.enabledFutureOrder}
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
              maxLength={8}
              // name="default_delvery_setup"
              // id="delvery_setup"
              // value={deleveryChange}
              // onChangeFun={setDelveryChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Point Redemption Value</label>
            <BasicTextFields
              type="text"
              placeholder="1 point ="
              maxLength={8}
              name="default_delvery_setup"
              // id="delvery_setup"
              // value={delveryRates}
              // onChangeFun={setDeleveryRate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Minimum Points Redemption</label>
            <BasicTextFields
              type="text"
              placeholder="Minimum Points Redemption"
              maxLength={8}
              // name="default_delvery_setup"
              // id="delvery_setup"
              // value={delveryRates}
              // onChangeFun={setDeleveryRate}
            />
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
                <span>Coupon</span>
              </div>
            </Grid>
            <Grid item>
              <Link
              //    to={`/coupons/add`}
              >
                <p onClick={() => props.handleModalOpen()}>
                  Add New Coupon <img src={AddIcon} alt="add-icon" />
                </p>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* --------------list here */}
        <Grid container spacing={3} sx={{ p: 2.5 }}>
          {/* --------------list here */}
          {testData?.map((res, index) => (
            <Grid item xs={12} sm={6}>
              <Grid
                container
                key={index}
                className={`q_copuon_header w-full ${1 == 1 ? "active" : ""}`}
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
                        <p>test</p>
                      </div>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Link

                          // to={`/coupons/edit-coupons/${coupons.id}`}
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
                            onClick={
                              () => ""
                              //   handleDeleteCoupon(coupons.id)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>

        {/* </Grid> */}
      </Grid>
    </>
  );
}
