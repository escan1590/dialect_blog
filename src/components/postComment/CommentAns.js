import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import { TextareaAutosize, Grid } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderTop: "1px solid #eee",
    background: "#e2f3f5",
    paddingTop: "16px",
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

export default function CommentAns() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        </Grid>
        <Grid item xs={8} md={9}>
          <CardContent>
            <TextareaAutosize
              className={classes.textAreaStyle}
              aria-label="empty textarea"
              placeholder="Click Here to Edit"
            />
          </CardContent>
        </Grid>
        <Grid item xs={2} md={1}>
          <CardActions disableSpacing>
            <IconButton aria-label="settings">
              <SendIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
      {/* <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
