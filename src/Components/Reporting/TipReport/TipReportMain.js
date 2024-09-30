import React, { useState, useEffect } from "react";
import TipReportList from "./TipReportList";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { Grid } from "@mui/material";
import { BASE_URL, EMPLOYEE_LIST } from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";

const TipReportMain = ({ hide }) => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");

  const [filteredData, setFilteredData] = useState({ emp_id: "All" });

  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const [employeeList, setemployeeList] = useState([]);
  const [loadingEmpList, setLoadingEmpList] = useState(true);

  useEffect(() => {
    fetchData();
  }, []); // Fetch categories only once when the component mounts
  const fetchData = async () => {
    try {
      const response = await axios.post(
        BASE_URL + EMPLOYEE_LIST,
        {
          merchant_id: merchant_id,
          token_id: userTypeData?.token_id,
          login_type: userTypeData?.login_type,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userTypeData?.token}`,
          },
        }
      );

      // Assuming the API response has a data property containing the category list
      const EmpList = response.data.result;

      // Extracting category IDs and view titles
      const mappedOptions = EmpList.map((empdata) => ({
        id: empdata.id,
        title: empdata.f_name + " " + empdata.l_name,
      }));

      setemployeeList(mappedOptions);
      setLoadingEmpList(false);
    } catch (error) {
      console.error("Error fetching Employee List:", error);
      setLoadingEmpList(false);
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "employee":
        if (option === "All") {
          setSelectedEmployee("All");
          setSelectedEmployeeID("All");

          setFilteredData({
            ...filteredData,
            emp_id: "All",
          });
        } else {
          const emp_id = option.id;
          setSelectedEmployee(option.title);
          setSelectedEmployeeID(option.id);

          setFilteredData({
            ...filteredData,
            emp_id,
          });
        }
        break;
    }
  };

  return (
    <>
      <Grid container sx={{}}>
        <Grid item xs={12}>
          {!hide && (
            <Grid
              container
              sx={{ padding: 2.5, mt: 3.6 }}
              className="box_shadow_div "
            >
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <h1 style={{ marginBottom: 0 }} className="heading ">
                      Tip Report
                    </h1>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid container className="box_shadow_div">
            <Grid item xs={12}>
              <Grid container sx={{ px: 2.5, pt: 1 }}>
                <Grid item xs={12}>
                  <div className="heading">Filter By</div>
                </Grid>
              </Grid>
              <Grid container sx={{ px: 2.5, pb: 2.5 }} spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <label
                    className="q-details-page-label"
                    htmlFor="employeeFilter"
                  >
                    Select Employee
                  </label>
                  <SelectDropDown
                    sx={{ pt: 0.5 }}
                    heading={"All"}
                    listItem={employeeList}
                    title={"title"}
                    selectedOption={selectedEmployee}
                    onClickHandler={handleOptionClick}
                    dropdownFor={"employee"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
          </Grid>
        </Grid>
      </Grid>

      <TipReportList
        selectedDateRange={selectedDateRange}
        filteredData={filteredData}
      />
    </>
  );
};

export default TipReportMain;
