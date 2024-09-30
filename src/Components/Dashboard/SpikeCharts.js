import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import {
  FaCaretDown,
  FaCaretUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SpikeCharts({
  title,
  growth,
  mainOutlet,
  amount,
  activeType,
  xAxisData,
  maxValue,
  minValue,
  yAxisOptions,
  type,
  formatFunction,
  prevDataFunction,
  nextDataFunction,
  loading = false,
}) {
  const filterBy = useMemo(() => {
    return activeType === "Day"
      ? "day"
      : activeType === "Week"
        ? "week"
        : "month";
  }, [activeType]);

  // console.log("-----------------------------");
  // console.log("xAxisData: ", xAxisData);
  // console.log("yAxisOptions: ", yAxisOptions);
  // console.log("title type: ", title, type);

  return (
    <Grid container className="box_shadow_div" sx={{ p: 2.5, m: 0 }}>
      <Grid item xs={12} className="flex justify-between">
        <p className="CircularSTDMedium-18px">{title}</p>
        {loading ? (
          <Skeleton width="200px" />
        ) : (
          growth && (
            <div className="flex items-center gap-1">
              {growth > 0 ? (
                <>
                  <FaCaretUp className="text-[#1EC285]" />
                  <p className="CircularSTDBook-15px text-[#1EC285]">{`${growth}% Up Previous ${filterBy}`}</p>
                </>
              ) : (
                <>
                  <FaCaretDown className="text-[#ff3737]" />
                  <p className="CircularSTDBook-15px text-[#ff3737]">{`${Math.abs(
                    growth
                  )}% down previous ${filterBy}`}</p>
                </>
              )}
            </div>
          )
        )}
      </Grid>
      <Grid item xs={12} className="flex items-center ">
        {loading ? (
          <Skeleton width="150px" height="78.5px" />
        ) : (
          <>
            <p className="CircularSTDMedium-55px">{amount}</p>
            <Link className="CircularSTDMedium-18px ml-2 pt-5 text-blue-600 underline text-base">
              View Reports
            </Link>
          </>
        )}
      </Grid>
      <Grid item xs={12} className="flex justify-between bg-[#FBFBFB] p-2">
        <p className="CircularSTDMedium-15px">Main Outlet</p>
        <p className="CircularSTDBook-15px text-[#0A64F9]">
          {loading ? <Skeleton width="100px" /> : mainOutlet}
        </p>
      </Grid>
      <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={xAxisData}
            margin={{
              right: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              type={type}
              domain={[minValue, maxValue]}
              ticks={yAxisOptions}
              tickFormatter={(tickItem) => formatFunction(tickItem)}
            />
            <Tooltip />

            <Line dataKey="uv" stroke="#0A64F9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={prevDataFunction}>
          <FaChevronLeft />
        </button>
        <button onClick={nextDataFunction}>
          <FaChevronRight />
        </button>
      </Grid>
    </Grid>
  );
}
