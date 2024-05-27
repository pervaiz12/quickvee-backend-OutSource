import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewsLetterListData } from "../../Redux/features/NewsLetter/NewsLetterSlice";
import { Grid } from "@mui/material";
import Pagination from "../Users/UnverifeDetails/Pagination";

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
const NewsLetterList = (props) => {
    const [totalCount, setTotalCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [allNewsData, setAllNewsData] = useState([]);
  const AllNewsDataState = useSelector((state) => state.NewsLetterList);
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchNewsLetterListData());
  }, [dispatch]);

  useEffect(() => {
    if (!AllNewsDataState.loading && AllNewsDataState.NewsLetterListData) {
      setAllNewsData(AllNewsDataState.NewsLetterListData);
      setTotalCount(AllNewsDataState.NewsLetterListData.length);
    } else {
      setAllNewsData([]);
    }
  }, [AllNewsDataState.loading, AllNewsDataState.NewsLetterListData]);

  // Logic for pagination
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = allNewsData.slice(indexOfFirstItem, indexOfLastItem);
  


  const renderItems = () => {
    return currentItems.map((NewsData, index) => (
      <div className="box">
        <div key={index} className="q-category-bottom-categories-listing">
          <div className="q-category-bottom-categories-single-category">
            <p className="report-title">{NewsData.id}</p>
            <p className="report-title">{NewsData.email}</p>
          </div>
        </div>
      </div>
    ));
  };

  // Logic for page navigation
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                <span>NewsLetter List</span>
              </div>
            </Grid>
            <Grid container sx={{ padding: 2.5 }}>
              <Grid item xs={12}>
                <Pagination
                currentPage={currentPage}
                totalItems={totalCount}
                itemsPerPage={rowsPerPage}
                onPageChange={paginate}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                />
              </Grid>
            </Grid>

            <Grid container>
              <TableContainer>
                <StyledTable
                  sx={{ minWidth: 500 }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                  </TableHead>
                  <TableBody>
                    {currentItems?.map((data, index) => (
                      <StyledTableRow>
                        <StyledTableCell>
                          <div class="text-[#000000] order_method capitalize">
                            {data.id || ""}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div class="text-[#000000] order_method capitalize">
                            {data.email || ""}
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className="box">
        <div className="q-daily-report-bottom-report-header">
          <p className="report-sort">ID</p>
          <p className="report-sort">Email</p>
        </div>
      </div>

      {renderItems()}

    
      <div className="box">
        <div className="pagination">
          {Array.from({
            length: Math.ceil(allNewsData.length / itemsPerPage),
          }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default NewsLetterList;
