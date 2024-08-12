import React, { useState } from "react";
import DeletIcon from "../../Assests/Dashboard/delete.svg";
import Edit from "../../Assests/Dashboard/edit.svg";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAuthDetails } from "../../Common/cookiesHelper";
import PasswordShow from "../../Common/passwordShow";
import {
  deleteMixAndMatchPricingDeal,
  enableDisableMixAndMatchPricingDeal,
} from "../../Redux/features/MixAndMatch/mixAndMatchSlice";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import CircularProgress from "@mui/material/CircularProgress";

const SingleDeal = ({ deal, fetchDeals, setDealsList }) => {
  const dispatch = useDispatch();
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();
  const [loaders, setLoaders] = useState({
    deleteLoader: { loading: false, id: "" },
    enableDisableLoader: { loading: false, id: "" },
  });

  const handleDeleteDeal = async (dealId) => {
    try {
      setLoaders((prev) => ({
        ...prev,
        deleteLoader: { loading: true, id: dealId },
      }));

      const data = {
        ...userTypeData,
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
        mix_id: dealId,
      };

      const result = await dispatch(
        deleteMixAndMatchPricingDeal(data)
      ).unwrap();

      if (result.success) {
        ToastifyAlert(result.message, "success");
        setDealsList((prev) => {
          const data = prev.filter((deal) => deal.id !== dealId);
          return data;
        });
        // fetchDeals();
      } else {
        ToastifyAlert("Something went wrong!", "error");
      }
    } catch (error) {
      if (error.status == 401) {
        handleCoockieExpire();
        getUnAutherisedTokenMessage();
      }
    } finally {
      setLoaders((prev) => ({
        ...prev,
        deleteLoader: { loading: false, id: "" },
      }));
    }
  };

  const handleEnableDisableDeal = async (dealId) => {
    try {
      setLoaders((prev) => ({
        ...prev,
        enableDisableLoader: { loading: true, id: dealId },
      }));

      const data = {
        ...userTypeData,
        merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
        mix_id: dealId,
        is_enable: deal.is_enable === "1" ? "0" : "1",
      };

      const result = await dispatch(
        enableDisableMixAndMatchPricingDeal(data)
      ).unwrap();

      if (result.success) {
        ToastifyAlert(result.message, "success");
        setDealsList((prev) => {
          const data = prev.map((deal) =>
            deal.id === dealId
              ? {
                  ...deal,
                  is_enable: deal.is_enable === "1" ? "0" : "1",
                }
              : deal
          );
          return data;
        });
        // fetchDeals();
      } else {
        ToastifyAlert("Something went wrong!", "error");
      }
    } catch (error) {
      if (error.status == 401) {
        handleCoockieExpire();
        getUnAutherisedTokenMessage();
      }
    } finally {
      setLoaders((prev) => ({
        ...prev,
        enableDisableLoader: { loading: false, id: dealId },
      }));
    }
  };

  return (
    <Grid key={deal.id} item xs={12} sm={6}>
      <Grid
        container
        className={`q_copuon_header w-full ${
          deal.is_enable === "1" ? "active" : ""
        }`}
      >
        <Grid item xs={12} sx={{ px: 1 }} className="mix-and-match-design">
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
                  <Link
                    to={
                      loaders.deleteLoader.loading &&
                      loaders.deleteLoader.id === deal.id
                        ? "/mix-and-match"
                        : `/mix-and-match/update/${deal.id}`
                    }
                  >
                    <span>
                      <img
                        src={Edit}
                        alt=""
                        className="h-8 w-8 cursor-pointer"
                      />
                    </span>
                  </Link>
                </Grid>
                <Grid
                  item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {loaders.deleteLoader.loading &&
                  loaders.deleteLoader.id === deal.id ? (
                    <span
                      style={{
                        heigh: "32px",
                        width: "32px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress
                        color={"inherit"}
                        width={16}
                        size={16}
                      />
                    </span>
                  ) : (
                    <img
                      src={DeletIcon}
                      alt="delete icon"
                      className="h-8 w-8 delet-icon"
                      onClick={() => handleDeleteDeal(deal.id)}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container sx={{ pb: 1 }}>
            <Grid item xs={12}>
              <p className="offer-desc mb-2">
                Buy {deal.min_qty} get {`${deal.is_percent === "0" ? "$" : ""}`}
                {deal.is_percent === "1" ? +deal.discount : deal.discount}
                {`${deal.is_percent === "1" ? "%" : ""}`} off each
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

              {loaders.enableDisableLoader.loading &&
              loaders.enableDisableLoader.id === deal.id ? (
                <span
                  style={{
                    height: "38px",
                    width: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress color={"inherit"} width={16} size={16} />
                </span>
              ) : (
                <Switch
                  checked={deal.is_enable === "1"}
                  onChange={() => handleEnableDisableDeal(deal.id)}
                  disabled={
                    loaders.enableDisableLoader.loading &&
                    loaders.enableDisableLoader.id === deal.id
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#0A64F9", // Change color when switch is checked
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#0A64F9", // Change background color of the track
                    },
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleDeal;
