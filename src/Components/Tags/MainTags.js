import React from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import TagLogic from "./TagLogic";
import TagModal from "./tagModal";
import BrandTable from "../Brands/brandTable";
import DeleteModal from "../../reuseableComponents/DeleteModal";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";
import { Grid } from "@mui/material";

export default function MainTags() {
  const {
    openModal,
    showModal,
    handleClose,
    rowHeader,
    getTagList,
    handleGetEditData,
    controltext,
    handlePaste,
    errors,
    onChangeGetData,
    tagText,
    handleKeyPress,
    handleSubmitUpdateData,
    handleSubmitAddData,
    handleDeleteTag,
    handleDeleteMerchant,
    deleteModalOpen,
    setDeleteModalOpen,
    handleSearchInputChange,
    searchRecord,
    loader,
    tableLoader,
    deleteId,
    rowSkaleton,
    skeletonLoader,
  } = TagLogic();
  return (
    <>
      <div className="box">
        <div className="q-attributes-bottom-detail-section">
          <div className="q-attributes-bottom-header-sticky">
            <div className="q-attributes-bottom-header">
              <span>Tag</span>
              <p className="" onClick={openModal}>
                Add Tag <img src={AddIcon} alt="add-icon" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="box">
        <div className="q-attributes-bottom-detail-section">
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <InputTextSearch
                className=""
                type="text"
                value={searchRecord}
                handleChange={handleSearchInputChange}
                placeholder="Search..."
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ padding: 2.5 }}>
            <Grid item xs={12}>
              <BrandTable
                handleGetEditData={handleGetEditData}
                header={rowHeader}
                listData={getTagList}
                handleDeleteBrand={handleDeleteMerchant}
                tableLoader={tableLoader}
                deleteId={deleteId}
                skeletonLoader={skeletonLoader}
                rowSkelton={rowSkaleton}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <TagModal
        showModal={showModal}
        handleClose={handleClose}
        controltext={controltext}
        handlePaste={handlePaste}
        errors={errors}
        onChangeGetData={onChangeGetData}
        tagText={tagText}
        handleKeyPress={handleKeyPress}
        handleSubmitUpdateData={handleSubmitUpdateData}
        handleSubmitAddData={handleSubmitAddData}
        loader={loader}
      />
      <DeleteModal
        headerText=" Tag"
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={handleDeleteTag}
      />
    </>
  );
}
