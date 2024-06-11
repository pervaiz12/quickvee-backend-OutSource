import React, { useState } from "react";
import EmployeeList from "./EmployeeList";
import Permission from "./Permission";

const MainAddEmployee = () => {
  const [visible, setVisible] = useState("EmployeeList");
  const [EmployeeId, setEmployeeId] = useState()
  return (
    <>
      <div className="q-category-main-page">
        {visible === "EmployeeList" && <EmployeeList setEmployeeId={setEmployeeId} setVisible={setVisible}/>}
        {visible === "EmployeePermission" && <Permission EmployeeId={EmployeeId} setVisible={setVisible} />}
      </div>
    </>
  );
};

export default MainAddEmployee;
