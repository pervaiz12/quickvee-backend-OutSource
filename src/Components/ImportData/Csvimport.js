import React, { useState, useRef } from 'react';
import axios from "axios";
import UploadIcon from "../../Assests/Dashboard/upload.svg";
import { BASE_URL, IMPORT_DATA } from '../../Constants/Config';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthDetails } from "../../Common/cookiesHelper";
import { CircularProgress } from "@mui/material";

import Modal from '@mui/material/Modal';
import { ToastifyAlert } from '../../CommonComponents/ToastifyAlert';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileData, setFileData] = useState(null);
  const inputRef = useRef(null);
  const [filename, setfilename] = useState(null);
  const [alertmsg,setalertmsg] = useState(null);
  const [openAlert, setOpenAlert] = useState();
  const [loading, setLoading] = useState(false);

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const goToTop = () => {
        setOpenAlert(false);
        setalertmsg("");
    };

  if(alertmsg){
    setTimeout(() => {
      setalertmsg('');
    }, 10000);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
      setfilename(e.target.files[0].name);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
      setfilename(e.target.files[0].name);
    }
    else
    {
      setfilename('');
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleFile = (files) => {
    setFileData(files); // Store the selected files
    setfilename(files[0].name);
  };

  const handleSubmit = async () => {
    // Handle your submit logic with fileData
    // console.log('Submitting data:', fileData);
    const fileInput = document.getElementById('input-file-upload');
    const csvfileData = fileInput.files[0]; 
    if(!csvfileData){
      return alert("Please Upload Files With .CSV Extenion Only.")
    }
    setLoading(true);
    const formData = new FormData();
    // Append the merchant_id and the file to the FormData
    formData.append("merchant_id", merchant_id);
    formData.append("file", csvfileData);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("login_type", userTypeData?.login_type);
    
    const response = await axios.post(BASE_URL + IMPORT_DATA, formData, {
      headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${userTypeData?.token}`, },
    });
    if (response) {
      // console.log(response);
      ToastifyAlert(response.data.message, "success");
      // setalertmsg(response.data.message);
      // alert(response.data.message);
      // setOpenAlert(true);
      // console.log(alertmsg);
      setfilename('');
    } else {
      alert('Something went wrong !');
    }
    setLoading(false);
    // Add your specific submit logic here
    // For example, you can send the data to a server
  };


  const [openModal, setOpenModal] = useState(false);

  // Function to handle closing modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to handle opening modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    

    <div className="box">     
     
      <div
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
        className="importBtn" 
        style={{ boxShadow: "0px 3px 6px #0000001F" }}
      >
        {alertmsg &&
          <Box sx={{ width: '50%', position: 'absolute' , top: '0' , bottom:'0'}}   className={alertmsg ? "form-submit-info-message" : ""}  >    
            {
               alertmsg &&       
                  <Collapse in={openAlert}>
                
                    <Alert severity="info"
                      action={
                        <IconButton
                        className="info-close-icon"
                          aria-label="close"
                          color="info"
                          size="small"
                          onClick={goToTop}
                        >
                          <CloseIcon  />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                    {alertmsg}
                    </Alert> 
                  </Collapse>
            }
          </Box>
        }
        {/* <button onClick={handleOpenModal}>Open Modal</button> */}

        {/* Modal */}
     

        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          // multiple={true}
          name="file"
          onChange={handleChange}
          className="mb-4 hidden"
        />
        <label
          htmlFor="input-file-upload"
          className={`import_container ${
            dragActive ? "bg-gray-100" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div>
            <p className="import_text">
              Only CSV file import
            </p>
            <button
              className="importcsvbutton"
              onClick={onButtonClick}
            >
              Choose Files
              <img src={UploadIcon} alt="" className="ml-2 h-6 w-6" />
            </button>
            <span>{filename !== "undefined" ? filename : ''}</span>
          </div>
        </label>

        {dragActive && (
          <div
            className="absolute w-full h-full rounded-lg top-0 left-0"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}

        {/* Moved "Import" button below border-dashed */}
        <div className=" mb-4">
          <button
            onClick={() => {
              handleSubmit();
              handleOpenModal();
            }}
            className="imp_btn"
            disabled={loading}
          >
            {loading ? (
                  <Box className="loader-box">
                    <CircularProgress />
                  </Box>
                ) : (
                  "Import"
                )}
          </button>
</div>

      </div>
    </div>
  );
};

const Csvimport = () => {
  return (
    <div className="page">
      <FileUpload />
    </div>
  );
};

export default Csvimport;
