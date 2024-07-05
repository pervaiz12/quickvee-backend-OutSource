import React, { useState, useRef } from "react";
import axios from "axios";
import UploadIcon from "../../Assests/Dashboard/upload.svg";
import { BASE_URL, IMPORT_DATA } from "../../Constants/Config";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { CircularProgress } from "@mui/material";

import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import AlertModal from "../../reuseableComponents/AlertModal";

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileData, setFileData] = useState(null);
  const inputRef = useRef(null);
  const [filename, setfilename] = useState(null);
  const [alertmsg, setalertmsg] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
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

  if (alertmsg) {
    setTimeout(() => {
      setalertmsg("");
    }, 10000);
  }

  // validating file
  function checkfile(file) {
    // console.log("file: ", file);
    if (!file) return false;

    let validExts = new Array(".csv"); // .xlsx", ".xls",
    let fileExt = file.name;
    // console.log("file name: ", fileExt);
    fileExt = fileExt.substring(fileExt.lastIndexOf("."));

    if (validExts.indexOf(fileExt) < 0) {
      // alert("Invalid file selected, Kindly please select a CSV file");
      showModal("Only files with .CSV extension is supported");
      return false;
    } else return true;
  }

  // handling file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files;
    const validFile = checkfile(file[0]);

    // console.log("inside handledrop file: ", file);
    // console.log("inside handledrop valid file: ", validFile);

    if (file && file[0] && validFile) {
      handleFile(file);
      setfilename(file[0].name);
    }
  };

  // handling file change
  const handleChange = (e) => {
    e.preventDefault();

    const file = e.target.files;
    const validFile = checkfile(file[0]);

    // console.log("valid file: ", validFile);

    if (file && validFile) {
      setfilename(file[0]?.name);
      handleFile(file);
    } else {
      setFileData(null);
      setfilename("");
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleFile = (files) => {
    if (files) {
      setFileData(files); // Store the selected files
      setfilename(files[0]?.name);
    }
  };

  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // console.log("Submitting data:", fileData);
      if (!fileData) {
        ToastifyAlert("Please add a .csv file to import", "error");
        return;
      }

      // const fileInput = document.getElementById("input-file-upload");
      // const csvfileData = fileInput.files[0];

      // console.log("csvfileData: ", csvfileData);
      // console.log("bool: ", csvfileData == fileData);
      // return;
      // if (!csvfileData) {
      //   return showModal("Only files with .CSV extension is supported");
      // }

      const formData = new FormData();
      // Append the merchant_id and the file to the FormData
      formData.append("merchant_id", merchant_id);
      formData.append("file", fileData);
      formData.append("token_id", userTypeData?.token_id);
      formData.append("login_type", userTypeData?.login_type);

      const response = await axios.post(BASE_URL + IMPORT_DATA, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });
      if (response) {
        // console.log(response);
        ToastifyAlert("Added Successfully", "success");
        setfilename("");
        setFileData(null);
      } else {
        showModal("Something went wrong !");
      }
    } catch (e) {
      console.log("Error: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      <div
        onSubmit={(e) => e.preventDefault()}
        className="importBtn"
        style={{ boxShadow: "0px 3px 6px #0000001F" }}
      >
        {alertmsg && (
          <Box
            sx={{ width: "50%", position: "absolute", top: "0", bottom: "0" }}
            className={alertmsg ? "form-submit-info-message" : ""}
          >
            {alertmsg && (
              <Collapse in={openAlert}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      className="info-close-icon"
                      aria-label="close"
                      color="info"
                      size="small"
                      onClick={goToTop}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {alertmsg}
                </Alert>
              </Collapse>
            )}
          </Box>
        )}

        <label
          htmlFor="input-file-upload"
          className={`import_container ${dragActive ? "bg-gray-100" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            // accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            accept=".csv" // .xlsx, .xls,
            id="input-file-upload"
            // multiple={true}
            name="file"
            onChange={handleChange}
            className="mb-4 hidden"
          />
          <div className="flex justify-center items-center flex-col">
            <p className="import_text">Only CSV file import</p>
            <button className="importcsvbutton" onClick={onButtonClick}>
              Choose Files
              <img src={UploadIcon} alt="" className="ml-2 h-6 w-6" />
            </button>
            <span>{filename !== "undefined" ? filename : ""}</span>
          </div>
        </label>
        {/* {console.log("dragActive: ", dragActive)} */}
        {/* {dragActive && (
          <div
            className="absolute w-full h-full rounded-lg top-0 left-0"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{ backgroundColor: "green" }}
          ></div>
        )} */}

        {/* Moved "Import" button below border-dashed */}
        <div className=" mb-4">
          <button
            onClick={handleSubmit}
            className="imp_btn attributeUpdateBTN"
            disabled={loading}
          >
            {loading && (
              <CircularProgress
                color={"inherit"}
                className="loaderIcon"
                width={15}
                size={15}
              />
            )}{" "}
            Import
          </button>
        </div>
        <AlertModal
          headerText={alertModalHeaderText}
          open={alertModalOpen}
          onClose={() => {
            setAlertModalOpen(false);
          }}
        />
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
