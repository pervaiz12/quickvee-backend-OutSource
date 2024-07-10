import React, { useEffect, useState } from "react";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import Itemdatadetails from "./Itemdatadetails";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { useLocation } from "react-router-dom";
import OrderDetailTableList from "./OrderDetailTableList";
import axios from "axios";
import {
  BASE_URL,
  ORDER_TYPE_ORDER_LIST,
  ORDER_TYPE_ORDER_LIST_COUNT,
} from "../../../Constants/Config";
const ItemsCategories = () => {
  const location = useLocation();

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [visible, setVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [orderDetailData, setOrderDetailData] = useState({});
  const [orderDetailDataList, setOrderDetailDataList] = useState([]);
  console.log("orderDetailData", orderDetailDataList);
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;

      switch (selectedOrderSource) {
        case "All":
          orderEnvValue = 9;
          break;
        case "Online Order":
          orderEnvValue = 5;
          break;
        case "Store Order":
          orderEnvValue = 6;
          break;
        // Add more cases if needed

        default:
          orderEnvValue = 9;
          break;
      }

      const updatedData = {
        ...data,
        merchant_id,
        order_env: orderEnvValue,
        ...userTypeData,
      };
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);

        break;

      default:
        break;
    }
  };

  const handleGetDetailsClick = async (
    start_date,
    end_date,
    order_env,
    order_method
  ) => {
    setOrderDetailData({ start_date, end_date, order_env, order_method });
    setVisible(true);
  };
  useEffect(() => {
    const getData = async () => {
      const returnOrderType = (data) => {
        if (data === 5) {
          return "Closed";
        }
        if (data === 6) {
          return "Offline";
        } else {
          return "All";
        }
      };
      const { token, ...otherdata } = userTypeData;
      try {
        setLoading(true);
        const data = {
          merchant_id,
          order_type: returnOrderType(orderDetailData.order_env),
          trans_type: "Both",
          start_date: orderDetailData.start_date,
          end_date: orderDetailData.end_date,
          emp_id: "All",
          customer_id: "0",
          perpage: rowsPerPage,
          page: currentPage,
          order_method: orderDetailData.order_method,
          ...otherdata,
        };
        const response = await axios.post(
          BASE_URL + ORDER_TYPE_ORDER_LIST,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setOrderDetailDataList(response?.data.order_data);
        }
      } catch (error) {}
      try {
        setLoading(true);
        const data = {
          merchant_id,
          order_type: returnOrderType(orderDetailData.order_env),
          search_by: null,
          trans_type: "All",
          start_date: orderDetailData.start_date,
          end_date: orderDetailData.end_date,
          order_method: orderDetailData.order_method,
          ...otherdata,
        };
        const response = await axios.post(
          BASE_URL + ORDER_TYPE_ORDER_LIST_COUNT,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setTotalCount(response.data.order_data);
          console.log(response);
        }
        setLoading(false);
      } catch (error) {}
    };

    getData();
  }, [orderDetailData, currentPage, rowsPerPage]);
  const orderSourceList = ["All", "Online Order", "Store Order"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container sx={{ p: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header ml-2">Order Type</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5 }}>
            <Grid item xs={12}>
              <div className="q_details_header">Filter by</div>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={4}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="orderSource"
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DateRangeComponent onDateRangeChange={handleDataFiltered} />

      <Itemdatadetails
        data={filteredData}
        selectedOrderSource={selectedOrderSource}
        handleGetDetailsClick={handleGetDetailsClick}
      />
      {visible && (
        <OrderDetailTableList
          orderDetailDataList={orderDetailDataList}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          paginate={paginate}
          loading={loading}
          merchant_id={merchant_id}
        />
      )}
    </>
  );
};

export default ItemsCategories;
