import {
  FETCH_CATEGORY_DATA,
  FETCH_CATEGORY_DATA_SUCCESS,
  FETCH_CATEGORY_DATA_FAILURE,
} from "../actionTypes/menuTypes";

const intialState = {
  categories: { listCategory: [], isLoading: false, err: null },
};

export const categories = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_DATA:
      return {
        ...state,
        categories: {
          ...categories,
          isLoading: true,
          err: null,
        },
      };
    case FETCH_CATEGORY_DATA_SUCCESS:
      return {
        ...state,
        categories: {
          ...categories,
          listCategory: action.payload,
          isLoading: false,
          err: null,
        },
      };
    case FETCH_CATEGORY_DATA_FAILURE:
      console.log(action);
      return {
        ...state,
        categories: {
          ...categories,
          listCategory: [],
          isLoading: false,
          err: action.payLoad,
        },
      };
    default:
      return state;
  }
};
