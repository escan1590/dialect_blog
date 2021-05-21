const axios = require("axios");
const token = Math.random().toString(36).substr(-8);
const baseUri = "http://localhost:3001";
const headers = {
  Accept: "application/json",
  Authorization: token,
};

const getCategories = () => {
  axios
    .get(`${baseUri}/posts/8xf0y6ziyjabvozdd253nd/comments`, {
      headers,
    })
    .then((response) => {
      if (response) console.log("kuuuuuuuuuuuuuuuuuuuuuuuuu");
      console.log(response.statusText);
      const data = response.data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error.response.statusText);
    });
};

getCategories();

//reponse => statusText for error
//isAxiosError : true =>  for error
//response.data to get api data no json convertion neeeded
