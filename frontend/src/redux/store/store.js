import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import generalReducer from "../reducers/generalReducer.js";

// export const store = createStore(combineReducers({  general: generalReducer }))
const store = configureStore({
    reducer: {
        general: generalReducer,
      },
});

export default store;
