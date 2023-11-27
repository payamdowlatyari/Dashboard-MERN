import adminSlice from "./adminSlice";
import clientReducer from "./clientSlice";
import projectSlice from "./projectSlice";
import themeSlice from "./themeSlice";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({ client: clientReducer, projects: projectSlice, admin: adminSlice, theme: themeSlice});
