import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import { Grid } from "@material-ui/core";
import { date } from "../../utils/utils";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: "250px",
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
  relative: {
    position: "relative",
    background: "#ffcdab",
  },
  categoryBox: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    fontSize: "14px",
    background: "#5d5d5a",
    color: "#fff",
    padding: "5px",
    border: "none",
    borderTopLeftRadius: "4px",
  },
  buttonPos: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
  },
});

function PostCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={`${classes.relative} ${classes.root}`}>
      <div className={classes.categoryBox} color="textSecondary" gutterBottom>
        {props.category}
      </div>
      <CardHeader
        // avatar={
        //   // <Avatar aria-label="recipe" className={classes.avatar}>
        //   //   RT
        //   // </Avatar>
        // }
        title={props.title}
        subheader={date(props.timestamp)}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {props.body}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.buttonPos}
          variant="contained"
          color="primary"
          size="small"
          component={Link}
          to={`/posts/read/${props.id}`}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
