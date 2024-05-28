import * as React from "react";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const isJsonObject = (data) => {
  return data && typeof data === "object" && !Array.isArray(data);
};
export default function DashboardTables(props) {
  const navigate = useNavigate();
  const [totalRecord, setTotalRecord] = React.useState("");
  // const handleSummeryPage = (order_id) => {
  //   navigate("/store-reporting/order-summary", {
  //     state: { merchantId: props.merchant_id, order_id: order_id },
  //   });
  // };
  useEffect(() => {
    console.log(props.EmployeeFilterData);
    if (props.EmployeeFilterData) {
      console.log("yes");
      getDiscountRecord();
    }
  }, [props.EmployeeFilterData]);

  const getDiscountRecord = () => {
    let grandTotal = 0; // Initialize grand total

    if (props.EmployeeFilterData?.report_data) {
      Object.entries(props.EmployeeFilterData.report_data).forEach(
        ([key, result]) => {
          if (Array.isArray(result)) {
            const total = result.reduce((acc, item) => {
              return acc + (parseFloat(item?.discount) || 0);
            }, 0);

            grandTotal += total; // Add total to grand total
            console.log(total);
          }
        }
      );
    } else {
      console.log("No report data available");
    }

    console.log("Grand Total:", grandTotal.toFixed(2));
    // Log the grand total
    setTotalRecord(grandTotal.toFixed(2));
    return grandTotal; // Return the overall grand total
  };

  return (
    <TableContainer component={Paper}>
      {
        // console.log(Array.isArray(props.EmployeeFilterData?.report_data).length)
        props.EmployeeFilterData?.report_data
          ? Object.entries(props.EmployeeFilterData.report_data).map(
              ([key, result], index) => {
                if (Array.isArray(result)) {
                  return (
                    <React.Fragment key={index}>
                      <h1 className="mt_card_header q_dashbaord_netsales">
                        {key}
                      </h1>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">
                              Employee Name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Discount($)
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Discount Type
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Item Discount($)
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Adjusted Item Price($)
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Order ID
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Date & Time
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {result.map((item, innerIndex) => (
                            <TableRow key={innerIndex}>
                              <TableCell align="center">
                                {item?.f_name + " " + item?.l_name}
                              </TableCell>
                              <TableCell align="center">
                                {parseFloat(item?.discount).toFixed(2)}
                              </TableCell>
                              <TableCell align="center">
                                {item?.coupon_code}
                              </TableCell>
                              <TableCell align="center">
                                {item?.line_item_discount}
                              </TableCell>
                              <TableCell align="center">
                                {item?.cash_discounting}
                              </TableCell>
                              <TableCell align="center">
                                {item?.order_id}
                              </TableCell>
                              <TableCell align="center">
                                {item?.merchant_time}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell align="center">Grand Total</TableCell>
                            <TableCell align="center">
                              {`$${result
                                .reduce((total, item) => {
                                  return (
                                    total + (parseFloat(item?.discount) || 0)
                                  );
                                }, 0)
                                .toFixed(2)}`}
                            </TableCell>
                          </TableRow>
                          {/* <TableRow>
                            <TableCell align="center">Total Discount</TableCell>
                            <TableCell align="center">{totalRecord}</TableCell>
                          </TableRow> */}
                        </TableBody>
                      </Table>
                    </React.Fragment>
                  );
                } else {
                  return null; // Handle non-array values if needed
                }
              }
            )
          : "no record found"
      }
      {totalRecord && totalRecord !== "0.00" ? (
        <div className="q-category-bottom-report-listing">
          <div className="q-category-bottom-categories-single-category">
            <p className="report-sort">Grand Total</p>
            <p className="report-title">${totalRecord}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </TableContainer>
  );
}
