import adminSlice from "./adminSlice";
import clientReducer from "./clientSlice";
import projectSlice from "./projectSlice";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({ client: clientReducer, projects: projectSlice, admin: adminSlice});
