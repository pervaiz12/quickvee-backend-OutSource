import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorSalesData } from "../../../Redux/features/Reports/VendorSales/VendorSalesSlice";

const VendorSalesReportList = (props) => {
    const dispatch = useDispatch();
    const [allVendorData, setallVendorData] = useState("");
    const AllVendorDataState = useSelector((state) => state.VendorSalesList);
    // console.log(AllVendorDataState)
    useEffect(() => {
        if (props && props.selectedDateRange) {
            // console.log(props.selectedDateRange)
            // console.log(props.selectedDateRange)
            // const StartDateData = props.selectedDateRange.startDate.toISOString().split('T')[0];
            // const EndDateData = props.selectedDateRange.endDate.toISOString().split('T')[0];
            const StartDateData = props.selectedDateRange.start_date
            const EndDateData = props.selectedDateRange.end_date

            let data = {
                merchant_id: "MAL0100CA",
                start_date: StartDateData,
                end_date: EndDateData,
                vendor_id: props.VendorIdData,
            };
            // console.log(data)
            if (data) {

                dispatch(fetchVendorSalesData(data));
            }

        }
    }, [props]);

    useEffect(() => {
        if (!AllVendorDataState.loading && AllVendorDataState.VendorSalesData) {
            // console.log(AllVendorDataState.VendorSalesData)
            setallVendorData(AllVendorDataState.VendorSalesData);
        }
        else {
            setallVendorData("");
        }
    }, [
        AllVendorDataState,
        AllVendorDataState.loading,
        AllVendorDataState.VendorSalesData,
    ]);



    const calculateTotal = (vendorData) => {
        // Calculate the total amount for a specific vendor
        return vendorData.reduce((total, salesData) => total + parseFloat(salesData.pay_amount), 0);
    };





    return (
        <>

            {allVendorData && Object.keys(allVendorData).length >= 1 ? (
                <>
                    <div className="q-category-bottom-categories-listing">
                        {Object.keys(allVendorData).map((vendorName, vendorIndex) => (
                            <React.Fragment key={vendorName}>
                                <h2 className="q-category-bottom-categories-single-category">{vendorName}</h2>
                                <div className="q-daily-report-bottom-report-header">
                                    <p className="report-sort">Sr. No</p>
                                    <p className="report-sort">Transaction Date</p>
                                    <p className="report-sort">Remark</p>
                                    <p className="report-sort">Amount</p>
                                    {/* <p className="report-sort">Item Name</p> */}
                                </div>
                                {allVendorData[vendorName].map((salesData, index) => (
                                    <div key={index} className="q-category-bottom-categories-single-category">
                                        <p className="report-title">{`${index + 1}`}</p>
                                        <p className="report-title">{salesData.payment_datetime}</p>
                                        <p className="report-title">{salesData.remark}</p>
                                        <p className="report-title">${parseFloat(salesData.pay_amount).toFixed(2)}</p>
                                    </div>

                                ))}

                                <div className='q-category-bottom-categories-single-category'>
                                    <p className="report-title">Total: ${parseFloat(calculateTotal(allVendorData[vendorName])).toFixed(2)}</p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                </>
            ) : (
                <div className="q-category-bottom-categories-single-category">
                    <p>No data found</p>
                </div>
            )}


        </>
    );
};

export default VendorSalesReportList;