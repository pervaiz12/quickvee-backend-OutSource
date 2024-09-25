// import React from "react";
// import {
//   BarChart,
//   CartesianGrid,
//   YAxis,
//   XAxis,
//   Tooltip,
//   Bar,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Product dd", popularity: 120, color: "#FF7700" },
//   { name: "Product A ", popularity: 90, color: "#0A64F9" },
//   { name: "Product ", popularity: 150, color: "#FF7700" },
//   { name: "Product ", popularity: 80, color: "#0A64F9" },
//   { name: "Product ", popularity: 170, color: "#FF7700" },
// ];

// export default function MostPopularProducts() {
//   return (
//     <div>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart
//           data={data}
//           layout="vertical" // Vertical layout
//           barCategoryGap="40%" // Gap between individual bars
//           margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <YAxis type="category" dataKey="name" />
//           <XAxis
//             type="number"
//             ticks={[0, 50, 100, 150, 200]} // Custom tick values for popularity
//             domain={[0, 200]} // Set domain to cover the popularity range
//           />
//           <Tooltip />
//           <Bar dataKey="popularity" fill={color} name="Popularity" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
import React from "react";
import {
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Grid from "@mui/system/Unstable_Grid/Grid";

// Custom tick component for Y-Axis
const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text fill="#666" textAnchor="end" dy={4} fontSize="14">
        {payload.value} {/* Render the value without <p> */}
      </text>
    </g>
  );
};

const data = [
  { name: "Product dd", popularity: 120, color: "#FF7700" },
  { name: "Product n", popularity: 90, color: "#0A64F9" },
  { name: "Product C", popularity: 150, color: "#FF7700" },
  { name: "Product D", popularity: 80, color: "#0A64F9" },
  { name: "Product E", popularity: 170, color: "#FF7700" },
];

export default function VerticalBarChart() {
  return (
    // <Grid container sx={{ padding: 2.5, mt: 3.6 }} className="">
    //   <Grid item xs={6}>
    <ResponsiveContainer sx={{mt:0}} className="box_shadow_div" width="100%" height={250}>
      <BarChart
        data={data}
        layout="vertical" // Vertical layout
        barCategoryGap="40%" // Gap between individual bars
        margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tick={<CustomYAxisTick />} // Use the custom tick component
        />
        <XAxis
          type="number"
          axisLine={false}
          ticks={[0, 50, 100, 150, 200]} // Custom tick values for popularity
          domain={[0, 200]} // Set domain to cover the popularity range
        />
        <Tooltip />
        {/* Render bars with dynamic colors */}
        <Bar dataKey="popularity" name="Popularity">
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    // </Grid>
    // {/* <Grid item xs={6}>
    //   <ResponsiveContainer width="100%" height={400}>
    //     <BarChart
    //       data={data}
    //       layout="vertical" // Vertical layout
    //       barCategoryGap="40%" // Gap between individual bars
    //       margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
    //     >
    //       <CartesianGrid strokeDasharray="3 3" />
    //       <YAxis
    //         type="category"
    //         dataKey="name"
    //         tick={<CustomYAxisTick />} // Use the custom tick component
    //       />
    //       <XAxis
    //         type="number"
    //         ticks={[0, 50, 100, 150, 200]} // Custom tick values for popularity
    //         domain={[0, 200]} // Set domain to cover the popularity range
    //       />
    //       <Tooltip />

    //       <Bar dataKey="popularity" name="Popularity">
    //         {data.map((entry) => (
    //           <Cell key={entry.name} fill={entry.color} />
    //         ))}
    //       </Bar>
    //     </BarChart>
    //   </ResponsiveContainer>
    // </Grid> */}
    // </Grid>
  );
}
