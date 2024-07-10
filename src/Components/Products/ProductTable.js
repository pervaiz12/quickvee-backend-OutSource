import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
// import EditIcon from "../../Assests/Category/editIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";
import {
  changeOnlineOrderMethod,
  changeShowStatusProduct,
  changeShowType,
  deleteProductAPI,
  fetchProductsData,
} from "../../Redux/features/Product/ProductSlice";
import { BASE_URL, SORT_CATOGRY_DATA } from "../../Constants/Config";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductRow from "./ProductRow";
import { useAuthDetails } from "../../Common/cookiesHelper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { memo } from "react";
import PasswordShow from "../../Common/passwordShow";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { fetchStoreSettingSetupData } from "../../Redux/features/SettingSetup/SettingSetupSlice";
import { changeShowStatus } from "../../Redux/features/Product/ProductSlice";
import { color } from "@mui/system";
import { SkeletonTable } from "../../reuseableComponents/SkeletonTable";

const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductTable = ({
  seVisible,
  selectedListingType,
  selectedListingTypeValue,
  categoryId,
  selectedStatus,
  selectedStatusValue,
  searchId,
  debouncedValue,
}) => {
  let listing_type = 0;
  const ProductsListDataState = useSelector((state) => state.productsListData);

  // useEffect(() => {
  //   console.log("products: ", ProductsListDataState.productsData);
  // }, [ProductsListDataState.productsData]);

  const { hasMore, offset, limit, loading } = useSelector(
    (state) => state.productsListData
  );
  const {
    userTypeData,
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    GetSessionLogin,
  } = useAuthDetails();

  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const navigate = useNavigate();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const [checkApproved, setCheckApproved] = useState(false);
  const [checkReject, setCheckReject] = useState(false);

  const [productList, setproductsList] = useState([]);
  const [inventoryApproval, setInventoryApproval] = useState();
  const [checkboxState, setCheckboxState] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    if (ProductsListDataState?.productsData?.length) {
      setproductsList(ProductsListDataState?.productsData);
    } else {
      setproductsList([]);
    }
  }, [ProductsListDataState, ProductsListDataState?.productsData, dispatch]);

  let payloadData = {
    merchant_id: merchant_id,
    format: "json",
    category_id: categoryId === "All" ? "all" : categoryId,
    show_status: selectedStatusValue === "All" ? "all" : selectedStatusValue,
    listing_type: selectedListingTypeValue,
    offset: 0,
    limit: 10,
    page: 0,
    ...userTypeData,
  };

  const fetchInventoryData = async () => {
    try {
      const res = await dispatch(
        fetchStoreSettingSetupData({
          merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
        })
      ).unwrap();

      setInventoryApproval(Boolean(+res?.inventory_approval));
    } catch (error) {
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    // if (payloadData) {
    //   console.log("2nd time calling...");
    //   dispatch(fetchProductsData(payloadData));
    // }
    fetchInventoryData();
  }, []);

  const checkStatus = (status) => {
    switch (status) {
      case "1":
        return { text: "Approved", color: "green" };
      case "2":
        return { text: "Rejected", color: "red" };
      case "0":
        return { text: "Pending", color: "yellow" };
      default:
        return { text: "Pending", color: "yellow" };
    }
  };

  const Avail_Online = (event, showtype) => {
    const { name, value, id } = event?.target;

    let updateValue = "";
    if (showtype === "0" && name === "delivery_check") {
      updateValue = "1";
    } else if (showtype === "1" && name === "delivery_check") {
      updateValue = "0";
    } else if (showtype === "2" && name === "delivery_check") {
      updateValue = "3";
    } else if (showtype === "3" && name === "delivery_check") {
      updateValue = "2";
    } else if (showtype === "1" && name === "pickup_check") {
      updateValue = "3";
    } else if (showtype === "2" && name === "pickup_check") {
      updateValue = "0";
    } else if (showtype === "3" && name === "pickup_check") {
      updateValue = "1";
    } else if (showtype === "0" && name === "pickup_check") {
      updateValue = "2";
    }

    const data = {
      product_id: id,
      status: updateValue,
      merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      ...userTypeData,
    };
    dispatch(changeOnlineOrderMethod(data)).then((res) => {
      if (res?.payload?.status) {
        dispatch(changeShowType({ updateValue, id }));
      } else {
        ToastifyAlert("Online Ordering Unabled to change.", "error");
      }
    });
  };

  const update_status = (event, showStatus) => {
    const userConfirmed = window.confirm("Are you sure want to save changes ?");

    if (!userConfirmed) {
      return; // If the user clicks "No", exit the function
    }

    const { name, id } = event?.target;

    const data = {
      product_id: id,
      check: showStatus,
      merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      ...userTypeData,
    };
    dispatch(changeShowStatusProduct(data)).then((res) => {
      if (res?.payload?.status) {
        setCheckboxState((prevState) => ({
          ...prevState,
          [id]: {
            approved: showStatus === 1,
            rejected: showStatus === 2,
          },
        }));
        dispatch(changeShowStatus({ showStatus, id }));
      } else {
        setCheckboxState((prevState) => ({
          ...prevState,
          [id]: {
            approved: false,
            rejected: false,
          },
        }));
        ToastifyAlert("Show status unable to change", "error");
      }
    });
  };

  const fetchMoreData = async () => {
    let page = 0;
    if (productList.length > 0) {
      page = productList.length / 10;
    }

    // console.log("selectedListingTypeValue: ", selectedListingTypeValue);
    // console.log("selectedListingType: ", selectedListingType);

    if (selectedListingType == "Variant listing") {
      listing_type = 1;
    } else {
      listing_type = 0;
    }
    //let page = productList.length / 10 + 1 ;
    // let data1 = {
    //   merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    //   format: "json",
    //   category_id: categoryId === "All" ? "all" : categoryId,
    //   show_status: selectedStatusValue === "All" ? "all" : selectedStatusValue,
    //   listing_type: selectedListingTypeValue?.id,
    //   offset: offset,
    //   limit: 10,
    //   page: page,
    //   ...userTypeData,
    // };

    let data1 = {
      merchant_id,
      format: "json",
      category_id: categoryId === "All" ? "all" : categoryId,
      show_status: selectedStatus,
      name: debouncedValue,
      listing_type: selectedListingTypeValue?.id
        ? selectedListingTypeValue?.id
        : 0,
      offset,
      limit: 10,
      page: 0,
      ...userTypeData,
    };

    try {
      await dispatch(fetchProductsData(data1));
      // Handle response if needed
    } catch (error) {
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }

    // setTimeout(() => {
    //   setItems(items.concat(Array.from({ length: 15 })));
    // }, 150);
  };

  const handleDeleteProduct = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!userConfirmed) {
      return; // If the user clicks "No", exit the function
    }

    let timer = null;
    const formData = new FormData();
    formData.append("id", id);
    formData.append("login_type", userTypeData?.login_type);
    formData.append("token_id", userTypeData?.token_id);
    formData.append("token", userTypeData?.token);
    formData.append(
      "merchant_id",
      LoginGetDashBoardRecordJson?.data?.merchant_id
    );

    try {
      const res = await dispatch(deleteProductAPI(formData)).unwrap();
      if (res?.status) {
        ToastifyAlert("Deleted Successfully", "success");
        clearTimeout(timer);
        timer = setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    } catch (error) {
      if (error.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  const handleNavigate = (id, varientName, productData) => {
    let varientTitle = "";
    if (varientName?.includes("/")) {
      const splitVarient = varientName?.split("/");
      varientTitle = splitVarient?.join("-") || "";
    } else {
      varientTitle = varientName;
    }

    if (
      selectedListingType === "Variant listing" &&
      productData?.isvarient === "1"
    ) {
      navigate(
        `/inventory/products/varient-edit/${id}/${
          varientName ? varientTitle : null
        }`,
        { state: productData }
      );
    } else {
      navigate(`/inventory/products/edit/${id}`);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // If no destination, or if dropped back in the original position, do nothing
    if (!destination || destination.index === source.index) {
      return;
    }

    const userConfirmed = window.confirm(
      "Are you sure you want to reorder this item?"
    );

    if (!userConfirmed) {
      return; // If user cancels, do nothing
    }

    // Reorder the items
    const reorderedItems = Array.from(productList);
    const removed = reorderedItems.splice(source.index, 1)[0];
    reorderedItems.splice(destination.index, 0, removed);

    setproductsList(reorderedItems);
    // Optionally, you can dispatch an action to update the order in your store

    // Example of how to prepare payload for API call

    const values = {};
    const payload = {
      table: "product",
      merchant_id: "MAL0100CA",
      token_id: 5022,
      login_type: "superadmin",
    };

    reorderedItems.forEach((item, index) => {
      values[`values[${item.id}]`] = item.title; // Adjust according to your data structure
    });

    // Example API call after successful reorder
    // Replace with your actual API call method (e.g., fetch or axios)

    try {
      // Send POST request using axios
      const response = await axios.post(
        BASE_URL + SORT_CATOGRY_DATA,
        { ...payload, ...values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle API response
      ToastifyAlert("Reordered Successfully", "success");

      // Additional logic after successful reorder and API call
      // For example, update state or trigger additional actions
    } catch (error) {
      // Handle error scenarios
      ToastifyAlert("Error while reordering", "error");
      // Handle specific error cases if needed
    }
  };

  return (
    <>
      <div className="box">
        <div className="q-category-bottom-detail-section" id="123">
          <div className="">
            <div className="q-category-bottom-header">
              <span>Products</span>
              <Link to="/inventory/products/add">
                <p className="">
                  Add New Product
                  <img src={AddIcon} alt="add-icon" />
                </p>
              </Link>
            </div>
            <div className="q-category-bottom-detail-section">
              <div className="q-category-bottom-header-sticky">
                {ProductsListDataState.loading ? (
                  <SkeletonTable
                    columns={[
                      "Sort",
                      "	Title",
                      "Category",
                      "Enable online ordering?",
                      "Product Status",
                      "Images",
                      "Delete",
                    ]}
                  />
                ) : (
                  <TableContainer>
                    <InfiniteScroll
                      dataLength={productList.length}
                      next={fetchMoreData}
                      hasMore={!!searchId ? false : hasMore}
                      loader={<h4 className="all-product-list">Loading...</h4>}
                      scrollableTarget="scrollableDiv"
                      endMessage={
                        loading ? (
                          <h3 className="all-product-list">Loading...</h3>
                        ) : productList?.length ? (
                          <h3 className="all-product-list">
                            ALL products have been listed above
                          </h3>
                        ) : (
                          <h3 className="all-product-list">No Result Found</h3>
                        )
                      }
                    >
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="productTable">
                          {(provided) => (
                            <StyledTable
                              sx={{ minWidth: 500 }}
                              aria-label="customized table"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              <TableHead>
                                <StyledTableCell>Sort</StyledTableCell>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Category</StyledTableCell>
                                <StyledTableCell>
                                  Enable online ordering?
                                </StyledTableCell>
                                <StyledTableCell>
                                  Product Status
                                </StyledTableCell>
                                <StyledTableCell align={"center"}>
                                  Images
                                </StyledTableCell>
                                {selectedListingType === "Variant listing" ? (
                                  ""
                                ) : (
                                  <StyledTableCell>Delete</StyledTableCell>
                                )}
                              </TableHead>

                              <TableBody>
                                {productList?.length >= 1 &&
                                  productList.map((product, index) => {
                                    const getVarientName =
                                      product?.title?.split(/~~?/) || [];
                                    return (
                                      <Draggable
                                        key={product?.id}
                                        draggableId={product?.id.toString()}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <StyledTableRow
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <StyledTableCell>
                                              <img
                                                src={SortIcon}
                                                alt=""
                                                className=""
                                              />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                              <p
                                                className="categories-title"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleNavigate(
                                                    product?.id,
                                                    getVarientName[1],
                                                    product
                                                  )
                                                }
                                              >
                                                {product.title}
                                              </p>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                              <p className="categories-title">
                                                {product.category_name}
                                              </p>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                              <div className="categories-title">
                                                <div className="flex flex-wrap gap-3 ">
                                                  <label
                                                    className="q_resigter_setting_section"
                                                    style={{
                                                      color: "#000",
                                                      fontSize: "18px",
                                                    }}
                                                  >
                                                    Delivery
                                                    <input
                                                      type="checkbox"
                                                      id={product.id}
                                                      name="delivery_check"
                                                      checked={
                                                        product.show_type ==
                                                          0 ||
                                                        product.show_type == 2
                                                          ? true
                                                          : false
                                                      }
                                                      value={product.show_type}
                                                      onChange={(event) => {
                                                        Avail_Online(
                                                          event,
                                                          product?.show_type
                                                        );
                                                      }}
                                                    />
                                                    <span className="checkmark"></span>
                                                  </label>
                                                  <label
                                                    className="q_resigter_setting_section"
                                                    style={{
                                                      color: "#000",
                                                      fontSize: "18px",
                                                    }}
                                                  >
                                                    Pickup
                                                    <input
                                                      type="checkbox"
                                                      id={product.id}
                                                      name="pickup_check"
                                                      checked={
                                                        product.show_type ==
                                                          0 ||
                                                        product.show_type == 1
                                                          ? true
                                                          : false
                                                      }
                                                      value={product.show_type}
                                                      onChange={(event) => {
                                                        Avail_Online(
                                                          event,
                                                          product?.show_type
                                                        );
                                                      }}
                                                    />
                                                    <span className="checkmark"></span>
                                                  </label>
                                                </div>
                                              </div>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                              <p className="categories-title">
                                                {userTypeData?.login_type ===
                                                  "superadmin" &&
                                                inventoryApproval &&
                                                product?.show_status === "0" ? (
                                                  <div className="categories-title">
                                                    <div className="flex flex-wrap gap-3 ">
                                                      <label
                                                        className="q_resigter_setting_section"
                                                        style={{
                                                          color: "#000",
                                                          fontSize: "18px",
                                                        }}
                                                      >
                                                        Approve
                                                        <input
                                                          type="checkbox"
                                                          id={product.id}
                                                          name="approved"
                                                          // checked={
                                                          //   product.show_status == 0 ||
                                                          //     product.show_status == 2
                                                          //     ? true
                                                          //     : false
                                                          // }
                                                          checked={
                                                            checkboxState[
                                                              product.id
                                                            ]?.approved || false
                                                          }
                                                          value={
                                                            product.show_status
                                                          }
                                                          onChange={(event) => {
                                                            update_status(
                                                              event,
                                                              1
                                                            );
                                                          }}
                                                        />
                                                        <span className="checkmark"></span>
                                                      </label>
                                                      <label
                                                        className="q_resigter_setting_section"
                                                        style={{
                                                          color: "#000",
                                                          fontSize: "18px",
                                                        }}
                                                      >
                                                        Reject
                                                        <input
                                                          type="checkbox"
                                                          id={product.id}
                                                          name="reject"
                                                          // checked={
                                                          //   product.show_status == 0 ||
                                                          //     product.show_status == 1
                                                          //     ? true
                                                          //     : false
                                                          // }
                                                          checked={
                                                            checkboxState[
                                                              product.id
                                                            ]?.rejected || false
                                                          }
                                                          value={
                                                            product.show_status
                                                          }
                                                          onChange={(event) => {
                                                            update_status(
                                                              event,
                                                              2
                                                            );
                                                          }}
                                                        />
                                                        <span className="checkmark"></span>
                                                      </label>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <span
                                                    style={{
                                                      color: checkStatus(
                                                        product.show_status.toString()
                                                      )?.color,
                                                    }}
                                                  >
                                                    {
                                                      checkStatus(
                                                        product.show_status.toString()
                                                      )?.text
                                                    }
                                                  </span>
                                                )}
                                              </p>
                                            </StyledTableCell>
                                            <StyledTableCell align={"center"}>
                                              <div className="categories-items">
                                                <div className="flex items-center space-x-2 text-base"></div>
                                                <div className="mt-3 flex -space-x-2 overflow-hidden">
                                                  {product?.media
                                                    ?.split(",")
                                                    .slice(0, 4)
                                                    .map((item, index) => (
                                                      <img
                                                        key={index}
                                                        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                                        src={
                                                          BASE_URL +
                                                          `upload/products/${LoginGetDashBoardRecordJson?.data?.merchant_id}/` +
                                                          item
                                                        }
                                                        onError={(e) => {
                                                          e.target.onerror =
                                                            null; // prevents looping
                                                          e.target.src = `${BASE_URL}upload/products/MaskGroup4542.png`;
                                                        }}
                                                        alt=""
                                                      />
                                                    ))}
                                                </div>
                                                {product?.media?.split(",")
                                                  .length > 4 ? (
                                                  <div className="mt-3 text-sm font-medium">
                                                    <span className="text-blue-500">
                                                      +{" "}
                                                      {product.media.split(",")
                                                        .length - 4}{" "}
                                                      others
                                                    </span>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                            </StyledTableCell>
                                            {selectedListingType ===
                                            "Variant listing" ? (
                                              ""
                                            ) : (
                                              <StyledTableCell>
                                                {" "}
                                                <p
                                                  className="w-10"
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <img
                                                    src={DeleteIcon}
                                                    alt=" "
                                                    className="w-8 h-8"
                                                    onClick={() =>
                                                      handleDeleteProduct(
                                                        product?.id
                                                      )
                                                    }
                                                  />
                                                </p>
                                              </StyledTableCell>
                                            )}
                                          </StyledTableRow>
                                        )}
                                      </Draggable>
                                    );
                                  })}
                                {provided.placeholder}
                              </TableBody>
                            </StyledTable>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </InfiniteScroll>
                  </TableContainer>
                )}

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductTable);
