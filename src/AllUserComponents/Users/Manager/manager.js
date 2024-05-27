import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ManagerRecord } from "../../../Redux/features/user/managerSlice";
import ViewMerchant from "./viewMerchantModel";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

export default function Manager() {
  const dispatch = useDispatch();
  const managerList = useSelector((state) => state.managerRecord);

  // ========================= DEFIENED STATES ========================================
  const [managerTable, setManagerTable] = useState([]);
  const [searchRecord, setSearchRecord] = useState("");
  // ====================================================================================

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  // state.managerRecord.ManagerRecord

  // ===================== USE EFFECTS============================================================
  useEffect(() => {
    dispatch(ManagerRecord(userTypeData));
  }, []);

  useEffect(() => {
    if (!managerList.loading && managerList.ManagerRecord) {
      setManagerTable(managerList.ManagerRecord);
    }
  }, [managerList.loading, managerList.ManagerRecord]);

  // =====================================END USE EFFECTS=====================================================

  //  ==================================== HANDLERE FUNCTIONS =============================================================

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);

    if (value === "") {
      // If search input is empty, display the entire dataset
      setManagerTable(managerList.ManagerRecord);
    } else {
      // Filter managerList.ManagerRecord based on search term
      const filteredRecords = managerList.ManagerRecord.filter((record) => {
        // Convert search term to lowercase for case-insensitive search
        const searchTerm = value.toLowerCase();
        // Check if any of the fields contain the search term
        return (
          record.name.toLowerCase().includes(searchTerm) ||
          record.email.toLowerCase().includes(searchTerm) ||
          record.phone.includes(searchTerm)
        );
      });

      // Update the managerTable state with filtered records
      setManagerTable(filteredRecords);
    }
  };
  console.log("managerList?.ManagerRecord", managerList.ManagerRecord);
  //  ================================= END HANDLER FUNCTIONS =================================
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              borderBottom: "1px solid #E8E8E8",
            }}
          >
            <Grid item>
              <div className="q-category-bottom-header">
                <span>Manager List</span>
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <InputTextSearch
                className=""
                type="text"
                value={searchRecord}
                handleChange={handleSearchInputChange}
                placeholder="Search..."
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Grid container>
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>View</StyledTableCell>
                </TableHead>
                <TableBody>
                  {managerTable?.length
                    ? managerTable?.map((data, index) => {
                        console.log("data", data);
                        return (
                          <StyledTableRow>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method capitalize">
                                {data?.name}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method capitalize">
                                {data?.email}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div class="text-[#000000] order_method capitalize">
                                {data?.phone}
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <ViewMerchant
                                userTypeData={userTypeData}
                                data={data}
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })
                    : ""}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
