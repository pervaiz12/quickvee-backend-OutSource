import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { fetchSalesHistory } from "../../Redux/features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import "../../Styles/ProductPage.css";
import Loader from "../../CommonComponents/Loader";

const ProductSalesReport = () => {
  const location = useLocation();
  const productId = location?.pathname?.split("/")[3];
  const varientId = location?.pathname?.split("/")[4];
  const dispatch = useDispatch();

  const [salesData, setSalesData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const formData = new FormData();
    formData.append("merchant_id", "MAL0100CA");
    formData.append("product_id", productId);
    formData.append("variant_id", !!varientId ? varientId : "");
    setLoading(true);
    dispatch(fetchSalesHistory(formData))
      .then((res) => {
        if (res?.payload?.status) {
          setSalesData(res?.payload?.sales_history);
          setFilterData(res?.payload?.sales_history);
        }
      })
      .catch((err) => {
        throw new Error(err?.payload?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFilterHistory = (e) => {
    const { value } = e.target;
    const filterList = salesData?.filter((i) =>
      i?.order_id.includes(value.toLowerCase())
    );
    setFilterData(
      filterList?.length ? filterList : ["No matching records found"]
    );
  };

  return (
    <div className="box">
      {loading ? (
        <div class="loading-box">
          <Loader />
        </div>
      ) : (
        <div className="q-attributes-main-page">
          <div className="q-add-categories-section">
            <div className="q-add-categories-section-header">
              <span>
                <img src={AddNewCategory} alt="Add-New-Category" />
                <span style={{ width: "100%" }}>
                  Sales History - Product Name
                </span>
              </span>
            </div>
            <div className="q-add-categories-section-middle-form sales-history-table">
              <div class="search-history-box">
                <input
                  type="text"
                  onChange={(e) => handleFilterHistory(e)}
                  placeholder="Search here..."
                />
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date & Time</TableCell>
                      <TableCell align="right">Order Number</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterData?.length ? (
                      filterData?.map((row) => {
                        console.log(row, typeof row);
                        if (typeof row === "string") {
                          return (
                            <TableCell component="th" scope="row">
                              {row}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row?.create_date}
                              </TableCell>
                              <TableCell align="right">
                                {row?.order_id}
                              </TableCell>
                              <TableCell align="right">{row?.qty}</TableCell>
                              <TableCell align="right">
                                $ {row?.price}
                              </TableCell>
                              <TableCell align="right">
                                $ {row?.cost_price}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })
                    ) : (
                      <TableCell component="th" scope="row">
                        No data available in table
                      </TableCell>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSalesReport;
