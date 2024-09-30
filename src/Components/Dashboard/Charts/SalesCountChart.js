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
import { getSalesCount } from "../../../Redux/features/Dashboard/Charts/salesCountSlice";

export const SalesCountChart = ({ merchantId, activeType }) => {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [presentDate, setPresentDate] = useState(new Date());
  const [xAxisDates, setXAxisDates] = useState([]);
  const [dateRange, setDateRange] = useState(null);

  const salesCountChart = useSelector((state) => state.salesCountChart);

  // incase Type is changed set back current date as present date
  useEffect(() => {
    setPresentDate(() => new Date());
  }, [activeType]);

  const salesCountChartData = useMemo(() => {
    const bool =
      salesCountChart &&
      salesCountChart?.salesCountData &&
      salesCountChart?.salesCountData.length > 3;

    if (bool) {
      const getValue = (data, index) => {
        const value =
          data &&
          data.salesCountData &&
          data.salesCountData.length > 2 &&
          data.salesCountData[data.salesCountData.length - index];
        return value.sale_count && parseFloat(value.sale_count) > 0
          ? parseFloat(value.sale_count)
          : 1;
      };

      // for Percentage variance --------------------------------------
      const oldValue = getValue(salesCountChart, 2);
      const newValue = getValue(salesCountChart, 1);
      const percent = ((newValue - oldValue) / oldValue) * 100;

      // for X Axis data ----------------------------------------------
      const dataOfXAxis = salesCountChart?.salesCountData.map(
        (item, index) => ({
          name: xAxisDates[index],
          uv: parseFloat(item.sale_count),
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
        type: "number",
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
  }, [salesCountChart, xAxisDates]);

  // setting date range
  useEffect(() => {
    // console.log("presentDate: ", presentDate);
    const dates = getDefaultDateRange(activeType, presentDate);
    // console.log("date range net sales: ", dates);
    setDateRange(dates);
  }, [activeType, presentDate]);

  // get sales count chart data
  useEffect(() => {
    const fetchSalesCount = async () => {
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
          await dispatch(getSalesCount(data)).unwrap();
        }
      } catch (error) {
        if (error?.status == 401 || error?.response?.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error?.status == "Network Error") {
          // getNetworkError();
        }
      }
    };

    fetchSalesCount();
  }, [dateRange, merchantId]);

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
    const a = removeCurrencySign(
      parseFloat(salesCountChart.totalSalesCount).toFixed(2)
    );
    return a;
  }, [salesCountChart.totalSalesCount]);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <SpikeCharts
        title={"Sales Count"}
        growth={salesCountChartData.percent}
        mainOutlet={totalValue}
        amount={totalValue}
        activeType={activeType}
        xAxisData={salesCountChartData.xAxisData}
        maxValue={salesCountChartData.maxValue}
        minValue={salesCountChartData.minValue}
        yAxisOptions={salesCountChartData.yAxisOptions}
        type={salesCountChartData.type}
        formatFunction={removeCurrencySign}
        prevDataFunction={previousDateRange}
        nextDataFunction={nextDateRange}
        loading={salesCountChart?.loading ?? false}
      />
    </Grid>
  );
};
