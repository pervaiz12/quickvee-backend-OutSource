import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import backLinkSvg from "../../Assests/Dashboard/Left.svg";
import { useDispatch } from "react-redux";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { fetchPurchaseOrderById } from "../../Redux/features/PurchaseOrder/purchaseOrderByIdSlice";
import { useSelector } from "react-redux";
import { formatDate } from "../../Constants/utils";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BASE_URL, VOID_PO } from "../../Constants/Config";
import axios from "axios";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";

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
  [`&.${tableCellClasses.table}`]: {
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

const EditPurchaseOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userTypeData } = useAuthDetails();

  const puchaseOrderDetail = useSelector(
    (state) => state.purchaseOrderById.purchaseOrderDetail
  );

  const [purchaseOrder, setPurchaseOrder] = useState({});
  const [headerCheckboxChecked, setHeaderCheckboxChecked] = useState(false);

  useEffect(() => {
    console.log("puchaseOrderDetail: ", puchaseOrderDetail);
    const { order_items, ...data } = puchaseOrderDetail;
    setPurchaseOrder({
      ...data,
      order_items:
        order_items && order_items.length > 0
          ? order_items.map((item) =>
              item.pending_qty === "0" ? { ...item, isChecked: true } : item
            )
          : [],
    });
  }, [puchaseOrderDetail]);

  useEffect(() => {
    const bool =
      purchaseOrder.order_items &&
      purchaseOrder.order_items.length > 0 &&
      purchaseOrder.order_items.every((item) => item.isChecked);
    setHeaderCheckboxChecked(bool);
  }, [purchaseOrder.order_items]);

  // fetching Purchase Order details
  useEffect(() => {
    const data = { merchant_id: "MAL0100CA", po_id: id, ...userTypeData };
    dispatch(fetchPurchaseOrderById(data));
  }, []);

  const voidPurchaseOrder = async () => {
    try {
      const { token } = userTypeData;
      const formData = new FormData();
      formData.append("merchant_id", "MAL0100CA");
      formData.append("po_id", id);
      formData.append("token_id", userTypeData.token_id);
      formData.append("login_type", userTypeData.login_type);

      const response = await axios.post(BASE_URL + VOID_PO, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Use data?.token directly
        },
      });

      if (response.data.status) {
        ToastifyAlert(response.data.message, "success");
        navigate("/purchase-data");
      } else {
        ToastifyAlert(response.data.message, "error");
      }

      console.log("response void po: ", response);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const handlePOItems = (e) => {
    const { value } = e.target;
  };

  // all items checkbox
  const handleHeaderCheckboxChange = () => {
    setHeaderCheckboxChecked((prev) => !prev);
    const temp =
      purchaseOrder.order_items && purchaseOrder.order_items.length > 0
        ? purchaseOrder.order_items.map((item) => ({
            ...item,
            isChecked: item.pending_qty === "0" ? true : !headerCheckboxChecked,
          }))
        : [];
    console.log("temp: ", temp);
    setPurchaseOrder((prev) => ({ ...prev, order_items: temp }));
  };

  // single item checkbox
  const handleCheckboxChange = (itemId) => {
    const temp =
      purchaseOrder.order_items && purchaseOrder.order_items.length > 0
        ? purchaseOrder.order_items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  isChecked: !item.isChecked,
                }
              : item
          )
        : [];

    setPurchaseOrder((prev) => ({ ...prev, order_items: temp }));
  };

  return (
    <div className="box">
      <div className="box_shadow_div">
        <div className="q-add-categories-section-header">
          <Link to="/purchase-data" style={{ display: "flex" }}>
            <img src={backLinkSvg} alt="Add New Category" className="w-6 h-6" />
            <span>Update Purchase Order</span>
          </Link>
        </div>

        <div className="px-6 py-7">
          <Grid container spacing={2}>
            {purchaseOrder?.received_status === "2" && (
              <Grid item xs={12}>
                <p className="text-lg font-semibold">Received All</p>
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={4}>
              <label>Vendor</label>
              <p>
                {purchaseOrder.vendor_name ? purchaseOrder.vendor_name : "-"}
              </p>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Issued Date</label>
              <p>
                {purchaseOrder.issued_date
                  ? formatDate(purchaseOrder.issued_date)
                  : "-"}
              </p>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Stock Due</label>
              <p>
                {purchaseOrder.stock_date
                  ? formatDate(purchaseOrder.stock_date)
                  : "-"}
              </p>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Vendor Email</label>
              <p>{purchaseOrder.email ? purchaseOrder.email : "-"}</p>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label>Reference</label>
              <p>{purchaseOrder.reference ? purchaseOrder.reference : "-"}</p>
            </Grid>
          </Grid>
        </div>

        <Grid container>
          <TableContainer>
            <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                {purchaseOrder?.is_void === "0" &&
                  purchaseOrder?.received_status !== "2" && (
                    <StyledTableCell>
                      <div
                        className="category-checkmark-div defaultCheckbox-div"
                        style={{ width: "unset !important" }}
                      >
                        <label className="category-checkmark-label">
                          <input
                            type="checkbox"
                            id="selectAll"
                            checked={headerCheckboxChecked}
                            onChange={handleHeaderCheckboxChange}
                          />
                          <span
                            className="category-checkmark"
                            style={{
                              left: "1rem",
                              transform: "translate(0px, -10px)",
                            }}
                          ></span>
                        </label>
                      </div>
                    </StyledTableCell>
                  )}
                <StyledTableCell>Item Name</StyledTableCell>
                <StyledTableCell>Qty</StyledTableCell>
                {purchaseOrder?.is_void === "0" &&
                  purchaseOrder?.received_status !== "2" && (
                    <StyledTableCell>To Receive</StyledTableCell>
                  )}
                {purchaseOrder?.is_void === "0" && (
                  <StyledTableCell>After</StyledTableCell>
                )}
                <StyledTableCell>Cost Per Item</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell>UPC</StyledTableCell>
                <StyledTableCell>Note</StyledTableCell>
              </TableHead>
              <TableBody>
                {purchaseOrder?.order_items &&
                  purchaseOrder?.order_items?.length > 0 &&
                  purchaseOrder?.order_items?.map((data) => (
                    <StyledTableRow key={data?.id}>
                      {purchaseOrder?.is_void === "0" &&
                      purchaseOrder?.received_status !== "2" ? (
                        <StyledTableCell>
                          {data?.required_qty &&
                          data?.recieved_qty &&
                          Number(data?.required_qty) !==
                            Number(data?.recieved_qty) ? (
                            <div
                              className="category-checkmark-div"
                              style={{ width: "unset !important" }}
                            >
                              <label className="category-checkmark-label">
                                <input
                                  type="checkbox"
                                  checked={data.isChecked}
                                  onChange={() =>
                                    handleCheckboxChange(data?.id)
                                  }
                                />
                                <span
                                  className="category-checkmark"
                                  // style={myStyles}
                                  style={{
                                    left: "1rem",
                                    transform: "translate(0px, -10px)",
                                  }}
                                ></span>
                              </label>
                            </div>
                          ) : (
                            ""
                          )}
                        </StyledTableCell>
                      ) : null}
                      <StyledTableCell>
                        <span className="flex flex-col gap-1">
                          <span>{data?.product_title}</span>
                          {data?.variant_title && (
                            <span>{data?.variant_title}</span>
                          )}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell>{data?.required_qty}</StyledTableCell>
                      {purchaseOrder?.is_void === "0" &&
                        purchaseOrder?.received_status !== "2" && (
                          <StyledTableCell>
                            <TextField
                              id="outlined-basic"
                              inputProps={{ type: "number" }}
                              value={data?.pending_qty}
                              onChange={(e) => {
                                if (
                                  Number(e.target.value) >= 0 &&
                                  Number(e.target.value) <=
                                    (Number(data?.required_qty) || 0) -
                                      (Number(data?.recieved_qty) || 0)
                                ) {
                                  setPurchaseOrder((prev) => ({
                                    ...prev,
                                    order_items: purchaseOrder.order_items.map(
                                      (item) =>
                                        item.id === data.id
                                          ? {
                                              ...item,
                                              pending_qty: e.target.value,
                                            }
                                          : item
                                    ),
                                  }));
                                }
                              }}
                              placeholder="Received Qty"
                              variant="outlined"
                              size="small"
                              disabled={
                                data?.required_qty &&
                                data?.recieved_qty &&
                                Number(data?.required_qty) ===
                                  Number(data?.recieved_qty)
                              }
                            />
                          </StyledTableCell>
                        )}
                      {purchaseOrder?.is_void === "0" && (
                        <StyledTableCell>
                          {(Number(data?.pending_qty) || 0) +
                            (Number(data?.item_qty) || 0)}
                        </StyledTableCell>
                      )}
                      <StyledTableCell>${data.cost_per_item}</StyledTableCell>
                      <StyledTableCell>${data.total_pricing}</StyledTableCell>
                      <StyledTableCell>
                        {data.upc ? data.upc : "-"}
                      </StyledTableCell>
                      <StyledTableCell>
                        {data.note ? data.note : "-"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Grid>

        {purchaseOrder?.is_void === "0" &&
          purchaseOrder?.received_status !== "2" && (
            <div className="flex justify-between py-7 px-6">
              <div className="button-container start gap-4">
                <button
                  // onClick={handleAutoPO}
                  className="quic-btn quic-btn-add"
                >
                  Email
                </button>
                <button
                  // onClick={() => savePurchaseOrder("1")}
                  className="quic-btn quic-btn-draft"
                >
                  Print
                </button>
                <button
                  // onClick={() => savePurchaseOrder("1")}
                  className="quic-btn quic-btn-draft"
                >
                  Edit PO
                </button>
                <button
                  onClick={voidPurchaseOrder}
                  className="quic-btn quic-btn-draft"
                >
                  Void
                </button>
              </div>
              <div className="button-container end gap-4">
                <button
                  // onClick={handleCancel}
                  className="quic-btn quic-btn-cancle"
                >
                  Back
                </button>
                <button
                  className="quic-btn quic-btn-save"
                  // onClick={() => savePurchaseOrder("0")}
                >
                  {headerCheckboxChecked ? "Receive All" : "Receive"}
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default EditPurchaseOrder;
