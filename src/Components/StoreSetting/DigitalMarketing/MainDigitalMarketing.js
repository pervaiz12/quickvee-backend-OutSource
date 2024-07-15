import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Box, Modal, Grid, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";

import CrossIcon from "../../../Assests/Dashboard/cross.svg";
import AddIcon from "../../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../../Assests/Category/editIcon.svg";
import DeleteIconAll from "../../../Assests/Defaults/deleteIcon.svg";

import { fetchdigitalMarketingData ,deleteDigitalMarketing} from "../../../Redux/features/DigitalMarketing/digitalMarketingSlice";
import { BASE_URL, DIGITALMAKRTING_UPDATE } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../../Common/passwordShow";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import { SkeletonTable } from "../../../reuseableComponents/SkeletonTable";
import DeleteModal from "../../../reuseableComponents/DeleteModal";


const MainDigitalMarketing = ({ seVisible }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();

  const [digitalMarketingField, setDigitalMarketingField] = useState({
    id:"",
    tags:"",
    links:"",
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
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
    if (error.status === 401 || error.response.status === 401) {
      getUnAutherisedTokenMessage();
      handleCoockieExpire();
    } else if (error.status === "Network Error") {
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

  const changeTittleHandler = (event) => {
    const { name, value } = event.target;
    const regex = /^[A-Za-z0-9 ]*$/;
    if (regex.test(value) || value === "") {
      setDigitalMarketingField({ ...digitalMarketingField, [name]: value });
      setErrorMessage("");
    } else {
      setErrorMessage("Special characters are not allowed");
    }
  };

  const handleDigital = async () => {
    if (!digitalMarketingField.tags.trim()) {
      setErrorMessage("Tag is required");
      return;
    }
    if (!digitalMarketingField.links.trim()) {
      setErrorMessage("Link is required");
      return;
    }

    try {
      const newItem = {
        merchant_id,
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


  const handleEdit = (id) => {
    setShowModalEdit(true);

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
          tags_id: deleteDefaultId,
          merchant_id,
          ...userTypeData,
        };
        // console.log("confirmDeleteCategory",data)
        // return
        if (data) {
          await dispatch(deleteDigitalMarketing(data)).unwrap();
          ToastifyAlert("Deleted Successfully", "success");
        }
      }
      setDeleteDefaultId(null);
      setDeleteModalOpen(false);
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };



  const closeModalEdit = () => {
    setDigitalMarketingField({ ...digitalMarketingField, tags: "", links: "" });
    setShowModalEdit(false);
    setErrorMessage("");
  };

  const handleDigitalEdit = () =>{

  }

  console.log("digitalmarketing",digitalmarketing)

  return (
    <>
      <div className="box">
        <div className="q-attributes-bottom-detail-section">
          <div className="q-attributes-bottom-header-sticky">
            <div className="q-attributes-bottom-header">
              <span>Digital Marketing</span>
              {Object.keys(digitalmarketing).length > 0 && (
                <p onClick={openModal}>
                  Add Digital Marketing<img src={AddIcon} alt="add-icon" />
                </p>
              )}
            </div>
          </div>

          <Grid container>
            {digitalmarketing.loading ? (
              <SkeletonTable
                columns={[
                  <div className="category-checkmark-div defaultCheckbox-div" style={{ width: "unset !important" }}>
                    <label className="category-checkmark-label">
                      <input type="checkbox" id="selectAll" />
                      <span className="category-checkmark" style={{ left: "1rem", transform: "translate(0px, -10px)" }}></span>
                    </label>
                  </div>,
                  "Tag",
                  "Link",
                  <div className="default-Edit-Delete">
                    <img src={DeleteIconAll} alt="delete-icon" />
                  </div>,
                ]}
              />
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
                  <TableBody>
                    {/* {digitalmarketing.length > 0 &&
                      digitalmarketing.map((data, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>{data.tags || ""}</StyledTableCell>
                          <StyledTableCell>{data.links || ""}</StyledTableCell>
                          <StyledTableCell>
                            <div className="default-Edit-Delete">
                              <img className="mx-1 edit cursor-pointer" src={EditIcon} alt="Edit" />
                              <img className="mx-1 delete cursor-pointer" src={DeleteIcon} alt="Delete" />
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))} */}
                      {Object.keys(digitalmarketing).length > 0 && (
                        <>
                      <StyledTableCell>{digitalmarketing?.tags || ""}</StyledTableCell>
                      <StyledTableCell>{digitalmarketing?.links || ""}</StyledTableCell>
                      <StyledTableCell>
                            <div className="default-Edit-Delete">
                              <img className="mx-1 edit cursor-pointer" src={EditIcon} onClick={() => handleEdit(digitalmarketing?.id)} alt="Edit" />
                              <img className="mx-1 delete cursor-pointer" src={DeleteIcon} onClick={() => handleDelete(digitalmarketing?.id)} alt="Delete" />
                            </div>
                          </StyledTableCell>
                          </>
                        )}
                  </TableBody>
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
                  <BasicTextFields value={digitalMarketingField.tags} name="tags" onChangeFun={changeTittleHandler} placeholder="Enter Tags" />
                  <label className="mb-2">Links</label>
                  <BasicTextFields value={digitalMarketingField.links} name="links" onChangeFun={changeTittleHandler} placeholder="Enter Links" />
                  <span className="input-error">{errorMessage}</span>
                </div>
              </div>
              <div className="q-add-categories-section-middle-footer">
                <button onClick={handleDigital} className="quic-btn quic-btn-save">Add</button>
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
                  <BasicTextFields value={digitalMarketingField.tags} name="tags" onChangeFun={changeTittleHandler} placeholder="Enter Tags" />
                  <label className="mb-2">Links</label>
                  <BasicTextFields value={digitalMarketingField.links} name="links"  onChangeFun={changeTittleHandler} placeholder="Enter Links" />
                  <span className="input-error">{errorMessage}</span>
                </div>
              </div>
              <div className="q-add-categories-section-middle-footer">
                <button onClick={handleDigitalEdit} className="quic-btn quic-btn-save">Update</button>
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
