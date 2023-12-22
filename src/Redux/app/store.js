import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";
import attributesReducer from "../features/Attributes/attributesSlice";
 


const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    attributes: attributesReducer,
  },
  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});


export default store;