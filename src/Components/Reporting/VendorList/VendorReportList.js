import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorListData } from "../../../Redux/features/Reports/VendorList/VendorListSlice";

const VendorReportList = (props) => {
    const dispatch = useDispatch();
    const [allVendorData, setallVendorData] = useState("");
    const AllVendorDataState = useSelector((state) => state.VendorList);


    useEffect(() => {
        
          let data = {
                merchant_id: "MAL0100CA",
                
            };
            // console.log(data)
            if (data) {
                
                dispatch(fetchVendorListData(data));
            }

        }
    , []);


   

    useEffect(() => {
        if (!AllVendorDataState.loading && AllVendorDataState.VendorListData)
        {
            // console.log(AllVendorDataState.VendorListData)
            setallVendorData(AllVendorDataState.VendorListData );
        }
        else
        {
            setallVendorData("");
        }
    }, [
        AllVendorDataState,
        AllVendorDataState.loading,
        AllVendorDataState.VendorListData,
    ]);



      return (
        <>
        <div className="box">
            <div className="q-daily-report-bottom-report-header">
                <p className="report-sort">Vendor Name</p>
                <p className="report-sort">Contact</p>
                <p className="report-sort">Email</p>
                <p className="report-sort">Address</p>
            </div>
            </div>

            {allVendorData && allVendorData.length >= 1 && allVendorData.map((CheckData, index) => (
  <div className="box">
                <div key={index} className="q-category-bottom-categories-listing">
                    <div className="q-category-bottom-categories-single-category">
                        <p className="report-title">{CheckData.name}</p>
                        <p className="report-title">{CheckData.phone}</p>
                        <p className="report-title">{CheckData.email}</p>
                        <p className="report-title">{CheckData.full_address}</p>
                        {/* <p className="report-title">{CheckData.name}</p> */}
                    </div>
                </div>
                </div>
            ))}
        </>
    );
};

export default VendorReportList;