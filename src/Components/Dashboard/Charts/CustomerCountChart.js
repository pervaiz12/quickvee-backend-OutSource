import React, { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import SpikeCharts from "../SpikeCharts";
import { useSelector } from "react-redux";
import {
  removeCurrencySign,
  getDefaultDateRange,
  getXAxisData,
  getYAxisTicks,
  onNext,
  onPrevious,
  getStartDateAndEndDate,
} from "../../../Constants/utils";
import { useDispatch } from "react-redux";
import PasswordShow from "../../../Common/passwordShow";
import { getCustomerCount } from "../../../Redux/features/Dashboard/Charts/customerCountSlice";

export const CustomerCountChart = ({ merchantId, activeType }) => {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [presentDate, setPresentDate] = useState(new Date());
  const [xAxisDates, setXAxisDates] = useState([]);
  const [dateRange, setDateRange] = useState(null);

  const customerCountChart = useSelector((state) => state.customerCountChart);

  // incase Type is changed set back current date as present date
  useEffect(() => {
    setPresentDate(() => new Date());
  }, [activeType]);

  const customerCountChartData = useMemo(() => {
    const bool =
      customerCountChart &&
      customerCountChart?.customerCountData &&
      customerCountChart?.customerCountData.length > 3;

    if (bool) {
      const getValue = (data, index) => {
        const value =
          data &&
          data.customerCountData &&
          data.customerCountData.length > 2 &&
          data.customerCountData[data.customerCountData.length - index];
        return value.total_customer && parseFloat(value.total_customer) > 0
          ? parseFloat(value.total_customer)
          : 1;
      };

      // for Percentage variance --------------------------------------
      const oldValue = getValue(customerCountChart, 2);
      const newValue = getValue(customerCountChart, 1);
      const percent = ((newValue - oldValue) / oldValue) * 100;

      // for X Axis data ----------------------------------------------
      const dataOfXAxis = customerCountChart?.customerCountData.map(
        (item, index) => ({
          name: xAxisDates[index],
          uv: parseFloat(item.total_customer),
        })
      );

      // for Y Axis Data ----------------------------------------------
      const getMinMaxValues = (data) => {
        const maxUv = Math.max(...data.map((item) => item.uv));
        const minUv = Math.min(...data.map((item) => item.uv));

        return {
          maxUv,
          minUv,
        };
      };

      const minAndMaxValue =
        dataOfXAxis && dataOfXAxis.length > 0 && getMinMaxValues(dataOfXAxis);

      const temp = getYAxisTicks(minAndMaxValue.maxUv || 0);
      const yAxisOptions = temp.map((val) => parseFloat(val));

      return {
        percent: parseFloat(percent).toFixed(0),
        xAxisData: dataOfXAxis,
        minValue: minAndMaxValue.minUv,
        maxValue: minAndMaxValue.maxUv,
        yAxisOptions,
        type: "category",
      };
    } else {
      return {
        percent: 0,
        xAxisData: [],
        minValue: 0,
        maxValue: 0,
        yAxisOptions: [],
        type: "number",
      };
    }
  }, [customerCountChart, xAxisDates]);

  // setting date range
  useEffect(() => {
    // console.log("presentDate: ", presentDate);
    const dates = getDefaultDateRange(activeType, presentDate);
    // console.log("date range net sales: ", dates);
    setDateRange(dates);
  }, [activeType, presentDate]);

  // get sales count chart data
  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        if (dateRange && dateRange?.date_range) {
          const { startDate, endDate } = getStartDateAndEndDate(
            dateRange?.date_range
          );

          const data = {
            merchant_id: merchantId,
            start_date: startDate,
            end_date: endDate,
            date_range: dateRange?.date_range,
          };
          await dispatch(getCustomerCount(data)).unwrap();
        }
      } catch (error) {
        if (error?.status == 401 || error?.response?.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error?.status == "Network Error") {
          getNetworkError();
        }
      }
    };

    fetchCustomerCount();
  }, [dateRange]);

  // generate X Axis dates dataset
  useEffect(() => {
    if (!dateRange || !dateRange.date_range) return;

    const data = getXAxisData(activeType, dateRange.date_range);
    setXAxisDates(data);
  }, [activeType, dateRange]);

  const previousDateRange = () => {
    const newPresentDate = onPrevious(activeType, presentDate);
    setPresentDate(() => new Date(newPresentDate));
  };

  const nextDateRange = () => {
    const newPresentDate = onNext(activeType, presentDate);
    setPresentDate(() => new Date(newPresentDate));
  };

  const totalValue = useMemo(() => {
    const a = removeCurrencySign(customerCountChart.totalCustomerCount);
    return a;
  }, [customerCountChart.totalCustomerCount]);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <SpikeCharts
        title={"Customer Count"}
        growth={customerCountChartData.percent}
        mainOutlet={totalValue}
        amount={totalValue}
        activeType={activeType}
        xAxisData={customerCountChartData.xAxisData}
        maxValue={customerCountChartData.maxValue}
        minValue={customerCountChartData.minValue}
        yAxisOptions={customerCountChartData.yAxisOptions}
        type={customerCountChart.type}
        formatFunction={removeCurrencySign}
        prevDataFunction={previousDateRange}
        nextDataFunction={nextDateRange}
      />
    </Grid>
  );
};
