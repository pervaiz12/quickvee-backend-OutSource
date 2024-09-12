import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ComposedChart,
  Area,
  Line
} from "recharts";
import Customtooltip from "./Customtooltip";
import BlueArrowdown from '../../Assests/Filter/blueArrow.svg';
import BlueArrowUp from '../../Assests/Filter/blueARROWup.svg';

const dataByHourly = [
  { name: "9:00AM", pv: 2400, amt: 0 },
  { name: "10:00AM", pv: 1398, amt: 100 },
  { name: "11:00AM", pv: 20000, amt: 50 },
  { name: "12:00PM", pv: 5000, amt: 50 },
  { name: "1:00PM", pv: 10000, amt: 50 },
  { name: "2:00PM", pv: 9800, amt: 200 },
  { name: "3:00PM", pv: 5000, amt: 0 },
  { name: "4:00PM", pv: 5000, amt: 0 },
  { name: "5:00PM", pv: 6800, amt: 0 },
];

const dataByDay = [
  { name: "Sun", pv: 2400, amt: 0 },
  { name: "Mon", pv: 1398, amt: 100 },
  { name: "Tue", pv: 20000, amt: 50 },
  { name: "Wed", pv: 5000, amt: 50 },
  { name: "Thu", pv: 10000, amt: 50 },
  { name: "Fri", pv: 9800, amt: 200 },
  { name: "Sat", pv: 5000, amt: 0 },
];

const dataByMonth = [
  { name: "Jan", pv: 2400, amt: 0 ,uv:2050},
  { name: "Feb", pv: 1398, amt: 100 ,uv:500},
  { name: "Mar", pv: 20000, amt: 50 ,uv:5000},
  { name: "Apr", pv: 5000, amt: 50 ,uv:300},
  { name: "May", pv: 10000, amt: 50 ,uv:500},
  { name: "Jun", pv: 9800, amt: 200 ,uv:5080},
  { name: "Jul", pv: 5000, amt: 0 ,uv:100},
  { name: "Aug", pv: 5000, amt: 0 ,uv:500},
  { name: "Sep", pv: 6800, amt: 0 ,uv:1580},
  { name: "Oct", pv: 6800, amt: 0 ,uv:7500},
  { name: "Nov", pv: 6800, amt: 0 ,uv:5000},
  { name: "Dec", pv: 6800, amt: 0 ,uv:2500},
];

const BarCharts = () => {
  const [selectedFilter, setSelectedFilter] = useState("Month");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const getChartData = () => {
    switch (selectedFilter) {
      case "days":
        return dataByDay;
      case "Month":
        return dataByMonth;
      case "Time":
        return dataByHourly;
      default:
        return dataByDay;
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setDropdownOpen(false);
  };
 

  const chartData = getChartData();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10 pl-1">
        <div className="q_dashbaord_netsales">
          <h1 className="">Sales by Hour of Day</h1>
        
        </div>
        <div className="flex items-center">
          <div className="q-order-page-filter">
        
          <div className="custom-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="q_netsales_header">
              <span className="selected-option q_drop_down_filter mt-1 mr-8">{selectedFilter}</span>
              <img src={BlueArrowdown} alt="Down Icon" className={`w-4 h-4 ${dropdownOpen ? 'hidden' : ''}`} />
              <img src={BlueArrowUp} alt="Up Icon" className={`w-4 h-4 ${dropdownOpen ? '' : 'hidden'}`} />
            </div>
            {dropdownOpen && (
              <div className="dropdown-content">
                <div className={selectedFilter === "Day" ? "selected" : "noselect"} onClick={() => handleFilterChange("Day")}>Day</div>
                <div className={selectedFilter === "Month" ? "selected" : "noselect"} onClick={() => handleFilterChange("Month")}>Month</div>
                <div className={selectedFilter === "Weeks" ? "selected" : "noselect"} onClick={() => handleFilterChange("Weeks")}>Weeks</div>
              </div>
            )}
          </div>

          </div>
        </div>
      </div>
      {/* <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<Customtooltip />} cursor={{ fill: '#81AEFF' }} />
            <Legend />
            <Bar dataKey="pv" fill="#81AEFF" width={5} />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
      <div className="h-80 mb-8">
      <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={730} height={250} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Area type="monotone" dataKey="amt" fill="#81AEFF" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={25} fill="#81AEFF" />
          <Line type="monotone" dataKey="uv" stroke="#81AEFF" />
        </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarCharts;
