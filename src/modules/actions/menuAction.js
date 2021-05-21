import { headers } from "../root/header";
import { baseUri } from "../root/configUrl";
import {
  FETCH_CATEGORY_DATA_SUCCESS,
  FETCH_CATEGORY_DATA,
  FETCH_CATEGORY_DATA_FAILURE,
} from "../actionTypes/menuTypes";
const axios = require("axios");

export const fetchCategory = () => (dispatch) => {
  dispatch({ type: FETCH_CATEGORY_DATA });

  axios
    .get(`${baseUri}/categories`, { headers })
    .then((response) => {
      const categories = response.data.categories;
      dispatch({ type: FETCH_CATEGORY_DATA_SUCCESS, payload: categories });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: FETCH_CATEGORY_DATA_FAILURE, payload: error });
    });
};

// export const fetchCategoryDataSuccess = (categories) => {
//   return {
//     type: FETCH_CATEGORY_DATA_SUCCESS,
//     payload: categories,
//   };
// };

// export const getCategories = () => {
//   return (dispatch) => {
//     axios.get(`${baseUri}/categories`, { headers }).then((response) => {
//       if (!response.data) throw new Error("Not Found");
//       const data = response.data;
//       dispatch(fetchCategoryDataSuccess(data.categories));
//     });
//   };
// };
