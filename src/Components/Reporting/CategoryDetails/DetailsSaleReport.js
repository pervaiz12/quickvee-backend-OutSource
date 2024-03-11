import React, { useEffect, useState } from "react";
import { fetchdetailCategorySaleData } from "../../../Redux/features/DetailCategorySale/detailCategorySaleSlice";

import { useSelector, useDispatch } from "react-redux";

const DetailsSaleReport = ({ data }) => {
  const dispatch = useDispatch();

  const [detailCategorySale, setdetailCategorySale] = useState([]);

  const detailCategorySaleDataState = useSelector(
    (state) => state.detailCategorySale
  );

  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    dispatch(fetchdetailCategorySaleData(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (
      !detailCategorySaleDataState.loading &&
      detailCategorySaleDataState.detailCategorySaleData
    ) {
      setdetailCategorySale(detailCategorySaleDataState.detailCategorySaleData);
    }
  }, [detailCategorySaleDataState]);

  if (!detailCategorySale || Object.keys(detailCategorySale).length === 0) {
    return <div className="box">No. Data found.</div>;
  }

  console.log(detailCategorySale)
  


  const grandTotal = detailCategorySale
    ? Object.values(detailCategorySale).reduce((acc, category) => {
        return (
          acc +
          category.reduce((accCat, item) => {
            return accCat + parseFloat(item.product_total);
          }, 0)
        );
      }, 0)
    : 0;

  return (
    <>
      {Object.entries(detailCategorySale).map(([category, items]) => (
        <div className="box" key={category}>
          <div className="q-attributes-bottom-detail-section ">
            <div className="mt-6" >
              <div className="q-attributes-bottom-header bg-[#ffffff]">
                <span>{category}</span>
              </div>
              <div className="q-attributes-bottom-attriButes-header">
                <p className="q-catereport-item">Item Name</p>
                <p className="q-catereport-quantity">Quantity</p>
                <p className="attriButes-title">Amount</p>
              </div>
              {items.map((item, index) => (
                <div
                  className="q-attributes-bottom-attriButes-listing"
                  key={index}
                >
                  <div className="q-attributes-bottom-attriButes-single-attributes">
                    <p className="q-catereport-item">{item.name}</p>
                    <p className="q-catereport-quantity">{item.pro_qty}</p>
                    <p className="q-catereport-amount">
                      ${parseFloat(item.product_total).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="q-order-bottom-oder-details-listing">
                <div className="q-order-bottom-order-details-single-attributes">
                  <p className="q-catereport-item">Total</p>
                  <p className="q-catereport-quantity"></p>
                  <p className="q-catereport-amount">
                    $ {items
                      .reduce(
                        (acc, item) => acc + parseFloat(item.product_total),
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="box ">
        <div className="q-attributes-bottom-detail-section  mb-6">
          <div className="q-order-bottom-oder-details-listing">
            <div className="q-order-bottom-order-details-single-attributes">
              <p className="q-catereport-item">Grand Total</p>
              <p className="q-catereport-quantity"></p>
              <p className="q-catereport-amount">${grandTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsSaleReport;
