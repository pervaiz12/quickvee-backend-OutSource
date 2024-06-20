import { useEffect, useState } from "react";
import StocktakeList from "./StocktakeList";
import AddNewStocktake from "./AddNewStocktake";
import StocktakeReport from "./StocktakeReport";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useDispatch } from "react-redux";
import {
  fetchProductsData,
  fetchProductsDataById,
} from "../../Redux/features/Product/ProductSlice";
import { BASE_URL } from "../../Constants/Config";
import axios from "axios";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import { fetchPurchaseOrderById } from "../../Redux/features/PurchaseOrder/purchaseOrderByIdSlice";

const MainStocktake = () => {
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  const dispatch = useDispatch();
  const [visible, setVisible] = useState("StocktakeList");
  const [singleStocktakeState, setSingleStocktakeState] = useState({});
  const [gotDatafromPo, setDataFromPo] = useState();
  const [stocktakeId, setStocktakeId] = useState();
  // console.log("gotDatafromPo gotDatafromPo", gotDatafromPo);
  console.log("StocktakeList from stocktake main ", singleStocktakeState);

  // const getSingleStocktakeData = async (id) => {
  //   let singleStocktakeData = {
  //     merchant_id: merchant_id,
  //     stocktake_id: id,
  //   };
  //   try {
  //     const { token, ...otherUserData } = userTypeData;
  //     const response = await axios.post(
  //       BASE_URL + "Stocktake_react_api/get_stocktake_details_by_id",
  //       { ...singleStocktakeData, ...otherUserData },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.data.status) {
  //       setSingleStocktakeState(response?.data?.result);
  //       const fetchProductDataPromises =
  //         response.data.result.stocktake_item.map(async (item) => {
  //           try {
  //             const formData = new FormData();
  //             formData.append("merchant_id", merchant_id);
  //             formData.append("id", item.product_id);
  //             const response = await axios.post(
  //               BASE_URL + "Product_api_react/get_productdata_ById",
  //               formData
  //             );

  //             if (response.data.status) {
  //               if (
  //                 item.variant_id !== "0" &&
  //                 response.data.data.product_variants.length > 0
  //               ) {
  //                 const product = response.data.data.product_variants.find(
  //                   (prod) => prod.id === item.variant_id
  //                 );
  //                 return product;
  //               } else {
  //                 const product = response.data.data.productdata;
  //                 return product;
  //               }
  //             } else {
  //               console.log("Product Not available!");
  //             }
  //           } catch (e) {
  //             console.log("e: ", e);
  //           }
  //         });
  //       const dataFromPo = await Promise.all(fetchProductDataPromises);

  //       setDataFromPo(dataFromPo);
  //       return response?.data?.result;
  //     } else {
  //       ToastifyAlert(response.error, "error");
  //       return [];
  //     }
  //   } catch (error) {
  //     console.error("Error creating stocktake:", error);
  //   }
  // };
  return (
    <>

        <StocktakeList
          // getSingleStocktakeData={getSingleStocktakeData}
          setVisible={setVisible}
          setSingleStocktakeState={setSingleStocktakeState}
          singleStocktakeState={singleStocktakeState}
          merchant_id={merchant_id}
        />
   

        <AddNewStocktake
          gotDatafromPo={gotDatafromPo}
          setSingleStocktakeState={setSingleStocktakeState}
          singleStocktakeState={singleStocktakeState}
          setVisible={setVisible}
          merchant_id={merchant_id}
          setDataFromPo={setDataFromPo}
          // getSingleStocktakeData={getSingleStocktakeData}
        />

    
        <StocktakeReport
          singleStocktakeState={singleStocktakeState}
          setVisible={setVisible}
        />
      
    </>
  );
};

export default MainStocktake;
