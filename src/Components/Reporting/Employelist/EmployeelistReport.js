import React, { useEffect, useState } from "react";
import { fetchEmployeeListData } from "../../../Redux/features/EmployeeList/EmployeeListSlice";
import { useSelector, useDispatch } from "react-redux";
import "../../../Styles/EmployeeList/employeeList.css";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import sortIcon from "../../../Assests/Category/SortingW.svg";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import NoDataFound from "../../../reuseableComponents/NoDataFound";
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

const EmployeelistReport = () => {
  const [employeeData, setAllEmployeeData] = useState([]);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const AllEmployeeListState = useSelector((state) => state.employeeDataList);
  const dispatch = useDispatch();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    const fetchData = async () => {
      let data = {
        merchant_id,
        ...userTypeData,
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
      const updatedData = AllEmployeeListState?.employeeListData?.map(
        (data) => {
          const fullName = `${data?.f_name} ${data?.l_name}`;
          return { ...data, fullName: fullName };
        }
      );

      setAllEmployeeData(updatedData);
    }
  }, [AllEmployeeListState.loading, AllEmployeeListState.employeeListData]);

  const [sortOrder, setSortOrder] = useState("asc");
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder } = SortTableItemsHelperFun(
      employeeData,
      type,
      name,
      sortOrder
    );
    setAllEmployeeData(sortedItems);
    setSortOrder(newOrder);
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <CustomHeader>Employee List </CustomHeader>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              {AllEmployeeListState.loading ? (
                <SkeletonTable
                  columns={[
                    "Employee Name",
                    "PIN",
                    "Contact",
                    "Email",
                    "Address",
                  ]}
                />
              ) : (
                <TableContainer>
                  <StyledTable
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("str", "fullName")}
                        >
                          <p>Employee Name</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("num", "pin")}
                        >
                          <p>PIN</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>Contact</StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="flex items-center"
                          onClick={() => sortByItemName("str", "email")}
                        >
                          <p>Email</p>
                          <img src={sortIcon} alt="" className="pl-1" />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>Address</StyledTableCell>
                    </TableHead>
                    <TableBody>
                      {employeeData && employeeData?.length >= 1 ? (
                        employeeData?.map((employee, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <p>{employee?.fullName}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{employee?.pin}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{employee?.phone}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>{employee?.email}</p>
                            </StyledTableCell>
                            <StyledTableCell>
                              <p>
                                {" "}
                                {employee
                                  ? [
                                      employee.address,
                                      employee.city,
                                      employee.state,
                                      employee.zipcode,
                                    ]
                                      .filter(Boolean)
                                      .join(", ")
                                  : ""}
                              </p>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      ) : (
                        ""
                      )}
                    </TableBody>
                  </StyledTable>
                  {!employeeData?.length && <NoDataFound />}
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeelistReport;
