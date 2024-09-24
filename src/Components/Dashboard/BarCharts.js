import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";
import BlueArrowdown from '../../Assests/Filter/blueArrow.svg';
import BlueArrowUp from '../../Assests/Filter/blueARROWup.svg';
import { priceFormate } from "../../hooks/priceFormate";

const dataByHourly = [
  { name: "9:00 AM", pv: 2400, uv: 50 ,amt: 1700, gp: 4500, mar: 4000, tax: 3000},
  { name: "10:00 AM", pv: 1398, uv: 2150 ,amt: 3200, gp: 1600, mar: 3000, tax: 1500},
  { name: "11:00 AM", pv: 4000, uv: 50 ,amt: 2500, gp: 150, mar: 2400, tax: 30},
  { name: "12:00 PM", pv: 3000, uv: 2150 ,amt: 1700, gp: 3200, mar: 200, tax: 900},
  { name: "1:00 PM", pv: 1000, uv: 50 ,amt: 100, gp: 2800, mar: 2800, tax: 1300},
  { name: "2:00 PM", pv: 1800, uv: 2150 ,amt: 4000, gp: 1900, mar: 1440, tax: 1800},
  { name: "3:00 PM", pv: 1500, uv: 4500 ,amt: 3200, gp: 3300, mar: 3000, tax: 2100},
  { name: "4:00 PM", pv: 3000, uv: 500 ,amt: 1700, gp: 1500, mar: 1500, tax: 3500},
  { name: "5:00 PM", pv: 3800, uv: 2500 ,amt: 1500, gp: 3500, mar: 200, tax: 3300},
  { name: "6:00 PM", pv: 4300, uv: 500 ,amt: 1400, gp: 1500, mar: 1000, tax: 2800},
  { name: "7:00 PM", pv: 2800, uv: 100 ,amt: 1600, gp: 1380, mar: 4800, tax: 3100},
  { name: "8:00 PM", pv: 3800, uv: 500 ,amt: 1900, gp: 180, mar: 200, tax: 3500},
  { name: "9:00 PM", pv: 790, uv: 500 ,amt: 2700, gp: 3800, mar: 1400, tax: 4000},
  { name: "10:00 PM", pv: 1800, uv: 500 ,amt: 3700, gp: 1000, mar: 200, tax: 1800},
  { name: "11:00 PM", pv: 1440, uv: 500 ,amt: 900, gp: 160, mar: 3200, tax: 1600},
  { name: "12:00 AM", pv: 4800, uv: 500 ,amt: 1300, gp: 900, mar: 4300, tax: 300},
];

const BarCharts = () => {
  const [selectedFilter, setSelectedFilter] = useState("Time");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(["Net Sales", "Sale Count"]);
  const dropdownRef = useRef(null);

  const menuItems = [
    { label: "Net Sales", key: "pv" },
    { label: "Sale Count", key: "uv" },
    { label: "Cost of Goods Sold", key: "amt" },
    { label: "Gross Profit", key: "grossprofit" },
    { label: "Margin (%)", key: "margin" },
    { label: "Tax", key: "tax" },
  ];

  const getLegendPayload = () => {
    return menuItems
      .filter((item) => selectedColumns.includes(item.label))
      .map((item) => ({
        value: item.label,
        type: item.key === "pv" ? "square" : "line",
        color: item.key === "amt" ? "#FF7300" : 
              item.key == "grossprofit" ? "red" : 
              item.key == "margin" ? "blue" : 
              item.key == "tax" ? "green" : "#81AEFF"
      }));
  };

  const handleColumnChange = (column) => {
    setSelectedColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((item) => item !== column)
        : [...prevColumns, column]
    );
  };

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


  // for custome Tooltip Start 
  const getIntroOfPage = (label) => {
    if (label === '9:00AM') {
      return "Page A is about men's clothing";
    }
    if (label === '10:00AM') {
      return "Page B is about women's dress";
    }
    if (label === '11:00AM') {
      return "Page C is about women's bag";
    }
    if (label === '12:00PM') {
      return 'Page D is about household goods';
    }
    if (label === '1:00PM') {
      return 'Page E is about food';
    }
    if (label === '2:00PM') {
      return 'Page D is about household goods';
    }
    if (label === '3:00PM') {
      return 'Page E is about food';
    }
    if (label === '4:00PM') {
      return 'Page D is about household goods';
    }
    if (label === '5:00PM') {
      return 'Page E is about food';
    }
    if (label === '6:00PM') {
      return 'Page D is about household goods';
    }
    if (label === '7:00PM') {
      return 'Page E is about food';
    }
    if (label === '8:00PM') {
      return 'Page E is about food';
    }
    if (label === '9:00PM') {
      return 'Page D is about household goods';
    }
    if (label === '10:00PM') {
      return 'Page E is about food';
    }
    if (label === '11:00PM') {
      return 'Page D is about household goods';
    }

    if (label === '12:00AM') {
      return 'Page F is about baby food';
    }
    return '';
  };
  
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" >
          <p className="label">Time</p>
          <p className="label  mb-2">{label}</p>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
          {selectedColumns.map((item, index) => (
            <>
            <div className="flex justify-between">
              <p key={index} >{item} </p>
              <p>{item === "Sale Count" || item === "Margin (%)"? "": "$"}{priceFormate(payload[index]?.value.toFixed(2))} {item === "Margin (%)"? "%": ""}</p>
            </div>
            </>
            ))}
        </div>
      );
    }
    
    return null;
  };
  // for custome Tooltip End

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10 pl-1">
        <h1>Sales by Hour of Day</h1>
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
            <div className="flex flex-col Graph-dropdown-content">
              {menuItems.map((item, index) => (
                <div className="qv_checkbox" key={index}>
                  <label className="qv_checkbox_add_checkmark_label whitespace-nowrap">
                    {item.label}
                    <input
                      type="checkbox"
                      id={item.label}
                      name={item.label}
                      value={item.key}
                      checked={selectedColumns.includes(item.label)}
                      onChange={() => handleColumnChange(item.label)}
                    />
                    <span className="qv_add_checkmark"></span>
                  </label>
                </div>
              ))}
              </div>
            )}
          </div>
          </div>
        </div>
        <div className="h-80 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataByHourly}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip  content={<CustomTooltip />}/>
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <Legend payload={getLegendPayload()} />
            {selectedColumns.includes('Net Sales') && <Bar dataKey="pv" barSize={30}  fill="#81AEFF" />}
            {selectedColumns.includes('Sale Count') && <Line  dataKey="uv" line stroke="#81AEFF" />}
            {selectedColumns.includes('Cost of Goods Sold') && <Line type="monotone" dataKey="amt" line stroke="#FF7300" />}
            {selectedColumns.includes('Gross Profit') && <Line  dataKey="gp" line stroke="red" />}
            {selectedColumns.includes('Margin (%)') && <Line type="monotone" dataKey="mar" shape="star" line stroke="blue" />}
            {selectedColumns.includes('Tax') && <Line type="monotone" dataKey="tax" line stroke="green" />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarCharts;
