import React, { useEffect } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeletIcon from "../../Assests/Dashboard/delete.svg";
import Edit from "../../Assests/Dashboard/edit.svg";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { Grid } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { mixAndMatchPricingDealsList } from "../../Redux/features/MixAndMatch/mixAndMatchSlice";
import { useSelector } from "react-redux";
import { useAuthDetails } from "../../Common/cookiesHelper";

const LoadingDeals = () => {
  return (
    <>
      {[1, 2, 3, 4].map((_, index) => (
        <Grid item xs={12} sm={6}>
          <Grid container key={index} className={`q_copuon_header w-full`}>
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
                      <div style={{ padding: 0 }} className="q_coupon_code">
                        <p>
                          <Skeleton />
                        </p>
                      </div>
                    </Grid>
                    <Grid item>
                      <div style={{ padding: 0 }} className="q_coupon_code">
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
                <Grid item sx={{ p: 0 }} className="q_coupon_discountCode">
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
  );
};

const MainMixAndMatch = () => {
  const dispatch = useDispatch();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();

  const { loading, mixAndMatchDeals } = useSelector(
    (state) => state.mixAndMatchList
  );

  useEffect(() => {
    const data = {
      ...userTypeData,
      merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    };
    dispatch(mixAndMatchPricingDealsList(data));
  }, []);

  useEffect(() => {
    console.log("mixAndMatchDeals: ", mixAndMatchDeals);
  }, [mixAndMatchDeals]);

  return (
    <>
      <div className="q-category-main-page">
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
                  <span>Mix N' Match Pricing</span>
                </div>
              </Grid>
              <Grid item>
                <Link to={`/mix-and-match/add`}>
                  <p>
                    Add New Deal <img src={AddIcon} alt="add-icon" />
                  </p>
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ p: 2.5 }}>
              {loading ? (
                <LoadingDeals />
              ) : (
                <>
                  {mixAndMatchDeals &&
                    mixAndMatchDeals.map((deal, index) => (
                      <Grid key={deal.id} item xs={12} sm={6}>
                        <Grid
                          container
                          className={`q_copuon_header w-full ${
                            index % 2 ? "active" : ""
                          }`}
                        >
                          <Grid
                            item
                            xs={12}
                            sx={{ px: 1 }}
                            className="mix-and-match-design"
                          >
                            <Grid
                              container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              sx={{ pt: 1 }}
                            >
                              <Grid item>
                                <p className="deal-title">{deal.deal_name}</p>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Grid item>
                                    <Link to={`/mix-and-match`}>
                                      <span>
                                        <img
                                          src={Edit}
                                          alt=""
                                          className="h-8 w-8 cursor-pointer"
                                        />
                                      </span>
                                    </Link>
                                  </Grid>
                                  <Grid item>
                                    <img
                                      src={DeletIcon}
                                      alt="delete icon"
                                      className="h-8 w-8 delet-icon"
                                      //   onClick={() =>
                                      //     handleDeleteCoupon(coupons.id)
                                      //   }
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container sx={{ pb: 1 }}>
                              <Grid item xs={12}>
                                <p className="offer-desc mb-2">
                                  Buy {deal.min_qty} get
                                  {`${deal.is_percent === "1" ? "$" : ""}`}
                                  {deal.is_percent}
                                  {`${deal.is_percent === "1" ? "" : "%"}`}
                                  off Each
                                </p>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                display="flex"
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <p className="label">Enable/Disable</p>
                                <Switch
                                  checked={false}
                                  // onChange={(e) =>

                                  // }
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
      </div>
    </>
  );
};

export default MainMixAndMatch;
