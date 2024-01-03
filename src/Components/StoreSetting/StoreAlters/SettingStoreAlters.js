import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/StoreSetting.css";
import "react-datepicker/dist/react-datepicker.css";
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL, UPDATE_STORE_ALERTS_DATA } from "../../../Constants/Config";
import { fetchStoreSettingalertsData } from "../../../Redux/features/SettingStoreAlters/SettingStoreAltersSlice";
import { el } from "date-fns/locale";

export default function SettingStoreAlters() {

    const [formData, setFormData] = useState({
        bccemail: '',
        msg_no: '',
        report_email_id: '',
        phn_num: '',
    });
    
    const [errors, setErrors] = useState({
        bccemail: '',
        msg_no: '',
        report_email_id: '',
        phn_num: '',
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

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const dispatch = useDispatch();
        useEffect(() => {
            let data = {
            merchant_id: "MAL0100CA",
        };
        if (data) {
            dispatch(fetchStoreSettingalertsData(data));
        }
    }, []);

    const [allStoreAlertsUserData, setallStoreAlertsUserData] = useState();
    const [allStoreAlertsUserOption, setStoreAlertsUserOptionData] = useState();
    const AllStoreSettingAlertsDataState = useSelector((state) => state.settingstorealters);

    const [isUserName, setIsUserName] = useState("");
    const [istimeZone, setIstimeZone] = useState("");
    const [isUserEmailEnabled, setIsUserEmailEnabled] = useState(false);
    const [isBccEmail, setIsBccEmail] = useState("");
    const [isUserMsgEnabled, setIsUserMsgEnabled] = useState(false);
    const [isUserMsgNumber, setIsUserMsgNumber] = useState("");
    const [isOnlinePhoneNumber, setIsOnlinePhoneNumber] = useState("");
    const [isReportEmailId, setIsReportEmailId] = useState("");
    const [isOnlineOrderNotify, setIsOnlineOrderNotify] = useState(false);

    const [isEmailAccepted, setEmailAccepted] = useState(false);
    const [isEmailPackaging, setEmailPackaging] = useState(false);
    const [isEmailDeliveryReady, setEmailDeliveryReady] = useState(false);
    const [isEmailDeliveryCompletely, setEmailDeliveryCompletely] = useState(false);
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

    useEffect(() => {
        if (
        !AllStoreSettingAlertsDataState.loading &&
        AllStoreSettingAlertsDataState.storealertsData && AllStoreSettingAlertsDataState.storealertsData.user_data && AllStoreSettingAlertsDataState.storealertsData.user_opdata
        ) {
            // console.log(AllStoreSettingAlertsDataState)
            setallStoreAlertsUserData(AllStoreSettingAlertsDataState.storealertsData.user_data );
            setStoreAlertsUserOptionData(AllStoreSettingAlertsDataState.storealertsData.user_opdata );
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
        if (allStoreAlertsUserData && allStoreAlertsUserData.enable_email && allStoreAlertsUserData.enable_email == 1) {
            setIsUserEmailEnabled(true);
        }
        if (allStoreAlertsUserData && allStoreAlertsUserData.bcc_email) {
            setIsBccEmail(allStoreAlertsUserData.bcc_email);
        }
        if (allStoreAlertsUserData && allStoreAlertsUserData.enable_message && allStoreAlertsUserData.enable_message == 1) {
            setIsUserMsgEnabled(true);
        }
        if (allStoreAlertsUserData && allStoreAlertsUserData.msg_no) {
            setIsUserMsgNumber(allStoreAlertsUserData.msg_no);
        }
        if (allStoreAlertsUserOption && allStoreAlertsUserOption.phn_num) {
            setIsOnlinePhoneNumber(allStoreAlertsUserOption.phn_num);
        }
        if (allStoreAlertsUserOption && allStoreAlertsUserOption.report_email_id) {
            setIsReportEmailId(allStoreAlertsUserOption.report_email_id);
        }
        if (allStoreAlertsUserData && allStoreAlertsUserData.ol_fcm_notify && allStoreAlertsUserData.ol_fcm_notify == 1) {
            setIsOnlineOrderNotify(true);
        }

    }, [allStoreAlertsUserData , allStoreAlertsUserOption]);

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

    const CheckBoxNotifyEmail = (valueToMatch)=>{
        if (allStoreAlertsUserData && allStoreAlertsUserData.enable_order_status_email) {
            const isValuePresent = allStoreAlertsUserData.enable_order_status_email.includes(valueToMatch);
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
            return isValuePresent
        }
    }

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

    const CheckBoxNotifySms = (valueToMatch)=>{
        if (allStoreAlertsUserData && allStoreAlertsUserData.enable_order_status_msg) {
            const isValuePresent = allStoreAlertsUserData.enable_order_status_msg.includes(valueToMatch);
            return isValuePresent
        }
    }

    const CheckBoxNotifyEmailReport = (valueToMatch)=>{
        if (allStoreAlertsUserOption && allStoreAlertsUserOption.report_email) {
            const isValuePresent = allStoreAlertsUserOption.report_email.includes(valueToMatch);
            return isValuePresent
        }
    }

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

    const handleUpdateSettingAlerts = async (e) => {
        e.preventDefault();
        if (isBccEmail != '')
        {
            if (!validateEmail(isBccEmail)) {
                setErrors({
                    ...errors,
                    bccemail: 'Please enter a valid email address.',
                });
                return;
            }
        }
        if (isUserMsgNumber != '')
        {
            if (!validateMobile(isUserMsgNumber)) {
                setErrors({
                    ...errors,
                    msg_no: 'Please enter a valid 10-digit mobile number.',
                });
                return;
            }
        }
        if (isReportEmailId != '')
        {
            if (!validateEmail1(isReportEmailId)) {
                setErrors({
                    ...errors,
                    report_email_id: 'Please enter a valid email address.',
                });
                return;
            }
        }
        // setErrors("");
        if (isOnlinePhoneNumber != '')
        {
            if (!validateMobile1(isOnlinePhoneNumber)) {
                setErrors({
                    ...errors,
                    phn_num: 'Please enter a valid 10-digit mobile number.',
                });
                return;
            }
        }

        const FormData = {
            id: "100",
            merchant_id: "MAL0100CA",
            name: isUserName,
            timeZone: istimeZone,
            enable_email:(isUserEmailEnabled) ? "1" : "0",
            bcc_email:isBccEmail,
            enable_message:(isUserMsgEnabled) ? "1" : "0",
            msg_no:isUserMsgNumber,
            emailaccepted:(isEmailAccepted) ? "1" : "0",
            emailpackaging:(isEmailPackaging) ? "1" : "0",
            emaildeliveryready:(isEmailDeliveryReady) ? "1" : "0",
            emaildeliverycompletely:(isEmailDeliveryCompletely) ? "1" : "0",
            emailcancelled:(isEmailCancelled) ? "1" : "0",
            smsaccepted:(isSmsAccepted) ? "1" : "0",
            smspackaging:(isSmsPackaging) ? "1" : "0",
            smsdeliveryready:(isSmsDeliveryReady) ? "1" : "0",
            smsdeliverycompletely:(isSmsDeliveryCompletely) ? "1" : "0",
            smscancelled:(isSmsCancelled) ? "1" : "0",
            phn_num:isOnlinePhoneNumber,
            salesoverviewreport:(isSalesOverviewReport) ? "1" : "0",
            ordertypereport:(isOrderTypeReport) ? "1" : "0",
            taxesreport:(isTaxesReport) ? "1" : "0",
            paypointreport:(isPaypointReport) ? "1" : "0",
            report_email_id:isReportEmailId,
            ol_fcm_notify:(isOnlineOrderNotify) ? "1" : "0",
        };
        console.log(FormData);

        const response = await axios.post(BASE_URL + UPDATE_STORE_ALERTS_DATA, FormData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response) {
            let merchantdata = {
                merchant_id: "MAL0100CA",
            };
            if (merchantdata) {
                setErrors({
                    bccemail: '',
                    msg_no: '',
                    report_email_id: '',
                    phn_num: '',
                });
                dispatch(fetchStoreSettingalertsData(merchantdata));
            }
        } else {
            // setsubmitmessage(response.data.msg);
        }
    };

    return (
        <>
            <div className="mx-6 my-2">
                {/* Online Order Notifications */}
                <div className="store-setting-main-div">
                    <h2 className="store-setting-h2"><b>Get Notification Via Email</b></h2>
                    <span className="store-setting-switch">
                        <Switch {...label} 
                            checked={isUserEmailEnabled} 
                            onChange={UserEmailEnabledtoggleInput} 
                        />
                    </span>
                    <p className="store-setting-p">If you would like to receive a copy of your customers online order via email please enter the email address.</p>                
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

                    <h2 className="store-setting-h2"><b>Get Notification Via SMS</b></h2>
                    <span className="store-setting-switch">
                        <Switch {...label} 
                            checked={isUserMsgEnabled} 
                            onChange={UserMsgEnabledtoggleInput} 
                        />
                    </span>
                    <p className="store-setting-p">If you would like to receive a text notification with the order details every time an order is placed please enter a number that is able to receive SMS messages.</p>                
                    <div className="store-setting-head-div">Enter Phone Number</div>
                    <div className="store-setting-input-div">
                        <input 
                            type="number" 
                            name="msg_no"
                            value={isUserMsgNumber} 
                            className="store-setting-alert-input" 
                            onChange={UserMsgNumbertoggleInput} 
                            disabled={!isUserMsgEnabled} 
                        />
                        <span className="store-setting-error">{errors.msg_no}</span>
                    </div>
                </div>

                {/* Online Order Status(Customers) */}
                <div className="store-setting-table-div">
                    <h2 className="store-setting-h2 store-setting-px-8"><b>Online Order Status (Customers)</b></h2>
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

                    <p className="store-setting-p">This number will be send to customers while he is on his way to pickup his order.</p>
                    <div className="store-setting-head-div store-setting-px-8">Enter Phone Number</div>
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
                </div>

                {/* Email Reporting */}
                <div className="store-setting-table-div">
                    <h2 className="store-setting-h2 store-setting-px-8"><b>Email Reporting</b></h2>
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
                            <div className="store-setting-span">Kindly provide us the email ID where you want reports.</div>
                            <div className="store-setting-input-div">
                                <input 
                                    type="email" 
                                    name="report_email_id" 
                                    value={isReportEmailId} 
                                    className="store-setting-alert-input" 
                                    onChange={ReportEmailIdtoggleInput}
                                />
                                <span className="store-setting-error">{errors.report_email_id}</span>
                            </div>
                        </div>
                        <div className="store-setting-flex-child">
                            <div className="store-setting-table-p">Receive Email Time</div>
                            <div className="store-setting-span">Choose the time in which you want reports on email.</div>
                            <div className="store-setting-input-div">
                                <input 
                                    type="time" 
                                    // value={newDayCountValue} 
                                    className="store-setting-alert-input" 
                                    // onChange={changeDayCountHandler}
                                    // disabled={!isFutureOrderEnabled} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Merchant app Notifications */}
                <div className="store-setting-main-div">
                    <h2 className="store-setting-h2"><b>Online Order Notification</b></h2>
                    <span className="store-setting-switch">
                        <Switch {...label} 
                            checked={isOnlineOrderNotify} 
                            onChange={OnlineOrderNotifytoggleInput} 
                        />
                    </span>
                    <p className="store-setting-p">Enable to receive online order notifications on merchant app.</p>                
                </div>
            </div>

            <button 
                className="store-setting-btn"
                onClick={handleUpdateSettingAlerts}
                >Update
            </button>
        </>
    );
}
