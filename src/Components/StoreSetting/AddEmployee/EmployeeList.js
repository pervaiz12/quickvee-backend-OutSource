import React , {useState,useEffect} from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import { fetchEmployeeListsData , deleteEmployee } from "../../../Redux/features/StoreSettings/AddEmployee/AddEmployeeSlice";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import Permission from "../../../Assests/Employee/Permission.svg";
import Delete from "../../../Assests/Employee/Delete.svg";
import "../../../Styles/Settings/Employee.css"
import EditEmployeeModal from "./EditEmployeeModal";
import AddEmployeeFormLogic from "../../StoreSetting/AddEmployee/AddEmployeeFormLogic";

const EmployeeList = () => {
    const employeeListDataState = useSelector((state) => state.employeelistData);
    const [employeeList, setemployeeList] = useState([]);
    const dispatch = useDispatch();
    const [allemployee, setallemployee] = useState([]);
    // const [showModal, setShowModal] = useState(false);
    const {
        handleAddEmployeeInput,
        values,
        handleAddEmployee,
        submitmessage,
        showModal , 
        setShowModal ,
        scrollRef,
        setsubmitmessage,
      } = AddEmployeeFormLogic({employeeList});
    
    useEffect(() => {
        let data = {
            merchant_id: "MAL0100CA",
        };
        if (data) {
            dispatch(fetchEmployeeListsData(data));
        }
        
    }, [])
    

    const openModal = () => {
        setShowModal(true);
      };
    const closeModal = () => {
        setShowModal(false);
      };

    useEffect(() => {
        if (
          !employeeListDataState.loading &&
          employeeListDataState.employeelistData
        ) {
            setemployeeList(employeeListDataState.employeelistData);
        }
      }, [
        employeeListDataState,
        employeeListDataState.loading,
        employeeListDataState.employeelistData,
      ]);

      const handleDeleteEmployee = (id) => {
        const del_data = {
                    merchant_id:"MAL0100CA",
                    employee_id:id
                }
        if(id)
        {
            dispatch(deleteEmployee(del_data))
            // let data = {
            //     merchant_id: "MAL0100CA",
            // };
            // dispatch(fetchEmployeeListsData(data));
        }
      }

    return <>
       <div className="q-attributes-bottom-detail-section">
        <div className="q-attributes-bottom-header-sticky">
          <div className="q-attributes-bottom-header">
            <span>Employee</span>
            <p className="" onClick={openModal}>
              Add Employee <img src={AddIcon} alt="add-icon" />
            </p>
          </div>
          <div className="q-attributes-bottom-attriButes-header">
            <p className="employee-sort">Sort</p>
            <p className="employee-name">Employee</p>
            <p className="employee-phone">Phone</p>
            <p className="employee-email">Email</p>
            <p className="employee-pin">Pin</p>
            <p className="employee-role">Role</p>
            <p className="employee-iconall"></p>            
          </div>
        </div>

        <div className="q-attributes-bottom-attriButes-listing">
            {employeeList &&
            employeeList.length >= 1 &&
            employeeList.map((employee, index) => (
                <div
                    key={index}
                    className="q-attributes-bottom-attriButes-single-attributes"
                >
                    <p className="employee-sort">A</p>
                    <p className="employee-name">{employee.f_name} {employee.l_name} </p>
                    <p className="employee-phone">{employee.phone}</p>
                    <p className="employee-email">{employee.email}</p>
                    <p className="employee-pin">{employee.pin}</p>     
                    <p className="employee-role">{employee.role}</p>      
                    {/* <p className="employee-iconall"> */}
                        <div className="qvrow">
                            <div className="col-qv-4">
                                <div>
                                    <img className="employeeicon" alt="Permission-icon" src={Permission}/>
                                </div>
                            </div>
                            <div className="col-qv-4">
                                <div>
                                <EditEmployeeModal  employee={employee}/>
                                    {/* <img className="employeeicon" alt="edit-icon" src={Permission} /> */}
                                </div>
                            </div>
                            <div className="col-qv-4">
                                <div>
                                    <img className="employeeicon" alt="delete-icon" src={Delete} onClick={() => handleDeleteEmployee(employee.id)} />
                                </div>
                            </div>
                        </div>
                    {/* </p>       */}
                               
                </div>
                 ))}  
            </div>

        {showModal && (
          <div className="q-custom-modal-container" id="addemployee">
            {/* Your modal JSX */}
            <div className="q-custom-modal-content modal_custom">
              {/* Your modal content */}
              <div className="">
                <p className="q-custom-modal-header ">
                  Add New Employee
                  <img
                    src={CrossIcon}
                    alt="icon"
                    className="ml-auto mb-4"
                    onClick={closeModal}
                  />
                </p>
              </div>
              {/* ... other modal content ... */}
              <div className="qvrow">
                <div className="col-qv-4">
                    <div className="input_area">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={values.firstname}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.firstname !== "" ? values.errors.firstname : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={values.lastname}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                         <span className="input-error">
                            {values.errors.lastname !== "" ? values.errors.lastname : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area">
                        <label>Email Address</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.email !== "" ? values.errors.email : ""}
                        </span>
                    </div>
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-4">
                    <div className="input_area">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={values.phone}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.phone !== "" ? values.errors.phone : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area">
                        <label>PIN</label>
                        <input
                            type="text"
                            name="pin"
                            placeholder="Pin"
                            value={values.pin}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.pin !== "" ? values.errors.pin : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area">
                        <label>Wages ($/hr)</label>
                        <input
                            type="text"
                            name="wages"
                            placeholder="Wages Per Hour"
                            value={values.wages}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.wages !== "" ? values.errors.wages : ""}
                        </span>
                    </div>
                </div>
              </div>
              <div className="qvrow">
                <div className="col-qv-12">
                    <div className="input_area">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address_line_1"
                            placeholder="Address"
                            value={values.address_line_1}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.address_line_1 !== "" ? values.errors.address_line_1 : ""}
                        </span>
                    </div>
                </div>
                          
                <div className="col-qv-4">
                    <div className="input_area">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={values.city}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.city !== "" ? values.errors.city : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area">
                        <input
                            type="text"
                            name="zipcode"
                            placeholder="Zip"
                            value={values.zipcode}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.zipcode !== "" ? values.errors.zipcode : ""}
                        </span>
                    </div>
                </div>
                <div className="col-qv-4">
                    <div className="input_area">
                        <input
                            type="text"
                            name="state"
                            placeholder="state"
                            value={values.state}
                            onChange={handleAddEmployeeInput}
                            className="q-custom-input-field"
                        />
                        <span className="input-error">
                            {values.errors.state !== "" ? values.errors.state : ""}
                        </span>
                    </div>
                </div>
              </div>
              
              
            
              
              <div className="q-add-categories-section-middle-footer plr0">
                <button
                    onClick={handleAddEmployee}
                    className="quic-btn quic-btn-save"
                >
                  Add
                </button>
                <button
                  onClick={closeModal}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
    </>
}

export default EmployeeList
