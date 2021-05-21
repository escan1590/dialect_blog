import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core";
import DeveloperModeRoundedIcon from "@material-ui/icons/DeveloperModeRounded";
import { makeStyles } from "@material-ui/core/styles";
import { fetchCategory } from "../../modules/actions/menuAction";

const useStyles = makeStyles({
  typographyStyles: {
    flex: 1,
  },
  paddingSmall: {
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  paddingBig: {
    paddingTop: "25px",
    paddingBottom: "25px",
  },
  styledBar: {
    backgroundColor: "#ffa45c",
    color: "#fff4e3",
  },
  buttonStyle: {
    boxShadow: "none",
    background: "#5d5d5a",
    color: "#fff4e3",
    borderRadius: "100px",
  },
  selected: {
    caretColor: "#f6ea8c",
    backgroundColor: "#492540",
  },
});

const Header = () => {
  const { listCategory, isLoading, error } = useSelector((state) => {
    const statePayLoad = {
      listCategory: state.categories.categories.listCategory,
      isLoading: state.categories.categories.isLoading,
      error: state.categories.categories.error,
    };
    return statePayLoad;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <p>There was an error</p>
          ) : (
            <AppBar
              className={`${classes.paddingBig} ${classes.styledBar}`}
              position="static"
            >
              <Toolbar>
                <Grid container className={classes.paddingSmall}>
                  <Grid item xs={2}></Grid>
                  <Grid container item xs={8}>
                    <Typography className={classes.typographyStyles}>
                      Cameroon Dialect Blog
                    </Typography>
                    <DeveloperModeRoundedIcon />
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid container item>
                    <Grid
                      container
                      spacing={2}
                      className={classes.paddingSmall}
                    >
                      <Grid item xs={false} sm={2}></Grid>
                      {listCategory.map(({ name, path }) => {
                        return (
                          <Grid key={path} item>
                            <Button
                              key={path}
                              component={Link}
                              className={classes.buttonStyle}
                              to={{
                                pathname: `/category/${path}`,
                              }}
                              value={name}
                              variant="contained"
                            >
                              {name}
                            </Button>
                          </Grid>
                        );
                      })}
                      <Grid item xs={false} sm={2}></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          )}
        </>
      )}
    </>
  );
};

export default Header;
