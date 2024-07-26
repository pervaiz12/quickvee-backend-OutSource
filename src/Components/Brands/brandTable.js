import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../Assests/Category/editIcon.svg";
import Delete from "../../Assests/VerifiedMerchant/Delete.svg";
import SmallLoader from "../../Assests/Loader/loading-Animation.gif";
import NoDataFound from "../../reuseableComponents/NoDataFound";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: "12px",
    paddingLeft: "12px",
    paddingRight: "1px",
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

export default function BrandTable(props) {
  const navigate = useNavigate();
  const styleRow = {
    display: "flex",
    justifyContent: "center",
  };
  return (
    <>
      {props.skeletonLoader === "" || props.skeletonLoader === true ? (
        <SkeletonTable columns={props?.rowSkelton} />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {props.header.length > 0 && Array.isArray(props.header)
                  ? props.header.map((res) => (
                      <StyledTableCell
                        className="whitespace-nowrap"
                        key={res.id}
                      >
                        {res?.title}
                      </StyledTableCell>
                    ))
                  : ""}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.listData &&
              Array.isArray(props.listData) &&
              props.listData.length > 0 ? (
                props.listData.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.title}</StyledTableCell>
                    <StyledTableCell>
                      <div className="permissionEditBTN">
                        <span
                          onClick={() => props.handleGetEditData(row.id)}
                          className="cursor-pointer"
                          style={styleRow}
                        >
                          <img src={EditIcon} alt="Edit" />
                        </span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <span className="cursor-pointer" style={styleRow}>
                        {props.deleteId == row.id && props.tableLoader ? (
                          <img src={SmallLoader} alt="loading" />
                        ) : (
                          <img
                            class="mx-1 delete cursor-pointer"
                            onClick={() => props.handleDeleteBrand(row.id)}
                            src={Delete}
                            alt="Delete"
                            title="Delete"
                          />
                        )}
                      </span>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <>
                  {/* <p className="p-2">No Data Found</p> */}
                  {/* <NoDataFound /> */}
                </>
              )}
            </TableBody>
          </Table>
          {Array.isArray(props.listData) && props.listData.length <= 0 ? (
            <NoDataFound />
          ) : (
            ""
          )}
        </TableContainer>
      )}
    </>
  );
}
