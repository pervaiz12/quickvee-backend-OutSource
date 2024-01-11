import React from "react";
import "../../../Styles/EmployeeWorking.css";

const Employeedetails = () => {
  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Employee Name</span>
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
        <div className="q-attributes-bottom-attriButes-listing">
          <div className="q-employee-bottom-attriButes-single-attributes">
            <p className="q-employee-item">2023-12-01</p>
            <p className="q-employee-in">05:30:00</p>
            <p className="q-employee-out">17:00:00</p>
            <p className="q-employee-worked">11.5</p>
            <p className="q-catereport-break">0.5</p>
            <p className="attriButes-title">11</p>
          </div>
        </div>
        <div className="q-attributes-bottom-attriButes-listing">
        <div className="q-employee-bottom-attriButes-single-attributes">
            <p className="q-employee-item">2023-12-01</p>
            <p className="q-employee-in">05:30:00</p>
            <p className="q-employee-out">17:00:00</p>
            <p className="q-employee-worked">11.5</p>
            <p className="q-catereport-break">0.5</p>
            <p className="attriButes-title">11</p>
          </div>
        </div>
        <div className="q-attributes-bottom-attriButes-listing">
        <div className="q-employee-bottom-attriButes-single-attributes">
            <p className="q-employee-item">2023-12-01</p>
            <p className="q-employee-in">05:30:00</p>
            <p className="q-employee-out">17:00:00</p>
            <p className="q-employee-worked">11.5</p>
            <p className="q-catereport-break">0.5</p>
            <p className="attriButes-title">11</p>
          </div>
        </div>
        <div className="q-attributes-bottom-attriButes-listing">
        <div className="q-employee-bottom-attriButes-single-attributes">
            <p className="q-employee-item">2023-12-01</p>
            <p className="q-employee-in">05:30:00</p>
            <p className="q-employee-out">17:00:00</p>
            <p className="q-employee-worked">11.5</p>
            <p className="q-catereport-break">0.5</p>
            <p className="attriButes-title">11</p>
          </div>
        </div>

        <div className="q-attributes-bottom-attriButes-listing">
        <div className="q-employee-bottom-attriButes-single-attributes">
            <p className="q-employee-total text-left">Total</p>
            
             <p className="q-employee-worked">11.5</p>
            <p className="q-catereport-break">0.5</p>
            <p className="attriButes-title">11</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employeedetails;
