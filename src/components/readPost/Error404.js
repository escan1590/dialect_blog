import IconError from "../error/IconError";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <>
      <IconError />
      <div class="message-box">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </>
  );
};

export default Error404;
