import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import NotesIcon from "@material-ui/icons/Notes";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Loading from "../loading/Loading";
import { fetchCategory } from "../../modules/actions/menuAction";
import { addNewPost } from "../../modules/actions/postAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cancel: {
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
  },
  textArea: {
    width: "100%",
    minHeight: "190px",
    resize: "none",
    marginTop: "21px",
    fontFamily: "roboto",
    lineHeight: "20px",
    fontSize: "16px",
    background: "none",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  marginTopSmall: {
    marginTop: "7px",
  },

  buttonSelected: {
    border: "2px solid #545fa6",
    color: "#000",
  },
  errorStyle: {
    marginLeft: "10px",
    color: "#f44336",
  },
  errorBorder: {
    border: "1px solid #f44336",
    color: "#f44336",
  },
}));

function CreatePost() {
  let post = new Object();
  //history
  const history = useHistory();
  //error
  const [isError, setError] = useState(false);
  //Author
  const [author, setAuthor] = useState("");
  const [authorError, setAuthorError] = useState({
    label: "",
    error: false,
  });
  //Title
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState({
    label: "",
    error: false,
  });
  //Category
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState({
    label: "",
    error: false,
  });
  //postText
  const [postText, setPostText] = useState("");
  const [postTextError, setPostTextError] = useState({
    label: "",
    error: false,
  });

  const classes = useStyles();

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

  const handleSubmit = (e) => {
    let addit = false;
    e.preventDefault();
    if (!author) {
      setError(true);
      setAuthorError({ label: "Enter the name of the author", error: true });
    }
    if (!title) {
      setError(true);
      setTitleError({ label: "Enter the title", error: true });
    }
    if (!category) {
      setError(true);
      setCategoryError({ label: "Select a category above", error: true });
    }
    if (!postText) {
      setError(true);
      setPostTextError({
        label: "Your post text cannot be empty",
        error: true,
      });
    }
    if (isError) return;
    addit = true;
    post = {
      id: uuid(),
      timestamp: Date.now(),
      title,
      body: postText,
      author,
      category,
    };

    if (addit) {
      dispatch(addNewPost(post));
      history.push("/");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <NotesIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              New Post
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                error={authorError.error ? true : false}
                helperText={authorError.error ? authorError.label : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Author"
                label="Author Name"
                name="Author"
                autoFocus
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  if (e.target.value.length > 0)
                    setAuthorError({ label: "", error: false });
                }}
              />
              <TextField
                error={titleError.error ? true : false}
                helperText={titleError.error ? titleError.label : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="title"
                label="title"
                type="title"
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.length > 0)
                    setTitleError({ label: "", error: false });
                }}
              />
              <Grid className={classes.marginTopSmall} container spacing={2}>
                {listCategory.map(({ name, path }) => (
                  <Grid key={path} item>
                    <Button
                      variant={name === category ? "text" : "outlined"}
                      color="secondary"
                      onClick={() => {
                        setCategory(name);
                        if (category)
                          setCategoryError({ label: "", error: false });
                      }}
                      className={
                        name === category ? classes.buttonSelected : ""
                      }
                      //   className={classes.buttonSelected}
                    >
                      {name}
                    </Button>
                  </Grid>
                ))}
                {categoryError.error ? (
                  <Grid className={classes.errorStyle} item xs={12}>
                    {categoryError.label}
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
              <TextareaAutosize
                name="postBody"
                className={
                  postTextError.error
                    ? `${classes.errorBorder} ${classes.textArea}`
                    : `${classes.textArea}`
                }
                placeholder="post text here"
                value={postText}
                onChange={(e) => {
                  setPostText(e.target.value);
                  if (e.target.value.length > 0)
                    setPostTextError({ label: "", error: false });
                }}
                required
              />
              {postTextError.error ? (
                <Grid className={classes.errorStyle} item xs={12}>
                  {postTextError.label}
                </Grid>
              ) : (
                <></>
              )}
              <Grid container>
                <Grid item xs={12} sm={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => handleSubmit(e)}
                  >
                    create post
                  </Button>
                </Grid>
                <Grid item sm={8}></Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.cancel}
                    component={Link}
                    to="/"
                  >
                    cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </>
  );
}

export default CreatePost;
