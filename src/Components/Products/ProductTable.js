import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
// import EditIcon from "../../Assests/Category/editIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";
import { fetchProductsData } from "../../Redux/features/Product/ProductSlice";
import { BASE_URL } from "../../Constants/Config";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductRow from "./ProductRow";
import { useAuthDetails } from "../../Common/cookiesHelper";

const ProductTable = ({
  seVisible,
  selectedListingType,
  selectedListingTypeValue,
  productsList,
  setproductsList,
  categoryId,
  selectedStatus,
  selectedStatusValue,
}) => {
  let listing_type = 0;
  const ProductsListDataState = useSelector((state) => state.productsListData);
  const { hasMore, offset, limit } = useSelector(
    (state) => state.productsListData
  );
  const { userTypeData } = useAuthDetails();

  useEffect(() => {
    if (!ProductsListDataState.loading && ProductsListDataState.productsData) {
      setproductsList(ProductsListDataState.productsData);
    }
  }, [
    ProductsListDataState,
    ProductsListDataState.loading,
    ProductsListDataState.productsData,
  ]);

  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
      category_id: categoryId,
      show_status: selectedStatusValue,
      listing_type: selectedListingTypeValue,
      offset: 0,
      limit: 10,
      page: 0,
      ...userTypeData,
    };
    if (data) {
      dispatch(fetchProductsData(data));
    }
  }, []);

  const [count, setCount] = useState(0);
  const defaultUrl = BASE_URL + "upload/products/MaskGroup4542.png";
  const handleError = (e) => {
    e.target.src = defaultUrl;
  };

  const checkStatus = (status) => {
    switch (status) {
      case "1":
        return { text: "Approved", color: "#0A64F9" };
      case "2":
        return { text: "Rejected", color: "#F90A0A" };
      case "0":
        return { text: "Pending", color: "#FF8800" };
      default:
        return { text: "Pending", color: "#FF8800" };
    }
  };

  const Avail_Online = (event) => {
    console.log(event.target.id);
    console.log(event.target.name);
  };

  const [items, setItems] = useState(Array.from({ length: 10 }));
  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
  };
  const fetchMoreData = () => {
    let page = 0;
    if (productsList.length > 0) {
      page = productsList.length / 10;
    }

    if (selectedListingType == "Variant listing") {
      listing_type = 1;
    } else {
      listing_type = 0;
    }
    //let page = productsList.length / 10 + 1 ;

    // console.log(page + "page");
    // console.log(productsList);
    let data1 = {
      merchant_id: "MAL0100CA",
      format: "json",
      category_id: categoryId,
      show_status: selectedStatusValue,
      listing_type: selectedListingTypeValue,
      offset: offset,
      limit: 10,
      page: page,
      ...userTypeData,
    };
    if (data1) {
      dispatch(fetchProductsData(data1));
    }

    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 15 })));
    }, 150);
  };

  return (
    <>
      <div className="box">
        <div className="box_shadow_div" id="123">
          <div className="">
            <div className="q-category-bottom-header">
              <span>Products</span>

              <p className="">
                <Link to="/product-add">Add New Product</Link>
                <Link to="/product-add">
                  <img src={AddIcon} alt="add-icon" />
                </Link>
              </p>
            </div>
            <div className="q-category-bottom-detail-section">
              {/* <div className="q-category-bottom-header-sticky"> */}
              <div className="q-category-bottom-categories-header">
                <p className="product-table-sort">Sort</p>

                <p className="product-table-title">Title</p>

                <p className="product-table-items">Category</p>

                <p className="product-table-enable-disable">
                  Enable online ordering?
                </p>

                <p className="product-table-title">Product Status</p>

                <p className="product-table-items ">Images</p>

                <p className="product-table-btn "></p>
              </div>

              {/* if  want table short and sticky add this css (style={{ height: 300, overflow: "auto" }}) */}
              <div id="scrollableDiv">
                <InfiniteScroll
                  dataLength={productsList.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    <h3 className="popup_msg">
                      ALL products have been listed above
                    </h3>
                  }
                >
                  {productsList?.length >= 1 &&
                    productsList.map((product, index) => (
                      <ProductRow
                        key={index}
                        {...{
                          Avail_Online,
                          index,
                          product,
                          checkStatus,
                          handleError,
                        }}
                      />
                    ))}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
