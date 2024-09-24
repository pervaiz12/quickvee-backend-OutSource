import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import Switch from "@mui/material/Switch";
import LoyaltyPointData from "./LoyaltyPointData";
import LoyaltyProgramLogic from "./loyaltyProgramLogic";
import AddLoyaltyPointModal from "./AddLoyaltyPointModal";
import AlertModal from "../../../reuseableComponents/AlertModal";

export default function LoyaltyProgram() {
  const {
    handleModalOpen,
    openAddModel,
    handleCloseAddModal,
    loyaltyProgramList,
    inventorySwitch,
    handleCheckedSwitch,
    InventorAwardedPoints,
    handleDollarValue,
    SwitchList,
    handleChangeSwitch,
    handleSaveData,
    onChangeAddLoyality,
    addPrmotionName,
    onChangeDateValid,
    onChangeStartDate,
    onChangeEndDate,
    dateValid,
    handleSubmitAddLoyalty,
    errors,
    enabledPromotionalId,
    handleCheckedProEnabledSwitch,
    loader,
    errorMessageLoyality,
    loaderSave,
    dataLoadingApi,
    onClickEditIcon,
    updateChecked,
    handleUpdateLoyalty,
    handleDeleteLoyalty,
    deleteModalOpen,
    handleClosedModal,
    confirmDeleteCategory,
    deleteLoader,
    deleteTableId,
    showAlertMessage,
    alertModalClosed,
    handleCloseAlertModal,
  } = LoyaltyProgramLogic();
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="box_shadow_div"
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="q-coupon-bottom-header"
        >
          <Grid item>
            <div>
              <span>Loyalty Program</span>
            </div>
          </Grid>
        </Grid>
        <Grid item sx={{ pl: 2.5, pr: 2.5, pb: 2.5 }}>
          <Grid container>
            <Grid item xs={12}>
              <h5
                style={{ marginBottom: 0 }}
                className="StoreSetting_heading-menu"
              >
                Enable/Disable
              </h5>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ pl: 2.5, pr: 2.5, pb: 2.5 }}>
          <div className="fr">
            {/* {loader ? (
              <CircularProgress width={20} size={20} />
            ) : ( */}
            <Switch
              // {...label}
              name="cost_method"
              checked={inventorySwitch}
              onChange={handleCheckedSwitch}
            />
            {/* )} */}
          </div>
        </Grid>
      </Grid>
      <LoyaltyPointData
        handleModalOpen={handleModalOpen}
        InventorAwardedPoints={InventorAwardedPoints}
        handleDollarValue={handleDollarValue}
        loyaltyProgramList={loyaltyProgramList}
        SwitchList={SwitchList}
        handleChangeSwitch={handleChangeSwitch}
        handleSaveData={handleSaveData}
        errorMessageLoyality={errorMessageLoyality}
        loaderSave={loaderSave}
        dataLoadingApi={dataLoadingApi}
        onClickEditIcon={onClickEditIcon}
        handleDeleteLoyalty={handleDeleteLoyalty}
        deleteModalOpen={deleteModalOpen}
        handleClosedModal={handleClosedModal}
        confirmDeleteCategory={confirmDeleteCategory}
        deleteLoader={deleteLoader}
        deleteTableId={deleteTableId}
      />
      <AddLoyaltyPointModal
        openAddModel={openAddModel}
        handleCloseAddModal={handleCloseAddModal}
        onChangeAddLoyality={onChangeAddLoyality}
        addPrmotionName={addPrmotionName}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        dateValid={dateValid}
        handleSubmitAddLoyalty={handleSubmitAddLoyalty}
        errors={errors}
        enabledPromotionalId={enabledPromotionalId}
        handleCheckedProEnabledSwitch={handleCheckedProEnabledSwitch}
        loader={loader}
        updateChecked={updateChecked}
        handleUpdateLoyalty={handleUpdateLoyalty}
        // InventorAwardedPoints={InventorAwardedPoints}
      />
      <AlertModal
        headerText={showAlertMessage}
        open={alertModalClosed}
        onClose={handleCloseAlertModal}
      />
    </>
  );
}
