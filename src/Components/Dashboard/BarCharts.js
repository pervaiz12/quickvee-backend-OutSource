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
import Dropdown from "../../reuseableComponents/Dropdown";

import useMenuState from "../../hooks/useMenuState"
import { Menu, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const dataByHourly = [
  { name: "9:00AM", pv: 2400, amt: 0 ,uv: 500},
  { name: "10:00AM", pv: 1398, amt: 100 ,uv: 500},
  { name: "11:00AM", pv: 4000, amt: 50 ,uv: 5099},
  { name: "12:00PM", pv: 3000, amt: 50 ,uv: 500},
  { name: "1:00PM", pv: 1000, amt: 50 ,uv: 1875},
  { name: "2:00PM", pv: 800, amt: 200 ,uv: 5000},
  { name: "3:00PM", pv: 500, amt: 0 ,uv: 7500},
  { name: "4:00PM", pv: 500, amt: 0 ,uv: 500},
  { name: "5:00PM", pv: 3800, amt: 0 ,uv: 2500},
  { name: "6:00PM", pv: 680, amt: 0 ,uv: 500},
  { name: "7:00PM", pv: 2800, amt: 0 ,uv: 100},
  { name: "8:00PM", pv: 3800, amt: 0 ,uv: 500},
  { name: "9:00PM", pv: 790, amt: 0 ,uv: 500},
  { name: "10:00PM", pv: 1800, amt: 0 ,uv: 500},
  { name: "11:00PM", pv: 1440, amt: 0 ,uv: 500},
  { name: "12:00AM", pv: 4800, amt: 0 ,uv: 500},
];

const BarCharts = () => {
  const [selectedFilter, setSelectedFilter] = useState("Time");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const getChartData = () => {
    switch (selectedFilter) {
      case "Time":
        return dataByHourly;
      default:
        return dataByHourly;
    }
  };

  const getChartDropDownData = () => {
    switch (selectedFilter) {
      case "Time":
        return dataByHourly;
      default:
        return dataByHourly;
    }
  };
 

  const chartData = getChartData();
  const menuItems = [
    "Net Sales",
    "Sale Count",
    "Cost of Goods Sold",
    "Gross Profit",
    "Margin (%)",
    "Tax",
  ];

  const [selectedColumns, setSelectedColumns] = useState(menuItems.slice(0, 2));
  const [tempSelectedColumns, setTempSelectedColumns] = useState(selectedColumns);

  const handleColumnChange = (column) => {
    if (tempSelectedColumns.includes(column)) {
      setTempSelectedColumns(
        tempSelectedColumns.filter((item) => item !== column)
      );
    } else {
      setTempSelectedColumns([...tempSelectedColumns, column]);
    }
    setSelectedColumns(tempSelectedColumns);
    // if (tempSelectedColumns.includes(column)) {
    //   setTempSelectedColumns((prevColumns) => 
    //     prevColumns.filter((item) => item !== column)
    //   );
    // } else {
    //   setTempSelectedColumns((prevColumns) => [...prevColumns, column]);
    // }
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {

    console.log("selectedColumns",selectedColumns)
  }, [selectedColumns]);


  return (
    <div className="w-full" >
      <div className="flex justify-between items-center mb-10 pl-1">
        <div className="q_dashbaord_netsales">
          <h1 className="">Sales by Hour of Day</h1>
        
        </div>
        <div className="flex items-center" ref={dropdownRef}>
          <div className="q-order-page-filter">
        
          <div className="custom-dropdown " onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="q_netsales_header">
                <span className="selected-option q_drop_down_filter  whitespace-nowrap">Display Options</span>
                <img src={BlueArrowdown} alt="Down Icon" className={`w-4 h-4 ${dropdownOpen ? 'hidden' : ''}`} />
                <img src={BlueArrowUp} alt="Up Icon" className={`w-4 h-4 ${dropdownOpen ? '' : 'hidden'}`} />
              </div>
          </div>

          {dropdownOpen && (
                <div className="flex flex-col  Graph-dropdown-content " >
                {menuItems?.map((item, index) => (
                    <div class="qv_checkbox" >
                      <label class="qv_checkbox_add_checkmark_label whitespace-nowrap">
                      {item}
                        <input
                          type="checkbox"
                          id={item} 
                          name={item}
                          value={item}
                          checked={tempSelectedColumns.includes(item)}
                          onChange={() => handleColumnChange(item)}
                        />
                        <span class="qv_add_checkmark"></span>
                      </label>
                    </div>
                ))}
                </div>
              )}

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
        <div className="flex">
        {tempSelectedColumns.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            </div>
      </div>
    </div>
  );
};

export default BarCharts;
