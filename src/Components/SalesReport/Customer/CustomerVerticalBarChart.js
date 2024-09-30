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
  { name: "Walkin", popularity: 20 },
];


const CustomTooltip = ({ data }) => {
  if (data.length) {
    return (
      <div className="custom-tooltip" >
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}

        {data.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <p>{item.name}</p>
            <p>{item.popularity}</p>
          </div>
        ))}

      </div>
    );
  }
  
  return null;
};

export default function CustomerVerticalBarChart({title,GrapTitle,color}) {
  return (
    <Grid container sx={{ mt: 0 }} className="box_shadow_div">
      <Grid item xs={12}>
        <Grid item xs={12} sx={{ p: 2.5 }} className="flex justify-between border-b-2">
          <p className="CircularSTDMedium-18px">{title}</p>
          {/* <div className="flex items-center gap-1">
            <FaCaretUp className="text-[#1EC285]" />
            <p className="CircularSTDBook-15px text-[#1EC285]">{`${growth} Up Previous month`}</p>
          </div> */}
        </Grid>
        <ResponsiveContainer sx={{ mt: 0 }} width="100%" height={250}>
          <BarChart
            data={data}
            layout="vertical" // Vertical layout
            barCategoryGap="45%" // Gap between individual bars
            margin={{ top: 20, right: 30, bottom: 20, left: 40 }}
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
              ticks={[0, 10, 20, 30, 40]} // Custom tick values for popularity
              domain={[0, 40]} // Set domain to cover the popularity range
            />
            <Tooltip content={<CustomTooltip data={data} />}/>
            {/* Render bars with dynamic colors */}
            <Bar dataKey="popularity" name="Popularity">
              {data.map((entry) => (
                <Cell key={entry.name} fill={color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
          <div className="flex justify-center pb-4">
            <p className="CircularSTDBook-15px text-[#707070]">{GrapTitle}</p>
          </div>
      </Grid>
    </Grid>
  );
}
