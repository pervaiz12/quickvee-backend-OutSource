import React from "react";

const PrintPurchaseOrder = () => {
  return (
    <>
      <table
        id="printableArea"
        border="0"
        width="100%"
        cellpadding="10"
        cellspacing="0"
        align="center"
        style={{
          maxWidth: "100%",
          margin: "auto",
          borderSpacing: "0",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "0px 0px 10px 10px",
          fontFamily: "sans-serif",
          display: "none",
        }}
      >
        <tbody>
          <tr>
            <td style={{ background: "#fafafa" }}>
              <table
                border="0"
                width="100%"
                cellpadding="10"
                cellspacing="0"
                align="center"
                style={{
                  maxWidth: "100%",
                  borderSpacing: "0",
                  borderCollapse: "collapse",
                  margin: "20px auto",
                  width: "100%",
                  fontSize: "16px",
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <b>merchant name</b>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <b>Purchase Order</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ background: "#fafafa" }}>
              <table
                border="0"
                width="100%"
                cellpadding="10"
                cellspacing="0"
                align="center"
                style={{
                  maxWidth: "100%",
                  borderSpacing: "0",
                  borderCollapse: "collapse",
                  margin: "20px auto",
                  width: "100%",
                  fontSize: "16px",
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <b>Ship/Bill to</b>
                    </td>
                    <td style={{ width: "230px" }}>
                      <p style={{ marginBottom: "0px" }}>
                        <b>Order Number</b>{" "}
                        <span style={{ float: "right" }}>po number</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <tr>
                      <td>merchant name</td>
                      <td>
                        <p style={{ marginBottom: "0px" }}>
                          <b>Issue Date </b>{" "}
                          <span style={{ float: "right" }}>issue date</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>address line 2 address line 1</td>
                    </tr>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ background: "#fafafa" }}>
              <table
                border="1"
                width="100%"
                cellpadding="10"
                cellspacing="0"
                align="center"
                style={{
                  maxWidth: "100%",
                  borderSpacing: "0",
                  borderCollapse: "collapse",
                  margin: "20px auto",
                  width: "100%",
                  fontSize: "16px",
                }}
              >
                <tbody>
                  <tr>
                    <th>NAME</th>
                    <th>QTY</th>
                    <th>PRICE</th>
                    <th style={{ width: "130px", textAlign: "right" }}>
                      TOTAL (USD)
                    </th>
                  </tr>
                  <tr>
                    <td>product title or variant title</td>
                    <td>required by</td>
                    <td>cost per item</td>
                    <td style={{ textAlign: "right" }}>total pricing</td>
                  </tr>
                  <tr>
                    <td></td>
                    <th colspan="2">TOTAL UNITS</th>
                    <td style={{ textAlign: "right" }}>total units</td>
                  </tr>
                  <tr>
                    <td></td>
                    <th colspan="2">SUBTOTAL</th>
                    <td style={{ textAlign: "right" }}>sub total</td>
                  </tr>
                  <tr>
                    <td></td>
                    <th colspan="2">TOTAL (USD)</th>
                    <td style={{ textAlign: "right" }}>total</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ background: "#fafafa" }}>
              <table
                border="0"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                align="center"
                style={{
                  maxWidth: "100%",
                  borderSpacing: "0",
                  borderCollapse: "collapse",
                  margin: "20px auto",
                  width: "100%",
                  fontSize: "16px",
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <p style={{ marginBottom: "0px" }}>
                        <b>Supplier,</b>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PrintPurchaseOrder;
