import React, { useState, useEffect, useRef } from "react";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { Grid } from '@mui/material';
import axios from "axios";
import { BASE_URL, EMPLOYEE_LIST } from '../../Constants/Config';

const FilterTimesheet = ({ onClickHandler, listItem, selectedEmployee,setSelectedEmployee  }) => {

    const [employeeList, setemployeeList] = useState([]);
    const [loadingEmpList, setLoadingEmpList] = useState(true);

    // const [selectedEmployee, setSelectedEmployee] = useState("All");
    const [selectedEmployeeID, setSelectedEmployeeID] = useState("All");
    const [filteredData, setFilteredData] = useState({ emp_id: "all" });
    const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(
              BASE_URL + EMPLOYEE_LIST,
              { merchant_id: "MAL0100CA" },
              { headers: { "Content-Type": "multipart/form-data" } }
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
              setSelectedEmployeeID("All");
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
                          <h1 className="text-xl font-medium">Filter By</h1>
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
