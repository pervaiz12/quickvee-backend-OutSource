import React from "react";
import { useState , useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchEmployeeListsData } from "../../../Redux/features/StoreSettings/AddEmployee/AddEmployeeSlice";
import Validation from "../../../Constants/Validation";
import { useNavigate } from "react-router-dom";
import { BASE_URL, ADDEDIT_EMPLOYEE } from "../../../Constants/Config";

const AddEmployeeFormLogic = ({employeeList}) => {
  const dispatch = useDispatch();
    const {  validateFirstName, validateLastName, validateEmail, validatePhoneNumber, validatePinNumber, validateWages, Address_line_1 , validateCity, validateState, validateZipCode  } = Validation();
    const [submitmessage, setsubmitmessage] = useState("");
    const Navigate = useNavigate();
    const scrollRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        pin:"",
        wages:"",
        address_line_1:"",
        address_line_2:"",
        city:"",
        zipcode:"",
        state:"",
        errors: {
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          pin: "",
          wages: "",
          address_line_1: "",
          address_line_2: "",
          city: "",
          zipcode: "",
          state:"",
        },
      });

      const handleAddEmployeeInput = async (event) => {
       
        let { errors } = values;
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
    
        switch (fieldName) {
            case "firstname":
                await validateFirstName(fieldValue, errors);
                break;
            case "lastname":
                await validateLastName(fieldValue, errors);
                break;
            case "email":
                await validateEmail(fieldValue, errors);
                break;
            case "phone":
                await validatePhoneNumber(fieldValue, errors);
                break;
            case "pin":
                await validatePinNumber(fieldValue, errors , employeeList);
                break;
            case "wages":
                await validateWages(fieldValue, errors);
                break;
            case "address_line_1":
                await Address_line_1(fieldValue, errors);
                break;
            case "city":
                await validateCity(fieldValue, errors);
                break;
            case "zipcode":
                await validateZipCode(fieldValue, errors);
                break;
            case "state":
              await validateState(fieldValue, errors);
              break;
            default:
                break;
        }
    
        setValues((prevValues) => ({
          errors,
          ...prevValues,
          [fieldName]: fieldValue,
        }));
      };


      const handleAddEmployee = async (e) => {
        e.preventDefault();
        let { errors } = values;
        await validateFirstName(values.firstname, errors);
        await validateLastName(values.lastname, errors);
        await validateEmail(values.email, errors);
        await validatePhoneNumber(values.phone, errors);
        await validatePinNumber(values.pin, errors);
        await validateWages(values.wages, errors);
        await Address_line_1(values.address_line_1, errors);
        await validateCity(values.city, errors);
        await validateZipCode(values.zipcode, errors);
        await validateState(values.state, errors);
        
    
    
        if (errors.firstname === "" && errors.lastname === "" && errors.email === "" && errors.phone === "" && errors.pin === "" && errors.wages === "" && errors.address_line_1 === "" && errors.city === "" && errors.zipcode === "" && errors.state === "") {
          const data = {
            "merchant_id":"MAL0100CA",
            "admin_id":"MAL0100CA",
            "f_name": values.firstname,
            "l_name": values.lastname,
            "email": values.email.toLowerCase(),
            "phone": values.phone,
            "pin": values.pin,
            "wages": values.wages,
            "address_line_1": values.address_line_1,
            "city": values.city,
            "zip": values.zipcode,
            "state": values.state,
          }
          try {
            const response = await axios.post(BASE_URL + ADDEDIT_EMPLOYEE, data, { headers: { "Content-Type": "multipart/form-data" } })
            console.log(response)
            if ( response.data.status === true) {
              let data = {
                  merchant_id: "MAL0100CA",
              };
              if (data) {
                  dispatch(fetchEmployeeListsData(data));
              }
              setShowModal(false);
              // Navigate("/");
            }
            else {
            //   await handleScrollClick()
               setsubmitmessage(response.data.message);
               setShowModal(true)
            }
          } catch (error) {
            return new Error(error)
          }
        }
    
        setValues((prevState) => ({
          ...prevState,
          errors,
        }));
      };

      return { handleAddEmployeeInput, values, handleAddEmployee, submitmessage, setsubmitmessage , showModal , setShowModal , scrollRef  };
}

export default AddEmployeeFormLogic;