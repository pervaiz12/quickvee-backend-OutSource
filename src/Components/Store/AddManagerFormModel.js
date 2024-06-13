import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { CircularProgress, FormControl, Grid } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import * as yup from "yup";

import "../../Styles/Manager.css";
import { addManager } from "../../Redux/features/user/managerSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { useDispatch } from "react-redux";
import { handleUserType } from "../../Redux/features/Authentication/loginSlice";
import EditIcon from "../../Assests/Category/editIcon.svg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "#ffffff",
  boxShadow: 24,
  borderRadius: "8px",
};
const FormInputFields = {
  fname: "",
  lname: "",
  mobile: null,
  email: "",
  password: "",
  stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
};
const AddManagerFormModel = (props) => {
  const {modalData, modalType, fetchManagerListing} = props;

  const dispatch = useDispatch();
  const { LoginGetDashBoardRecordJson, userTypeData, GetSessionLogin } = useAuthDetails();

  let storeData = props.stores?.data?.stores;
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [formInputs, setFormInputs] = useState(FormInputFields);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    modalType === 'add' && setSelectedOption([]);    
    modalType === 'add' && setFormInputs(FormInputFields);
    setError({});
  }
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({});

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === 'mobile') {
      // Allow only numeric characters
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormInputs((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));
    }else{
      setFormInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(()=>{
    if(modalData){
      const getSelectedItems = modalData?.merchant_id?.split(',')?.map((item)=> {
        return storeData?.filter((st)=> st?.merchant_id === item)
      })
      setSelectedOption(getSelectedItems?.flat())

      setFormInputs({
        fname: modalData?.f_name,
        lname: modalData?.l_name,
        mobile: modalData?.phone,
        email: modalData?.email,
        password: modalData?.password,
        stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
      });
    }
  },[modalData, modalType, storeData])

  const handleSelectedOptions = (value, name) => {
    setSelectedOption((prev) => [...prev, value]);
  };

  const handleDeleteSelectedOption = (id, name) => {
    const filtervalue = selectedOption?.filter((opt) => {
      return opt?.id !== id;
    });
    setSelectedOption(filtervalue);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const formSchema = yup.object().shape({
    fname: yup
      .string()
      .required("First Name is Required")
      .matches(/^[^\d]*$/, "first name only contains alphabet"),
    lname: yup
      .string()
      .required("Last Name is Required")
      .matches(/^[^\d]*$/, "last name only contains alphabet"),
      email: yup.string()
      .matches(emailRegex, "Invalid email address")
      .required("Email is required"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number is not valid")
      .required("Mobile number is required"),
    password: modalType === 'add' ?  yup
      .string()
      .required("Password is Required") : yup.string(),
    selectedOption: yup
      .array()
      .min(1, "select an store")
      .required("select an store"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const formData ={
      f_name: formInputs['fname'],
      l_name: formInputs['lname'],
      email: formInputs['email'],
      phone: formInputs['mobile'],
password: formInputs['password']?.trim(),
store_id: selectedOption?.map((i) => i?.merchant_id).toString(),
manager_id: modalType === 'add' ? "":modalData?.id,
created_by_id:  LoginGetDashBoardRecordJson?.data?.user_id,
...userTypeData,
    }
    try {
      const response = await formSchema.validate(
        { ...formInputs, selectedOption },
        {
          abortEarly: false,
        }
      );
      setError({});
      if (response) {
        setLoading(true);
        try {
          const res = await dispatch(addManager(formData));
          if (res?.payload?.status) {
            modalType === 'add' ? 
            ToastifyAlert("Manager Added Successfully!", "success") : 
            ToastifyAlert("Manager Edited Successfully!", "success")
            // call here fetch api of all manager 
            fetchManagerListing()
            handleClose();
            setSelectedOption([]);
            setFormInputs(FormInputFields);
          } else if (res?.payload?.status === false && res?.payload?.msg === "Email already exists, please enter a different email.") {
            ToastifyAlert(res?.payload?.msg, 'error');
          }
        } catch (err) {
          ToastifyAlert("Error!", "error");
        } finally {
          setLoading(false);
        }
      }
    } catch (err) {
      let errorsList = {};
      setError({});
      if (err && err.inner) {
        err.inner.forEach((error) => {
          if (error.path) {
            errorsList[error.path] = error.message;
          }
        });
      }
      setError(errorsList);
    }
  };
  return (
    <>
      <Button onClick={handleOpen} disableRipple>
        <p
          className="me-3 select-none managerStore-btn managerStore-btn-add"
          style={{ whiteSpace: "nowrap" }}
        >
          {props?.modalType === 'add' ? 'Add Manager' : <img src={EditIcon} alt="edit-icon" /> }  
        </p>
         {props?.modalType === 'add' ? <img src={AddIcon} />:''}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="add-manager-modal">
          <form action="" onSubmit={handleSubmit}>
            <Grid container className="header">
              <Grid item>
                {/* <img src={AddNewCategory} alt="Add-New-Category" /> */}
                <span
                  className="me-3 select-none "
                  style={{ whiteSpace: "nowrap" }}
                >
                     {props?.modalType === 'add' ? 'Add Manager' : 'Edit Manager' }  
                </span>
                <img
                  src="/static/media/cross.02a286778a0b1b3162ac5e3858cdc5f1.svg"
                  alt="icon"
                  class=" quic-btn-cancle w-6 h-6"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClose()}
                />
              </Grid>
            </Grid>
            
            <div className="manager-form">
              <Grid container spacing={2}>
                <Grid item xs={4} className="input-box">
                  <label>First Name</label>
                  <BasicTextFields
                    name="fname"
                    value={formInputs["fname"]}
                    onChangeFun={onChangeHandler}
                    placeholder="First Name"
                  />
                   {error?.fname ? (
                    <span className="error-alert">{error?.fname}</span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={4} className="input-box">
                  <label>Last Name</label>
                  <BasicTextFields
                    name="lname"
                    value={formInputs["lname"]}
                    onChangeFun={onChangeHandler}
                    placeholder="Last Name"
                  />
                    {error?.lname ? (
                    <span className="error-alert">{error?.lname}</span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={4} className="input-box">
                  <label>Mobile Name</label>
                  <BasicTextFields
                    type="text"
                    name="mobile"
                    value={formInputs["mobile"]}
                    onChangeFun={onChangeHandler}
                    placeholder="Mobile"
                    maxLength={10}
                  />
                    {error?.mobile ? (
                    <span className="error-alert">{error?.mobile}</span>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4} className="input-box">
                  <label>Email Address</label>
                  <BasicTextFields
                    name="email"
                    value={formInputs["email"]}
                    onChangeFun={onChangeHandler}
                    placeholder="Email"
                  />
                    {error?.email ? (
                    <span className="error-alert">{error?.email}</span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={4} className="input-box">
                  <label>Password</label>
                  <BasicTextFields
                    name="password"
                    value={formInputs["password"]}
                    onChangeFun={onChangeHandler}
                    placeholder="Password"
                  />
                    {error?.password ? (
                    <span className="error-alert">{error?.password}</span>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className="input-box store-box">
                  <div className="">
                    <SearchableDropdown
                      title="Select Store"
                      keyName="selectedOption"
                      optionList={storeData}
                      handleSelectProductOptions={handleSelectedOptions}
                      name="name"
                      selectedOption={selectedOption}
                      handleDeleteSelectedOption={handleDeleteSelectedOption}
                      //  selectedOption={productInfo?.relatedProduct}
                       error={error}
                       placeholder="Enter Store Name"
                      // handleUpdateError={handleUpdateError}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="q-add-categories-section-middle-footer">
              <button className="quic-btn quic-btn-save" disabled={loading}> 
              {loading ? <Box className="loader-box">
                  <CircularProgress />
                </Box>: modalType === 'add' ? 'Add': 'Edit'} 
                </button>

              <button
                onClick={() => handleClose()}
                className="quic-btn quic-btn-cancle"
              >
                
            
                Cancel
                
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddManagerFormModel;
