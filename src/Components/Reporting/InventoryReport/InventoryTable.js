import React, { useEffect, useState, useRef } from "react";
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
<<<<<<< HEAD
import InventoryFilter from "./InventoryFilter";
import InventoryMeasures from "./InventoryMeasures";

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
=======
import Button from '@mui/material/Button';
import InventoryTableColumns from "./InventoryTableColumns";
const emails = ['username@gmail.com', 'user02@gmail.com'];
>>>>>>> 47cbef1dae20a325e23e5aca4d6731e1eaec131d

const InventoryTable = (props) => {

  const [leftStickyOffset, setLeftStickyOffset] = useState(0);
  //start table columns
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  //end table columns
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
          <InventoryFilter />
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
                    <InventoryMeasures />
                    {/* <img
                      style={{ height: "40px", width: "40px" }}
                      src={plusIcon}
                      alt="plusIcon"
                    /> */}
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
<<<<<<< HEAD

                </tr >
              </tbody >
            </table >
          </div >


=======
                
              </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Totals</td>
                  <td>Footer 2</td>
                  <td>Footer 3</td>
                  <td>Footer 4</td>
                  <td>Footer 5</td>
                  <td></td>
                  <td>Footer 7</td>
                  <td>Footer 8</td>
                  <td>Footer 9</td>
                  <td>Footer 10</td>
                  <td>Footer 11</td>
                  <td>Footer 12</td>
                  <td>Footer 13</td>
                  <td></td>

                </tr>
              </tfoot>
          </table>
        </div>
        
            
>>>>>>> 47cbef1dae20a325e23e5aca4d6731e1eaec131d
        </Grid >
      </Grid >
    </>
  );
};

export default InventoryTable;
