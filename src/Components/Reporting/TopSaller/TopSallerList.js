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
          return <div className="empty-div">No data available</div>;
        } else if (topsaller && topsaller.length >= 1) {

          return (
            <>
            <div className="box">
              <div className="q-daily-report-bottom-report-header">
                <p className="report-sort">Product Name</p>
                <p className="report-sort">Category</p>
                <p className="report-sort">Varient Name</p>
                <p className="report-sort">Quantity Sold</p>
              </div>
              </div>
              {topsaller.map((topsaller, index) => (
                <div className="box">
                <div className="q-category-bottom-categories-listing" key={index}>
                  <div className="q-category-bottom-categories-single-category">
                    <p className="report-sort">{topsaller.real_name}</p>
                    <p className="report-sort">{topsaller.categoryss}</p>
                    <p className="report-sort">{topsaller.variant}</p>
                    <p className="report-sort">{topsaller.total_sold}</p>
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



