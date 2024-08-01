import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import RefundRequestTable from "./RefundRequestTable";
import { useAuthDetails } from "../../Common/cookiesHelper";
import {
  fetchRefundRequestArr,
  fetchRefundRequestArrCount,
} from "../../Redux/features/RefundRequest/RefundRequestSlice";
import { useDispatch } from "react-redux";
import PasswordShow from "../../Common/passwordShow";
import useDebounce from "../../hooks/useDebouncs";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
const sortList = ["Active Refund", "Closed Refund"];
const setOption = (option)=>{
    if (option==="Active Refund"){
        return "0"
    }else if (option==="Closed Refund"){
        return "1"
    }
}
export default function RefundRequestMain() {
  const { userTypeData } = useAuthDetails();

  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchRecord, setSearchRecord] = useState("");
  const [refundDropDownOptions, setRefundDropDownOptions] =
    useState("Active Refund");
    
  const debouncedValue = useDebounce(searchRecord);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getRefundRequestTableData = async () => {
    try {
      let data = {
        perpage: rowsPerPage,
        page: currentPage,
        search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
        is_close: setOption(refundDropDownOptions),
        ...userTypeData,
      };
      if (data) {
        await dispatch(fetchRefundRequestArr(data)).unwrap();
      }
    } catch (error) {
      console.log(error);
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
    }
  };
  const getRefundRequestDataCount = async () => {
    const data = {
      search_by: Boolean(debouncedValue.trim()) ? debouncedValue : null,
      is_close: setOption(refundDropDownOptions),
      ...userTypeData,
    };
    if (data) {
      await dispatch(fetchRefundRequestArrCount(data)).unwrap();
    }
  };
  useEffect(() => {
    getRefundRequestTableData();
  }, [debouncedValue, currentPage, rowsPerPage,refundDropDownOptions]);
  useEffect(() => {
    getRefundRequestDataCount();
  }, [debouncedValue, currentPage, rowsPerPage]);

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    setCurrentPage(1);
  };
  const handleDropdownChange= (value) => {
    setRefundDropDownOptions(value.title)
  }
  return (
    <>
      <Grid container sx={{ pt: 2.5, mt: 3.6 }} className="box_shadow_div ">
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
                <span>Unverified Merchant</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 2.5 }}>
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
        <Grid container sx={{ p: 2.5 }}>
          <Grid item xs={4}>
            <div className="heading">Filter By</div>
            <SelectDropDown
              selectedOption={refundDropDownOptions}
              title={"title"}
              listItem={sortList.map((item) => ({ title: item }))}
              onClickHandler={handleDropdownChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <RefundRequestTable
        currentPage={currentPage}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        rowsPerPage={rowsPerPage}
        paginate={paginate}
        setRowsPerPage={setRowsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
