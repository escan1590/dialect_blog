import { Grid } from "@material-ui/core";
import CircularIndeterminate from "../progressBar/CircularIndeterminate";
import { makeStyles } from "@material-ui/core/styles";

const Loading = (props) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      placeContent: "center",
      height: "85vh",
      width: "100%",
    },
  });
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <CircularIndeterminate />
    </Grid>
  );
};

export default Loading;
