import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import {
  fetchCategoriesData,
  deleteCategory,
  updateCategoryStatus,
} from "../../Redux/features/Categories/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";
import ViewItemsModal from "./ViewItemsModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Link } from "react-router-dom";
import CheckBoxField from "../../reuseableComponents/CheckBoxField";
import DraggableTable from "../../reuseableComponents/DraggableTable";
import RadioSelect from "./RadioSelect";
import { BASE_URL, SORT_CATOGRY_DATA } from "../../Constants/Config";
import { useAuthDetails } from "./../../Common/cookiesHelper";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import DeleteModal from "../../reuseableComponents/DeleteModal";
import PasswordShow from "../../Common/passwordShow";

const CategoryDetail = ({ seVisible, setProductId }) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [allcategories, setallcategories] = useState([]);
  const [reorderedItems, setreorderedItems] = useState([]);

  const AllCategoriesDataState = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;

  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  let data = {
    merchant_id: merchant_id,
    ...userTypeData,
  };
  // console.log(data)

  // console.log(tokenData)
  useEffect(() => {
    // if (data) {
    //   // console.log(data)
    //   dispatch(fetchCategoriesData(data));
    // }
    getfetchCategorieData();
  }, []);
  const getfetchCategorieData = async () => {
    try {
      let data = {
        merchant_id: merchant_id,
        ...userTypeData,
      };
      if (data) {
        await dispatch(fetchCategoriesData(data)).unwrap();
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
    if (
      !AllCategoriesDataState.loading &&
      AllCategoriesDataState.categoriesData
    ) {
      setallcategories(AllCategoriesDataState.categoriesData);
    }
  }, [
    AllCategoriesDataState,
    AllCategoriesDataState.loading,
    AllCategoriesDataState.categoriesData,
  ]);

  // const handleDeleteCategory = (id) => {
  //   const data = {
  //     id: id,
  //     ...userTypeData,
  //   };

  //   const userConfirmed = window.confirm(
  //     "Are you sure you want to delete this Category?"
  //   );
  //   if (userConfirmed) {
  //     if (id) {
  //       // dispatch(deleteCategory(data));
  //       // ToastifyAlert("Category Deleted", "success");
  //     }
  //   } else {
  //     console.log("Deletion canceled by user");
  //   }
  // };

  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteCategory = (id) => {
    setDeleteCategoryId(id);
    setDeleteModalOpen(true);
  };
  const confirmDeleteCategory = async () => {
    try {
      setLoading(true);
      if (loading) return;

      if (deleteCategoryId) {
        const data = {
          id: deleteCategoryId,
          merchant_id,
          ...userTypeData,
        };
        if (data) {
          await dispatch(deleteCategory(data)).unwrap();
          ToastifyAlert("Deleted Successfully", "success");
        }
      }
      setDeleteCategoryId(null);
      setDeleteModalOpen(false);
    } catch (error) {
      if (error.status === 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status === "Network Error") {
        getNetworkError();
      }
    } finally {
      setLoading(false);
    }
  };

  // for  Category Status update
  const handleToggleStatus = async (id, status) => {
    try {
      const data = {
        id: id,
        status: status,
        merchant_id,
        ...userTypeData,
      };

      const rep = await dispatch(updateCategoryStatus(data)).unwrap();
      if (rep === "Success") {
        // alert("Status Success Updated");
        ToastifyAlert("Updated Successfully", "success");
        let datas = {
          merchant_id,
        };
        if (datas) {
          await dispatch(fetchCategoriesData(data)).unwrap();
        }
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

  const handleOnlineChange = (category) => {
    let status =
      category.cat_show_status === "0" || category.cat_show_status === "1"
        ? "1"
        : "0";
    const isOnlineChecked =
      category.cat_show_status === "0" || category.cat_show_status === "1";
    const isRegisterChecked =
      category.cat_show_status === "0" || category.cat_show_status === "2";

    if (!isOnlineChecked && !isRegisterChecked) {
      status = 1;
    } else if (isOnlineChecked && !isRegisterChecked) {
      status = 3;
    } else if (!isOnlineChecked && isRegisterChecked) {
      status = 0;
    } else if (isOnlineChecked && isRegisterChecked) {
      status = 2;
    }
    handleToggleStatus(category.id, status, category);
  };

  const handleRegisterChange = (id, status, category) => {
    const isOnlineChecked =
      category.cat_show_status === "0" || category.cat_show_status === "1";
    const isRegisterChecked =
      category.cat_show_status === "0" || category.cat_show_status === "2";

    if (!isOnlineChecked && !isRegisterChecked) {
      status = 2;
    } else if (!isOnlineChecked && isRegisterChecked) {
      status = 3;
    } else if (isOnlineChecked && isRegisterChecked) {
      status = 1;
    } else if (isOnlineChecked && !isRegisterChecked) {
      status = 0;
    }
    handleToggleStatus(id, status, category);
  };

  // for viewmodal
  const handleViewItemsClick = (selectedView) => {};

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // Check if the drag ended outside of the droppable area
    if (!result.destination) {
      alert("You can't drop outside the list!");
      return;
    }

    // Check if the item was dropped at the same position
    if (result.destination.index === result.source.index) {
      alert("You haven't moved the item!");
      return;
    }

    const reorderedItems = reorder(
      allcategories,
      result.source.index,
      result.destination.index
    );

    setallcategories(reorderedItems);

    alert("Are you sure you want to sort item!");
  };

  return (
    <>
      <div className="box">
        <div className="q-category-bottom-detail-section">
          <div className="categoryTable">
            <div className="q-category-bottom-header">
              <span>Category</span>
              <Link to={`/inventory/category/add`}>
                <p>
                  Add Category <img src={AddIcon} alt="add-icon" />{" "}
                </p>
              </Link>
            </div>
            <DraggableTable
              tableHead={["Sort", "Title", "Items", "Enable/Disable", "", ""]}
              tableRow={allcategories}
              setFunction={setallcategories}
              viewSelectedOption={{
                viewSelectedOptionEnable: true,
                fun1: handleOnlineChange,
                fun2: handleRegisterChange,
              }}
              viewSelectedOptionFun={handleViewItemsClick}
              radioButtonComponent={true}
              editBtnCategory={{
                editButtonEnable: true,
                editButtonurl: "/inventory/category/edit-category/",
              }}
              deleteButton={{
                deleteButtonEnable: true,
                deleteButtonFun: handleDeleteCategory,
              }}
              table={"collection"}
              className="q-category-bottom-categories-single-category"
              seVisible={seVisible}
              setProductId={setProductId}
            />
          </div>

          <DeleteModal
            headerText="Category"
            open={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
            }}
            onConfirm={confirmDeleteCategory}
            deleteloading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;
