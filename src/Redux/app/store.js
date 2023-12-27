import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";

import attributesReducer from "../features/Attributes/attributesSlice";
 
import inStoreOrderReducer from "../features/Orders/inStoreOrderSlice";
import onlineStoreOrderReducer from "../features/Orders/onlineStoreOrderSlice";



const store = configureStore({
  reducer: {
    categories: categoriesReducer,

    attributes: attributesReducer,

    inStoreOrder: inStoreOrderReducer,
    onlineStoreOrder: onlineStoreOrderReducer,

  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});


export default store;