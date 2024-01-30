import React, { useState , useEffect } from "react";
import StoreOrderList from './StoreOrderList';
import DownIcon from "../../Assests/Dashboard/Down.svg";

const StoreOrderFilter = ({onFilterDataChange}) => {

    const [selectedOrderStatus, setSelectedOrderStatus] = useState("Paid");
    const [selectedOrderType, setSelectedOrderType] = useState("Online");

    const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] = useState(false);
    const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] = useState(false);

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

    useEffect(() => {
        onFilterDataChange(selectedOrderStatus , selectedOrderType)
    }, [selectedOrderStatus , selectedOrderType]);

    return (
        <>
            <div className="q-category-bottom-detail-section">
                <div className="">
                    <div className="q-category-bottom-header">
                        <div className='q_details_header ml-2'>Store Order</div>
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
                                <span className="selected-option mt-1">{selectedOrderStatus}</span>
                                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                            </div>
                            {orderStatusDropdownVisible && (
                                <div className="dropdown-content ">
                                    <div onClick={() => handleOptionClick("Paid", "OrderStatus")}>Paid</div>
                                    <div onClick={() => handleOptionClick("Unpaid", "OrderStatus")}>Unpaid</div>
                                    <div onClick={() => handleOptionClick("Both", "OrderStatus")}>Both</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="q-order-page-filter">
                        <label className="q-details-page-label" htmlFor="orderTypeFilter">
                            Order Type
                        </label>
                        <div className="custom-dropdown">
                            <div
                                className="custom-dropdown-header"
                                onClick={() => toggleDropdown("orderType")}
                            >
                                <span className="selected-option mt-1">{selectedOrderType}</span>
                                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                            </div>
                            {orderTypeDropdownVisible && (
                                <div className="dropdown-content">
                                    <div onClick={() => handleOptionClick("Online", "orderType")}>Online</div>
                                    <div onClick={() => handleOptionClick("Offline", "orderType")}>Offline</div>
                                    <div onClick={() => handleOptionClick("Both", "orderType")}>Both</div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default StoreOrderFilter

