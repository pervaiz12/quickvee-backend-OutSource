import React, { useEffect, useState } from "react";
import { fetchEmployeeListData } from "../../../Redux/features/EmployeeList/EmployeeListSlice";
import { useSelector, useDispatch } from "react-redux";
import "../../../Styles/EmployeeList/employeeList.css";

const EmployeeListDataView = () => {
  const [employeeData, setAllEmployeeData] = useState([]);

  const AllEmployeeListState = useSelector((state) => state.employeeDataList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let data = {
        merchant_id: "MAL0100CA",
      };

      if (data) {
        dispatch(fetchEmployeeListData(data));
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (
      !AllEmployeeListState.loading &&
      AllEmployeeListState.employeeListData
    ) {
      setAllEmployeeData(AllEmployeeListState.employeeListData);
    }
  }, [AllEmployeeListState.loading, AllEmployeeListState.employeeListData]);

  useEffect(() => {
    if (
      !AllEmployeeListState.loading &&
      AllEmployeeListState.employeeListData
    ) {
      // console.log(AllInventoryAccessState.employeeListData)
      setAllEmployeeData(AllEmployeeListState.employeeListData);
    }
  }, [AllEmployeeListState.loading]);

  // console.log(employeeData)

  return (
    <>
      <div className="mx-2 my-4">
        <div>
          <div className="flex justify-between gap-2 mx-6 my-6">
            <div className="text-[18px] Admin_std leading-0 text-black admin_medium font-semibold opacity-100">
              Employee List
            </div>
          </div>
        </div>

        <div className="">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-3 text-left">Employee Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, index) => (
                <tr
                  key={index}
                  className="text-black text-[16px] admin_medium border-b"
                >
                  <td className="p-3">
                    {employee.f_name} {employee.l_name}
                  </td>
                  <td className="p-3">{employee.phone}</td>
                  <td className="p-3">{employee.email}</td>
                  <td className="p-3">{employee.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Employee List</span>
          </div>
          <div className="q-daily-report-bottom-report-header">
            <p className="report-sort">Employee Name</p>
            <p className="report-title">Contact</p>
            <p className="report-title">Email</p>
            <p className="report-title">Address</p>
          </div>
          <div className="q-category-bottom-categories-listing">
            {employeeData &&
              employeeData.length >= 1 &&
              employeeData.map((employee, index) => (
                <div
                  className="q-category-bottom-categories-listing"
                  key={index}
                >
                  <div className="q-category-bottom-categories-single-category">
                    <p className="report-sort">{employee.f_name} {employee.l_name}</p>
                    <p className="report-title">{employee.phone}</p>
                    <p className="report-title">{employee.email}</p>
                    <p className="report-title">{employee.address}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default EmployeeListDataView;


// import React, { useEffect, useState } from "react";
// import { fetchEmployeeListData } from "../../../Redux/features/EmployeeList/EmployeeListSlice";
// import { useSelector, useDispatch } from "react-redux";
// import "../../../Styles/EmployeeList/employeeList.css";

// const EmployeeListDataView = () => {
//   const [employeeData, setAllEmployeeData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);

//   const AllEmployeeListState = useSelector((state) => state.employeeDataList);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       let data = {
//         merchant_id: "MAL0100CA",
//       };

//       if (data) {
//         dispatch(fetchEmployeeListData(data));
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     if (
//       !AllEmployeeListState.loading &&
//       AllEmployeeListState.employeeListData
//     ) {
//       setAllEmployeeData(AllEmployeeListState.employeeListData);
//     }
//   }, [AllEmployeeListState.loading, AllEmployeeListState.employeeListData]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = employeeData.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(employeeData.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };



//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1); // Reset the current page when searching
//   };

//   const filteredEmployeeData = employeeData.filter((employee) =>
//     `${employee.f_name} ${employee.l_name}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <div className="mx-2 my-4">
//         <div>
//           <div className="flex justify-between gap-2 mx-6 my-6">
//             <div className="text-[18px] Admin_std leading-0 text-black admin_medium font-semibold opacity-100">
//               Employee List
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Search employee"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="p-2 border rounded-md"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-black text-white">
//                 <th className="p-3 text-left">Employee Name</th>
//                 <th className="p-3 text-left">Contact</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Address</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEmployeeData.map((employee, index) => (
//                 <tr
//                   key={index}
//                   className="text-black text-[16px] admin_medium border-b"
//                 >
//                   <td className="p-3">
//                     {employee.f_name} {employee.l_name}
//                   </td>
//                   <td className="p-3">{employee.phone}</td>
//                   <td className="p-3">{employee.email}</td>
//                   <td className="p-3">{employee.address}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="pagination-container">
//         <div className="pagination">
//           <button
//             onClick={() =>
//               currentPage > 1 && handlePageChange(currentPage - 1)
//             }
//             disabled={currentPage === 1}
//           >
//             {"<"}
//           </button>
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={currentPage === index + 1 ? "active" : ""}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             onClick={() =>
//               currentPage < totalPages && handlePageChange(currentPage + 1)
//             }
//             disabled={currentPage === totalPages}
//           >
//             {">"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmployeeListDataView;

