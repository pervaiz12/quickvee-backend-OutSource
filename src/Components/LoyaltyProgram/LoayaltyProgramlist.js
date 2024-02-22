import React, { useEffect, useState } from "react";
import { fetchloyaltyprogramData } from "../../Redux/features/LoyaltyProgram/loyaltyprogramSlice";
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery'
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import Left from "../../Assests/Taxes/Left.svg";
import Right from "../../Assests/Taxes/Right.svg";

const LoyaltyProgramList = () => {
  const dispatch = useDispatch();
  const loyaltyprogramDataState = useSelector((state) => state.loyaltyprogram);
  const [loyaltyprogram, setLoyaltyprogram] = useState([]);
  $.DataTable = require('datatables.net')

  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    dispatch(fetchloyaltyprogramData(data));
  }, [dispatch]);

  useEffect(() => {
    if (
      !loyaltyprogramDataState.loading &&
      loyaltyprogramDataState.loyaltyprogramData
    ) {
      setLoyaltyprogram(loyaltyprogramDataState.loyaltyprogramData);
    }
  }, [loyaltyprogramDataState.loading, loyaltyprogramDataState.loyaltyprogramData]);

  useEffect(() => {
    const modifiedData = loyaltyprogram.map(user => ({
        "Customer Name": `${user.f_name || ""} ${user.l_name || ""}`,
        "Customer Email": `${user.email || ""}`,
        "Customer Phone": `${user.phone || ""}`,
        "Customer Loyalty": `${user.total_loyalty_pts || ""}`,
        "Customer Store Credit": `${user.total_store_credit || ""}`,
      }));

    const table = $('#loyaltyProgramTable').DataTable({
      data: modifiedData,
      columns: [
        { title: "Customer Name", data: "Customer Name", orderable: false },
        { title: "Customer Email", data: "Customer Email", orderable: false },
        { title: "Customer Phone", data: "Customer Phone", orderable: false },
        { title: "Customer Loyalty", data: "Customer Loyalty", orderable: false },
        { title: "Customer Store Credit", data: "Customer Store Credit", orderable: false },
      ],
      destroy: true,
      searching: true,
      dom: "<'row 'l<'col-sm-5'><'col-sm-7'>f<'col-sm-12't>><'row'i<'col-sm-7 mt-5'>p<'col-sm-5'>>",
      lengthMenu: [ 10, 20, 50],
      lengthChange: true,
      ordering: false,
      language: {
        paginate: {
          previous: '<img src="'+Left+'" alt="left" />',
          next: '<img src="'+Right+'" alt="right" />',
        },
        search: '_INPUT_',
          searchPlaceholder: ' Search'
      }
    });

    $('#searchInput').on('input', function () {
      table.search(this.value).draw();
    });

    return () => {
      table.destroy();
    }
  }, [loyaltyprogram]);

  return (
    <div className="box">
         <div className="box_shadow_div">
            <table  id="loyaltyProgramTable"></table>
         </div>
    </div>
  );
};

export default LoyaltyProgramList;
