import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../Styles/EmployeeWorking.css";
import { fetchemployeewrkhrs } from "../../../Redux/features/Reports/EmployeeWorkinghrs/EmployeeWorkinghrsSlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const Employeedetails = (props) => {
  // console.log(props);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const dispatch = useDispatch();
  const [allEmpWorkingHrsData, setallEmpWorkingHrsData] = useState("");
  const AllEmpWorkingHrsDataState = useSelector(
    (state) => state.EmpWorkinghrsList
  );
  // console.log(AllEmpWorkingHrsDataState);
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (props && props.selectedDateRange) {
      let data = {
        merchant_id,
        start_date: props.selectedDateRange.start_date,
        end_date: props.selectedDateRange.end_date,
        employee_id: props.EmpId,
        ...userTypeData,
      };
      if (data) {
        dispatch(fetchemployeewrkhrs(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (
      !AllEmpWorkingHrsDataState.loading &&
      AllEmpWorkingHrsDataState?.employeewrkhrstData
    ) {
      setallEmpWorkingHrsData(AllEmpWorkingHrsDataState.employeewrkhrstData);
    } else {
      setallEmpWorkingHrsData("");
    }
  }, [
    AllEmpWorkingHrsDataState,
    AllEmpWorkingHrsDataState.loading,
    AllEmpWorkingHrsDataState.ItemSalesData,
  ]);
  console.log("hahaha", allEmpWorkingHrsData);

  const calTotalWork = (totalworkdata) => {
    if (!Array.isArray(totalworkdata)) {
      return 0;
    }
    return totalworkdata.reduce(
      (total, workData) => total + parseFloat(workData.total_seconds_worked),
      0
    );
  };
  const calTotalBreak = (totalbreakdata) => {
    if (!Array.isArray(totalbreakdata)) {
      return 0;
    }
    return totalbreakdata.reduce(
      (total, workData) => total + parseFloat(workData.total_seconds_break),
      0
    );
  };
  const calTotalActualWork = (totalactualworkdata) => {
    if (!Array.isArray(totalactualworkdata)) {
      return 0;
    }
    return totalactualworkdata.reduce(
      (total, workData) =>
        total + parseFloat(workData.effective_seconds_worked),
      0
    );
  };

  return (
    <>
      <div className="box">
        {allEmpWorkingHrsData &&
          Object.keys(allEmpWorkingHrsData).map((employeeName, index) => (
            <div
              key={index}
              className="q-attributes-bottom-detail-section mb-3"
            >
              <div className="q-attributes-bottom-header-sticky">
                <div className="q-attributes-bottom-header">
                  <span>{employeeName}</span>
                </div>
                <div className="q-attributes-bottom-attriButes-header">
                  <p className="q-employee-item">Date Worked</p>
                  <p className="q-employee-in">Clock In </p>
                  <p className="q-employee-out">Clock Out</p>
                  <p className="q-employee-worked">Total Worked (Hr)</p>
                  <p className="q-catereport-break">Total Break (Hr)</p>
                  <p className="attriButes-title">Actual Worked (Hr)</p>
                </div>
              </div>
              {Array.isArray(allEmpWorkingHrsData[employeeName]) &&
                allEmpWorkingHrsData[employeeName].map(
                  (workData, dataIndex) => (
                    <div
                      key={dataIndex}
                      className="q-attributes-bottom-attriButes-listing"
                    >
                      <div className="q-employee-bottom-attriButes-single-attributes">
                        <p className="q-employee-item">{workData.work_date}</p>
                        <p className="q-employee-in">
                          {workData.first_check_in_time}
                        </p>
                        <p className="q-employee-out">
                          {workData.last_check_out_time}
                        </p>
                        <p className="q-employee-worked">
                          {parseFloat(workData.total_seconds_worked).toFixed(2)}
                        </p>
                        <p className="q-catereport-break">
                          {parseFloat(workData.total_seconds_break).toFixed(2)}
                        </p>
                        <p className="attriButes-title">
                          {parseFloat(
                            workData.effective_seconds_worked
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )
                )}
              <div className="q-attributes-bottom-attriButes-listing">
                <div className="q-employee-bottom-attriButes-single-attributes">
                  <p className="q-employee-total text-left">Total</p>
                  <p className="q-employee-worked">
                    {parseFloat(
                      calTotalWork(allEmpWorkingHrsData[employeeName])
                    ).toFixed(2)}
                  </p>
                  <p className="q-catereport-break">
                    {parseFloat(
                      calTotalBreak(allEmpWorkingHrsData[employeeName])
                    ).toFixed(2)}
                  </p>
                  <p className="attriButes-title">
                    {parseFloat(
                      calTotalActualWork(allEmpWorkingHrsData[employeeName])
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Employeedetails;
