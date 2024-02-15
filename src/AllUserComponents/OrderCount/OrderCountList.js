import React, {useState} from "react";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import { BASE_URL, EXPORT_ORDER_COUNT_DATA } from "../../Constants/Config";
import axios from "axios";

const OrderCountList = () => {
    const [selectedOrderStatus, setSelectedOrderStatus] = useState("Paid");
    const [selectedOrderType, setSelectedOrderType] = useState("Online");

    const currentDate = new Date().toISOString().split("T")[0];
    const [selectedStartDate, setSelectedStartDate] = useState(currentDate);
    const [selectedEndDate, setSelectedEndDate] = useState(currentDate);
    const [error, setError] = useState("");

    const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] =
        useState(false);
    const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
        useState(false);

    const toggleDropdown = (dropdown) => {
        switch (dropdown) {
            case "OrderStatus":
                setOrderStatusDropdownVisible(!orderStatusDropdownVisible);
                break;
            case "orderType":
                setOrderTypeDropdownVisible(!orderTypeDropdownVisible);
                break;
            default:
                break;
        }
    };

    const handleOptionClick = (option, dropdown) => {
        switch (dropdown) {
            case "OrderStatus":
                setSelectedOrderStatus(option);
                setOrderStatusDropdownVisible(false);
                break;
            case "orderType":
                setSelectedOrderType(option);
                setOrderTypeDropdownVisible(false);
                break;
            default:
                break;
        }
    };

    const IsStartDatetoggleInput = (event) => {
        setSelectedStartDate(event.target.value);
        const newStartDate = event.target.value;
        validateDates(newStartDate, selectedEndDate);
    };

    const IsEndDatetoggleInput = (event) => {
        setSelectedEndDate(event.target.value);
        const newEndDate = event.target.value;
        validateDates(selectedStartDate, newEndDate);
    };

    const validateDates = (start, end) => {
        console.log(start);
        console.log(end);
        if (start && end && new Date(start) > new Date(end)) {
            setError("Please Enter Vaild Start Date and End Date");
        } else {
            setError("");
        }
    };

    const handleSubmitData = async () => {
        if (selectedStartDate && selectedEndDate && new Date(selectedStartDate) > new Date(selectedEndDate)) {
            setError("Please Enter Vaild Start Date and End Date");
        } else {
            setError("");
            const data = {
                start_date: selectedStartDate,
                end_date: selectedEndDate,
                order_source: selectedOrderType,
                order_status: selectedOrderStatus,
            };
            console.log(data);
            try {
                const response = await axios.post(
                    BASE_URL + EXPORT_ORDER_COUNT_DATA,
                    data,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
    
                if (response && response.data) {
                    // console.log(response);
                    const csvData = response.data;
                    // Convert the data to a Blob
                    const blob = new Blob([csvData], { type: 'text/csv' });
    
                    // Create a URL for the Blob
                    const fileUrl = URL.createObjectURL(blob);
    
                    // Create a temporary anchor element and trigger a download
                    const a = document.createElement("a");
                    a.href = fileUrl;
                    a.download = selectedStartDate + "-to-" + selectedEndDate + ".csv"; // Name of the downloaded file
                    document.body.appendChild(a);
                    a.click();
    
                    // Cleanup: remove the anchor element and revoke the Blob URL
                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileUrl);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    };

    return (
        <>
            <div className="q-category-bottom-detail-section">
                <div className="">
                    <div className="q-category-bottom-header">
                        <div className="q_details_header ml-2">Order Count</div>
                    </div>
                </div>

                <div className="q-order-page-container ml-8">
                    <div className="q-order-page-filter">
                        <label className="q-details-page-label" htmlFor="OrderStatusFilter">
                            Order Status
                        </label>
                        <div className="custom-dropdown">
                            <div
                                className="custom-dropdown-header"
                                onClick={() => toggleDropdown("OrderStatus")}
                            >
                                <span className="selected-option mt-1">
                                    {selectedOrderStatus}
                                </span>
                                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                            </div>
                            {orderStatusDropdownVisible && (
                                <div className="dropdown-content ">
                                    <div onClick={() => handleOptionClick("Paid", "OrderStatus")}>
                                        Paid
                                    </div>
                                    <div
                                        onClick={() => handleOptionClick("Unpaid", "OrderStatus")}
                                    >
                                        Unpaid
                                    </div>
                                    <div
                                        onClick={() => handleOptionClick("All", "OrderStatus")}
                                    >
                                        All
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="q-order-page-filter">
                        <label className="q-details-page-label" htmlFor="orderTypeFilter">
                            Order Source
                        </label>
                        <div className="custom-dropdown">
                            <div
                                className="custom-dropdown-header"
                                onClick={() => toggleDropdown("orderType")}
                            >
                                <span className="selected-option mt-1">
                                    {selectedOrderType}
                                </span>
                                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                            </div>
                            {orderTypeDropdownVisible && (
                                <div className="dropdown-content">
                                    <div onClick={() => handleOptionClick("Online", "orderType")}>
                                        Online
                                    </div>
                                    <div
                                        onClick={() => handleOptionClick("Offline", "orderType")}
                                    >
                                        Offline
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="q-category-bottom-detail-section mt-5 pb-5">
                <div className="store-setting-flex">
                    <div className="store-setting-flex-child">
                        <label className="q-details-page-label" htmlFor="OrderStatusFilter">
                            Start Date
                        </label>
                        <div className="store-setting-input-div pt-2">
                            <input
                                type="date"
                                className="store-setting-alert-input"
                                value={selectedStartDate}
                                onChange={IsStartDatetoggleInput}
                            />
                            {error && (
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "red",
                                        fontFamily: "CircularSTDBook !important",
                                    }}
                                >
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="store-setting-flex-child">
                        <label className="q-details-page-label" htmlFor="OrderStatusFilter">
                            End Date
                        </label>
                        <div className="store-setting-input-div pt-2">
                            <input
                                type="date"
                                className="store-setting-alert-input"
                                value={selectedEndDate}
                                onChange={IsEndDatetoggleInput}
                            />
                            {error && (
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "red",
                                        fontFamily: "CircularSTDBook !important",
                                    }}
                                >
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div 
                    style={{
                       paddingLeft:"2rem",
                    }}>
                    <button className="save_btn" onClick={handleSubmitData}>
                        Export
                    </button>
                </div>
            </div>
        </>
    );
};

export default OrderCountList;
