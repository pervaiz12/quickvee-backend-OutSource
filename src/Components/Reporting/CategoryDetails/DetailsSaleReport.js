import React, { useEffect, useState } from "react";
import { fetchdetailCategorySaleData } from "../../../Redux/features/DetailCategorySale/detailCategorySaleSlice";

import { useSelector, useDispatch } from "react-redux";
import SortIcon from "../../../Assests/Category/Sorting.svg";
import SortIconW from "../../../Assests/Category/SortingW.svg";

const DetailsSaleReport = ({ data }) => {
  const dispatch = useDispatch();

  const [detailCategorySale, setdetailCategorySale] = useState([]);
  const [order, setOrder] = useState("DESC");
  const [sorting_type, setSorting_type] = useState("categoryTotal");

  const detailCategorySaleDataState = useSelector(
    (state) => state.detailCategorySale
  );

  useEffect(() => {
    if (!data.merchant_id) {
      console.log("empty");
    } else {
      dispatch(fetchdetailCategorySaleData({ ...data, order, sorting_type }));
    }
  }, [dispatch, data, order, sorting_type]);

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

  const grandTotal = detailCategorySale
    ? Object.values(detailCategorySale).reduce((acc, category) => {
        return (
          acc +
          category.reduce((accCat, item) => {
            const productTotal = parseFloat(item.product_total) || 0;
            return accCat + productTotal;
          }, 0)
        );
      }, 0)
    : 0;

  const handleCategoryClick = () => {
    // Toggle between ASC and DESC orders
    const newSort = "categoryTotal";
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setOrder(newOrder);
    setSorting_type(newSort);
  };

  const handleQuantityClick = () => {
    const newSort = "productQuantity";
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setSorting_type(newSort);
    setOrder(newOrder);
  };

  return (
    <>
      {Object.entries(detailCategorySale).map(([category, items]) => (
        <div className="box" key={category}>
          <div className="q-attributes-bottom-detail-section ">
            <div className="mt-6 ">
              <div
                className="q-attributes-bottom-header bg-[#ffffff] cursor-pointer"
                onClick={handleCategoryClick}
              >
                <span>{category}</span>
                <img src={SortIcon} alt="" className="" />
              </div>
              <div className="q-attributes-bottom-attriButes-header">
                <p className="q-catereport-item">Item Name</p>
                <p
                  className="q-catereport-quantity "
                  onClick={handleQuantityClick}
                >
                  Quantity{" "}
                  <span>
                    <img src={SortIconW} alt="" className="" />
                  </span>{" "}
                </p>
                <p className="attriButes-title" onClick={handleQuantityClick}>
                  Amount{" "}
                  <span>
                    <img src={SortIconW} alt="" className="" />
                  </span>
                </p>
              </div>
              {items.map((item, index) => (
                <div
                  className="q-attributes-bottom-attriButes-listing"
                  key={index}
                >
                  <div className="q-attributes-bottom-attriButes-single-attributes">
                    <p className="q-catereport-item">{item.name}</p>
                    <p className="q-catereport-quantity ">{item.pro_qty}</p>
                    <p className="q-catereport-amount">
                      $
                      {item.product_total
                        ? parseFloat(item.product_total).toFixed(2)
                        : "0.00"}
                    </p>
                  </div>
                </div>
              ))}
              <div className="q-order-bottom-oder-details-listing">
                <div className="q-order-bottom-order-details-single-attributes">
                  <p className="q-catereport-item">Total</p>
                  <p className="q-catereport-quantity"></p>
                  <p className="q-catereport-amount">
                    $
                    {items
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
