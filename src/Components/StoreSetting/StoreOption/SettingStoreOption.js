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
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import Loader from "../../../CommonComponents/Loader";

export default function SettingStoreOption() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  // Get the current time using dayjs
  // const [surchargeCount, setSurcharge] = useState("");

  // State to track the input box status
  const [isFutureOrderEnabled, setIsFutureOrderEnabled] = useState(false);
  const [error, setError] = useState("");
  // const [isEnableDispatchCenter, setIsEnableDispatchCenter] = useState(false);
  // const [isEnableEmailNote, setIsEnableEmailNote] = useState(false);
  // const [isEnableSmsNote, setIsEnableSmsNote] = useState(false);

  // const [isEnableOrderNumber, setisEnableOrderNumber] = useState(false);
  // const [isResetOrderTime, setisResetOrderTime] = useState(false);
  // const [isCashPayDeliver, setisCashPayDeliver] = useState(false);
  // const [isCashPayPickup, setisCashPayPickup] = useState(false);
  // const [isAutoPrintKitchen, setisAutoPrintKitchen] = useState(false);
  // const [isAutoPrintPayment, setisAutoPrintPayment] = useState(false);
  // const [isGuestCheckout, setisGuestCheckout] = useState(false);

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  console.log(LoginGetDashBoardRecordJson, LoginAllStore, userTypeData);

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

  const handleOrderChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(name, value, checked);
    const updateData = { ...orderState };
    if (checkBoxList?.includes(name)) {
      updateData[name] = checked;
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
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
      ...userTypeData,
    };
    if (data) {
      setFetchLoading(true);
      dispatch(fetchStoreSettingOptionData(data))
        .then((res) => {
          // console.log(res);
        })
        .catch(() => {
          ToastifyAlert("Error!", "error");
        })
        .finally(() => {
          setFetchLoading(false);
        });
    }
  }, []);

  // const [allStoreUserData, setallStoreUserData] = useState();
  // const [allStoreUserOption, setStoreUserOption] = useState();
  // const [newDayCountValue, setnewDayCountValue] = useState("");
  // const [newSurchargeValue, setnewSurchargeValue] = useState("");
  // const AllStoreSettingOptionDataState = useSelector(
  //   (state) => state.settingstoreoption
  // );

  const storeData = useSelector((state) => state?.settingstoreoption);
  const userData = useSelector(
    (state) => state?.settingstoreoption?.storeoptionData?.user_data
  );
  const userOptionData = useSelector(
    (state) => state?.settingstoreoption?.storeoptionData?.user_option_data
  );
  console.log("storeData", userData, storeData, userOptionData);

  // console.log('states', orderState?.creditCardSurcharge, orderState?.debitCardSurcharge)
  // console.log('AllStoreSettingOptionDataState', storeData)
  // useEffect(() => {
  //   if (
  //     !AllStoreSettingOptionDataState.loading &&
  //     AllStoreSettingOptionDataState.storeoptionData &&
  //     AllStoreSettingOptionDataState.storeoptionData.user_data &&
  //     AllStoreSettingOptionDataState.storeoptionData.user_option_data
  //   ) {
  //     // console.log(AllStoreSettingOptionDataState)
  //     setallStoreUserData(
  //       AllStoreSettingOptionDataState.storeoptionData.user_data
  //     );
  //     setStoreUserOption(
  //       AllStoreSettingOptionDataState.storeoptionData.user_option_data
  //     );
  //   }
  // }, [
  //   AllStoreSettingOptionDataState,
  //   AllStoreSettingOptionDataState.loading,
  //   AllStoreSettingOptionDataState.storeoptionData,
  // ]);

  useEffect(() => {
    setOrderState((prev) => ({
      ...prev,
      ["orderNumebrEnabled"]: Boolean(+userData?.enable_order_number),
      ["resetOrderNumberTime"]: userData?.reset_order_time,
      ["enabledFutureOrder"]: Boolean(+userData?.future_ordering),
      ["dayCount"]: userData?.advance_count,
      ["enabledDispatchCenter"]: userOptionData?.dispatch_status,
      ["enabledEmailNotification"]: userData?.enable_email,
      ["enabledSmsNotification"]: userData?.enable_message,
      ["enabledCashPaymentDelivery"]: Boolean(+userData?.cash_payment_delivery),
      ["enabledCashPaymenyPickup"]: Boolean(+userData?.cash_payment_pickup),
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
      ["enabledGuestCheckout"]: userOptionData?.is_guest_checkout,
    }));
  }, [userData, storeData, userOptionData]);

  // useEffect(() => {
  //   // console.log(allStoreUserData);
  //   if (allStoreUserData && allStoreUserData.advance_count) {
  //     setnewDayCountValue(allStoreUserData.advance_count);
  //   }
  //   if (allStoreUserOption && allStoreUserOption.surcharge_per) {
  //     setnewSurchargeValue(allStoreUserOption.surcharge_per);
  //   }
  //   if (allStoreUserData && allStoreUserData.reset_order_time) {
  //     console.log(allStoreUserData.reset_order_time);
  //     setisResetOrderTime(allStoreUserData.reset_order_time);
  //   }
  //   if (
  //     allStoreUserData &&
  //     allStoreUserData.future_ordering &&
  //     allStoreUserData.future_ordering == 1
  //   ) {
  //     setIsFutureOrderEnabled(true);
  //   }
  //   if (
  //     allStoreUserData &&
  //     allStoreUserData.enable_order_number &&
  //     allStoreUserData.enable_order_number == 1
  //   ) {
  //     setisEnableOrderNumber(true);
  //   }
  //   // if (allStoreUserOption && allStoreUserOption.dispatch_status && allStoreUserOption.dispatch_status == 1) {
  //   //   setIsEnableDispatchCenter(true);
  //   // }
  //   // if (allStoreUserOption && allStoreUserOption.driver_notify && allStoreUserOption.driver_notify == 1) {
  //   //   setIsEnableEmailNote(true);
  //   // }
  //   // if (allStoreUserOption && allStoreUserOption.driver_notify && allStoreUserOption.driver_notify == 2) {
  //   //   setIsEnableSmsNote(true);
  //   // }
  //   if (
  //     allStoreUserOption &&
  //     allStoreUserOption.cash_payment_delivery &&
  //     allStoreUserOption.cash_payment_delivery == 1
  //   ) {
  //     setisCashPayDeliver(true);
  //   }
  //   if (
  //     allStoreUserOption &&
  //     allStoreUserOption.cash_payment_pickup &&
  //     allStoreUserOption.cash_payment_pickup == 1
  //   ) {
  //     setisCashPayPickup(true);
  //   }
  //   if (
  //     allStoreUserData &&
  //     allStoreUserData.auto_print_kitchen &&
  //     allStoreUserData.auto_print_kitchen == 1
  //   ) {
  //     setisAutoPrintKitchen(true);
  //   }
  //   if (
  //     allStoreUserData &&
  //     allStoreUserData.auto_print_payment &&
  //     allStoreUserData.auto_print_payment == 1
  //   ) {
  //     setisAutoPrintPayment(true);
  //   }
  //   if (
  //     allStoreUserOption &&
  //     allStoreUserOption.is_guest_checkout &&
  //     allStoreUserOption.is_guest_checkout == 1
  //   ) {
  //     setisGuestCheckout(true);
  //   }
  // }, [allStoreUserData, allStoreUserOption]);

  // const changeDayCountHandler = (event) => {
  //   // console.log(event.target.value);
  //   setnewDayCountValue(event.target.value);
  // };
  // const changeSurchargeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setnewSurchargeValue(event.target.value);
  // };

  // const ResetOrderTimeHandler = (event) => {
  //   // console.log(event.target.value);
  //   setisResetOrderTime(event.target.value);
  // };
  // // Function to toggle the input box status
  // const FutureOrdertoggleInput = () => {
  //   setIsFutureOrderEnabled(!isFutureOrderEnabled);
  // };
  // const EnableDispatchCentertoggleInput = () => {
  //   setIsEnableDispatchCenter(!isEnableDispatchCenter);
  // };
  // const EnableEmailNotetoggleInput = () => {
  //   setIsEnableEmailNote(!isEnableEmailNote);
  // };
  // const EnableSmsNotetoggleInput = () => {
  //   setIsEnableSmsNote(!isEnableSmsNote);
  // };

  // const EnableOrderNumbertoggleInput = () => {
  //   setisEnableOrderNumber(!isEnableOrderNumber);
  // };
  // const CashPayDelivertoggleInput = () => {
  //   setisCashPayDeliver(!isCashPayDeliver);
  // };
  // const CashPayPickuptoggleInput = () => {
  //   setisCashPayPickup(!isCashPayPickup);
  // };
  // const AutoPrintKitchentoggleInput = () => {
  //   setisAutoPrintKitchen(!isAutoPrintKitchen);
  // };
  // const AutoPrintPaymenttoggleInput = () => {
  //   setisAutoPrintPayment(!isAutoPrintPayment);
  // };
  // const GuestCheckouttoggleInput = () => {
  //   setisGuestCheckout(!isGuestCheckout);
  // };

  const handleUpdateSettingOption = async () => {
    console.log(orderState?.orderNumebrEnabled);
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
        advance_day_count: orderState?.dayCount,
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
      // console.log(newItem);
      const data = newItem;
      console.log("data", data);
      dispatch(updateStoreOption(data))
        .then((res) => {
          if (res?.payload?.status) {
            let merchantdata = {
              merchant_id: "MAL0100CA",
              ...userTypeData,
            };
            dispatch(fetchStoreSettingOptionData(merchantdata)).catch((err)=> console.log('err', err));
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
    // const response = await axios.post(
    //   BASE_URL + UPDATE_STORE_OPTIONS_DATA,
    //   data,
    //   {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }
    // );
    // console.log(response);
    // if (response) {
    //   let merchantdata = {
    //     merchant_id: "MAL0100CA",
    //   };
    //   if (merchantdata) {
    //     dispatch(fetchStoreSettingOptionData(merchantdata));
    //   }
    // } else {
    //   // setsubmitmessage(response.data.message);
    // }
  };

  // console.log('allStoreUserData.reset_order_time', allStoreUserData.reset_order_time)

  return (
    <>
      <div className="box">
        {fetchLoading ? (
          <div class="loading-box">
            <Loader />
          </div>
        ) : (
          <>
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
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
                  />
                  {/* <span>{formatTime(systemAccess.start_time)}</span> */}
                </div>
              </div>
            </div>

            {/* Future Order */}
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
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
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
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

              {/* <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std">Advance Day Count</div>
          </div>
          <div className="flex border store-setting-border-gry store-setting-border-radius overflow-hidden">
            <input
              type="number"
              value={newDayCountValue}
              className="w-full store-setting-px-4 store-setting-py-2 store-setting-input"
              onChange={changeDayCountHandler}
              disabled={!isFutureOrderEnabled}
            />
          </div> */}
            </div>

            {/* Dispatch Center */}
            {/* <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
          <h2 className="store-setting-h1 store-setting-pb-1-5 store-setting-inline-block"><b>Dispatch Center</b></h2>
          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable Dispatch Center</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isEnableDispatchCenter} 
                onChange={EnableDispatchCentertoggleInput} 
              />
            </span>
          </div>

          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable Email Notification?</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isEnableEmailNote} 
                onChange={EnableEmailNotetoggleInput} 
                disabled={!isEnableDispatchCenter} 
              />
            </span>
          </div>

          <div className="relative store-setting-pb-1">
            <div className="store-setting-gry Admin_std store-setting-inline-block">Enable SMS Notification?</div>
            <span className="store-setting-switch">
              <Switch {...label} 
                checked={isEnableSmsNote} 
                onChange={EnableSmsNotetoggleInput} 
                disabled={!isEnableDispatchCenter} 
              />
            </span>
          </div>
        </div> */}

            {/* Payment Options */}
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
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
                      +storeData?.storeoptionData?.user_option_data
                        ?.cc_payment === 0 ||
                      +storeData?.storeoptionData?.user_option_data
                        ?.cc_payment === 1
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
                      +storeData?.storeoptionData?.user_option_data
                        ?.cc_payment === 0 ||
                      +storeData?.storeoptionData?.user_option_data
                        ?.cc_payment === 1
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
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
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
            <div className="store-setting-div bg-white store-setting-px-8 store-setting-py-4 store-setting-my-4 store-setting-mx-10 store-setting-shadow store-setting-rounded-lg store-setting-opacity-100">
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

            <div class="btnarea  ">
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
