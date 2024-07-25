import React from "react";
// import DraggableTable from "../../reuseableComponents/DraggableTable";
import AddIcon from "../../Assests/Category/addIcon.svg";
import BrandModal from "./BrandModal";
import BrandLogic from "./brandLogic";
import BrandTable from "./brandTable";
import DeleteModal from "../../reuseableComponents/DeleteModal";
import { Grid } from "@mui/material";
import InputTextSearch from "../../reuseableComponents/InputTextSearch";

export default function BrandsList() {
  const {
    openModal,
    setShowModal,
    showModal,
    handleClose,
    handleGetEditData,
    controltext,
    rowHeader,
    handleKeyPress,
    onChangeGetData,
    errors,
    brandText,
    handleSubmitAddData,
    handleSubmitUpdateData,
    handlePaste,
    getBrandList,
    handleDeleteBrand,
    setDeleteModalOpen,
    deleteModalOpen,
    handleDeleteMerchant,
    handleSearchInputChange,
    searchRecord,
    loader,
    deleteId,
    tableLoader,
  } = BrandLogic();
  return (
    <>
      <div className="box">
        <div className="q-attributes-bottom-detail-section">
          <div className="q-attributes-bottom-header-sticky">
            <div className="q-attributes-bottom-header">
              <span>Brands</span>

              <p className="" onClick={openModal}>
                Add Brand <img src={AddIcon} alt="add-icon" />
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
                listData={getBrandList}
                handleDeleteBrand={handleDeleteMerchant}
                tableLoader={tableLoader}
                deleteId={deleteId}
              />
            </Grid>
          </Grid>
        </div>
      </div>

      <BrandModal
        showModal={showModal}
        handleClose={handleClose}
        controltext={controltext}
        handleKeyPress={handleKeyPress}
        onChangeGetData={onChangeGetData}
        errors={errors}
        brandText={brandText}
        handleSubmitAddData={handleSubmitAddData}
        handleSubmitUpdateData={handleSubmitUpdateData}
        handlePaste={handlePaste}
        loader={loader}
      />
      <DeleteModal
        headerText=" Brands"
        // otherMSG="Once The store is deleted Inventory and settings cannot be restored."
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={handleDeleteBrand}
      />
      {/* </div>
      </div> */}
    </>
  );
}
