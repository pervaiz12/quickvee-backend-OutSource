import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { mixAndMatchPricingDealsList } from "../../Redux/features/MixAndMatch/mixAndMatchSlice";
import { useSelector } from "react-redux";
import { useAuthDetails } from "../../Common/cookiesHelper";
import PasswordShow from "../../Common/passwordShow";
import SingleDeal from "./SingleDeal";
import NoDataFound from "../../reuseableComponents/NoDataFound";

const LoadingDeals = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <>
          <Grid key={index} item xs={12} sm={6}>
            <Grid container className={`q_copuon_header w-full`}>
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
                    <p className="deal-title">
                      <Skeleton />
                    </p>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Link to={`/mix-and-match`}>
                          <span>
                            <Skeleton />
                          </span>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Skeleton />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container sx={{ pb: 1 }}>
                  <Grid item xs={12}>
                    <p className="offer-desc mb-2">
                      <Skeleton />
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
                    <Skeleton />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ))}
    </>
  );
};

const MainMixAndMatch = () => {
  const dispatch = useDispatch();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();
  const { loading, mixAndMatchDeals } = useSelector(
    (state) => state.mixAndMatchList
  );
  const [dealsList, setDealsList] = useState([]);

  useEffect(() => {
    if (mixAndMatchDeals && mixAndMatchDeals.length > 0) {
      setDealsList(mixAndMatchDeals);
    }
  }, [mixAndMatchDeals]);

  const getMixAndMatchPricingDeals = async () => {
    try {
      const data = {
        ...userTypeData,
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      };
      await dispatch(mixAndMatchPricingDealsList(data)).unwrap();
    } catch (error) {
      if (error.status == 401) {
        handleCoockieExpire();
        getUnAutherisedTokenMessage();
      }
    }
  };

  useEffect(() => {
    getMixAndMatchPricingDeals();
  }, []);

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
                  {dealsList && dealsList.length > 0 ? (
                    dealsList.map((deal) => (
                      <SingleDeal
                        deal={deal}
                        fetchDeals={getMixAndMatchPricingDeals}
                        setDealsList={setDealsList}
                      />
                    ))
                  ) : (
                    <>
                      {/* <Grid item>
                      <p>No Deals Found</p>
                    </Grid> */}
                      <NoDataFound table={true} />
                    </>
                  )}
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
