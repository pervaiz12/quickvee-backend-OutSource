import { useEffect, useState } from "react";
import StocktakeList from "./StocktakeList";
import AddNewStocktake from "./AddNewStocktake";
import StocktakeReport from "./StocktakeReport";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useDispatch } from "react-redux";


const MainStocktake = () => {
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  const dispatch = useDispatch();
  const [visible, setVisible] = useState("StocktakeList");
  const [singleStocktakeState, setSingleStocktakeState] = useState({});
  const [gotDatafromPo, setDataFromPo] = useState();
  const [stocktakeId, setStocktakeId] = useState();
  
  console.log("StocktakeList from stocktake main ", singleStocktakeState);

  return (
    <>

        <StocktakeList
          
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
         
        />

    
        <StocktakeReport
          singleStocktakeState={singleStocktakeState}
          setVisible={setVisible}
        />
      
    </>
  );
};

export default MainStocktake;
