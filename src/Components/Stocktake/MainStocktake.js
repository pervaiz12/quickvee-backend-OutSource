import { useState } from "react";
import StocktakeList from "./StocktakeList";
import AddNewStocktake from "./AddNewStocktake";

const MainStocktake = () => {
    const [visible, setVisible] = useState("StocktakeList");
  return (
    <>
     {visible === "StocktakeList" && <StocktakeList setVisible={setVisible}/>}
     {visible === "AddNewStocktake" && <AddNewStocktake setVisible={setVisible}/>}

    </>
   
  );
};

export default MainStocktake;
