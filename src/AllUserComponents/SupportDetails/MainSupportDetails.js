import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import AlertModal from "../../reuseableComponents/AlertModal";
import PasswordShow from "./../../Common/passwordShow";
import { fetchsupportDetailsData } from "../../Redux/features/SupportDetails/supportDetailsSlice";
import { useAuthDetails } from "../../Common/cookiesHelper";
import EditIcon from "../../Assests/Category/editIcon.svg";
import { Box, Button, Grid, Modal } from "@mui/material";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { BASE_URL, SUPPORT_DETAILS_EDIT } from "../../Constants/Config";

const  MainSupportDetails = () => {
  const StyledTable = styled(Table)(({ theme }) => ({
    padding: 2, // Adjust padding as needed
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#253338",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    [`&.${tableCellClasses.table}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


  const dispatch = useDispatch();
  const [supportDetail, setSupportDetail] = useState("");
  const suppoertDetailDataState = useSelector((state) => state.supportDetail);
  const { userTypeData } = useAuthDetails();
 
  const {handleCoockieExpire,getUnAutherisedTokenMessage}=PasswordShow()

  useEffect(() => {
    getfetchsupportDetailDataData()
  }, []);

  const getfetchsupportDetailDataData=async()=>{
    try{
      let data = {
        ...userTypeData,
      };
      if (data) {
        await dispatch(fetchsupportDetailsData(data)).unwrap();
      }
    }catch(error){
      if(error.status === 401){
        handleCoockieExpire()
        getUnAutherisedTokenMessage()
      }
    }
  }
  useEffect(() => { 
    if (!suppoertDetailDataState.loading && suppoertDetailDataState.supportDetailsData){
      setSupportDetail(suppoertDetailDataState.supportDetailsData);
    }
  }, [ suppoertDetailDataState, suppoertDetailDataState.loading,suppoertDetailDataState.supportDetailsData]);

  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  

  const handleOpen = () => {
    setSupportfield({
      id: supportDetail.id,
      phone: supportDetail.phone,
      option_text: supportDetail.option_text,
    })
    setOpen(true);
    setError({  
      phone: "",
      option_text: "",
     });
  };
  const [error, setError] = useState({
    phone: "",
    option_text: "",
  });

  const [supportfield, setSupportfield] = useState({
    id:"",
    phone: "",
    option_text: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        if (value === "") {
          setError((prevError) => ({ ...prevError, phone: "Phone is required" }));
        } else if (value.length !== 10) {
          setError((prevError) => ({ ...prevError, phone: "Phone number must be exactly 10 digits" }));
        } else {
          setError((prevError) => ({ ...prevError, phone: "" }));
        }
        setSupportfield((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else if (name === "option_text") {
      if (value === "") {
        setError((prevError) => ({ ...prevError, option_text: "Option Text is required" }));
      } else {
        setError((prevError) => ({ ...prevError, option_text: "" }));
      }
      setSupportfield((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(supportfield.phone === ""){
      setError((prevError) => ({ ...prevError, phone: "Phone is required" }));
      if(supportfield.option_text === ""){
        setError((prevError) => ({ ...prevError, option_text: "Option Text is required" }));
      } 
      return;
    }
    if (supportfield.phone.length !== 10) {
      setError((prevError) => ({ ...prevError, phone: "Phone number must be exactly 10 digits" }));
      // return;
    }
    if(supportfield.option_text === ""){
      setError((prevError) => ({ ...prevError, option_text: "Option Text is required" }));
      // return;
    }
    if(error.phone === "Phone is required" || 
      error.phone === "Phone number must be exactly 10 digits" || 
      error.option_text === "Option Text is required" ){
      return
    }
    const formData = new FormData();
      // Append your tax data
      formData.append("id",supportfield.id);
      formData.append("phone",supportfield.phone);
      formData.append("option_text",supportfield.option_text);
      formData.append("token_id",userTypeData?.token_id);
      formData.append("login_type",userTypeData?.login_type);

      setLoader(true);
      try {
        const response = await axios.post(BASE_URL + SUPPORT_DETAILS_EDIT, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userTypeData?.token}`,
          },
        });
        if (response.data.status === true) {
          try{
            let data = {
              ...userTypeData,
            };
            if (data) {
              await dispatch(fetchsupportDetailsData(data)).unwrap();
            }
          }catch(error){
            if(error.response.status === 401){
              handleCoockieExpire();
              getUnAutherisedTokenMessage();
            }
          }
          ToastifyAlert("Updated Successfully", "success");
          handleClose()
        } else {
          ToastifyAlert(response.data.message, "error");
        }
      } catch (error) {
        console.error("API Error:", error);
        if(error.response.status === 401){
          handleCoockieExpire();
          getUnAutherisedTokenMessage();
        }
      }
      setLoader(false);
  }

  const myStyles = {
    width: "60%",
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
    <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              borderBottom: "1px solid #E8E8E8",
            }}
          >
            <Grid item>
              <div className="q-category-bottom-header">
                <span>Support Details</span>
              </div>
            </Grid>
          </Grid>

          <Grid container>
            <TableContainer>
              <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>Option Text</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                      <StyledTableCell>
                        <div class="text-[#000000] order_method ">
                          {supportDetail?.phone || ""}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div class="text-[#000000] order_method ">
                          {supportDetail?.option_text || ""}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className="default-Edit-Delete ">
                          <img
                            className="mx-1 edit cursor-pointer"
                            onClick={handleOpen}
                            src={EditIcon}
                            alt="Edit"
                          />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
              </StyledTable>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    

      {/* for modal Edit start */}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="view-category-item-modal" style={myStyles}>
          <div
            class="q-add-categories-section-header text-[18px]"
            style={{
              justifyContent: "space-between",
              fontFamily: "CircularSTDBook",
            }}
          >
            <span>
              <span>Edit Details</span>
            </span>
            <div>
              <img
                src="/static/media/cross.02a286778a0b1b3162ac5e3858cdc5f1.svg"
                alt="icon"
                class="  quic-btn-cancle w-6 h-6"
                style={{ cursor: "pointer" }}
                onClick={() => handleClose()}
              />
            </div>
          </div>

          {/* </div> */}
          <div className="view-category-item-modal-header">
            <form  enctype="multipart/form-data">
              <div className="q-add-categories-section-middle-form">
                <div className="qvrow">
                  <Grid item xs={12} sm={6} md={6}>
                    <div className=" qvrowmain my-1">
                      <label >Phone</label>
                    </div>
                    <BasicTextFields
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      maxLength={10}
                      onChangeFun={handleChange}
                      value={supportfield.phone}
                    />
                    <span className="input-error">
                      {error.phone !== "" ? error.phone : ""}
                    </span>
                    <div className=" qvrowmain my-1">
                      <label >Option Text</label>
                    </div>
                    <BasicTextFields
                      type="text"
                      name="option_text"
                      placeholder="Option Text"
                      onChangeFun={handleChange}
                      value={supportfield.option_text}
                    />
                     <span className="input-error">
                      {error.option_text !== "" ? error.option_text : ""}
                    </span>
                  </Grid>
                </div>
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save attributeUpdateBTN" disabled={loader}  onClick={handleSubmit}>
                {loader ? ( <><CircularProgress color={"inherit"} className="loaderIcon" width={15} size={15} />{" "}  Update </>) : ("Update")}
                </button>
                <button onClick={() => handleClose()}  className="quic-btn quic-btn-cancle">Cancel</button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {/* for modal Edit End */}

    </>
  )
}

export default MainSupportDetails