import React, { useState, useRef } from 'react';
import UploadIcon from "../../Assests/Dashboard/upload.svg";

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileData, setFileData] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleFile = (files) => {
    setFileData(files); // Store the selected files
  };

  const handleSubmit = () => {
    // Handle your submit logic with fileData
    console.log('Submitting data:', fileData);
    // Add your specific submit logic here
    // For example, you can send the data to a server
  };

  return (
    <div className="mx-2 mt-2">
      <div
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
        className="box-content h-[300px] p-4 border-4 border-white bg-white rounded-xl opacity-100 mt-9 flex justify-between mx-8 my-9 relative" // Added 'relative' class
        style={{ boxShadow: "0px 3px 6px #0000001F" }}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
          className="mb-4 hidden"
        />
        <label
          htmlFor="input-file-upload"
          className={`h-1/2 w-full flex items-center justify-center border-2 border-dashed border-[#BFBFBF] bg-white rounded-lg mt-24 ${
            dragActive ? "bg-gray-100" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div>
            <p className="mb-2 text-[15px] text-black Admin_std font-bold">
              Only CSV file import
            </p>
            <button
              className="px-4 py-2 border-[#0A64F9] text-blue text-[#0A64F9] border-2 rounded-md opacity-100 mt-3 flex items-center"
              onClick={onButtonClick}
            >
              Choose Files
              <img src={UploadIcon} alt="" className="ml-2 h-6 w-6" />
            </button>
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
        <div className='absolute bottom-4 '>
  <button
    onClick={handleSubmit}
    className="bg-[#0A64F9] text-white px-4 py-2 rounded hover:bg-[#0A64F9] importBtn"
  >
    Import
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
