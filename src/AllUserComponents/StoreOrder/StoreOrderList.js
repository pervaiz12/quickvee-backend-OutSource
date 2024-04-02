import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStoreOrderData } from "../../Redux/features/StoreOrder/StoreOrderSlice";
import "../../Styles/StoreOrder.css";

const StoreOrderList = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const [allStoreOrderData, setallStoreOrderData] = useState("");
    const AllStoreOrderDataState = useSelector((state) => state.StoreOrderList);

    useEffect(() => {
        if (props && props.OrderStatusData && props.OrderTypeData) 
        {
            let data = {
                // merchant_id: "MAL0100CA",
                pay_status: props.OrderStatusData,
                order_env: props.OrderTypeData,
            };
            if (data) {
                dispatch(fetchStoreOrderData(data));
            }

        }
    }, [props]);

    useEffect(() => {
        if (!AllStoreOrderDataState.loading && AllStoreOrderDataState.StoreOrderData)
        {
            console.log(AllStoreOrderDataState.StoreOrderData)
            setallStoreOrderData(AllStoreOrderDataState.StoreOrderData );
        }
        else
        {
            setallStoreOrderData("");
        }
    }, [
        AllStoreOrderDataState,
        AllStoreOrderDataState.loading,
        AllStoreOrderDataState.StoreOrderData,
    ]);

    return (
        <>
        <div className="box">
            <div className="box_shadow_div">
            <div className="store_order_div">
                <h4>Store Order</h4>
                <table className="so_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Order Id</th>
                            <th>Order Status</th>
                            <th>Fail Result</th>
                            <th>Merchant</th>
                        </tr>
                    </thead>

                    {allStoreOrderData && allStoreOrderData.length >= 1 && allStoreOrderData.map((StoreData, index) => (
                        <tbody>
                            <tr key={index} >
                                <td>{StoreData.id}</td>
                                <td>{StoreData.cname}</td>
                                <td>{StoreData.email}</td>
                                <td>{StoreData.delivery_phn}</td>
                                <td>{StoreData.date_time}</td>
                                <td>{StoreData.order_id}</td>
                                <td>{StoreData.order_status}</td>
                                <td>{StoreData.failResult}</td>
                                <td>{StoreData.merchant_id}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            </div>
            </div>
        </>
    );
};

export default StoreOrderList;
