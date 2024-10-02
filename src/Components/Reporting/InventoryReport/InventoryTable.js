import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import plusIcon from "../../../Assests/Products/plusIcon.svg";

import InventoryFilter from "./InventoryFilter";
import InventoryMeasures from "./InventoryMeasures";
import InventoryTableColumns from "./InventoryTableColumns";
import InventoryColumns from "./InventoryColumns";

import FirstButtonSelections from "./FirstButtonSelections";
import SecondButtonSelections from "./SecondButtonSelections";

const emails = ['username@gmail.com', 'user02@gmail.com'];

const InventoryTable = (props) => {
  const [leftStickyOffset, setLeftStickyOffset] = useState(0);
  

  // For opening and closing InventoryTableColumns modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      const tableHeaders = tableRef.current.querySelectorAll("th");
      let offset = 0;

      // Calculate cumulative width of all <th> before the left-sticky class
      for (let i = 0; i < tableHeaders.length; i++) {
        const th = tableHeaders[i];
        if (th.classList.contains("left-sticky")) {
          break;
        }
        offset += th.offsetWidth;
      }

      // Set the left offset for the sticky header
      setLeftStickyOffset(offset);
    }
  }, []);


  //-------------------------- New code here --- 

    // Initial column configuration
    const initialColumns = [
      { id: "sku", name: "SKU" },
      { id: "plus_after_sku", name: "+" },
      { id: "name", name: "Name" },
      { id: "closing_inventory", name: "Closing Inventory" },
      { id: "items_sold", name: "Items Sold" },
      { id: "days_cover", name: "Days Cover" },
      { id: "avg_cost", name: "Avg Cost" },
      { id: "plus_after_avg_cost", name: "+" },
    ];

    // Sample data for the grid
    const initialData = [
      {
        sku: "001",
        name: "Product A",
        closing_inventory: 100,
        items_sold: 20,
        days_cover: 5,
        avg_cost: 10,
        brand: "Brand A",
        supplier: "Supplier A",
        category: "Category A",
        supplier_code: "SC001",
        revenue: 200,
        gross_profit: 12,
        avg_cost_measure: 12,
        self_through_rate: 1.5,
        created: "2023-01-01",
        first_sale: "2023-02-01",
        last_sale: "2023-03-01",
        last_received: "2023-04-01",
      },
      {
        sku: "002",
        name: "Product B",
        closing_inventory: 200,
        items_sold: 30,
        days_cover: 10,
        avg_cost: 15,
        brand: "Brand B",
        supplier: "Supplier B",
        category: "Category B",
        supplier_code: "SC002",
        revenue: 400,
        gross_profit: 12,
        avg_cost_measure: 14,
        self_through_rate: 2.0,
        created: "2023-01-02",
        first_sale: "2023-02-02",
        last_sale: "2023-03-02",
        last_received: "2023-04-02",
      },
    ];
  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState(initialData);
  const [selectedColumns, setSelectedColumns] = useState({
    supplierCode: false,
    brand: false,
    supplier: false,
    category: false,
    revenue: false,
    gross_profit: false,
    avgCostMeasure: false,
    selfThroughRate: false,
    created: false,
    firstSale: false,
    lastSale: false,
    lastReceived: false,
  });

  const [popupCheckboxes, setPopupCheckboxes] = useState(""); // To track the active popup
  const [showColumnPopup, setShowColumnPopup] = useState(false);
  const [showMeasurePopup, setShowMeasurePopup] = useState(false);

  // Apply column selections for the first popup
  // Apply column selections for the first popup
  const applyColumns = () => {
    let updatedColumns = [...columns];
    const columnMappings = {
      supplierCode: "supplier_code",
      brand: "brand",
      supplier: "supplier",
      category: "category",
    };

    Object.entries(columnMappings).forEach(([key, value]) => {
      if (selectedColumns[key] && !updatedColumns.some((col) => col.id === value)) {
        // Insert the new columns BEFORE the "plus_after_sku" column
        const index = updatedColumns.findIndex(col => col.id === "plus_after_sku");
        updatedColumns.splice(index, 0, { id: value, name: value.replace(/_/g, ' ').toUpperCase() });
      } else if (!selectedColumns[key]) {
        updatedColumns = updatedColumns.filter((col) => col.id !== value);
      }
    });

    setColumns(updatedColumns);
    setShowColumnPopup(false);
  };

  // Apply measure selections for the second popup
  const applyMeasures = () => {
    let updatedColumns = [...columns];
    const measureMappings = {
      revenue: "revenue",
      gross_profit: "gross_profit",
      avgCostMeasure: "avg_cost_measure",
      selfThroughRate: "self_through_rate",
      created: "created",
      firstSale: "first_sale",
      lastSale: "last_sale",
      lastReceived: "last_received",
    };

    Object.entries(measureMappings).forEach(([key, value]) => {
      if (selectedColumns[key] && !updatedColumns.some((col) => col.id === value)) {
        // Insert the new columns BEFORE the "plus_after_avg_cost" column
        const index = updatedColumns.findIndex(col => col.id === "plus_after_avg_cost");
        updatedColumns.splice(index, 0, { id: value, name: value.replace(/_/g, ' ').toUpperCase() });
      } else if (!selectedColumns[key]) {
        updatedColumns = updatedColumns.filter((col) => col.id !== value);
      }
    });

    setColumns(updatedColumns);
    setShowMeasurePopup(false);
  };

  return (
    <>
      {/* <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          
          <div className="custom-table">
            <table className="doubale-header-table">
            <thead>
              <tr>
                <th>Product</th>
                <th colspan="2">Starting Qty</th>
                <th colspan="2">Ending Qty</th>
                <th colspan="2">Total Received</th>
                <th colspan="2">Total Returns</th>
                <th colspan="2">Total Sold</th>
              </tr>
              <tr>
                <th></th>
                <th>Qty</th>
                <th>Value</th>
                <th>Qty</th>
                <th>Value</th>
                <th>Qty</th>
                <th>Value</th>
                <th>Qty</th>
                <th>Value</th>
                <th>Qty</th>
                <th>Value</th>
              </tr>
            </thead>
              
              <tbody>
               
              <tr>
                <td>Product Name 1</td>
                <td>4</td>
                <td>$140.00</td>
                <td>4</td>
                <td>$0.00</td>
                <td>0</td>
                <td>$0.00</td>
                <td>0</td>
                <td>$0.00</td>
                <td>0</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>Product Name 1</td>
                <td>2</td>
                <td>$10.00</td>
                <td>2</td>
                <td>$0.00</td>
                <td>0</td>
                <td>$0.00</td>
                <td>0</td>
                <td>$0.00</td>
                <td>0</td>
                <td>$0.00</td>
              </tr>
               
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid> */}


      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          {/* Inventory Filter */}
          <InventoryFilter />
          
          {/* Table */}
          <div className="custom-table">
          <table>
            <thead>


              
              <tr>
              {columns.map((col) => {
                  // Check if the column id matches to render the appropriate button
                  if (col.id === "plus_after_sku") {
                    return (
                      <th key={col.id} className="left-sticky">
                        {/* <button onClick={() => { setShowColumnPopup(true); setPopupCheckboxes("columns"); }}>
                          
                        </button> */}
                        <FirstButtonSelections
                        selectedColumns={selectedColumns}
                        setSelectedColumns={setSelectedColumns}
                        applyColumns={applyColumns}
                        setShowColumnPopup={setShowColumnPopup}
                      />
                      </th>
                    );
                  } else if (col.id === "plus_after_avg_cost") {
                    return (
                      <th key={col.id} className="right-sticky">
                        {/* <button onClick={() => { setShowMeasurePopup(true); setPopupCheckboxes("measures"); }}>
                          
                        </button> */}

                      <button onClick={handleClickOpen}>
                          <img
                            style={{ height: "40px", width: "40px" }}
                            src={plusIcon}
                            alt="plusIcon"
                          />
                        </button>
                        <InventoryTableColumns open={open} handleClose={handleClose} 
                          selectedColumns={selectedColumns}
                          setSelectedColumns={setSelectedColumns}
                          applyMeasures={applyMeasures}
                          setShowMeasurePopup={setShowMeasurePopup}
                        />
                      </th>
                    );
                  } else {
                    return (
                      <th key={col.id}>
                        {col.name}
                      </th>
                    );
                  }
                })}


              
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col.id}>
                      {row[col.id] || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

      {/* First popup (columns) */}
      {showColumnPopup && popupCheckboxes === "columns" && (
        <FirstButtonSelections
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          applyColumns={applyColumns}
          setShowColumnPopup={setShowColumnPopup}
        />
      )}

      {/* Second popup (measures) */}
      {showMeasurePopup && popupCheckboxes === "measures" && (
        <SecondButtonSelections
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          applyMeasures={applyMeasures}
          setShowMeasurePopup={setShowMeasurePopup}
        />
      )}
        </div>
      </Grid>
      </Grid>
        
    </>
  );
};

export default InventoryTable;