import React, { useEffect, useState } from "react";
import SortIcon from "../../../Assests/Dashboard/sort-arrows-icon.svg";
import DeleteIcon from "../../../Assests/Category/deleteIcon.svg";
import AddTaxesModal from "./AddTaxesModal";
import EditTaxesModal from "./EditTaxesModal";

import {
  fetchtaxesData,
  deleteTax,
} from "../../../Redux/features/Taxes/taxesSlice";

import { useSelector, useDispatch } from "react-redux";

const TaxesDetail = () => {
  const [alltaxes, setalltaxes] = useState([]);

  const AlltaxesDataState = useSelector((state) => state.taxes);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchtaxesData(data));
    }
  }, []);

  useEffect(() => {
    if (!AlltaxesDataState.loading && AlltaxesDataState.taxesData) {
      setalltaxes(AlltaxesDataState.taxesData);
    }
  }, [
    AlltaxesDataState,
    AlltaxesDataState.loading,
    AlltaxesDataState.taxesData,
  ]);

  const handleDeleteTax = (id) => {
    const data = {
      id: id,
      merchant_id: "MAL0100CA",
    };
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this tax?"
    );
    if (userConfirmed) {
      if (id) {
        dispatch(deleteTax(data));
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };


  const mycur = {
    cursor: "pointer",
  };

  return (
    <>
    <div className='box'>
      <div className="q-category-bottom-detail-section mt-6">
        <div className="q-category-bottom-header-sticky ">
          <div className="q-category-bottom-header">
            <span>Taxes</span>
            <AddTaxesModal />
          </div>
        </div>

        <div className="q-category-bottom-header-sticky">
          <div className="q-category-bottom-categories-header">
            <p className="taxes-sort">Sort</p>
            <p className="taxes-title">Title</p>
            <p className="taxes-items">Percentage (%)</p>
            <p className="taxes-enable-disable"></p>
          </div>
        </div>
        <div className="q-category-bottom-categories-listing">
          {alltaxes &&
            alltaxes.length >= 1 &&
            alltaxes.map((taxes, index) => (
              <div
                key={index}
                className="q-category-bottom-categories-single-category"
              >
                <p className="taxes-sort">
                  <img src={SortIcon} alt="sort-icon" className="h-4 w-5" />
                </p>
                <p className="taxes-title">{taxes.title}</p>
                <p className="taxes-title">{taxes.percent}</p>

                {taxes.title === "DefaultTax" ? (
                  // Render only Edit when the title is 'defaulttax'
                  <>
                  
                    <p className="categories_add_delete " style={{ width: '6rem', marginLeft: 'auto',display:"flex" }}>
                      <EditTaxesModal selectedTaxe={taxes}  />
                    </p>
                  </>
                ) : (
                  <>
                    <p className="categories_add_delete " style={{ width: '6rem', marginLeft: 'auto',display:"flex",justifyContent:"space-between" }}>
                      <EditTaxesModal selectedTaxe={taxes} />

                      <img
                        src={DeleteIcon}
                        alt="Delete-icon"
                        style={mycur}
                        className="h-8 w-8"
                        onClick={() => handleDeleteTax(taxes.id)}
                      />
                    </p>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default TaxesDetail;
