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
import { priceFormate } from "../../../hooks/priceFormate";
import SortIconW from "../../../Assests/Category/SortingW.svg";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
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

    if (props.EmployeeFilterData) {
      Object.entries(props.EmployeeFilterData).forEach(([key, result]) => {
        if (Array.isArray(result)) {
          const total = result.reduce((acc, item) => {
            return acc + (parseFloat(item?.discount) || 0);
          }, 0);

          grandTotal += total; // Add total to grand total
          console.log(total);
        }
      });
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
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };
  let columns = [
    "Employee",
    "Discount($)",
    "Discount Type",
    "Item Discount($)",
    "Order ID",
    "Date & Time",
  ];

  return (
    <>
      {props.loader ? (
        <Loader />
      ) : (
        // <>
        //   <SkeletonTable columns={columns} />
        // </>
        <TableContainer component={Paper}>
          {
            // console.log(props.EmployeeFilterData?.report_data?.length) props.EmployeeFilterData.length !== 0
            Object.keys(props.EmployeeFilterData).length !== 0 ? (
              Object.entries(props.EmployeeFilterData).map(
                ([key, result], index) => {
                  if (Array.isArray(result)) {
                    return (
                      <>
                        <h1 className="heading p-4 pb-0">{key}</h1>
                        <TableContainer sx={{}} aria-label="customized table">
                          <StyledTable>
                            <TableHead>
                              <StyledTableCell>
                                {/* <button
                                  className="flex items-center"
                                  onClick={() =>
                                    props.sortByItemName("str", "fullName")
                                  }
                                > */}
                                <p>Employee</p>
                                {/* <img
                                    src={SortIconW}
                                    alt=""
                                    className="pl-1"
                                  />
                                </button> */}
                              </StyledTableCell>
                              <StyledTableCell>
                                <button
                                  className="flex items-center"
                                  onClick={() =>
                                    props.sortByItemName("num", "discount")
                                  }
                                >
                                  <p>Discount($)</p>
                                  <img
                                    src={SortIconW}
                                    alt=""
                                    className="pl-1"
                                  />
                                </button>
                              </StyledTableCell>
                              <StyledTableCell>
                                <button
                                  className="flex items-center"
                                  onClick={() =>
                                    props.sortByItemName("num", "coupon_code")
                                  }
                                >
                                  <p> Discount Type</p>
                                  <img
                                    src={SortIconW}
                                    alt=""
                                    className="pl-1"
                                  />
                                </button>
                              </StyledTableCell>
                              <StyledTableCell>
                                <button
                                  className="flex items-center"
                                  onClick={() =>
                                    props.sortByItemName(
                                      "num",
                                      "line_item_discount"
                                    )
                                  }
                                >
                                  <p>Item Discount($)</p>
                                  <img
                                    src={SortIconW}
                                    alt=""
                                    className="pl-1"
                                  />
                                </button>
                              </StyledTableCell>
                              <StyledTableCell>
                                <button
                                  className="flex items-center"
                                  onClick={() =>
                                    props.sortByItemName(
                                      "num",
                                      "cash_discounting"
                                    )
                                  }
                                >
                                  <p>Adjusted Item Price($)</p>
                                  <img
                                    src={SortIconW}
                                    alt=""
                                    className="pl-1"
                                  />
                                </button>
                              </StyledTableCell>
                              <StyledTableCell>
                                <button
                                  className="flex items-center"
                                  onClick={() =>
                                    props.sortByItemName("id", "order_id")
                                  }
                                >
                                  <p> Order ID</p>
                                  <img
                                    src={SortIconW}
                                    alt=""
                                    className="pl-1"
                                  />
                                </button>
                              </StyledTableCell>
                              <StyledTableCell>
                                <button
                                  className="flex items-center"
                                  onClick={() =>
                                    props.sortByItemName(
                                      "date",
                                      "merchant_time"
                                    )
                                  }
                                >
                                  <p>Date & Time</p>
                                  <img
                                    src={SortIconW}
                                    alt=""
                                    className="pl-1"
                                  />
                                </button>
                              </StyledTableCell>
                              {/* <StyledTableCell align="center">
                                Order Details
                              </StyledTableCell> */}
                            </TableHead>
                            <TableBody>
                              {result.map((item, innerIndex) => (
                                <StyledTableRow key={innerIndex}>
                                  <StyledTableCell>
                                    {/* {item?.f_name + " " + item?.l_name} */}
                                    <p>{item.fullName}</p>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {priceFormate(
                                      parseFloat(item?.discount).toFixed(2)
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {item?.coupon_code}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {priceFormate(
                                      parseFloat(
                                        item?.line_item_discount
                                      ).toFixed(2)
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {priceFormate(item?.cash_discounting)}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Link
                                      to={`/order/store-reporting/order-summary/${props.merchant_id}/${item.order_id}`}
                                      // onClick={() => handleSummeryPage(row.order_id)}
                                      target="_blank"
                                    >
                                      <p className="text-[#0A64F9]">
                                        {item?.order_id}
                                      </p>
                                    </Link>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {formatDateTime(item?.merchant_time)}
                                  </StyledTableCell>
                                  {/* <StyledTableCell align="center">
                                    <Link
                                      to={`/store-reporting/order-summary/${props.merchant_id}/${item.order_id}`}
                                      // onClick={() => handleSummeryPage(row.order_id)}
                                      target="_blank"
                                    >
                                      Order Summery
                                    </Link>
                                  </StyledTableCell> */}
                                </StyledTableRow>
                              ))}
                              <StyledTableRow>
                                <StyledTableCell>
                                  Total Discount
                                </StyledTableCell>
                                <StyledTableCell>
                                  {`$${priceFormate(
                                    result
                                      .reduce((total, item) => {
                                        return (
                                          total +
                                          (parseFloat(item?.discount) || 0)
                                        );
                                      }, 0)
                                      .toFixed(2)
                                  )}`}
                                </StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                              </StyledTableRow>
                              {Object.entries(props.EmployeeFilterData).length -
                                1 ===
                                index && (
                                <StyledTableRow>
                                  <StyledTableCell>
                                    <div className="q-category-bottom-report-listing">
                                      <div>
                                        <p className="">Final Discount Total</p>
                                      </div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <div className="q-category-bottom-report-listing">
                                      <div>
                                        <p className="">
                                          ${priceFormate(totalRecord)}
                                        </p>
                                      </div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell></StyledTableCell>
                                  <StyledTableCell></StyledTableCell>
                                  <StyledTableCell></StyledTableCell>
                                  <StyledTableCell></StyledTableCell>
                                  <StyledTableCell></StyledTableCell>
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
