import React, { useState, useEffect } from "react";
import OnlineOrderingPage from "./OnlineOrderingPage";
import StoreWorkingHrs from "./StoreWorkingHrs";
import PickupDeliveryDetails from "./PickupDeliveryDetails";
import FlatDelivery from "./FlatDelivery";
import DelveryPickupDetails from "./DelveryPickupDetails";
import { useDispatch } from "react-redux";
import { fetchStoreSettingSetupData } from "../../../Redux/features/SettingSetup/SettingSetupSlice";
import { Grid } from "@mui/material";

const Setup = () => {
  // const [updateDetails, setUpdateDetails] = useState(true);
  const [OnlineOrderStatus, setOnlineOrderStatus] = useState("");
  const [EnableOrderNumber, setEnableOrderNumber] = useState("");
  const [MinPickData, setMinPickData] = useState("");
  const [MaxPickData, setMaxPickData] = useState("");
  const [convData, setconvData] = useState("");
  const [DelEnbale, setDelEnbale] = useState("");
  const [MinAmtdel, setMinAmtdel] = useState("");
  const [rateDel, setrateDel] = useState("");
  const [MinDelData, setMinDelData] = useState("");
  const [MaxDelData, setMaxDelData] = useState("");
  const [conepikData, setconepikData] = useState("");
  const [FeeData, setFeeData] = useState("");
  const [delChange, setdelChange] = useState("");
  const [delRates, setdelRates] = useState("");
  const [delpickData, setdelpickData] = useState("");
  const [pickDefTip, setpickDefTip] = useState("");
  const [delDefTip, setdelDefTip] = useState("");

  const dispatch = useDispatch();

  const data = {
    merchant_id: "MAL0100CA",
  };

  useEffect(() => {
    dispatch(fetchStoreSettingSetupData(data));
  }, []);

  // const handleUpdateClick = () => {
  //   console.log(OnlineOrderStatus);
  //   const details = "updated details";
  //   setUpdateDetails(details);
  //   window.alert(`Updates: ${details}`);
  // };

  const handleonlineorderstatus = (onlinestatus) => {
    setOnlineOrderStatus(onlinestatus);
  };
  const handlepickupdeliverydata = (
    OdrNumData,
    MinPickData,
    MaxPickData,
    convData,
    DelEnbale,
    MinAmtdel,
    rateDel,
    MinDelData,
    MaxDelData,
    conepikData
  ) => {
    setEnableOrderNumber(OdrNumData);
    setMinPickData(MinPickData);
    setMaxPickData(MaxPickData);
    setconvData(convData);
    setDelEnbale(DelEnbale);
    setMinAmtdel(MinAmtdel);
    setrateDel(rateDel);
    setMinDelData(MinDelData);
    setMaxDelData(MaxDelData);
    setconepikData(conepikData);
  };

  const handleDeliveryFeeData = (FeeData, delChange, delRates) => {
    setFeeData(FeeData);
    setdelChange(delChange);
    setdelRates(delRates);
  };

  const handleDeliveryPickupData = (delpickData, pickDefTip, delDefTip) => {
    setdelpickData(delpickData);
    setpickDefTip(pickDefTip);
    setdelDefTip(delDefTip);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    const FormData = {
      merchant_id: "MAL0100CA",
      offline: OnlineOrderStatus,
      min_delivery_amt: MinAmtdel,
      max_delivery_radius: rateDel,
      enable_tip: delpickData,
      is_pickup: EnableOrderNumber,
      is_deliver: DelEnbale,
      pickup_min_time: MinPickData,
      pickup_max_time: MaxPickData,
      deliver_min_time: MinDelData,
      deliver_max_time: MaxDelData,
      float_fee: FeeData,
      delivery_fee: delChange,
      rate_per_miles: delRates,
      cf_del: "",
      cf_pik: "",
      cf_del_price: conepikData,
      cf_pik_price: convData,
      tax: "",
      default_tip_p: pickDefTip,
      default_tip_d: delDefTip,
    };
    console.log(FormData);

    // const response = await axios.post(BASE_URL + UPDATE_RECEIPT_INFO_DATA, FormData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    // if (response) {
    //   let merchantdata = {
    //     merchant_id: "MAL0100CA",
    //   };
    //   if (merchantdata) {
    //     dispatch(fetchSettingReceiptData(merchantdata));
    //   }
    // } else {
    //   setsubmitmessage(response.data.msg);
    // }
  };

  return (
    <>
      <OnlineOrderingPage onlineorderstatus={handleonlineorderstatus} />

      <StoreWorkingHrs />

      <PickupDeliveryDetails pickupdeliverydata={handlepickupdeliverydata} />

      <FlatDelivery DeliveryFeeData={handleDeliveryFeeData} />

      <DelveryPickupDetails DeliveryPickupData={handleDeliveryPickupData} />

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item>
          <button class="quic-btn quic-btn-save" onClick={handleUpdateClick}>
            Update
          </button>
        </Grid>
      </Grid>
      {/* <div className="">
        <div class="q-add-categories-section-middle-footer">
          <div class="q-category-bottom-header" style={{ marginRight: "67px" }}>
            <button class="quic-btn quic-btn-save" onClick={handleUpdateClick}>
              Update
            </button>

            <button class="quic-btn quic-btn-cancle">Cancel</button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Setup;
