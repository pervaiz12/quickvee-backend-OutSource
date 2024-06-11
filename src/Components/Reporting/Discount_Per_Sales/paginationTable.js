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
import { Grid } from "@mui/material";
import Loader from "../../../CommonComponents/Loader";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
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

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      {props.loader ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          {
            // console.log(props.EmployeeFilterData?.report_data?.length)
            props.EmployeeFilterData?.report_data &&
            props.EmployeeFilterData.report_data.length !== 0 ? (
              Object.entries(props.EmployeeFilterData.report_data).map(
                ([key, result], index) => {
                  if (Array.isArray(result)) {
                    return (
                      <>
                        <h1 className="heading p-4 pb-0">{key}</h1>
                        <TableContainer sx={{}} aria-label="customized table">
                          <StyledTable>
                            <TableHead>
                              <StyledTableCell align="center">
                                Employee
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
                            </TableHead>
                            <TableBody>
                              {result.map((item, innerIndex) => (
                                <StyledTableRow key={innerIndex}>
                                  <StyledTableCell align="center">
                                    {item?.f_name + " " + item?.l_name}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {parseFloat(item?.discount).toFixed(2)}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {item?.coupon_code}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {item?.line_item_discount}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {item?.cash_discounting}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {item?.order_id}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {formatDateTime(item?.merchant_time)}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                              <StyledTableRow>
                                <StyledTableCell align="center">
                                  Grand Total
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {`$${result
                                    .reduce((total, item) => {
                                      return (
                                        total +
                                        (parseFloat(item?.discount) || 0)
                                      );
                                    }, 0)
                                    .toFixed(2)}`}
                                </StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                              </StyledTableRow>
                              {Object.entries(
                                props.EmployeeFilterData.report_data
                              ).length -
                                1 ===
                                index && (
                                <StyledTableRow>
                                  <StyledTableCell align="center">
                                    <div className="q-category-bottom-report-listing">
                                      <div>
                                        <p className="">Grand Total</p>
                                      </div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <div className="q-category-bottom-report-listing">
                                      <div>
                                        <p className="">${totalRecord}</p>
                                      </div>
                                    </div>
                                  </StyledTableCell>
                                </StyledTableRow>
                              )}
                            </TableBody>
                          </StyledTable>
                        </TableContainer>
                      </>
                    );
                  } else {
                    return null; // Handle non-array values if needed
                  }
                }
              )
            ) : (
              <Grid container sx={{ padding: 2.5 }}>
                <Grid item>
                  <p>no record found </p>
                </Grid>
              </Grid>
            )
          }
        </TableContainer>
      )}
    </>
  );
}
