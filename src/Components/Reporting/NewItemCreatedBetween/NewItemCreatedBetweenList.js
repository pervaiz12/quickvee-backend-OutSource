import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewItemCreatedBetweenData } from "../../../Redux/features/Reports/NewItemCreatedBetweenSlice/NewItemCreatedBetweenSlice";

const NewItemCreatedBetweenList = (props) => {
    // console.log(props)
    const dispatch = useDispatch();
    const [allNewItemData, setallNewItemData] = useState("");
    const AllNewItemDataState = useSelector((state) => state.NewItemCreatedBtnList);

    useEffect(() => {
        if (props && props.selectedDateRange) 
        {
            let data = {
                merchant_id: "MAL0100CA",
                start_date: props.selectedDateRange.start_date,
                end_date: props.selectedDateRange.end_date,
            };
            if (data) {
                dispatch(fetchNewItemCreatedBetweenData(data));
            }

        }
    }, [props]);

    useEffect(() => {
        if (!AllNewItemDataState.loading && AllNewItemDataState.NewItemData)
        {
            // console.log(AllNewItemDataState.NewItemData)
            setallNewItemData(AllNewItemDataState.NewItemData );
        }
        else
        {
            setallNewItemData("");
        }
    }, [
        AllNewItemDataState,
        AllNewItemDataState.loading,
        AllNewItemDataState.NewItemData,
    ]);

    return (
        <>
            <div className="q-daily-report-bottom-report-header">
                <p className="report-sort">Date</p>
                <p className="report-sort">Category</p>
                <p className="report-sort">Item name</p>
                <p className="report-sort">Cost</p>
            </div>

            {allNewItemData && allNewItemData.length >= 1 ? (
                allNewItemData.map((ItemData, index) => (
                    <div key={index} className="q-category-bottom-categories-listing">
                        <div className="q-category-bottom-categories-single-category">
                            <p className="report-title">{ItemData.created_on}</p>
                            <p className="report-title">{ItemData.category}</p>
                            <p className="report-title">{ItemData.item_name}</p>
                            <p className="report-title">{ItemData.price}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="empty-div">No data available</div>
            )}
        </>
    );
};

export default NewItemCreatedBetweenList;