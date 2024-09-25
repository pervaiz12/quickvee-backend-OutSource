import { Grid } from "@mui/material";
import React from "react";
import { FaCaretUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Nov",
    uv: 0,
  },
  {
    name: "Oct",
    uv: 0,
  },
  {
    name: "Sep",
    uv: 1000,
  },
  {
    name: "June",
    uv: 0,
  },
  {
    name: "Jul",
    uv: 0,
  },
  {
    name: "Aug",
    uv: 6000,
  },
];
const formatYAxisTick = (tickItem) => {
  if (tickItem >= 1000) {
    return `${(tickItem / 1000).toFixed(0)}k`; // Format values in thousands
  }
  return tickItem; // Return the value as is if less than 1000
};

export default function SpikeCharts({ title, growth, mainOutlet, amount }) {
  return (
    <Grid container>
      <Grid item xs={12} className="flex justify-between">
        <p className="CircularSTDMedium-18px">{title}</p>
        <div className="flex items-center gap-1">
          <FaCaretUp className="text-[#1EC285]" />
          <p className="CircularSTDBook-15px text-[#1EC285]">{`${growth} Up Previous month`}</p>
        </div>
      </Grid>
      <Grid item xs={12} className="flex items-center ">
        <p className="CircularSTDMedium-55px ">{amount}</p>
        <Link to={"/dashboard-chart-view-reports"} className="CircularSTDMedium-18px ml-2 pt-5 text-blue-600 underline text-base">
          View Reports
        </Link>
      </Grid>
      <Grid item xs={12} className="flex justify-between bg-[#FBFBFB] p-2">
        <p className="CircularSTDMedium-15px">Main Outlet</p>

        <p className="CircularSTDBook-15px text-[#0A64F9]">{mainOutlet}</p>
      </Grid>
      <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: -35,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" type="category" />
            <YAxis
              type="number"
              axisLine={false}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip />

            <Line dataKey="uv" stroke="#0A64F9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
}
