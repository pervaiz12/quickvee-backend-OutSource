

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../Styles/EmployeeList/employeeList.css";
import AddIcon from "../../Assests/Category/addIcon.svg";
import AddPermissionModal from "./AddPermissionModal";
import EditPermissionModal from "./EditPermissionModal";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";

import {
  fetchPermissionData,
  deletePermission,
} from "../../Redux/features/Permission/PermissionSlice";

const PermissionList = () => {
  const [allpermission, setAllPermission] = useState([]);

  const AllPermissionDataState = useSelector((state) => state.permissionRed);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("Fetching permission data...");
    dispatch(fetchPermissionData());
  }, []);

  useEffect(() => {
    // console.log("Permission data state:", AllPermissionDataState);

    if (
      !AllPermissionDataState.loading &&
      AllPermissionDataState.permissionData
    ) {
      // console.log(
      //   "Setting all permission data:",
      //   AllPermissionDataState.permissionData
      // );
      setAllPermission(AllPermissionDataState.permissionData);
    }
  }, [AllPermissionDataState.loading, AllPermissionDataState.permissionData]);

  // console.log("All permission data:", allpermission);

  const handleDeletePermission = (id) => {
    const data = {
      id: id,
      
    };
    const userConfirmed = window.confirm("Are you sure you want to delete this ?");
    if (userConfirmed) {

      if (id) {
        dispatch(deletePermission(data));
      }
    } else {

      console.log("Deletion canceled by user");
    }
  };

 
  





  return (
    <>
      <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
        <div className="q-attributes-bottom-header">
            <span>Permission</span>
            {/* <p className="" >
              Add New Sub Permission <img src={AddIcon} alt="add-icon" /> 
            </p> */}
            <AddPermissionModal />
          </div>
          <div className="q-daily-report-bottom-report-header">
            <p className="report-sort">Sr.No</p>
            <p className="report-title">Sub Permission</p>
            <p className="report-title">Permission</p>
            <p className="report-title"></p>
            <p className="report-title"></p>
          </div>
          <div className="q-category-bottom-categories-listing">
            {allpermission &&
              allpermission.length >= 1 &&
              allpermission.map((permission, index) => (
                <div
                  className="q-category-bottom-categories-listing"
                  key={index}
                >
                  <div className="q-category-bottom-categories-single-category">
                    <p className="report-sort">{index + 1}</p>
                    <p className="report-title">{permission.sub_permission}</p>
                    <p className="report-title">{permission.permission}</p>
                    <p className="report-title"><EditPermissionModal selected={permission} />
                        </p>
                    <p className="report-title"> <img
                        src={DeleteIcon}
                        alt="Delete-icon"
                       
                        className="h-8 w-8"
                        onClick={() => handleDeletePermission(permission.id)}
                      />
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionList;
