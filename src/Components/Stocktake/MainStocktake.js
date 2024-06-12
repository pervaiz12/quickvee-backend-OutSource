import { useState } from "react";
import StocktakeList from "./StocktakeList";
import AddNewStocktake from "./AddNewStocktake";

const MainStocktake = () => {
    const [visible, setVisible] = useState("StocktakeLiat");
  return (
    <>
     {visible === "StocktakeLiat" && <StocktakeList setVisible={setVisible}/>}
     {visible === "AddNewStocktake" && <AddNewStocktake setVisible={setVisible}/>}

    </>
   
  );
};

export default MainStocktake;
