import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import app from "./app";
import cms from "./cms";

export default combineReducers({
  auth,
  user,
  app,
  cms
});