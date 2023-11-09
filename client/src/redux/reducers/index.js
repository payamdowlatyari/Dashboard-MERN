import userReducer from "./userSlice";
import clientReducer from "./clientSlice";
import { combineReducers } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";

export default combineReducers({ user: userReducer, client: clientReducer, projects: projectSlice});
