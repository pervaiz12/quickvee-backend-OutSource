import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/StoreSetting.css";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "@mui/material/Switch";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL, UPDATE_STORE_ALERTS_DATA } from "../../../Constants/Config";
import { fetchStoreSettingalertsData } from "../../../Redux/features/SettingStoreAlters/SettingStoreAltersSlice";
import { el } from "date-fns/locale";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";

export default function SettingStoreAlters() {
  const [formData, setFormData] = useState({
    bccemail: "",
    msg_no: "",
    store_name: "",
    report_email_id: "",
    phn_num: "",
  });

  const [errors, setErrors] = useState({
    bccemail: "",
    msg_no: "",
    store_name: "",
    report_email_id: "",
    phn_num: "",
  });

  const validateEmail = (bccemail) => {
    // Basic bccemail validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(bccemail);
  };

  const validateMobile = (msg_no) => {
    // Basic mobile number validation for 10-digit numbers
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(msg_no);
  };

  const validateEmail1 = (report_email_id) => {
    // Basic report_email_id validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(report_email_id);
  };

  const validateMobile1 = (phn_num) => {
    // Basic mobile number validation for 10-digit numbers
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(phn_num);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const dispatch = useDispatch();
  
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  useEffect(() => {
    let data = {
      merchant_id: merchant_id,
      ...userTypeData,
    };
    if (data) {
      dispatch(fetchStoreSettingalertsData(data));
    }
  }, []);

  const [allStoreAlertsUserData, setallStoreAlertsUserData] = useState();
  const [allStoreAlertsUserOption, setStoreAlertsUserOptionData] = useState();
  const AllStoreSettingAlertsDataState = useSelector(
    (state) => state.settingstorealters
  );

  const [isUserName, setIsUserName] = useState("");
  const [istimeZone, setIstimeZone] = useState("");
  const [isUserEmailEnabled, setIsUserEmailEnabled] = useState(false);
  const [isBccEmail, setIsBccEmail] = useState("");
  const [isUserMsgEnabled, setIsUserMsgEnabled] = useState(false);
  const [isUserMsgNumber, setIsUserMsgNumber] = useState("");
  const [isstoreName, setIsstoreName] = useState("");
  const [isOnlinePhoneNumber, setIsOnlinePhoneNumber] = useState("");
  const [isReportEmailId, setIsReportEmailId] = useState("");
  const [isOnlineOrderNotify, setIsOnlineOrderNotify] = useState(false);
  const [isDefaultOnlineOrderNotify, setIsDefaultOnlineOrderNotify] = useState(false);

  const [isEmailAccepted, setEmailAccepted] = useState(false);
  const [isEmailPackaging, setEmailPackaging] = useState(false);
  const [isEmailDeliveryReady, setEmailDeliveryReady] = useState(false);
  const [isEmailDeliveryCompletely, setEmailDeliveryCompletely] =
    useState(false);
  const [isEmailCancelled, setEmailCancelled] = useState(false);

  const [isSmsAccepted, setSmsAccepted] = useState(false);
  const [isSmsPackaging, setSmsPackaging] = useState(false);
  const [isSmsDeliveryReady, setSmsDeliveryReady] = useState(false);
  const [isSmsDeliveryCompletely, setSmsDeliveryCompletely] = useState(false);
  const [isSmsCancelled, setSmsCancelled] = useState(false);

  const [isSalesOverviewReport, setSalesOverviewReport] = useState(false);
  const [isOrderTypeReport, setOrderTypeReport] = useState(false);
  const [isTaxesReport, setTaxesReport] = useState(false);
  const [isPaypointReport, setPaypointReport] = useState(false);
  const [isReportEmailTime, setReportEmailTime] = useState(false);

  useEffect(() => {
    if (
      !AllStoreSettingAlertsDataState.loading &&
      AllStoreSettingAlertsDataState.storealertsData &&
      AllStoreSettingAlertsDataState.storealertsData.user_data &&
      AllStoreSettingAlertsDataState.storealertsData.user_opdata
    ) {
      // console.log(AllStoreSettingAlertsDataState)
      setallStoreAlertsUserData(
        AllStoreSettingAlertsDataState.storealertsData.user_data
      );
      setStoreAlertsUserOptionData(
        AllStoreSettingAlertsDataState.storealertsData.user_opdata
      );
    }
  }, [
    AllStoreSettingAlertsDataState,
    AllStoreSettingAlertsDataState.loading,
    AllStoreSettingAlertsDataState.storealertsData,
  ]);

  useEffect(() => {
    // console.log(allStoreUserData);
    if (allStoreAlertsUserData && allStoreAlertsUserData.name) {
      setIsUserName(allStoreAlertsUserData.name);
    }
    if (allStoreAlertsUserData && allStoreAlertsUserData.timeZone) {
      setIstimeZone(allStoreAlertsUserData.name);
    }
    if (
      allStoreAlertsUserData &&
      allStoreAlertsUserData.enable_email &&
      allStoreAlertsUserData.enable_email == 1
    ) {
      setIsUserEmailEnabled(true);
    }
    if (allStoreAlertsUserData && allStoreAlertsUserData.bcc_email) {
      setIsBccEmail(allStoreAlertsUserData.bcc_email);
    }
    if (
      allStoreAlertsUserData &&
      allStoreAlertsUserData.enable_message &&
      allStoreAlertsUserData.enable_message == 1
    ) {
      setIsUserMsgEnabled(true);
    }
    if (allStoreAlertsUserData && allStoreAlertsUserData.msg_no) {
      setIsUserMsgNumber(allStoreAlertsUserData.msg_no);
    }
    if (allStoreAlertsUserOption && allStoreAlertsUserOption.store_name) {
      setIsstoreName(allStoreAlertsUserOption.store_name);
    }
    if (allStoreAlertsUserOption && allStoreAlertsUserOption.phn_num) {
      setIsOnlinePhoneNumber(allStoreAlertsUserOption.phn_num);
    }
    if (allStoreAlertsUserOption && allStoreAlertsUserOption.report_email_id) {
      setIsReportEmailId(allStoreAlertsUserOption.report_email_id);
    }
    if (
      allStoreAlertsUserOption &&
      allStoreAlertsUserOption.report_email_time
    ) {
      setReportEmailTime(allStoreAlertsUserOption.report_email_time);
    }
    if (
      allStoreAlertsUserOption &&
      allStoreAlertsUserOption.default_notify_sms &&
      allStoreAlertsUserOption.default_notify_sms == 1
    ) {
      setIsDefaultOnlineOrderNotify(true);
    }

    if (
      allStoreAlertsUserData &&
      allStoreAlertsUserData.ol_fcm_notify &&
      allStoreAlertsUserData.ol_fcm_notify == 1
    ) {
      setIsOnlineOrderNotify(true);
    }
  }, [allStoreAlertsUserData, allStoreAlertsUserOption]);

  const UserEmailEnabledtoggleInput = () => {
    setIsUserEmailEnabled(!isUserEmailEnabled);
  };
  const BccEmailtoggleInput = (event) => {
    setIsBccEmail(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const UserMsgEnabledtoggleInput = () => {
    setIsUserMsgEnabled(!isUserMsgEnabled);
  };
  const UserMsgNumbertoggleInput = (event) => {
    setIsUserMsgNumber(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const OnlinePhoneNumbertoggleInput = (event) => {
    setIsOnlinePhoneNumber(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const ReportEmailIdtoggleInput = (event) => {
    setIsReportEmailId(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const OnlineOrderNotifytoggleInput = () => {
    setIsOnlineOrderNotify(!isOnlineOrderNotify);
  };

  const DefaultOnlineOrderNotifytoggleInput = () => {
    setIsDefaultOnlineOrderNotify(!isDefaultOnlineOrderNotify);
  };

  const IsEmailAcceptedtoggleInput = () => {
    setEmailAccepted(!isEmailAccepted);
  };
  const IsEmailPackagingtoggleInput = () => {
    setEmailPackaging(!isEmailPackaging);
  };
  const IsEmailDeliveryReadytoggleInput = () => {
    setEmailDeliveryReady(!isEmailDeliveryReady);
  };
  const IsEmailDeliveryCompletelytoggleInput = () => {
    setEmailDeliveryCompletely(!isEmailDeliveryCompletely);
  };
  const IsEmailCancelledtoggleInput = () => {
    setEmailCancelled(!isEmailCancelled);
  };
  const IsReportEmailTimetoggleInput = (event) => {
    setReportEmailTime(event.target.value);
  };

  const CheckBoxNotifyEmail = (valueToMatch) => {
    if (
      allStoreAlertsUserData &&
      allStoreAlertsUserData.enable_order_status_email
    ) {
      const isValuePresent =
        allStoreAlertsUserData.enable_order_status_email.includes(valueToMatch);
      // if(valueToMatch === 1){
      //     setAccepted(true)
      // } else if(valueToMatch === 2){
      //     setPackaging(true)
      // } else if (valueToMatch === 3) {
      //     setDeliveryReady(true)
      // } else if (valueToMatch === 4) {
      //     setDeliveryCompletely(true)
      // } else if(valueToMatch === 5) {
      //     setCancelled(true)
      // }
      return isValuePresent;
    }
  };

  const IsSmsAcceptedtoggleInput = () => {
    setSmsAccepted(!isSmsAccepted);
  };
  const IsSmsPackagingtoggleInput = () => {
    setSmsPackaging(!isSmsPackaging);
  };
  const IsSmsDeliveryReadytoggleInput = () => {
    setSmsDeliveryReady(!isSmsDeliveryReady);
  };
  const IsSmsDeliveryCompletelytoggleInput = () => {
    setSmsDeliveryCompletely(!isSmsDeliveryCompletely);
  };
  const IsSmsCancelledtoggleInput = () => {
    setSmsCancelled(!isSmsCancelled);
  };

  const CheckBoxNotifySms = (valueToMatch) => {
    if (
      allStoreAlertsUserData &&
      allStoreAlertsUserData.enable_order_status_msg
    ) {
      const isValuePresent =
        allStoreAlertsUserData.enable_order_status_msg.includes(valueToMatch);
      return isValuePresent;
    }
  };

  const CheckBoxNotifyEmailReport = (valueToMatch) => {
    if (allStoreAlertsUserOption && allStoreAlertsUserOption.report_email) {
      const isValuePresent =
        allStoreAlertsUserOption.report_email.includes(valueToMatch);
      return isValuePresent;
    }
  };

  const IsSalesOverviewReporttoggleInput = () => {
    setSalesOverviewReport(!isSalesOverviewReport);
  };
  const IsOrderTypeReporttoggleInput = () => {
    setOrderTypeReport(!isOrderTypeReport);
  };
  const IsTaxesReporttoggleInput = () => {
    setTaxesReport(!isTaxesReport);
  };
  const IsPaypointReporttoggleInput = () => {
    setPaypointReport(!isPaypointReport);
  };

  const Userstore_nameInput = (event) => {
    setIsstoreName(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleUpdateSettingAlerts = async (e) => {
    e.preventDefault();
    if (isBccEmail != "") {
      if (!validateEmail(isBccEmail)) {
        setErrors({
          ...errors,
          bccemail: "Please enter a valid email address.",
        });
        return;
      }
    }
    if (isstoreName == "") {
      setErrors({
        ...errors,
        store_name: "This field is required.",
      });
      return;
    }
    if(isUserMsgNumber == ""){
      setErrors({
        ...errors,
        msg_no: "This field is required.",
      });
      return;

    }else if (isUserMsgNumber != "") {
      if (!validateMobile(isUserMsgNumber)) {
        setErrors({
          ...errors,
          msg_no: "Please enter a valid 10-digit mobile number.",
        });
        return;
      }
    }else{
      setErrors({
        ...errors,
        msg_no: "",
      });
    }
    if (isReportEmailId != "") {
      if (!validateEmail1(isReportEmailId)) {
        setErrors({
          ...errors,
          report_email_id: "Please enter a valid email address.",
        });
        return;
      }
    }
    // setErrors("");
    if(isOnlinePhoneNumber == ""){
      setErrors({
        ...errors,
        phn_num: "This field is required.",
      });
      return;
    }else if (isOnlinePhoneNumber != "") {
      if (!validateMobile1(isOnlinePhoneNumber)) {
        setErrors({
          ...errors,
          phn_num: "Please enter a valid 10-digit mobile number.",
        });
        return;
      }
    } else{
      setErrors({
        ...errors,
        phn_num: "",
      });
    }
    const isEmailAccepted = document.getElementById('isEmailAccepted').checked;
    const isEmailPackaging = document.getElementById('isEmailPackaging').checked;
    const isEmailDeliveryReady = document.getElementById('isEmailDeliveryReady').checked;
    const isEmailDeliveryCompletely = document.getElementById('isEmailDeliveryCompletely').checked;
    const isEmailCancelled = document.getElementById('isEmailCancelled').checked;

    const isSmsAccepted = document.getElementById('isSmsAccepted').checked;
    const isSmsPackaging = document.getElementById('isSmsPackaging').checked;
    const isSmsDeliveryReady = document.getElementById('isSmsDeliveryReady').checked;
    const isSmsDeliveryCompletely = document.getElementById('isSmsDeliveryCompletely').checked;
    const isSmsCancelled = document.getElementById('isSmsCancelled').checked;

    const notifymail = [
      isEmailAccepted ? "1" : "",
      isEmailPackaging ? "2" : "",
      isEmailDeliveryReady ? "3" : "",
      isEmailDeliveryCompletely ? "4" : "",
      isEmailCancelled ? "5" : ""
    ].filter(Boolean).join(",");
    const notifysms = [
      isSmsAccepted ? "1" : "",
      isSmsPackaging ? "2" : "",
      isSmsDeliveryReady ? "3" : "",
      isSmsDeliveryCompletely ? "4" : "",
      isSmsCancelled ? "5" : ""
    ].filter(Boolean).join(",");

    const FormData = {
      user_id: allStoreAlertsUserData?.id,
      merchant_id: merchant_id,
      // name: isUserName,
      store_name:isstoreName,
      // timeZone: istimeZone,
      enable_email: isUserEmailEnabled ? "1" : "0",
      bcc_email: isBccEmail,
      enable_message: isUserMsgEnabled ? "1" : "0",
      msg_no: isUserMsgNumber,
      // emailaccepted: isEmailAccepted ? "1" : "0",
      // emailpackaging: isEmailPackaging ? "1" : "0",
      // emaildeliveryready: isEmailDeliveryReady ? "1" : "0",
      // emaildeliverycompletely: isEmailDeliveryCompletely ? "1" : "0",
      // emailcancelled: isEmailCancelled ? "1" : "0",
      notifymail:notifymail,
      notifySMS:notifysms,
      phn_num: isOnlinePhoneNumber,
      // smsaccepted: isSmsAccepted ? "1" : "0",
      // smspackaging: isSmsPackaging ? "1" : "0",
      // smsdeliveryready: isSmsDeliveryReady ? "1" : "0",
      // smsdeliverycompletely: isSmsDeliveryCompletely ? "1" : "0",
      // smscancelled: isSmsCancelled ? "1" : "0",
      // salesoverviewreport: isSalesOverviewReport ? "1" : "0",
      // ordertypereport: isOrderTypeReport ? "1" : "0",
      // taxesreport: isTaxesReport ? "1" : "0",
      // paypointreport: isPaypointReport ? "1" : "0",
      // report_email_id: isReportEmailId,
      // report_email_time: isReportEmailTime,
      default_notify_sms_val:isDefaultOnlineOrderNotify ? "1" : "0",
      token_id: userTypeData?.token_id,
      login_type: userTypeData?.login_type,
      ol_fcm_notify: isOnlineOrderNotify ? "1" : "0",
    };
    console.log(FormData);
    // return

    const response = await axios.post(BASE_URL + UPDATE_STORE_ALERTS_DATA, FormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userTypeData?.token}`,
      },
    });

    if (response?.data?.status) {
      ToastifyAlert(response?.data?.message, "success");
      let merchantdata = {
        merchant_id: merchant_id,
        ...userTypeData,
      };
      if (merchantdata) {
        setErrors({
          bccemail: "",
          msg_no: "",
          store_name: "",
          report_email_id: "",
          phn_num: "",
        });
        dispatch(fetchStoreSettingalertsData(merchantdata));
      }
    } else {
      // setsubmitmessage(response.data.msg);
    }
  };

  return (
    <>
      <div className="box">
        {/* Online Order Notifications */}
        <div className="store-setting-main-div">
          <h2 className="store-setting-h2">
            <b>Get Notification Via Email</b>
          </h2>
          <span className="store-setting-switch">
            <Switch
              {...label}
              checked={isUserEmailEnabled}
              onChange={UserEmailEnabledtoggleInput}
            />
          </span>
          <p className="store-setting-p">
            If you would like to receive a copy of your customers online order
            via email please enter the email address.
          </p>
          <div className="store-setting-head-div">Enter Email ID</div>
          <div className="store-setting-input-div">
            <input
              type="email"
              name="bccemail"
              // value={formData.bccemail}
              value={isBccEmail}
              className="store-setting-alert-input"
              onChange={BccEmailtoggleInput}
              disabled={!isUserEmailEnabled}
            />
            <span className="store-setting-error">{errors.bccemail}</span>
          </div>

          <h2 className="store-setting-h2">
            <b>Get Notification Via SMS</b>
          </h2>
          <span className="store-setting-switch">
            <Switch
              {...label}
              checked={isUserMsgEnabled}
              onChange={UserMsgEnabledtoggleInput}
            />
          </span>
          <p className="store-setting-p">
            If you would like to receive a text notification with the order
            details every time an order is placed please enter a number that is
            able to receive SMS messages.
          </p>
          <div className="store-setting-head-div">Enter Phone Number</div>
          <div className="store-setting-input-div">
            <input
              type="number"
              name="msg_no"
              maxLength="10"
              value={isUserMsgNumber}
              className="store-setting-alert-input"
              onChange={UserMsgNumbertoggleInput}
              disabled={!isUserMsgEnabled}
            />
            <span className="store-setting-error">{errors.msg_no}</span>
          </div>
          <div className="store-setting-head-div">Store Name:</div>
          <div className="store-setting-input-div">
            <input
              type="text"
              name="store_name"
              value={isstoreName}
              className="store-setting-alert-input"
              onChange={Userstore_nameInput}
              //   disabled={!isUserMsgEnabled}
            />
            <span className="store-setting-error">{errors.store_name}</span>
          </div>
        </div>

        {/* Online Order Status(Customers) */}
        {/* <div className="store-setting-table-div">
          <h2 className="store-setting-h2 store-setting-px-8">
            <b>Online Order Status (Customers)</b>
          </h2>
          <table className="store-setting-table">
            <thead>
              <tr>
                <th></th>
                <th>Notify Via Email</th>
                <th>Notify Via SMS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="store-setting-table-tr">
                <td>Accepted</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmail(1)}
                    value={isEmailAccepted}
                    onChange={IsEmailAcceptedtoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifySms(1)}
                    value={isSmsAccepted}
                    onChange={IsSmsAcceptedtoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Packaging</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmail(2)}
                    value={isEmailPackaging}
                    onChange={IsEmailPackagingtoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifySms(2)}
                    value={isSmsPackaging}
                    onChange={IsSmsPackagingtoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Out for Delivery/Ready</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmail(3)}
                    value={isEmailDeliveryReady}
                    onChange={IsEmailDeliveryReadytoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifySms(3)}
                    value={isSmsDeliveryReady}
                    onChange={IsSmsDeliveryReadytoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Delivered/Completely</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmail(4)}
                    value={isEmailDeliveryCompletely}
                    onChange={IsEmailDeliveryCompletelytoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifySms(4)}
                    value={isSmsDeliveryCompletely}
                    onChange={IsSmsDeliveryCompletelytoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Cancelled</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmail(5)}
                    value={isEmailCancelled}
                    onChange={IsEmailCancelledtoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifySms(5)}
                    value={isSmsCancelled}
                    onChange={IsSmsCancelledtoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="store-setting-p">
            This number will be send to customers while he is on his way to
            pickup his order.
          </p>
          <div className="store-setting-head-div store-setting-px-8">
            Enter Phone Number
          </div>
          <div className="store-setting-input-div store-setting-mx-2">
            <input
              type="number"
              name="phn_num"
              value={isOnlinePhoneNumber}
              className="store-setting-alert-input"
              onChange={OnlinePhoneNumbertoggleInput}
            />
            <span className="store-setting-error">{errors.phn_num}</span>
          </div>

          <div style={{ MarginLeft: "2rem", MarginRight: "2rem" }} className="storeAlert_Enable_SMS">
            <h2 className="store-setting-h2">
              <b>Default Enable Receiving SMS Notification For Order Status</b>
            </h2>
            <span className="store-setting-switch">
              <Switch
                {...label}
                checked={isUserEmailEnabled}
                onChange={UserEmailEnabledtoggleInput}
              />
            </span>
          </div>
        </div> */}

          {/* for Design Change start  */}
        <div className="store-setting-table-div">
          <h2 className="store-setting-h2 store-setting-px-8">
            <b>Online Order Status (Customers)</b>
          </h2>
          <table className="store-setting-table">
            <thead>
              <tr>
                <th></th>
                <th>Notify Via Email</th>
                <th>Notify Via SMS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="store-setting-table-tr">
                <td>Accepted</td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                  <label className="category-checkmark-label">
                    <input
                      type="checkbox"
                      defaultChecked={CheckBoxNotifyEmail(1)}
                      value={isEmailAccepted}
                      id="isEmailAccepted"
                      onChange={IsEmailAcceptedtoggleInput}
                    />
                    <span className="category-checkmark"></span>
                  </label>
                  </div>
                </td>
                <td className="store-setting-checkmark-td">
                <div className="category-checkmark-div ">
                  <label className="category-checkmark-label">
                    <input
                      type="checkbox"
                      defaultChecked={CheckBoxNotifySms(1)}
                      value={isSmsAccepted}
                      id="isSmsAccepted"
                      onChange={IsSmsAcceptedtoggleInput}
                    />
                    <span className="category-checkmark"></span>
                  </label>
                  </div>
                </td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Packaging</td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                    <label className="category-checkmark-label">
                      <input
                        type="checkbox"
                        defaultChecked={CheckBoxNotifyEmail(2)}
                        value={isEmailPackaging}
                        id="isEmailPackaging"
                        onChange={IsEmailPackagingtoggleInput}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                </td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                    <label className="category-checkmark-label">
                      <input
                        type="checkbox"
                        defaultChecked={CheckBoxNotifySms(2)}
                        value={isSmsPackaging}
                        id="isSmsPackaging"
                        onChange={IsSmsPackagingtoggleInput}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Out for Delivery/Ready</td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                    <label className="category-checkmark-label">
                      <input
                        type="checkbox"
                        defaultChecked={CheckBoxNotifyEmail(3)}
                        value={isEmailDeliveryReady}
                        id="isEmailDeliveryReady"
                        onChange={IsEmailDeliveryReadytoggleInput}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                </td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                    <label className="category-checkmark-label">
                      <input
                        type="checkbox"
                        defaultChecked={CheckBoxNotifySms(3)}
                        value={isSmsDeliveryReady}
                        id="isSmsDeliveryReady"
                        onChange={IsSmsDeliveryReadytoggleInput}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Delivered/Completely</td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                    <label className="category-checkmark-label">
                      <input
                        type="checkbox"
                        defaultChecked={CheckBoxNotifyEmail(4)}
                        value={isEmailDeliveryCompletely}
                        id="isEmailDeliveryCompletely"
                        onChange={IsEmailDeliveryCompletelytoggleInput}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                </td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                    <label className="category-checkmark-label">
                      <input
                        type="checkbox"
                        defaultChecked={CheckBoxNotifySms(4)}
                        value={isSmsDeliveryCompletely}
                        id="isSmsDeliveryCompletely"
                        onChange={IsSmsDeliveryCompletelytoggleInput}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Cancelled</td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                    <label className="category-checkmark-label">
                      <input
                        type="checkbox"
                        defaultChecked={CheckBoxNotifyEmail(5)}
                        value={isEmailCancelled}
                        id="isEmailCancelled"
                        onChange={IsEmailCancelledtoggleInput}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                </td>
                <td className="store-setting-checkmark-td">
                  <div className="category-checkmark-div ">
                    <label className="category-checkmark-label">
                      <input
                        type="checkbox"
                        defaultChecked={CheckBoxNotifySms(5)}
                        value={isSmsCancelled}
                        id="isSmsCancelled"
                        onChange={IsSmsCancelledtoggleInput}
                      />
                      <span className="category-checkmark"></span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="store-setting-p">
            This number will be send to customers while he is on his way to
            pickup his order.
          </p>
          <div className="store-setting-head-div store-setting-px-8">
            Enter Phone Number
          </div>
          <div className="store-setting-input-div store-setting-mx-2">
            <input
              type="number"
              name="phn_num"
              value={isOnlinePhoneNumber}
              className="store-setting-alert-input"
              onChange={OnlinePhoneNumbertoggleInput}
            />
            <span className="store-setting-error">{errors.phn_num}</span>
          </div>

          <div style={{ MarginLeft: "2rem", MarginRight: "2rem" }} className="storeAlert_Enable_SMS">
            <h2 className="store-setting-h2">
              <b>Default Enable Receiving SMS Notification For Order Status</b>
            </h2>
            <span className="store-setting-switch">
              <Switch
                {...label}
                checked={isDefaultOnlineOrderNotify}
                onChange={DefaultOnlineOrderNotifytoggleInput}
              />
            </span>
          </div>
        </div>
           {/* for Design Change End  */}

        {/* Email Reporting */}
        {/* <div className="store-setting-table-div">
          <h2 className="store-setting-h2 store-setting-px-8">
            <b>Email Reporting</b>
          </h2>
          <table className="store-setting-table">
            <thead>
              <tr>
                <th></th>
                <th>Notify Via Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="store-setting-table-tr">
                <td>Sales Overview Report</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmailReport(1)}
                    value={isSalesOverviewReport}
                    onChange={IsSalesOverviewReporttoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td></td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Order Type Report</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmailReport(2)}
                    value={isOrderTypeReport}
                    onChange={IsOrderTypeReporttoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td></td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Taxes Report</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmailReport(3)}
                    value={isTaxesReport}
                    onChange={IsTaxesReporttoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td></td>
              </tr>
              <tr className="store-setting-table-tr">
                <td>Paypoint Report</td>
                <td className="store-setting-checkmark-td">
                  <input
                    type="checkbox"
                    defaultChecked={CheckBoxNotifyEmailReport(4)}
                    value={isPaypointReport}
                    onChange={IsPaypointReporttoggleInput}
                  />
                  <span className="store-setting-checkmark-span"></span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="store-setting-flex">
            <div className="store-setting-flex-child">
              <div className="store-setting-table-p">Receive Email ID</div>
              <div className="store-setting-span">
                Kindly provide us the email ID where you want reports.
              </div>
              <div className="store-setting-input-div">
                <input
                  type="email"
                  name="report_email_id"
                  value={isReportEmailId}
                  className="store-setting-alert-input"
                  onChange={ReportEmailIdtoggleInput}
                />
                <span className="store-setting-error">
                  {errors.report_email_id}
                </span>
              </div>
            </div>
            <div className="store-setting-flex-child">
              <div className="store-setting-table-p">Receive Email Time</div>
              <div className="store-setting-span">
                Choose the time in which you want reports on email.
              </div>
              <div className="store-setting-input-div">
                <input
                  type="time"
                  value={isReportEmailTime}
                  className="store-setting-alert-input"
                  onChange={IsReportEmailTimetoggleInput}
                />
              </div>
            </div>
          </div>
        </div> */}

        {/* Merchant app Notifications */}
        <div className="store-setting-main-div">
          <h2 className="store-setting-h2">
            <b>Online Order Notification</b>
          </h2>
          <span className="store-setting-switch">
            <Switch
              {...label}
              checked={isOnlineOrderNotify}
              onChange={OnlineOrderNotifytoggleInput}
            />
          </span>
          <p className="store-setting-p">
            Enable to receive online order notifications on merchant app.
          </p>
        </div>
      </div>

      <button className="store-setting-btn mt-8 mb-8" onClick={handleUpdateSettingAlerts}>
        Update
      </button>
    </>
  );
}
