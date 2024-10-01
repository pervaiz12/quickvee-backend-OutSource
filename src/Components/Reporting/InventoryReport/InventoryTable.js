import React, { useEffect, useState,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemSalesData } from "../../../Redux/features/Reports/ItemSales/ItemSalesSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { priceFormate } from "../../../hooks/priceFormate";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../../Common/passwordShow";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
import useDelayedNodata from "../../../hooks/useDelayedNoData";
import plusIcon from "../../../Assests/Products/plusIcon.svg";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {},
  "& td, & th": {
    border: "none",
  },
}));

const InventoryTable = (props) => {
  
  const [leftStickyOffset, setLeftStickyOffset] = useState(0);
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

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
        <div className="custom-table">
          <table ref={tableRef}>
            <thead>
              <tr>
                  <th>Product</th>
                  <th>Supplier code</th>
                  <th>Brand</th>
                  <th>Supplier</th>
                  <th>Category</th>
                <th
                  className="left-sticky"
                  // style={{ left: `${leftStickyOffset}px`, position: "sticky" }}
                >
                  <img
                  style={{ height: "40px", width: "40px" }}
                  src={plusIcon}
                  alt="plusIcon"
                />
                </th>
                <th>Closing Inventory</th>
                <th>Inventory sold<br />per day</th>
                <th>Items sold</th>
                <th>Days Cover</th>
                <th>Sell-through<br />rate</th>
                <th>Revenue</th>
                <th>Gross Pro</th>
                  <th className="right-sticky">
                    <img
                  style={{ height: "40px", width: "40px" }}
                  src={plusIcon}
                  alt="plusIcon"
                    />
                  </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td>Product Name 1<span>10012</span></td>
                  <td>9023</td>
                  <td>zara</td>
                  <td>Akash</td>
                  <td>-</td>
                  <td></td>
                  <td>4</td>
                  <td>20</td>
                  <td>5</td>
                  <td>2</td>
                  <td>-</td>
                  <td>$20.10458</td>
                  <td>$200.458</td>
                  <td></td>
                
                </tr>
                <tr>
                  <td>Product Name 1<span>10012</span></td>
                  <td>9023</td>
                  <td>zara</td>
                  <td>Akash</td>
                  <td>-</td>
                  <td></td>
                  <td>4</td>
                  <td>20</td>
                  <td>5</td>
                  <td>2</td>
                  <td>-</td>
                  <td>$20.10458</td>
                  <td>$200.458</td>
                  <td></td>
                
              </tr>
            </tbody>
          </table>
        </div>
        
            
        </Grid>
      </Grid>
    </>
  );
};

export default InventoryTable;
