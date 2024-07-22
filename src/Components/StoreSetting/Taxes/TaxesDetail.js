import React, { useEffect, useState } from "react";

import AddTaxesModal from "./AddTaxesModal";

import { useAuthDetails } from "../../../Common/cookiesHelper";
import {
  fetchtaxesData,
  deleteTax,
} from "../../../Redux/features/Taxes/taxesSlice";
import DraggableTable from "../../../reuseableComponents/DraggableTable";
import { useSelector, useDispatch } from "react-redux";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
import DeleteModal from "../../../reuseableComponents/DeleteModal";
import PasswordShow from "../../../Common/passwordShow";

const TaxesDetail = () => {
  const [alltaxes, setalltaxes] = useState([]);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const AlltaxesDataState = useSelector((state) => state.taxes);
  const dispatch = useDispatch();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;
  useEffect(() => {
    // let data = {
    //   merchant_id: merchant_id,
    //   ...userTypeData,
    // };
    // if (data) {
    //   dispatch(fetchtaxesData(data));
    // }
    getfetchtaxesDataData();
  }, []);

  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const getfetchtaxesDataData = async () => {
    try {
      let data = {
        merchant_id: merchant_id,
        ...userTypeData,
      };
      if (data) {
        await dispatch(fetchtaxesData(data)).unwrap();
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    if (!AlltaxesDataState.loading && AlltaxesDataState.taxesData) {
      setalltaxes(AlltaxesDataState.taxesData);
    }
  }, [
    AlltaxesDataState,
    AlltaxesDataState.loading,
    AlltaxesDataState.taxesData,
  ]);



  const [deleteTaxeId, setDeleteTaxeId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteTax = (id) => {
    setDeleteTaxeId(id);
    setDeleteModalOpen(true);
  };
  const confirmDeleteCategory = () => {
    if (deleteTaxeId) {
      const data = {
        id: deleteTaxeId,
        merchant_id: merchant_id,
        ...userTypeData,
      };
      if (data) {
        dispatch(deleteTax(data));
        ToastifyAlert("Deleted Successfully", "success");
      }
    }
    setDeleteTaxeId(null);
    setDeleteModalOpen(false);
  };

  const mycur = {
    cursor: "pointer",
  };

  return (
    <>

      <div className="box">
        <div className="q-category-bottom-detail-section">
          <div className="">
            <div className="q-category-bottom-header">
              <span>Taxes</span>
              <AddTaxesModal />
            </div>
            <DraggableTable
              tableHead={["Sort", "Title", "Percentage (%)", "", ""]}
              tableRow={alltaxes}
              setFunction={setalltaxes}
              editTaxesObj={true}
              deleteTaxButton={{
                deleteTaxButtonEnable: true,
                deletetaxButtonFun: handleDeleteTax,
              }}
              table={"taxes"}
              className="q-category-bottom-categories-single-category"
            />
          </div>
        </div>
        <DeleteModal
          headerText="Taxe"
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
          }}
          onConfirm={confirmDeleteCategory}
        />
      </div>
    </>
  );
};

export default TaxesDetail;
