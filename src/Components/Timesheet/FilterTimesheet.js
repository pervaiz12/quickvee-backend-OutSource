import React, { useState, useEffect, useRef } from "react";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { Grid } from '@mui/material';
import axios from "axios";
import { BASE_URL, EMPLOYEE_LIST } from '../../Constants/Config';
import { useAuthDetails } from './../../Common/cookiesHelper';

const FilterTimesheet = ({ onClickHandler, listItem, selectedEmployeeID,setSelectedEmployeeID  }) => {

    const [employeeList, setemployeeList] = useState([]);
    const [loadingEmpList, setLoadingEmpList] = useState(true);

     const [selectedEmployee, setSelectedEmployee] = useState("All");
  //  const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");
    const [filteredData, setFilteredData] = useState({ emp_id: "all" });
    const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
    const [selected, setSelected] = useState(false);

    const {LoginGetDashBoardRecordJson,LoginAllStore,userTypeData} = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat=LoginGetDashBoardRecordJson
   const merchant_id=AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(
              BASE_URL + EMPLOYEE_LIST,
              { merchant_id: merchant_id,token_id:userTypeData?.token_id,login_type:userTypeData?.login_type },
              { headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${userTypeData?.token}` } }
            );
    
            const EmpList = response.data.result;
    
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
        fetchData();
      }, []);


      const handleOptionClick = (option, dropdown) => {
        // console.log("handleOptionClick", e.target.value);
    
        switch (dropdown) {
          case "employee":
            if (option === "All") {
              console.log("handleOptionClick ", option);
              setSelectedEmployee("All");
              setSelectedEmployeeID("all");
              setEmployeeDropdownVisible(false);
              setFilteredData({
                ...filteredData,
                emp_id: "all",
              });

            } else {
              const emp_id = option.id;
              setSelectedEmployee(option.title);
              setSelectedEmployeeID(option.id);
              setSelected(true);
              setEmployeeDropdownVisible(false);
              setFilteredData({
                ...filteredData,
                emp_id,
              });

            }
            break;

          default:
            break;
        }
      };


  return (
      <div className="box">
          <div className="box_shadow_div_order">
            <div className='px-6 py-6 my-6'>
                  <Grid container>
                      <Grid item className="mt-5" xs={12}>
                          <h1 className=" text-xl font-medium q_details_header ">Timesheet</h1>
                          <h1 className="text-xl font-medium q_details_header">Filter By</h1>
                      </Grid>
                  </Grid>


                  <Grid container spacing={4} className="">
                      <Grid item xs={4}>
                          <label>Employee</label>
                          <SelectDropDown
                            heading={"All"}
                            listItem={employeeList}
                            onClickHandler={handleOptionClick}
                            selectedOption={selectedEmployee}
                            dropdownFor={"employee"}
                            title={"title"}
                            />
                      </Grid>
                  </Grid>
            </div>
              
        </div>
     
    </div>
  )
}

export default FilterTimesheet