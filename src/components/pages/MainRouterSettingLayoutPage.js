import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Header from "../navbar/Header";
import NotFound from "./NotFound";
import AllPostPage from "./AllPostPage";
import CreatePost from "./CreatePost";
import Read from "../readPost/Read";

const useStyles = makeStyles({
  root: {
    background: "#fff4e3",
    minHeight: "100vh",
  },
});
const MainRouterSettingLayoutPage = (props) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root} elevation={0}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={1} sm={2} />
        <Grid item container xs={10} sm={8}>
          <Switch>
            <Route exact path="/" component={AllPostPage} />
            <Route exact path="/posts/newPost" component={CreatePost} />
            <Route exact path="/posts/read/:id" component={Read} />

            <Route exact path="*" component={NotFound} />
          </Switch>
        </Grid>
        <Grid item xs={1} sm={2} />
      </Grid>
    </Grid>
  );
};

export default MainRouterSettingLayoutPage;

/**
 *
 * 
 * <Grid item container>
          <Grid item xs={1} sm={2} />
          <Grid item container xs={10} sm={8}>
            <Content />
          </Grid>
          <Grid item xs={1} sm={2} />
        </Grid>
 * <Grid item container>
          <Grid item xs={1} sm={2} />
          <Grid item xs>
            <Read></Read>
          </Grid>
          <Grid item xs={1} sm={2} />
        </Grid>
        <Grid item container>
          <Grid item xs={1} sm={2} />
          <Grid item xs>
            <RichEditor />
          </Grid>
          <Grid item xs={1} sm={2} />
        </Grid>
 * 
 */
