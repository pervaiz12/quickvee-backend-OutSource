import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/StoreSetting.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { FiCalendar } from "react-icons/fi";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL, UPDATE_STORE_OPTIONS_DATA } from "../../../Constants/Config";
import {
  fetchStoreSettingOptionData,
  updateStoreOption,
} from "../../../Redux/features/StoreSettingOption/StoreSettingOptionSlice";
// import { TextField } from "@mui/material";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
import { CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Loader from "../../../CommonComponents/Loader";
import BasicTextFields from "../../../reuseableComponents/TextInputField";

export default function SettingStoreOption() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // State to track the input box status
  const [isFutureOrderEnabled, setIsFutureOrderEnabled] = useState(false);
  const [error, setError] = useState("");

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const [storeData, setStoreData] = useState({});
  const [userData, setUserData] = useState({});
  const [userOptionData, setUserOptionData] = useState({});

  const checkBoxList = [
    "orderNumebrEnabled",
    "enabledEmailNotification",
    "enabledSmsNotification",
    "enabledCashPaymentDelivery",
    "enabledNca",
    "enabledDualPrice",
    "autoPrintOrder",
    "autoPrintPaymentReceipt",
    "enabledGuestCheckout",
  ];
  const inputValueList = ["dayCount"];

  // states
  const [orderState, setOrderState] = useState({
    orderNumebrEnabled: false,
    resetOrderNumberTime: "00:00",
    enabledFutureOrder: false,
    dayCount: "",
    enabledDispatchCenter: false,
    enabledEmailNotification: false,
    enabledSmsNotification: false,
    enabledCashPaymentDelivery: false,
    enabledCashPaymenyPickup: false,
    enabledNca: false,
    enabledDualPrice: false,
    creditCardSurcharge: "",
    debitCardSurcharge: "",
    autoPrintOrder: false,
    autoPrintPaymentReceipt: false,
    enabledGuestCheckout: false,
  });

  // onchange
  const handleOrderChange = (e) => {
    const { name, value, checked } = e.target;
    const updateData = { ...orderState };
    if (checkBoxList?.includes(name)) {
      if (name === "orderNumebrEnabled") {
        updateData[name] = checked;
        updateData["resetOrderNumberTime"] = "00.00";
      } else if (name === "enabledNca") {
        updateData[name] = checked;
        updateData["enabledDualPrice"] = false;
      } else if (name === "enabledDualPrice") {
        updateData[name] = checked;
        updateData["enabledNca"] = false;
      } else {
        updateData[name] = checked;
      }
    } else if (inputValueList?.includes(name)) {
      updateData[name] = value;
    } else if (name === "enabledFutureOrder") {
      updateData[name] = checked;
      if (checked === false) {
        updateData["dayCount"] = "";
      }
    } else if (name === "enabledDispatchCenter") {
      updateData[name] = checked;
      updateData["enabledEmailNotification"] = false;
      updateData["enabledSmsNotification"] = false;
    } else if (
      name === "creditCardSurcharge" ||
      name === "debitCardSurcharge"
    ) {
      let fieldValue;
      fieldValue = value
        // Remove extra dots and ensure only one dot exists at most
        .replace(/[^\d.]/g, "") // Allow digits and dots only
        .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
        .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

      let inputStr = fieldValue.replace(/\D/g, "");
      inputStr = inputStr.replace(/^0+/, "");

      if (inputStr.length == "") {
        fieldValue = "0.00";
      } else if (inputStr.length === 1) {
        fieldValue = "0.0" + inputStr;
      } else if (inputStr.length === 2) {
        fieldValue = "0." + inputStr;
      } else {
        fieldValue =
          inputStr.slice(0, inputStr.length - 2) + "." + inputStr.slice(-2);
      }
      updateData[name] = fieldValue;
    } else {
      updateData[name] = value;
    }
    setOrderState(updateData);
  };

  const dispatch = useDispatch();
  // fetch data when page load
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
      ...userTypeData,
    };
    if (data) {
      setFetchLoading(true);
      dispatch(fetchStoreSettingOptionData(data))
        .then((res) => {
          if (res?.payload?.status) {
            setStoreData(res?.payload);
            setUserData(res?.payload?.user_data);
            setUserOptionData(res?.payload?.user_option_data);
          }
        })
        .catch(() => {
          ToastifyAlert("Error!", "error");
        })
        .finally(() => {
          setFetchLoading(false);
        });
    }
  }, []);

  // fill the state when data load
  useEffect(() => {
    setOrderState((prev) => ({
      ...prev,
      ["orderNumebrEnabled"]: Boolean(+userData?.enable_order_number),
      ["resetOrderNumberTime"]: userData?.reset_order_time,
      ["enabledFutureOrder"]: Boolean(+userData?.future_ordering),
      ["dayCount"]:
        Boolean(+userData?.future_ordering) === true
          ? userData?.advance_count
          : "",
      ["enabledDispatchCenter"]: Boolean(+userOptionData?.dispatch_status),

      ["enabledEmailNotification"]:
        userOptionData?.driver_notify === "0"
          ? false
          : userOptionData?.driver_notify === "1"
            ? true
            : userOptionData?.driver_notify === "3"
              ? true
              : false,
      ["enabledSmsNotification"]:
        userOptionData?.driver_notify === "0"
          ? false
          : userOptionData?.driver_notify === "2"
            ? true
            : userOptionData?.driver_notify === "3"
              ? true
              : false,

      ["enabledCashPaymentDelivery"]: Boolean(
        +userOptionData?.cash_payment_delivery
      ),
      ["enabledCashPaymenyPickup"]: Boolean(
        +userOptionData?.cash_payment_pickup
      ),
      ["enabledNca"]:
        userOptionData?.is_surcharge === "0"
          ? false
          : userOptionData?.is_surcharge === "1"
            ? true
            : false,
      ["enabledDualPrice"]:
        userOptionData?.is_surcharge === "0"
          ? false
          : userOptionData?.is_surcharge === "1"
            ? false
            : true,
      ["creditCardSurcharge"]: userOptionData?.surcharge_per,
      ["debitCardSurcharge"]: userOptionData?.debit_surcharge,
      ["autoPrintOrder"]: Boolean(+userData?.auto_print_kitchen),
      ["autoPrintPaymentReceipt"]: Boolean(+userData?.auto_print_payment),
      ["enabledGuestCheckout"]: Boolean(+userOptionData?.is_guest_checkout),
    }));
  }, [userData, storeData, userOptionData]);

  // onsubmit
  const handleUpdateSettingOption = async () => {
    if (userOptionData?.cc_payment === "2") {
      if (
        !orderState?.enabledCashPaymentDelivery &&
        !orderState?.enabledCashPaymenyPickup
      ) {
        setError("Please Select Cash Payment method.");
      }
    } else if (orderState?.dayCount > 12) {
      alert("Advance Day Count Must Be Less Than 12");
    } else {
      setError("");
      setLoading(true);
      const newItem = {
        login_type: userTypeData?.login_type,
        merchant_id: "MAL0100CA",
        user_id: LoginGetDashBoardRecordJson?.data?.id,
        enable_order_number: orderState?.orderNumebrEnabled ? "1" : "0",
        reset_order_time: orderState?.resetOrderNumberTime,
        enable_future_order: orderState?.enabledFutureOrder ? "1" : "0",
        advance_day_count: orderState?.dayCount ? orderState?.dayCount : "0",
        enable_auto_print_order: orderState?.autoPrintOrder ? "1" : "0",
        enable_auto_print_payment: orderState?.autoPrintPaymentReceipt
          ? "1"
          : "0",
        enable_guest_checkout: orderState?.enabledGuestCheckout ? "1" : "0",
        enable_nca: orderState?.enabledNca ? "1" : "0",
        enable_dp: orderState?.enabledDualPrice ? "1" : "0",
        credit_card_surcharge_per: orderState?.creditCardSurcharge,
        debit_card_surcharge_per: orderState?.debitCardSurcharge,
        enable_cashpayment_delivery: orderState?.enabledCashPaymentDelivery
          ? "1"
          : "0",
        enable_cashpayment_pickup: orderState?.enabledCashPaymenyPickup
          ? "1"
          : "0",
        enable_dispatch: orderState?.enabledDispatchCenter ? "1" : "0",
        email_notification: orderState?.enabledEmailNotification ? "1" : "0",
        sms_notification: orderState?.enabledSmsNotification ? "1" : "0",
      };
      const data = newItem;
      dispatch(updateStoreOption(data))
        .then((res) => {
          if (res?.payload?.status) {
            let merchantdata = {
              merchant_id: "MAL0100CA",
              ...userTypeData,
            };
            dispatch(fetchStoreSettingOptionData(merchantdata)).catch((err) =>
              console.log("err", err)
            );
            ToastifyAlert("Store Setting Options is Updated.", "success");
          }
        })
        .catch((err) => {
          ToastifyAlert("Error!", "error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="box">
        {fetchLoading ? (
          <div class="loading-box">
            <Loader />
          </div>
        ) : (
          <>
            <Grid container className="box_shadow_div">
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 2.5, px: 2.5 }}
                >
                  <Grid item>
                    <h2 className="store-setting-h1 store-setting-inline-block">
                      <b>Enable Order Number</b>
                    </h2>
                  </Grid>
                  <Grid item>
                    <Switch
                      {...label}
                      checked={orderState?.orderNumebrEnabled}
                      name="orderNumebrEnabled"
                      onChange={handleOrderChange}
                      // {...label}
                      // checked={isFutureOrderEnabled}
                      // onChange={FutureOrdertoggleInput}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ px: 2.5 }}>
                  <Grid item xs={12}>
                    <p className="store-setting-p store-setting-pb-1-5">
                      The store will be able to accept online orders.
                    </p>
                  </Grid>
                </Grid>
                <Grid container sx={{ px: 2.5 }}>
                  <Grid item xs={12}>
                    <div className="store-setting-gry Admin_std">
                      Select Time
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
                  <Grid item xs={12}>
                    <div className="input_area">
                      <input
                        type="time"
                        name="resetOrderNumberTime"
                        value={orderState?.resetOrderNumberTime}
                        id="start_tym"
                        required
                        onChange={handleOrderChange}
                        onClick={(e) => e.target.showPicker()}
                        disabled={!orderState?.orderNumebrEnabled}
                      />
                      {/* <span>{formatTime(systemAccess.start_time)}</span> */}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="box_shadow_div">
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 2.5, px: 2.5 }}
                >
                  <Grid item>
                    <h2 className="store-setting-h1 store-setting-inline-block">
                      <b>Future Order</b>
                    </h2>
                    <div className="store-setting-gry Admin_std store-setting-inline-block ">
                      Enable future orders?
                    </div>
                  </Grid>
                  <Grid item>
                    <span className="store-setting-switch">
                      <Switch
                        {...label}
                        checked={orderState?.enabledFutureOrder}
                        onChange={handleOrderChange}
                        name="enabledFutureOrder"
                      />
                    </span>
                  </Grid>
                </Grid>
                <Grid container sx={{ px: 2.5, pt: 1.5 }}>
                  <Grid item xs={12}>
                    <div className="store-setting-gry Admin_std">
                      Advance Day Count
                    </div>
                  </Grid>
                </Grid>
                <Grid container sx={{ px: 2.5, pb: 2.5 }}>
                  <Grid item xs={12}>
                    <BasicTextFields
                      type={"number"}
                      value={orderState?.dayCount}
                      name={"dayCount"}
                      onChangeFun={handleOrderChange}
                      disable={!orderState?.enabledFutureOrder}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ p: 2 }} className="box_shadow_div">
              <Grid item xs={12}>
                <Grid container sx={{ pb: 1.5 }}>
                  <Grid item xs={12}>
                    <h2 className="store-setting-h1  store-setting-inline-block">
                      <b>Dispatch Center</b>
                    </h2>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <div className="store-setting-gry Admin_std store-setting-inline-block">
                      Enable Dispatch Center
                    </div>
                  </Grid>
                  <Grid item>
                    <span className="store-setting-switch">
                      <Switch
                        {...label}
                        name="enabledDispatchCenter"
                        checked={orderState?.enabledDispatchCenter}
                        onChange={handleOrderChange}
                      />
                    </span>
                  </Grid>
                </Grid>
                <Grid container sx={{ py: 1 }}>
                  <Grid item xs={12}>
                    <label className="q_resigter_setting_section">
                      Enable Email Notification
                      {/* <input type="checkbox" checked="checked" />  */}
                      <input
                        type="checkbox"
                        name="enabledEmailNotification"
                        value={orderState?.enabledEmailNotification}
                        checked={orderState?.enabledEmailNotification}
                        // checked={values.ebt_type.split(",").includes("1")}
                        onChange={handleOrderChange}
                        disabled={!orderState?.enabledDispatchCenter}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </Grid>
                </Grid>
                <Grid container sx={{ py: 1 }}>
                  <Grid item xs={12}>
                    <label className="q_resigter_setting_section">
                      Enable SMS Notification
                      <input
                        type="checkbox"
                        name="enabledSmsNotification"
                        value={orderState?.enabledSmsNotification}
                        checked={orderState?.enabledSmsNotification}
                        disabled={!orderState?.enabledDispatchCenter}
                        // checked={values.ebt_type.split(",").includes("2")}
                        onChange={handleOrderChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ p: 2 }} className="box_shadow_div">
              <Grid item xs={12}>
                <Grid container sx={{ pb: 1.5 }}>
                  <Grid item xs={12}>
                    <h2 className="store-setting-h1">
                      <b>Payment Options</b>
                    </h2>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ py: 0.5 }}
                >
                  <Grid item>
                    <div className="store-setting-gry Admin_std store-setting-inline-block">
                      Enable Cash Payment For Delivery
                    </div>
                  </Grid>
                  <Grid item>
                    <span className="store-setting-switch">
                      <Switch
                        {...label}
                        checked={orderState?.enabledCashPaymentDelivery}
                        name="enabledCashPaymentDelivery"
                        onChange={handleOrderChange}
                        disabled={
                          +storeData?.user_option_data?.cc_payment === 0 ||
                          +storeData?.user_option_data?.cc_payment === 1
                        }
                      />
                    </span>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ py: 0.5 }}
                >
                  <Grid item>
                    <div className="store-setting-gry Admin_std store-setting-inline-block">
                      Enable Cash Payment For Pickup
                    </div>
                  </Grid>
                  <Grid item>
                    <span className="store-setting-switch">
                      <Switch
                        {...label}
                        checked={orderState?.enabledCashPaymenyPickup}
                        name="enabledCashPaymenyPickup"
                        onChange={handleOrderChange}
                        disabled={
                          +storeData?.user_option_data?.cc_payment === 0 ||
                          +storeData?.user_option_data?.cc_payment === 1
                        }
                      />
                    </span>
                    {!!error ? (
                      <span className="error-alert">{error}</span>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ py: 0.5 }}
                >
                  <Grid item>
                    <div className="store-setting-gry Admin_std store-setting-inline-block">
                      Enable NCA
                    </div>
                  </Grid>
                  <Grid item>
                    <span className="store-setting-switch">
                      <Switch
                        {...label}
                        checked={orderState?.enabledNca}
                        name="enabledNca"
                        onChange={handleOrderChange}
                      />
                    </span>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ py: 0.5 }}
                >
                  <Grid item>
                    <div className="store-setting-gry Admin_std store-setting-inline-block">
                      Enable NCA
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4  store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
              <div class="d-flex">
                <h2 className="store-setting-h1 store-setting-inline-block">
                  <b>Enable Order Number</b>
                </h2>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.orderNumebrEnabled}
                    name="orderNumebrEnabled"
                    onChange={handleOrderChange}
                    // {...label}
                    // checked={isFutureOrderEnabled}
                    // onChange={FutureOrdertoggleInput}
                  />
                </span>
              </div>
              <p className="store-setting-p store-setting-pb-1-5">
                The store will be able to accept online orders.
              </p>

              <div className="relative store-setting-pb-1">
                <div className="store-setting-gry Admin_std">Select Time</div>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileTimePicker"]}>
                <DemoItem>
                  <MobileTimePicker
                    defaultValue={dayjs(
                      allStoreUserData && allStoreUserData.reset_order_time
                    )}
                    // slotProps={{ textField: { variant: 'filled' } }}
                    // format="HH:mm:ss"
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider> */}

                <div className="input_area">
                  <input
                    type="time"
                    name="resetOrderNumberTime"
                    value={orderState?.resetOrderNumberTime}
                    id="start_tym"
                    required
                    onChange={handleOrderChange}
                    onClick={(e) => e.target.showPicker()}
                    disabled={!orderState?.orderNumebrEnabled}
                  />
                  {/* <span>{formatTime(systemAccess.start_time)}</span> */}
                </div>
              </div>
            </div>

            {/* Future Order */}
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4  store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
              <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block">
                <b>Future Order</b>
              </h2>
              <div className="relative store-setting-pb-1 d-flex">
                <div className="store-setting-gry Admin_std store-setting-inline-block ">
                  Enable future orders?
                </div>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.enabledFutureOrder}
                    onChange={handleOrderChange}
                    name="enabledFutureOrder"
                  />
                </span>
              </div>

              <div className="relative store-setting-pb-1">
                <div className="store-setting-gry Admin_std">
                  Advance Day Count
                </div>
              </div>
              <div className="flex border store-setting-border-gry store-setting-border-radius overflow-hidden">
                <input
                  type="number"
                  value={orderState?.dayCount}
                  name="dayCount"
                  className="w-full store-setting-px-4 store-setting-py-2 store-setting-input"
                  onChange={handleOrderChange}
                  disabled={!orderState?.enabledFutureOrder}
                />
              </div>
            </div>
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4  store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
              <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block">
                <b>Dispatch Center</b>
              </h2>
              <div className="relative store-setting-pb-1 d-flex">
                <div className="store-setting-gry Admin_std store-setting-inline-block">
                  Enable Dispatch Center
                </div>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    name="enabledDispatchCenter"
                    checked={orderState?.enabledDispatchCenter}
                    onChange={handleOrderChange}
                  />
                </span>
              </div>
              <div>
                <label className="q_resigter_setting_section">
                  Enable Email Notification
                  {/* <input type="checkbox" checked="checked" />  */}
                  <input
                    type="checkbox"
                    name="enabledEmailNotification"
                    value={orderState?.enabledEmailNotification}
                    checked={orderState?.enabledEmailNotification}
                    // checked={values.ebt_type.split(",").includes("1")}
                    onChange={handleOrderChange}
                    disabled={!orderState?.enabledDispatchCenter}
                  />
                  <span className="checkmark"></span>
                </label>

                <label className="q_resigter_setting_section">
                  Enable SMS Notification
                  <input
                    type="checkbox"
                    name="enabledSmsNotification"
                    value={orderState?.enabledSmsNotification}
                    checked={orderState?.enabledSmsNotification}
                    disabled={!orderState?.enabledDispatchCenter}
                    // checked={values.ebt_type.split(",").includes("2")}
                    onChange={handleOrderChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            {/* Payment Options */}
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4  store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
              <h2 className="store-setting-h1 store-setting-pb-1-5">
                <b>Payment Options</b>
              </h2>
              <div className="relative store-setting-pb-1 d-flex">
                <div className="store-setting-gry Admin_std store-setting-inline-block">
                  Enable Cash Payment For Delivery
                </div>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.enabledCashPaymentDelivery}
                    name="enabledCashPaymentDelivery"
                    onChange={handleOrderChange}
                    disabled={
                      +storeData?.user_option_data?.cc_payment === 0 ||
                      +storeData?.user_option_data?.cc_payment === 1
                    }
                  />
                </span>
              </div>
              <div className="relative store-setting-pb-1 d-flex">
                <div className="store-setting-gry Admin_std store-setting-inline-block">
                  Enable Cash Payment For Pickup
                </div>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.enabledCashPaymenyPickup}
                    name="enabledCashPaymenyPickup"
                    onChange={handleOrderChange}
                    disabled={
                      +storeData?.user_option_data?.cc_payment === 0 ||
                      +storeData?.user_option_data?.cc_payment === 1
                    }
                  />
                </span>
              </div>
              {!!error ? <span className="error-alert">{error}</span> : ""}
              <div className="relative store-setting-pb-1 d-flex">
                <div className="store-setting-gry Admin_std store-setting-inline-block">
                  Enable NCA
                </div>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.enabledNca}
                    name="enabledNca"
                    onChange={handleOrderChange}
                  />
                </span>
              </div>
              <div className="relative store-setting-pb-1 d-flex">
                <div className="store-setting-gry Admin_std store-setting-inline-block">
                  Enable Dual Price
                </div>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.enabledDualPrice}
                    name="enabledDualPrice"
                    onChange={handleOrderChange}
                  />
                </span>
              </div>

              <div class="card-surchanger">
                <div class="card">
                  <div className="relative store-setting-pb-1">
                    <div className="store-setting-gry Admin_std">
                      Credit Card Surcharge %
                    </div>
                  </div>
                  <div className="flex border store-setting-border-gry store-setting-border-radius overflow-hidden">
                    <input
                      type="number"
                      className="w-full store-setting-px-4 store-setting-py-2 store-setting-input"
                      value={orderState?.creditCardSurcharge}
                      name="creditCardSurcharge"
                      onChange={handleOrderChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div class="card">
                  <div className="relative store-setting-pb-1">
                    <div className="store-setting-gry Admin_std">
                      Debit Card Surcharge %
                    </div>
                  </div>
                  <div className="flex border store-setting-border-gry store-setting-border-radius overflow-hidden">
                    <input
                      type="number"
                      className="w-full store-setting-px-4 store-setting-py-2 store-setting-input"
                      name="debitCardSurcharge"
                      value={orderState?.debitCardSurcharge}
                      onChange={handleOrderChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Printing */}
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4  store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
              <h2 className="store-setting-h1 store-setting-pb-1-5">
                <b>Printing</b>
              </h2>
              <div className="relative store-setting-pb-1 d-flex">
                <div className="store-setting-gry Admin_std store-setting-inline-block">
                  Auto Print Orders To Order Printer ?
                </div>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.autoPrintOrder}
                    name="autoPrintOrder"
                    onChange={handleOrderChange}
                  />
                </span>
              </div>
              <div className="relative store-setting-pb-1 d-flex">
                <div className="store-setting-gry Admin_std store-setting-inline-block">
                  Auto Print Payment Receipt ?
                </div>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.autoPrintPaymentReceipt}
                    name="autoPrintPaymentReceipt"
                    onChange={handleOrderChange}
                  />
                </span>
              </div>
            </div>

            {/* Guest Checkout */}
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4  store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
              <div class="d-flex">
                <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block">
                  <b>Guest Checkout</b>
                </h2>
                <span className="store-setting-switch">
                  <Switch
                    {...label}
                    checked={orderState?.enabledGuestCheckout}
                    name="enabledGuestCheckout"
                    onChange={handleOrderChange}
                  />
                </span>
              </div>
              <div className="relative store-setting-pb-1">
                <div className="store-setting-gry Admin_std">
                  Enable Guest Checkout for Online Order?
                </div>
              </div>
            </div>

            <div class="btnarea mb-8 ">
              <button
                className="store-setting-btn"
                onClick={handleUpdateSettingOption}
                disabled={loading}
              >
                {loading ? (
                  <Box className="loader-box">
                    <CircularProgress />
                  </Box>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
