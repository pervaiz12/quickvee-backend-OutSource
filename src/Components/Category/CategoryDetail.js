import React, { useEffect, useState } from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import EditIcon from "../../Assests/Category/editIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";
import {
  fetchCategoriesData,
  deleteCategory,
  updateCategoryStatus,
} from "../../Redux/features/Categories/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";
import ViewItemsModal from "./ViewItemsModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { Link } from "react-router-dom";

const CategoryDetail = ({ seVisible }) => {
  const [allcategories, setallcategories] = useState([]);
  const [reorderedItems, setreorderedItems] = useState([]);

  const AllCategoriesDataState = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchCategoriesData(data));
    }
  }, []);

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

  const handleDeleteCategory = (id) => {
    const data = {
      id: id,
    };

    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Category?"
    );
    if (userConfirmed) {
      if (id) {
        dispatch(deleteCategory(data));
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  // for  Category Status update
  const handleToggleStatus = async (id, status) => {
    console.log("jkj");
    const data = {
      id: id,
      status: status,
      merchant_id: "MAL0100CA",
    };

    const rep = await dispatch(updateCategoryStatus(data));
    if (rep.payload === "Success") {
      // alert("Status Success Updated");
      let datas = {
        merchant_id: "MAL0100CA",
      };
      if (datas) {
        dispatch(fetchCategoriesData(data));
      }
    }
  };

  const handleOnlineChange = (id, status, category) => {
    const isOnlineChecked =
      category.cat_show_status === "0" || category.cat_show_status === "1";
    const isRegisterChecked =
      category.cat_show_status === "0" || category.cat_show_status === "2";

    if (!isOnlineChecked && !isRegisterChecked) {
      // console.log(isOnlineChecked);
      status = 1;
    } else if (isOnlineChecked && !isRegisterChecked) {
      status = 3;
    } else if (!isOnlineChecked && isRegisterChecked) {
      status = 0;
    } else if (isOnlineChecked && isRegisterChecked) {
      status = 2;
    }
    handleToggleStatus(id, status, category);
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
    //console.log(result);
  };

  return (
    <>
      <div className="box">
        <div className="q-category-bottom-detail-section">
          <div className="">
            <div className="q-category-bottom-header">
              <span>Category</span>
              <p onClick={() => seVisible("CategoryAlert")}>
                Add Category <img src={AddIcon} alt="add-icon" />{" "}
              </p>
            </div>
            <div className="q-category-bottom-categories-header">
              <p className="categories-data-sort">Sort</p>
              <p className="categories-data-title">Title</p>
              <p className="categories-data-items">Items</p>
              <p className="categories-enable-disable">Enable/Disable</p>
            </div>
          </div>
          {/* <div className="q-category-bottom-categories-listing">
            
            {allcategories &&
              allcategories.length >= 1 &&
              allcategories.map((category, index) => (
                <div
                  key={index}
                  className="q-category-bottom-categories-single-category"
                >
                  <p className="categories-data-sort">
                    <img src={SortIcon} alt="add-icon" />
                  </p>
                  <p className="categories-data-title">{category.title}</p>
                  <p className="categories-data-items">
                    <ViewItemsModal
                      selectedView={category}
                      onViewClick={handleViewItemsClick}
                    />
                  </p>
                  <p className="categories-enable-disable">
                    <div className="category-checkmark-div">
                      <label className="category-checkmark-label">
                        Online
                        <input
                          type="checkbox"
                          checked={
                            category.cat_show_status === "0" ||
                            category.cat_show_status === "1"
                              ? true
                              : false
                          }
                          onChange={() =>
                            handleOnlineChange(
                              category.id,
                              category.cat_show_status === "0" ||
                                category.cat_show_status === "1"
                                ? "1"
                                : "0",
                              category
                            )
                          }
                        />
                        <span className="category-checkmark"></span>
                      </label>
                      <label className="category-checkmark-label">
                        Register
                        <input
                          type="checkbox"
                          checked={
                            category.cat_show_status === "0" ||
                            category.cat_show_status === "2"
                              ? true
                              : false
                          }
                          onChange={() =>
                            handleRegisterChange(
                              category.id,
                              category.cat_show_status === "0" ||
                                category.cat_show_status === "2"
                                ? "2"
                                : "0",
                              category
                            )
                          }
                        />
                        <span className="category-checkmark"></span>
                      </label>
                    </div>
                  </p>
                  <div className="q_cat_del_edit_img">
                    <Link to={`/category/edit-category/${category.id}`}>
                      <img
                        className="edit_center w-8 h-8"
                        selectedCategory={category}
                        src={EditIcon}
                        alt="Edit"
                      />
                    </Link>

                    <img
                      className="edit_center w-8 h-8"
                      src={DeleteIcon}
                      alt="delete-icon"
                      onClick={() => handleDeleteCategory(category.id)}
                    />
                  </div>
                </div>
              ))}
          </div> */}

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  className="q-category-bottom-categories-listing"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {allcategories &&
                    allcategories.length >= 1 &&
                    allcategories.map((category, index) => (
                      <Draggable
                        key={category.id}
                        draggableId={category.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="q-category-bottom-categories-single-category"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className="categories-data-sort">
                              <img src={SortIcon} alt="add-icon" />
                            </p>
                            <p className="categories-data-title">
                              {category.title}
                            </p>
                            <p className="categories-data-items">
                              <ViewItemsModal
                                selectedView={category}
                                onViewClick={handleViewItemsClick}
                              />
                            </p>
                            <p className="categories-enable-disable">
                              <div className="category-checkmark-div">
                                <label className="category-checkmark-label">
                                  Online
                                  <input
                                    type="checkbox"
                                    checked={
                                      category.cat_show_status === "0" ||
                                      category.cat_show_status === "1"
                                    }
                                    onChange={() =>
                                      handleOnlineChange(
                                        category.id,
                                        category.cat_show_status === "0" ||
                                          category.cat_show_status === "1"
                                          ? "1"
                                          : "0",
                                        category
                                      )
                                    }
                                  />
                                  <span className="category-checkmark"></span>
                                </label>
                                <label className="category-checkmark-label">
                                  Register
                                  <input
                                    type="checkbox"
                                    checked={
                                      category.cat_show_status === "0" ||
                                      category.cat_show_status === "2"
                                    }
                                    onChange={() =>
                                      handleRegisterChange(
                                        category.id,
                                        category.cat_show_status === "0" ||
                                          category.cat_show_status === "2"
                                          ? "2"
                                          : "0",
                                        category
                                      )
                                    }
                                  />
                                  <span className="category-checkmark"></span>
                                </label>
                              </div>
                            </p>
                            <div className="q_cat_del_edit_img">
                              <Link
                                to={`/category/edit-category/${category.id}`}
                              >
                                <img
                                  className="edit_center w-8 h-8"
                                  selectedCategory={category}
                                  src={EditIcon}
                                  alt="Edit"
                                />
                              </Link>

                              <img
                                className="edit_center w-8 h-8"
                                src={DeleteIcon}
                                alt="delete-icon"
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;
