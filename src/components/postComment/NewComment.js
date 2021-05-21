import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import SendIcon from "@material-ui/icons/Send";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import { TextareaAutosize } from "@material-ui/core";
import { addComment } from "../../modules/actions/postAction";
import CommentAns from "./CommentAns";
import LongMenu from "../menu/LongMenu";
import { username } from "../../utils/utils";
import { v4 as uuid } from "uuid";
import { createComment } from "../../modules/actions/postAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderTop: "1px solid grey",
    background: "#ffcdab",
    color: "#5d5d5a",
    boxShadow: "none",
    marginBottom: "18px",
    borderRadius: 0,
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
    fontSize: "14px",
    background: "none",
    borderRadius: "0px",
  },
}));

const NewComment = (props) => {
  const classes = useStyles();
  const user = uuid();
  const [input, setinput] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { register, handleSubmit, reset, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const content = {
      id: uuid(),
      timestamp: Date.now(),
      body: data.body,
      author: user,
      parentId: props.parentId,
    };

    dispatch(addComment(content));
    reset();
  };

  return (
    <Card className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {username(user)}
            </Avatar>
          }
          title={user}
        />
        <CardContent>
          <TextareaAutosize
            {...register("body")}
            className={classes.textAreaStyle}
            aria-label="empty textarea"
            placeholder="Click Here to start Commenting"
            defaultValue=""
          />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            type="submit"
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <SendIcon />
          </IconButton>
        </CardActions>
      </form>
    </Card>
  );
};

export default NewComment;
