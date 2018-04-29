import {
  CMS_SEARCH_TEXT_CHANGED
} from "./index.js";

export const changeCmsSearchText = (searchText) => {
  return {
    type: CMS_SEARCH_TEXT_CHANGED,
    payload: { searchText }
  };
};