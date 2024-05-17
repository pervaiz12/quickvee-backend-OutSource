import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { FormControl, Grid } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import SearchableDropdown from "../Products/SearchableDropdown";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const FormInputFields = {
  "First Name": "",
  "Last Name": "",
  "Mobile Name": null,
  "Email Address": "",
  Password: "",
  stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
};
const AddManagerFormModel = (props) => {
  let storeData=props.stores?.data?.stores
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [formInputs, setFormInputs] = useState(FormInputFields);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectedOptions =(value, name)=>{
      setSelectedOption((prev)=> [...prev, value])
  }

  const handleDeleteSelectedOption=(id, name)=>{
    // setSelectedOption(()
    // console.log(name)
    const filtervalue = selectedOption?.filter((opt)=>{
      return opt?.id !== id
    })
    setSelectedOption(filtervalue)
  }
  return (
    <>
      <Button onClick={handleOpen}>
        <p
          className="me-3 select-none managerStore-btn"
          style={{ whiteSpace: "nowrap" }}
        >
          Add Manager
        </p>
        <img src={AddIcon} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid container>
              <Grid item>
                <p
                  className="me-3 select-none Add-manager-forrm-title"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Add Employee
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label>First Name</label>
                <BasicTextFields
                  name="First Name"
                  value={formInputs["First Name"]}
                  onChangeFun={onChangeHandler}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Last Name</label>
                <BasicTextFields
                  name="Last Name"
                  value={formInputs["Last Name"]}
                  onChangeFun={onChangeHandler}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Mobile Name</label>
                <BasicTextFields
                  type={"number"}
                  name="Mobile Name"
                  value={formInputs["Mobile Name"]}
                  onChangeFun={onChangeHandler}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label>Email Address</label>
                <BasicTextFields
                  name="Email Address"
                  value={formInputs["Email Address"]}
                  onChangeFun={onChangeHandler}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Password</label>
                <BasicTextFields
                  name="Password"
                  value={formInputs["Password"]}
                  onChangeFun={onChangeHandler}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <div className="">
                  <SearchableDropdown 
                     keyName="stores"
                     optionList={storeData}
                     handleSelectProductOptions={handleSelectedOptions}
                     name="name"
                     selectedOption={selectedOption}
                     handleDeleteSelectedOption={handleDeleteSelectedOption}
                    //  selectedOption={productInfo?.relatedProduct}
                    //  error={error}
                     // handleUpdateError={handleUpdateError}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AddManagerFormModel;
