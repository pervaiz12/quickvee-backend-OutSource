import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "../../Assests/Category/addIcon.svg";
import { Link } from "react-router-dom";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
// import EditIcon from "../../Assests/Category/editIcon.svg";
import SortIcon from "../../Assests/Category/Sorting.svg";
import {fetchProductsData} from "../../Redux/features/Product/ProductSlice";
import { BASE_URL } from "../../Constants/Config";
const ProductTable = () => {

  const [productsList, setproductsList] = useState([]);
  const ProductsListDataState = useSelector((state) => state.productsListData);
  
  useEffect(()=> {
    console.log(ProductsListDataState);
  });
  useEffect(() => {
    if (
      !ProductsListDataState.loading &&
      ProductsListDataState.productsData
    ) {
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
      category_id:'all',
      show_status:'all',
      listing_type:0,
      offset:0,
      limit:10,
    };
    if (data) {
      dispatch(fetchProductsData(data));
    }
  }, []);

  const [count, setCount] = useState(0);
  const defaultUrl = BASE_URL+'upload/products/MaskGroup4542.png';
  const handleError = (e) => {
    e.target.src = defaultUrl;
  };

  const checkStatus  = (status) =>{
    switch (status) {
      case "1":
        return "Approved"
        break;
        case "2":
        return "Rejected"
        break;
        case "0":
        return "Pending"
        break;
      default:
        return "Pending"
        break;
    }
  }

  const Avail_Online= (id,val) => {
    console.log(id);
    console.log(val);
  }

  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div className="">
          <div className="q-category-bottom-header">
            <span>Products</span>
            <p className="">
            <Link to="/product-add">
              Add New Product
              </Link>
              <Link to="/product-add">
                <img src={AddIcon} alt="add-icon" />
              </Link>
            </p>
          </div>
          <div className="q-category-bottom-detail-section">
        <div className="q-category-bottom-header-sticky">
        <div className="q-category-bottom-categories-header">
            <p className="categories-sort">Sort</p>
            <p className="categories-title">Title</p>
            <p className="categories-sort"></p>
            <p className="categories-items">Category</p>
            <p className="categories-sort"></p>
            <p className="categories-enable-disable" >Enable online ordering?</p>
            <p className="categories-items">Product Status</p>
            <p className="categories-sort"></p>
            <p className="categories-items" style={{width:"50%"}}>Images</p>
            <p className=""></p>
          </div>

          {productsList &&
            productsList.length >= 1 &&
            productsList.map((product, index) => (
          <div key={index} className="q-attributes-bottom-attriButes-single-attributes">
            <p className="categories-sort"><img src={SortIcon} alt="" className="" /></p>
            <p className="categories-title">{product.title}</p>
            <p className="categories-sort"></p>
            <p className="categories-title">{product.category_name}</p>
            <p className="categories-sort"></p>
            <p className="categories-enable-disable" >
              <div className="flex flex-col">
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Delivery
                <input
                  type="checkbox"
                  id={"delivery_check"+product.id}
                  name="delivery_check"
                  checked= {(product.show_type == 0 || product.show_type == 2) ? true : false}
                  value="2"
                  onChange={() => {Avail_Online(product.id,2);}}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
              Pickup
                <input
                  type="checkbox"
                  id="pickup_check"
                  name="pickup_check"
                  checked= {{}}
                  value={{}}
                  onClick={() => { console.log('Clicked'); }}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            </div>
            </p>
            <p className="categories-title">{checkStatus(product.show_status)}    </p>
            <p className="categories-sort"></p>
            <p className="categories-items" style={{width:"50%"}}>


            <div class="flex items-center space-x-2 text-base">
   
            </div>
            <div class="mt-3 flex -space-x-2 overflow-hidden">
              { 
               product.media.split(",").slice(0, 4).map((item, index) => (
                  
                  <img key={index} class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={BASE_URL+"upload/products/MAL0100CA/"+item} onError={handleError}  alt=""/>
                ))}
            </div>
            {( product.media.split(",").length>4) ? (
                <div class="mt-3 text-sm font-medium">
                  <a href="#" class="text-blue-500">+ {product.media.split(",").length - 4 } others</a>
                </div>
              ): ''
            }
             
            

            </p>
            <p className=""><img src={DeleteIcon} alt=" " className="w-16 h-16" /></p>
          </div>
          ))}


        </div>
        </div>
        </div>
        </div>
    </>
  );
};

export default ProductTable;
