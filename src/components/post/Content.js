import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import PostCard from "./PostCard";
import AddPost from "./AddPost";
import Loading from "../loading/Loading";
import { makeStyles } from "@material-ui/core/styles";
import { fetchPosts } from "../../modules/actions/postAction";

const useStyles = makeStyles({
  containerStyle: {
    marginTop: "16px",
  },
});

function Content() {
  const { postList, isLoading, error } = useSelector((state) => ({
    postList: state.posts.posts.listPosts,
    isLoading: state.posts.posts.isLoading,
    error: state.posts.posts.error,
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={2} className={classes.containerStyle}>
          {postList.map((post) => (
            <Grid key={post.id} item xs={12} sm={6} md={4}>
              <PostCard
                id={post.id}
                timestamp={post.timestamp}
                title={post.title}
                category={post.category}
                body={post.body}
              />
            </Grid>
          ))}
          <Grid key="add-post" item xs={12} sm={6} md={4}>
            <AddPost />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Content;
