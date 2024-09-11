import React, { useState } from "react";

export default function LoyaltyProgramLogic() {
  const [openAddModel, setAddModel] = useState(false);
  const handleModalOpen = () => {
    setAddModel(true);
  };
  const handleCloseAddModal = () => {
    setAddModel(false);
  };
  const onDateRangeChange = async (Date) => {
    // try {
    //   const data = { merchant_id, ...userTypeData, ...Date };
    //   await dispatch(fetchSalesByHours(data)).unwrap();
    // } catch (error) {
    //   if (error.status == 401) {
    //     getUnAutherisedTokenMessage();
    //     handleCoockieExpire();
    //   }
    // }
  };
  return {
    handleModalOpen,
    openAddModel,
    handleCloseAddModal,
    onDateRangeChange,
  };
}
