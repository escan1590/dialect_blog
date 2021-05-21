/**
 * A method to capitalize a string
 * @param {*} str
 * @returns
 */
export const capitalize = (str = "") => {
  return typeof str !== "string" ? "" : str[0].toUpperCase() + str.slice(1);
};

/**
 * A method to get the post publication date from the timestamp
 * @param {*} timestamp
 * @returns
 */
export const date = (timestamp) => {
  let pubDate = new Date(timestamp);
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let monthname = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let formattedDate =
    weekday[pubDate.getDay()] +
    " " +
    monthname[pubDate.getMonth()] +
    " " +
    pubDate.getDate() +
    ", " +
    pubDate.getFullYear();
  return formattedDate;
};

/**
 * A method to get the first two letters of a user to build a userName
 * @param {*} str
 * @returns
 */
export const username = (str = "") => {
  return typeof str !== "string" ? "" : str.substring(0, 2).toUpperCase();
};

//For sorting there is a npm package
//For uuid there is a npm package
