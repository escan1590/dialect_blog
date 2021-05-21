import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, history, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { TextareaAutosize } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Collapse from "@material-ui/core/Collapse";
import { ChatBubble } from "@material-ui/icons";
import Comment from "../postComment/Comment";
import LongMenu from "../menu/LongMenu";
import Loading from "../loading/Loading";
import NewComment from "../postComment/NewComment";
import {
  getPost,
  getComments,
  modifyPost,
  upVotePost,
  downVotePost,
  deletePost,
} from "../../modules/actions/postAction";
import { date } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "16px",
    marginBottom: "16px",
    border: "none",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: grey[500],
  },
  putToLeft: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  putToRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textAreaStyle: {
    border: "none",
    width: "100%",
    resize: "none",
    outline: "none",
    fontFamily: "roboto",
    lineHeight: "20px",
    fontSize: "13px",
    background: "none",
    borderRadius: "0px",
    color: "#45e",
  },
  textAreaTitle: {
    fontSize: "23px",
    color: "#45e",
  },
}));

export default function RecipeReviewCard() {
  const { id } = useParams();
  const history = useHistory();
  const {
    post,
    comments,
    isLoading,
    error,
    isLoadingComments,
    isLoadingVote,
    isLoadingDelete,
  } = useSelector((state) => ({
    post: state.posts.activePost.post,
    comments: state.posts.activeComments.comments,
    isLoading: state.posts.activePost.isLoading,
    error: state.posts.activePost.error,
    isLoadingComments: state.posts.activeComments.isLoading,
    isLoadingVote: state.posts.activeComments.isLoadingVote,
    isLoadingDelete: state.posts.deletedPost.isLoading,
  }));
  const { register, handleSubmit, errors } = useForm();
  const [modifying, setModifying] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getComments(id));
  }, []);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const onSubmit = (data) => {
    dispatch(modifyPost(id, data));
    setModifying(false);
  };

  const handleCancel = () => {
    setModifying(false);
  };

  const handleUpVote = () => {
    dispatch(upVotePost(id));
  };

  const handleDownVote = () => {
    dispatch(downVotePost(id));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSetAction = (val) => {
    switch (val) {
      case "Modify":
        setModifying(true);
        break;
      case "Delete":
        let isExecuted = window.confirm("Are you sure you want to do that ?");
        if (isExecuted) {
          dispatch(deletePost(id));
          history.push("/");
        }
        break;
    }
  };
  return (
    <>
      {isLoadingDelete ? (
        <Loading />
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : modifying ? (
            <Card className={classes.root}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <LongMenu onSetAction={handleSetAction} />
                    </IconButton>
                  }
                  title={
                    <>
                      <TextareaAutosize
                        defaultValue={post.title}
                        {...register("title")}
                        className={`${classes.textAreaStyle} ${classes.textAreaTitle}`}
                        aria-label="empty textarea"
                        placeholder="Click Here to Edit"
                      />
                    </>
                  }
                  subheader={date(post.timestamp)}
                />
                <CardContent>
                  <TextareaAutosize
                    defaultValue={post.body}
                    {...register("body")}
                    className={classes.textAreaStyle}
                    aria-label="empty textarea"
                    placeholder="Click Here to Edit"
                  />
                </CardContent>
                <CardActions disableSpacing>
                  <Grid container>
                    <Grid item xs={2} className={classes.putToLeft}>
                      <></>
                    </Grid>
                    <Grid item xs={8}></Grid>

                    <Grid item xs={2} className={classes.putToRight}>
                      <>
                        <IconButton
                          onClick={handleCancel}
                          aria-label="Cancel Modification"
                        >
                          <CancelIcon color="error" />
                        </IconButton>
                        <IconButton
                          type="submit"
                          aria-label="Save Modification"
                        >
                          <SaveIcon
                            // onClick={handleEndModification}
                            color="primary"
                          />
                        </IconButton>
                      </>
                    </Grid>
                  </Grid>
                </CardActions>
              </form>
            </Card>
          ) : (
            <Card className={classes.root}>
              <CardHeader
                // avatar={
                //   <Avatar aria-label="recipe" className={classes.avatar}>
                //     R
                //   </Avatar>
                // }
                action={
                  <IconButton aria-label="settings">
                    <LongMenu onSetAction={handleSetAction} />
                  </IconButton>
                }
                title={post.title}
                subheader={date(post.timestamp)}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Grid container>
                  <Grid item xs={2} className={classes.putToLeft}>
                    <>
                      <IconButton
                        onClick={handleUpVote}
                        aria-label="upvote this post"
                      >
                        <ThumbUpIcon />
                      </IconButton>
                      {isLoadingVote ? post.upVoteScore : post.upVoteScore}
                      <IconButton
                        onClick={handleDownVote}
                        aria-label="downvote this post"
                      >
                        <ThumbDownIcon />
                      </IconButton>
                      {isLoadingVote ? post.downVoteScore : post.downVoteScore}
                    </>
                  </Grid>
                  <Grid item xs={8}></Grid>

                  <Grid item xs={2} className={classes.putToRight}>
                    {isLoadingComments ? post.commentCount : post.commentCount}
                    <IconButton
                      onClick={handleExpandClick}
                      aria-label="Modify Post"
                    >
                      <ChatBubble color="primary" />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
              {
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <NewComment parentId={id} />
                    {isLoadingComments ? (
                      <Loading />
                    ) : (
                      <>
                        {comments.map(
                          ({
                            id,
                            parentId,
                            timestamp,
                            body,
                            author,
                            voteScore,
                          }) => (
                            <Comment
                              key={id}
                              id={id}
                              parentId={parentId}
                              timestamp={timestamp}
                              body={body}
                              author={author}
                              voteScore={voteScore}
                            />
                          )
                        )}
                      </>
                    )}
                  </CardContent>
                </Collapse>
              }
            </Card>
          )}
        </>
      )}
    </>
  );
}
