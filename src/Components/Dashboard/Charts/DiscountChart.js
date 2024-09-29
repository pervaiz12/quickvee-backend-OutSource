import React, { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import SpikeCharts from "../SpikeCharts";
import { useSelector } from "react-redux";
import { getRevenue } from "../../../Redux/features/Dashboard/Charts/RevenueChartSlice";
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
import { getDiscount } from "../../../Redux/features/Dashboard/Charts/discountChartSlice";

export const DiscountChart = ({ merchantId, activeType }) => {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [presentDate, setPresentDate] = useState(new Date());
  const [xAxisDates, setXAxisDates] = useState([]);
  const [dateRange, setDateRange] = useState(null);

  const discountChart = useSelector((state) => state.discountChart);

  // incase Type is changed set back current date as present date
  useEffect(() => {
    setPresentDate(() => new Date());
  }, [activeType]);

  const discountChartData = useMemo(() => {
    const bool =
      discountChart &&
      discountChart?.discountData &&
      discountChart?.discountData.length > 3;

    if (bool) {
      const getValue = (data, index) => {
        const value =
          data &&
          data.discountData &&
          data.discountData.length > 2 &&
          data.discountData[data.discountData.length - index];
        return value.total_discount && parseFloat(value.total_discount) > 0
          ? parseFloat(value.total_discount)
          : 1;
      };

      // for Percentage variance --------------------------------------
      const oldValue = getValue(discountChart, 2);
      const newValue = getValue(discountChart, 1);
      const percent = ((newValue - oldValue) / oldValue) * 100;

      // for X Axis data ----------------------------------------------
      const dataOfXAxis = discountChart?.discountData.map((item, index) => ({
        name: xAxisDates[index],
        uv: parseFloat(item.total_discount),
      }));

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
  }, [discountChart, xAxisDates]);

  // setting date range
  useEffect(() => {
    // console.log("presentDate: ", presentDate);
    const dates = getDefaultDateRange(activeType, presentDate);
    // console.log("date range net sales: ", dates);
    setDateRange(dates);
  }, [activeType, presentDate]);

  // get revenue chart data
  useEffect(() => {
    const fetchDiscount = async () => {
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

          await dispatch(getDiscount(data)).unwrap();
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

    fetchDiscount();
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
        title={"Discounted"}
        growth={discountChartData.percent}
        mainOutlet={formatToThousands(discountChart.totalDiscount)}
        amount={formatToThousands(discountChart.totalDiscount)}
        activeType={activeType}
        xAxisData={discountChartData.xAxisData}
        maxValue={discountChartData.maxValue}
        minValue={discountChartData.minValue}
        yAxisOptions={discountChartData.yAxisOptions}
        type={discountChart.type}
        formatFunction={removeCurrencySign}
        prevDataFunction={previousDateRange}
        nextDataFunction={nextDateRange}
      />
    </Grid>
  );
};
