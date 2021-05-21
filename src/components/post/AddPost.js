import React from "react";
import { makeStyles, Card, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: "250px",
    display: "flex",
    flexDirection: "column",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  center: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconScale: {
    transform: "scale(2)",
    marginBottom: "15px",
  },
});
const AddPost = () => {
  const classes = useStyles();
  return (
    <Link to="/posts/newPost">
      {" "}
      <Card className={`${classes.root} ${classes.center}`}>
        <PostAddIcon className={classes.iconScale} />
        <Typography>Add A post</Typography>
      </Card>
    </Link>
  );
};

export default AddPost;
