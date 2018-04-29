export const CMS_SEARCH_TEXT_CHANGED = "cms/CMS_SEARCH_TEXT_CHANGED";

export interface IAuthReducerState {
  searchText: string;
}

const INITIAL_STATE: IAuthReducerState = {
  searchText: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CMS_SEARCH_TEXT_CHANGED:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    default:
      return state;
  }
};