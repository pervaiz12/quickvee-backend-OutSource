import React, { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import SpikeCharts from "../SpikeCharts";
import { useSelector } from "react-redux";
import {
  removeCurrencySign,
  formatToThousands,
  getDefaultDateRange,
  getXAxisData,
  getYAxisTicks,
  onNext,
  onPrevious,
  getStartDateAndEndDate,
} from "../../../Constants/utils";
import { useDispatch } from "react-redux";
import PasswordShow from "../../../Common/passwordShow";
import { getAvgSaleValue } from "../../../Redux/features/Dashboard/Charts/avgSaleValueChartSlice";

export const AvgSaleValueChart = ({ merchantId, activeType }) => {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [presentDate, setPresentDate] = useState(new Date());
  const [xAxisDates, setXAxisDates] = useState([]);
  const [dateRange, setDateRange] = useState(null);

  const avgSaleValueChart = useSelector((state) => state.avgSaleValueChart);

  // incase Type is changed set back current date as present date
  useEffect(() => {
    setPresentDate(() => new Date());
  }, [activeType]);

  const avgSaleValueChartData = useMemo(() => {
    const bool =
      avgSaleValueChart &&
      avgSaleValueChart?.avgSaleValueData &&
      avgSaleValueChart?.avgSaleValueData.length > 3;

    if (bool) {
      const getValue = (data, index) => {
        const value =
          data &&
          data.avgSaleValueData &&
          data.avgSaleValueData.length > 2 &&
          data.avgSaleValueData[data.avgSaleValueData.length - index];
        return value.total_revenue && parseFloat(value.total_revenue) > 0
          ? parseFloat(value.total_revenue)
          : 1;
      };

      // for Percentage variance --------------------------------------
      const oldValue = getValue(avgSaleValueChart, 2);
      const newValue = getValue(avgSaleValueChart, 1);
      const percent = ((newValue - oldValue) / oldValue) * 100;

      // for X Axis data ----------------------------------------------
      const dataOfXAxis = avgSaleValueChart?.avgSaleValueData.map(
        (item, index) => ({
          name: xAxisDates[index],
          uv: parseFloat(item.total_revenue),
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
  }, [avgSaleValueChart, xAxisDates]);

  // setting date range
  useEffect(() => {
    // console.log("presentDate: ", presentDate);
    const dates = getDefaultDateRange(activeType, presentDate);
    // console.log("date range net sales: ", dates);
    setDateRange(dates);
  }, [activeType, presentDate]);

  // get avg sale value chart data
  useEffect(() => {
    const fetchAvgSaleValue = async () => {
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

          await dispatch(getAvgSaleValue(data)).unwrap();
        }
      } catch (error) {
        console.log("avg sale value data error: ", error);
        if (error?.status == 401 || error?.response?.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error?.status == "Network Error") {
          getNetworkError();
        }
      }
    };

    fetchAvgSaleValue();
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
    const a = formatToThousands(
      parseFloat(avgSaleValueChart?.totalAvgSaleValue).toFixed(2)
    );
    return a;
  }, [avgSaleValueChart?.totalAvgSaleValue]);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <SpikeCharts
        title={"Avg. sale value"}
        growth={avgSaleValueChartData.percent}
        mainOutlet={totalValue}
        amount={totalValue}
        activeType={activeType}
        xAxisData={avgSaleValueChartData.xAxisData}
        maxValue={avgSaleValueChartData.maxValue}
        minValue={avgSaleValueChartData.minValue}
        yAxisOptions={avgSaleValueChartData.yAxisOptions}
        type={avgSaleValueChart.type}
        formatFunction={removeCurrencySign}
        prevDataFunction={previousDateRange}
        nextDataFunction={nextDateRange}
      />
    </Grid>
  );
};
