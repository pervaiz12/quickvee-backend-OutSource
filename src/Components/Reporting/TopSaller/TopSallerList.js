import React, { useEffect, useState } from "react";
import { fetchtopsallerData } from "../../../Redux/features/TopSaller/topsallerSlice";
import { useSelector, useDispatch } from "react-redux";

const TopSallerList = ({data}) => {

    const dispatch = useDispatch();

    const [topsaller, settopsaller] = useState([]);
    const topsallerDataState = useSelector((state) => state.topsaller);

    useEffect(() => {
        dispatch(fetchtopsallerData(data));
      }, [dispatch, data]);

    useEffect(() => {
        if (!topsallerDataState.loading && topsallerDataState.topsallerData) {
            settopsaller(topsallerDataState.topsallerData);
        }
      }, [
        topsallerDataState,
        topsallerDataState.loading,
        topsallerDataState.topsallerData,
      ]);


    const renderDataTable = () => {
        if (
            topsaller.status === "Failed" &&
            topsaller.msg === "No. Data found."
        ) {
          return <div className="empty-div box" >No data available</div>;
        } else if (topsaller && topsaller.length >= 1) {

          return (
            <>
            <div className="box">
              <div className="q-daily-report-bottom-report-header">
                <p className="report-title">Product Name</p>
                <p className="report-title">Category</p>
                <p className="report-title">Varient Name</p>
                <p className="report-title">Quantity Sold</p>
              </div>
              </div>
              {topsaller.map((topsaller, index) => (
                <div className="box mb-4">
                <div className="q-category-bottom-categories-listing " key={index}>
                  <div className="q-category-bottom-categories-single-category ">
                    <p className="report-title ">{topsaller.real_name}</p>
                    <p className="report-title">{topsaller.categoryss}</p>
                    <p className="report-title">{topsaller.variant}</p>
                    <p className="report-title">{topsaller.total_sold}</p>
                  </div>
                </div>
                </div>
               
              ))}

            </>
          );
        }
      };


      return <>{renderDataTable()}</>;
}



export default TopSallerList



