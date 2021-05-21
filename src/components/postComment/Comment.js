import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import SendIcon from "@material-ui/icons/Send";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import { TextareaAutosize } from "@material-ui/core";
import CommentAns from "./CommentAns";
import LongMenu from "../menu/LongMenu";
import Loading from "../loading/Loading";
import { date, username } from "../../utils/utils";
import {
  voteComment,
  editComment,
  deleteComment,
} from "../../modules/actions/postAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderTop: "1px solid #eee",
    background: "#e2f3f58c",
    marginTop: "18px",
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
    backgroundColor: red[500],
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
  },
}));

export default function Comment(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [modifying, setModifying] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { isLoadingVote, isLoadingDelete } = useSelector((state) => ({
    isLoadingVote: state.posts.activeComments.isLoadingVote,
    isLoadingDelete: state.posts.deletedComment.comment,
  }));
  const handleVote = () => {
    dispatch(voteComment(props.id));
  };
  const onSubmit = (data) => {
    const content = {
      timestamp: Date.now(),
      body: data.body,
    };
    dispatch(editComment(props.id, content));
    setModifying(false);
  };
  const handleSetAction = (val) => {
    switch (val) {
      case "Modify":
        setModifying(true);
        break;
      case "Delete":
        let isExecuted = window.confirm("Are you sure you want to do that ?");
        if (isExecuted) {
          dispatch(deleteComment(props.id));
        }
        break;
    }
  };

  const handleCancel = () => {
    setModifying(false);
  };

  return (
    <>
      {modifying ? (
        <Card className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {username(props.author)}
                </Avatar>
              }
              title={props.author}
              subheader={date(props.timestamp)}
            />
            <CardContent>
              <TextareaAutosize
                {...register("body")}
                className={classes.textAreaStyle}
                aria-label="empty textarea"
                placeholder="Click Here to Edit"
                defaultValue={props.body}
              />
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={handleCancel} aria-label="cancel modify">
                <CancelIcon color="error" />
              </IconButton>
              <IconButton type="submit" aria-label="save modify">
                <SaveIcon color="primary" />
              </IconButton>
            </CardActions>
          </form>
        </Card>
      ) : (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {username(props.author)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <LongMenu onSetAction={handleSetAction} />
              </IconButton>
            }
            title={props.author}
            subheader={date(props.timestamp)}
          />
          <CardContent>
            {/* <TextareaAutosize
          className={classes.textAreaStyle}
          aria-label="empty textarea"
          placeholder="Click Here to Edit"
        /> */}
            <Typography variant="body2" color="textSecondary" component="p">
              {props.body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={handleVote} aria-label="vote">
              <FavoriteBorderIcon />
            </IconButton>
            {isLoadingVote ? props.voteScore : props.voteScore}
          </CardActions>
          {/* <CommentAns />
      <CommentAns /> */}
        </Card>
      )}
    </>
  );
}
