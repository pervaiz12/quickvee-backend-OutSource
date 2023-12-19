import { useState } from "react";

import Pagination from "react-js-pagination";

const TableViewData = () => {
  const [activePage, setActivePage] = useState(1);
  const entriesPerPage = 10;

  const tableData = [
    {
      id: 1,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "Pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 2,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "Pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },

    {
      id: 3,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },

    {
      id: 4,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 5,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 6,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 7,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 8,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 9,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 10,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 11,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 12,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: "$216.29",
      status: "Processing",
    },
    {
      id: 13,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 14,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 15,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
    {
      id: 16,
      customer: [
        "Brian Cooper",
        "Existing Customer",
        "876 556 7889",
        "vijay@imerchantech.com",
      ],
      order: ["64D249392454E", "2023-08-08 06:14:51", "pickup"],
      amount: ["$216.29", "Cash-Pending"],
      status: "Processing",
    },
  ];

  if (!tableData) {
    return null; // or handle the case when tableData is undefined
  }

  // Calculate the start and end index for the current page
  const startIndex = (activePage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <div className="main_blocks">
        <div className="bg-white px-8 py-4 mt-4 mx-10 shadow-md rounded-lg opacity-100 h-auto">

        <Pagination
  activePage={activePage}
  itemsCountPerPage={entriesPerPage}
  totalItemsCount={tableData.length}
  pageRangeDisplayed={5}
  onChange={handlePageChange}
  itemclassName="page-item"
  linkclassName="page-link"
  innerclassName="pagination" // Add this class for the container
  activeclassName="active" // Class for the active page
  activeLinkclassName="active-link" // Class for the active page link
/>
     
          <table className="w-full">
          <thead className="bg-[#253338] text-[#FFFFFF] w-full opacity-100 mx-[-10px]">
              <tr className="border-b">
                <th className="py-3 px-6 text-left Admin_std">Customer</th>
                <th className="py-3 px-6 text-left Admin_std">Order</th>
                <th className="py-3 px-6 text-left Admin_std">Amount</th>
                <th className="py-3 px-6 text-left Admin_std">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render table rows */}
              {tableData.slice(startIndex, endIndex).map((rowData) => (
                <tr key={rowData.id} className="border-b">
                  <td className="py-3 px-6 admin_medium">
                    <span style={{ fontSize: "20px" }}>
                      {rowData.customer[0]}
                    </span>
                    <br />
                    <span style={{ color: "#0A64F9" }}>
                      {rowData.customer[1]}
                    </span>
                    <br />
                    <span style={{ color: "#818181" }}>
                      {rowData.customer[2]}
                    </span>
                    <br />
                    <span style={{ color: "#818181" }}>
                      {rowData.customer[3]}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {rowData.order[0]}
                    <br />
                    <span style={{ color: "#818181", fontSize: "16px" }}>
                      {rowData.order[1]}
                      <br />
                      {rowData.order[2]}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {rowData.amount[0]}
                    <br />
                    <span style={{ color: "#FF3939" }}>
                      {rowData.amount[1]}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <select className="border rounded px-8 py-2 mr-7 bg-white border-[#E1E1E1] text-[#000000] opacity-100">
                      <option value="day">Accepted</option>
                      <option value="month">Rejected</option>
                      {/* Add more options as needed */}
                    </select>
                  </td>
                  <td className="py-3 px-6 text-[#0A64F9] text-[15px] admin_medium tracking-tight opacity-100 underline">
                    <a href={`#`} target="_blank" rel="noopener noreferrer">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
  activePage={activePage}
  itemsCountPerPage={entriesPerPage}
  pageRangeDisplayed={5}
  onChange={handlePageChange}
  itemclassName="page-item"
  linkclassName="page-link"
  innerclassName="pagination" // Add this class for the container
  activeclassName="Activeclass" // Class for the active page
  activeLinkclassName="active_link_pagination" // Class for the active page link
/>
        </div>
      </div>
    </>
  );
};

export default TableViewData;