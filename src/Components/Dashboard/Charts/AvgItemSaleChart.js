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
import { getAvgItemSale } from "../../../Redux/features/Dashboard/Charts/avgItemSaleChartSlice";

export const AvgItemSaleChart = ({ merchantId, activeType }) => {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [presentDate, setPresentDate] = useState(new Date());
  const [xAxisDates, setXAxisDates] = useState([]);
  const [dateRange, setDateRange] = useState(null);

  const avgItemSaleChart = useSelector((state) => state.avgItemSaleChart);

  // incase Type is changed set back current date as present date
  useEffect(() => {
    setPresentDate(() => new Date());
  }, [activeType]);

  const avgItemSaleChartData = useMemo(() => {
    const bool =
      avgItemSaleChart &&
      avgItemSaleChart?.avgItemSaleData &&
      avgItemSaleChart?.avgItemSaleData.length > 3;

    if (bool) {
      const getValue = (data, index) => {
        const value =
          data &&
          data.avgItemSaleData &&
          data.avgItemSaleData.length > 2 &&
          data.avgItemSaleData[data.avgItemSaleData.length - index];
        return value.total_revenue && parseFloat(value.total_revenue) > 0
          ? parseFloat(value.total_revenue)
          : 1;
      };

      // for Percentage variance --------------------------------------
      const oldValue = getValue(avgItemSaleChart, 2);
      const newValue = getValue(avgItemSaleChart, 1);
      const percent = ((newValue - oldValue) / oldValue) * 100;

      // for X Axis data ----------------------------------------------
      const dataOfXAxis = avgItemSaleChart?.avgItemSaleData.map(
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
  }, [avgItemSaleChart, xAxisDates]);

  // setting date range
  useEffect(() => {
    // console.log("presentDate: ", presentDate);
    const dates = getDefaultDateRange(activeType, presentDate);
    // console.log("date range net sales: ", dates);
    setDateRange(dates);
  }, [activeType, presentDate]);

  // get revenue chart data
  useEffect(() => {
    const fetchRevenue = async () => {
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

          await dispatch(getAvgItemSale(data)).unwrap();
        }
      } catch (error) {
        console.log("revenue data error: ", error);
        if (error?.status == 401 || error?.response?.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error?.status == "Network Error") {
          getNetworkError();
        }
      }
    };

    fetchRevenue();
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
    const a = removeCurrencySign(
      parseFloat(avgItemSaleChart?.totalAvgItemSale).toFixed(2)
    );
    return a;
  }, [avgItemSaleChart?.totalAvgItemSale]);

  return (
    <Grid
      item
      xs={12}
      md={12}
      lg={12}
      sx={{ p: 2.5 }}
      className="box_shadow_div"
    >
      <SpikeCharts
        title={"Avg. items per sale"}
        growth={avgItemSaleChartData.percent}
        mainOutlet={totalValue}
        amount={totalValue}
        activeType={activeType}
        xAxisData={avgItemSaleChartData.xAxisData}
        maxValue={avgItemSaleChartData.maxValue}
        minValue={avgItemSaleChartData.minValue}
        yAxisOptions={avgItemSaleChartData.yAxisOptions}
        type={avgItemSaleChart.type}
        formatFunction={removeCurrencySign}
        prevDataFunction={previousDateRange}
        nextDataFunction={nextDateRange}
      />
    </Grid>
  );
};
