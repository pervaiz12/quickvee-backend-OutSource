import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { fetchpurchaseData } from "../../Redux/features/PurchaseOrder/purchaseOrderSlice";
import { useSelector, useDispatch } from "react-redux";

import ResciveIcon from "../../Assests/Dashboard/rescived.svg";
import VoicIcon from "../../Assests/Dashboard/void.svg";
import ActiveIcon from "../../Assests/Dashboard/active.svg";

import { Link } from "react-router-dom";

const PurchaseTable = ({ seVisible, searchId }) => {
  // for list Purchase Order
  const [allpurchase, setallpurchase] = useState([]);

  const AllpurchaseDataState = useSelector((state) => state.purchase);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchpurchaseData(data));
    }
  }, []);

  useEffect(() => {
    if (!AllpurchaseDataState.loading && AllpurchaseDataState.purchaseData) {
      setallpurchase(AllpurchaseDataState.purchaseData);
    }
  }, [
    AllpurchaseDataState,
    AllpurchaseDataState.loading,
    AllpurchaseDataState.purchaseData,
  ]);

  const filteredPurchase = allpurchase.filter((purchaseData) =>
    purchaseData.po_number.includes(searchId)
  );

  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div className="q-category-bottom-header-sticky">
          <div className="q-category-bottom-header">
            <span>Purchase Order</span>
            <p onClick={() => seVisible("CategoryAlert")}>
              Add New PO <img src={AddIcon} alt="add-icon" />{" "}
            </p>
          </div>
          <div className="q-category-bottom-categories-header">
            <p className="categories-sort">Order#</p>
            <p className="categories-sort">Status</p>
            <p className="categories-sort">Received</p>

            <p className="categories-sort">Total Qty</p>
            <p className="categories-title">Vender Name</p>
            <p className="categories-items">Total Cost</p>
            <p className="categories-items">Due</p>
            <p className="categories-items">Last Update</p>
            <p className="categories-items">Received At</p>
          </div>
        </div>

        {filteredPurchase &&
          filteredPurchase.length >= 1 &&
          filteredPurchase.map((purchaseData, index) => (
            <div
              className="q-category-bottom-categories-listing"
              key={purchaseData.order}
            >
              <div className="q-category-bottom-categories-single-category">
                <p className="categories-sort">
                  <Link to=""> {purchaseData.po_number}</Link>
                </p>
                {purchaseData.is_void === "1" ? (
                  <p className="categories-sort text-[#F90A0A]">Void</p>
                ) : purchaseData.is_draft === "1" ? (
                  <p className="categories-sort text-[#646464]">Draft</p>
                ) : purchaseData.received_status === "0" ? (
                  <p className="categories-sort text-[#0A64F9]">Active</p>
                ) : purchaseData.received_status === "1" ? (
                  <p className="categories-sort text-[#FF8800]">Partial</p>
                ) : purchaseData.received_status === "2" ? (
                  <p className="categories-sort text-[#17B11D]">Received</p>
                ) : (
                  <p className="categories-sort text-[#0A64F9]">Active</p>
                )}

                {purchaseData.is_void === "1" ? (
                  <p className="categories-sort "></p>
                ) : purchaseData.is_draft === "1" ? (
                  <p className="categories-sort "></p>
                ) : purchaseData.received_status === "0" ? (
                  <p className="categories-sort ">
                    <img src={ActiveIcon} alt="Active" />
                  </p>
                ) : purchaseData.received_status === "1" ? (
                  <p className="categories-sort ">
                    <img src={VoicIcon} alt="Partial" />
                  </p>
                ) : purchaseData.received_status === "2" ? (
                  <p className="categories-sort ">
                    <img src={ResciveIcon} alt="ResciveIcon" />
                  </p>
                ) : (
                  <p className="categories-sort ">
                    <img src={ActiveIcon} alt="ActiveIcon" />
                  </p>
                )}

                <p className="categories-sort">{purchaseData.total_qty}</p>
                <p className="categories-title">{purchaseData.vendor_name}</p>
                <p className="categories-title">
                  {purchaseData.total_cost !== null
                    ? `$${Number(purchaseData.total_cost).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}`
                    : "$0.00"}
                </p>

                <p className="categories-title">
                  {purchaseData.stock_date === "0000-00-00"
                    ? "-"
                    : new Date(purchaseData.stock_date).toLocaleDateString(
                        "en-US"
                      )}{" "}
                </p>

                <p className="categories-title">
                  {purchaseData.updated_at === "0000-00-00 00:00:00"
                    ? new Date(purchaseData.created_at).toLocaleDateString(
                        "en-US"
                      )
                    : new Date(purchaseData.updated_at).toLocaleDateString(
                        "en-US"
                      )}
                </p>

                <p className="categories-title">
                  {purchaseData.received_status === "2"
                    ? purchaseData.received_at !== "0000-00-00 00:00:00"
                      ? new Date(purchaseData.received_at).toLocaleDateString(
                          "en-US"
                        )
                      : "11/30/-0001"
                    : "-"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PurchaseTable;