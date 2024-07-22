import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, Modal, Grid, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";

import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../../Assests/Category/editIcon.svg";


import { fetchdigitalMarketingData ,deleteDigitalMarketing} from "../../../Redux/features/DigitalMarketing/digitalMarketingSlice";
import { BASE_URL, DIGITALMAKRTING_UPDATE } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../../Common/passwordShow";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import DeleteModal from "../../../reuseableComponents/DeleteModal";
import CircularProgress from "@mui/material/CircularProgress";

const MainDigitalMarketing = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const [loader, setLoader] = useState(false);

  const [digitalMarketingField, setDigitalMarketingField] = useState({
    id:"",
    tags:"",
    links:"",
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
  });
  const [error, setError] = useState({
    tags: "",
    links: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [digitalmarketing, setDigitalmarketing] = useState([]);

  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } = PasswordShow();
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const dispatch = useDispatch();
  const DigitalMarketingDataState = useSelector((state) => state.digitalmarketing);

  useEffect(() => {
    getfetchdigitalMarketingData();
  }, []);

  useEffect(() => {
    if (!DigitalMarketingDataState.loading && DigitalMarketingDataState.digitalMarketingData) {
      setDigitalmarketing(DigitalMarketingDataState.digitalMarketingData);
    }
  }, [DigitalMarketingDataState]);

  const getfetchdigitalMarketingData = async () => {
    try {
      const data = {
        merchant_id,
        ...userTypeData,
      };
      await dispatch(fetchdigitalMarketingData(data)).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.log('error', error);
    if (error?.status === 401 || error?.response?.status === 401) {
      getUnAutherisedTokenMessage();
      handleCoockieExpire();
    } else if (error?.status === "Network Error") {
      getNetworkError();
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setDigitalMarketingField({ ...digitalMarketingField, tags: "", links: "" });
    setShowModal(false);
    setErrorMessage("");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value;
    //const trimmedValue = value.trim();
    if (name === "tags") {
        if (trimmedValue === "") {
          setError((prevError) => ({
            ...prevError,
            tags: "Tag is required",
          }));
        } else {
          setError((prevError) => ({ ...prevError, tags: "" }));
        }
        setDigitalMarketingField((prevState) => ({
          ...prevState,
          [name]: trimmedValue,
        }));
    } else if (name === "links") {
      if (trimmedValue === "") {
        setError((prevError) => ({
          ...prevError,
          links: "Link is required",
        }));
      } else {
        setError((prevError) => ({ ...prevError, links: "" }));
      }
      setDigitalMarketingField((prevState) => ({
        ...prevState,
        [name]: trimmedValue,
      }));
    }
  };

  const handleDigital = async () => {
    if (digitalMarketingField.tags === "") {
      setError((prevError) => ({ ...prevError, tags: "Tag is required" }));
      if (digitalMarketingField.links === "") {
        setError((prevError) => ({
          ...prevError,
          links: "Link is required",
        }));
      }
      return;
    }

    if (digitalMarketingField.links === "") {
      setError((prevError) => ({ ...prevError, links: "Link is required" }));
      if (digitalMarketingField.links === "") {
        setError((prevError) => ({
          ...prevError,
          links: "Link is required",
        }));
      }
      //return;
    }
    if (digitalMarketingField.tags === "") {
      setError((prevError) => ({
        ...prevError,
        tags: "Tag is required",
      }));
      // return;
    }
    if (
      error.links === "Link is required" ||
      error.tags === "Tag is required" 
    ) {
      return;
    }

    setLoader(true);
    try {
      const newItem = {
        merchant_id:merchant_id,
        tags:digitalMarketingField.tags,
        links:digitalMarketingField.links,
        token_id: userTypeData?.token_id,
        login_type: userTypeData?.login_type,
      };
      const response = await axios.post(BASE_URL + DIGITALMAKRTING_UPDATE, newItem, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });

      if (response) {
        setShowModal(false);
        ToastifyAlert("Added Successfully", "success");
        setDigitalMarketingField({ ...digitalMarketingField, tags: "", links: "" });
        getfetchdigitalMarketingData();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      handleError(error);
    }
    setLoader(false);
  };

  const myStyles = {
    width: "60%",
    position: "absolute",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "'CircularSTDMedium', sans-serif !important",
  };

  const StyledTable = styled(Table)(({ theme }) => ({
    padding: 2,
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#253338",
      color: theme.palette.common.white,
      fontFamily: "CircularSTDMedium",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: "CircularSTDBook",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    "& td, & th": {
      border: "none",
    },
  }));


  const handleEdit = (id, tags, links) => {
    setDigitalMarketingField({
      id,
      tags,
      links,
    });
    setShowModalEdit(true);
    setError({
      tags: "",
      links: "",
    });
  };

  const [deleteDefaultId, setDeleteDefaultId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  const handleDelete = (id) =>{
    setDeleteDefaultId(id);
    setDeleteModalOpen(true);
  }

  const confirmDeleteCategory = async () => {
    try {
      if (deleteDefaultId) {
        const data = {
          tags_id:deleteDefaultId,
          merchant_id,
          ...userTypeData,
        };
        //console.log("confirmDeleteCategory",data)
        //return
        if (data) {
          await dispatch(deleteDigitalMarketing(data)).unwrap();
          ToastifyAlert("Deleted Successfully", "success");
        }
      }
      setDeleteDefaultId(null);
      setDeleteModalOpen(false);
    } catch (error) {
        handleError(error);
    }
    setDeleteDefaultId(null);
    setDeleteModalOpen(false);
  };



  const closeModalEdit = () => {
    setDigitalMarketingField({ ...digitalMarketingField, tags: "", links: "" });
    setShowModalEdit(false);
    setErrorMessage("");
  };

  const handleDigitalEdit = async () =>{
    if (digitalMarketingField.tags === "") {
      setError((prevError) => ({ ...prevError, tags: "Tag is required" }));
      if (digitalMarketingField.links === "") {
        setError((prevError) => ({
          ...prevError,
          links: "Link is required",
        }));
      }
      return;
    }

    if (digitalMarketingField.links === "") {
      setError((prevError) => ({ ...prevError, links: "Link is required" }));
      if (digitalMarketingField.links === "") {
        setError((prevError) => ({
          ...prevError,
          links: "Link is required",
        }));
      }
      return;
    }
    if (digitalMarketingField.tags === "") {
      setError((prevError) => ({
        ...prevError,
        tags: "Tag is required",
      }));
      // return;
    }
    if (
      error.links === "Link is required" ||
      error.tags === "Tag is required" 
    ) {
      return;
    }
    const formData = new FormData();
    // Append your tax data
    formData.append("tags_id",digitalMarketingField.id);
    formData.append("tags",digitalMarketingField.tags);
    formData.append("merchant_id",merchant_id);
    formData.append("links",digitalMarketingField.links);
    formData.append("token_id",userTypeData?.token_id);
    formData.append("login_type",userTypeData?.login_type);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    //return
    setLoader(true);
    try {
      const response = await axios.post(
        BASE_URL + DIGITALMAKRTING_UPDATE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userTypeData?.token}`,
          },
        }
      );
      if (response.data.status === true) {
        try {
          let data = {
            merchant_id,
            ...userTypeData,
          };
          if (data) {
            await dispatch(fetchdigitalMarketingData(data)).unwrap();
          }
        } catch (error) {
          if (error.status == 401 || error.response.status === 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error.status == "Network Error") {
            getNetworkError();
          }
        }
        ToastifyAlert("Updated Successfully", "success");
        closeModalEdit();
      } else {
        ToastifyAlert(response.data.message, "error");
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
    setLoader(false);
  }

  const columns = [
    "Tag",
    "Link",
  ];

  return (
    <>
      <div className="box">
        <div className="q-attributes-bottom-detail-section">
          <div className="q-attributes-bottom-header-sticky">
            <div className="q-attributes-bottom-header">
              <span>Digital Marketing</span>
              {!digitalmarketing.status &&(
                <p onClick={openModal}>
                  Add Digital Marketing<img src={AddIcon} alt="add-icon" />
                </p>
              )}
            </div>
          </div>

          <Grid container>
            {digitalmarketing.loading ? (
              <SkeletonTable columns={columns} />
            ) : (
              <TableContainer>
                <StyledTable sx={{ minWidth: 500 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Tag</StyledTableCell>
                      <StyledTableCell>Link</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {!DigitalMarketingDataState.digitalMarketingData?.status ? 
                    <StyledTableCell>NO DATA FOUND</StyledTableCell>:
                    <TableBody>
                        <StyledTableCell>{digitalmarketing.tags_data?.tags || ""}</StyledTableCell>
                        <StyledTableCell>{digitalmarketing.tags_data?.links || ""}</StyledTableCell>
                        <StyledTableCell>
                          <div className="default-Edit-Delete">
                            <img className="mx-1 edit cursor-pointer" src={EditIcon}   onClick={() => handleEdit(digitalmarketing.tags_data?.id, digitalmarketing.tags_data?.tags, digitalmarketing.tags_data?.links)} alt="Edit" />
                            <img className="mx-1 delete cursor-pointer" src={DeleteIcon} onClick={() => handleDelete(digitalmarketing.tags_data?.id)} alt="Delete" />
                          </div>
                        </StyledTableCell>
                    </TableBody>
                  }
                </StyledTable>
                </TableContainer>
            )}
          </Grid>

          <Modal open={showModal} onClose={closeModal}>
            <Box className="view-category-item-modal" style={myStyles}>
              <div className="q-add-categories-section-header text-[18px]" style={{ justifyContent: "space-between", fontFamily: "CircularSTDBook" }}>
                <span>Add Digital Marketing</span>
                <img src={CrossIcon} alt="icon" className="w-6 h-6 cursor-pointer" onClick={closeModal} />
              </div>
              <div className="view-category-item-modal-header">
                <div className="title_attributes_section" style={{ margin: "1rem 1rem" }}>
                  <label className="mb-2">Tags</label>
                  <BasicTextFields value={digitalMarketingField.tags} name="tags" onChangeFun={changeHandler} placeholder="Enter Tags" />
                  <span className="input-error">
                      {error.tags !== "" ? error.tags : ""}
                  </span>
                  <label className="mb-2">Links</label>
                  <BasicTextFields value={digitalMarketingField.links} name="links" onChangeFun={changeHandler} placeholder="Enter Links" />
                  <span className="input-error">
                      {error.links !== "" ? error.links : ""}
                    </span>
                  <span className="input-error">{errorMessage}</span>
                </div>
              </div>
              <div className="q-add-categories-section-middle-footer">
                <button onClick={handleDigital} disabled={loader} className="quic-btn quic-btn-save attributeUpdateBTN">
                {loader ? ( <><CircularProgress color={"inherit"} className="loaderIcon"  width={15}  size={15}/>Add{" "} </>
                  ) : (
                    "Add"
                  )}
                </button>
                <button onClick={closeModal} className="quic-btn quic-btn-cancle">Cancel</button>
              </div>
            </Box>
          </Modal>


          <Modal open={showModalEdit} onClose={closeModalEdit}>
            <Box className="view-category-item-modal" style={myStyles}>
              <div className="q-add-categories-section-header text-[18px]" style={{ justifyContent: "space-between", fontFamily: "CircularSTDBook" }}>
                <span>Edit Digital Marketing</span>
                <img src={CrossIcon} alt="icon" className="w-6 h-6 cursor-pointer" onClick={closeModalEdit} />
              </div>
              <div className="view-category-item-modal-header">
                <div className="title_attributes_section" style={{ margin: "1rem 1rem" }}>
                  <label className="mb-2">Tags</label>
                  <BasicTextFields value={digitalMarketingField.tags} name="tags" onChangeFun={changeHandler} placeholder="Enter Tags" />
                  <span className="input-error">
                      {error.tags !== "" ? error.tags : ""}
                    </span>
                  <label className="mb-2">Links</label>
                  <BasicTextFields value={digitalMarketingField.links} name="links"  onChangeFun={changeHandler} placeholder="Enter Links" />
                  <span className="input-error">
                      {error.links !== "" ? error.links : ""}
                    </span>
                  <span className="input-error">{errorMessage}</span>
                </div>
              </div>
              <div className="q-add-categories-section-middle-footer">
                <button onClick={handleDigitalEdit} disabled={loader} className="quic-btn quic-btn-save attributeUpdateBTN">
                  {loader ? ( <><CircularProgress color={"inherit"} className="loaderIcon"  width={15}  size={15}/>Update{" "} </>
                  ) : (
                    "Update"
                  )}
                </button>
                <button onClick={closeModalEdit} className="quic-btn quic-btn-cancle">Cancel</button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>

      <DeleteModal
        headerText="Digital Marketing"
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={confirmDeleteCategory}
      />
    </>
  );
};

export default MainDigitalMarketing;
