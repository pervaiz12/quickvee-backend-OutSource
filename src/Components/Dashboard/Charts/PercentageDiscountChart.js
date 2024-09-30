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
import { getPercentageDiscount } from "../../../Redux/features/Dashboard/Charts/percentageDiscountChartSlice";

export const PercentageDiscountChart = ({ merchantId, activeType }) => {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [presentDate, setPresentDate] = useState(new Date());
  const [xAxisDates, setXAxisDates] = useState([]);
  const [dateRange, setDateRange] = useState(null);

  const percentageDiscountChart = useSelector(
    (state) => state.percentageDiscountChart
  );

  // incase Type is changed set back current date as present date
  useEffect(() => {
    setPresentDate(() => new Date());
  }, [activeType]);

  const percentageDiscountChartData = useMemo(() => {
    const bool =
      percentageDiscountChart &&
      percentageDiscountChart?.percentageDiscountData &&
      percentageDiscountChart?.percentageDiscountData.length > 3;

    if (bool) {
      const getValue = (data, index) => {
        const value =
          data &&
          data.percentageDiscountData &&
          data.percentageDiscountData.length > 2 &&
          data.percentageDiscountData[
            data.percentageDiscountData.length - index
          ];
        return value.discount_in_per && parseFloat(value.discount_in_per) > 0
          ? parseFloat(value.discount_in_per)
          : 1;
      };

      // for Percentage variance --------------------------------------
      const oldValue = getValue(percentageDiscountChart, 2);
      const newValue = getValue(percentageDiscountChart, 1);
      const percent = ((newValue - oldValue) / oldValue) * 100;

      // for X Axis data ----------------------------------------------
      const dataOfXAxis = percentageDiscountChart?.percentageDiscountData.map(
        (item, index) => ({
          name: xAxisDates[index],
          uv: parseFloat(item.discount_in_per),
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
  }, [percentageDiscountChart, xAxisDates]);

  // setting date range
  useEffect(() => {
    // console.log("presentDate: ", presentDate);
    const dates = getDefaultDateRange(activeType, presentDate);
    // console.log("date range net sales: ", dates);
    setDateRange(dates);
  }, [activeType, presentDate]);

  // get sales count chart data
  useEffect(() => {
    const fetchPercentageDiscount = async () => {
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
          await dispatch(getPercentageDiscount(data)).unwrap();
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

    fetchPercentageDiscount();
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
    const a = `${parseFloat(
      percentageDiscountChart.totalPercentageDiscount
    ).toFixed(2)}%`;
    return a;
  }, [percentageDiscountChart.totalPercentageDiscount]);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <SpikeCharts
        title={"Discounted %"}
        growth={percentageDiscountChartData.percent}
        mainOutlet={totalValue}
        amount={totalValue}
        activeType={activeType}
        xAxisData={percentageDiscountChartData.xAxisData}
        maxValue={percentageDiscountChartData.maxValue}
        minValue={percentageDiscountChartData.minValue}
        yAxisOptions={percentageDiscountChartData.yAxisOptions}
        type={percentageDiscountChartData.type}
        formatFunction={removeCurrencySign}
        prevDataFunction={previousDateRange}
        nextDataFunction={nextDateRange}
        loading={percentageDiscountChart?.loading ?? false}
      />
    </Grid>
  );
};
