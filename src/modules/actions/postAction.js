import axios from "axios";
import { headers } from "../root/header";
import { baseUri } from "../root/configUrl";
import {
  FETCH_ALL_POSTS,
  FETCH_ALL_POSTS_FAILURE,
  FETCH_ALL_POSTS_SUCCESS,
  ADD_NEW_POST,
  ADD_NEW_POST_FAILURE,
  ADD_NEW_POST_SUCCESS,
  GET_POST,
  GET_POST_FAILURE,
  GET_POST_SUCCESS,
  GET_COMMENTS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_SUCCESS,
  MODIFY_POST,
  MODIFY_POST_FAILURE,
  MODIFY_POST_SUCCESS,
  UPVOTE_POST,
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAILURE,
  DOWNVOTE_POST,
  DOWNVOTE_POST_FAILURE,
  DOWNVOTE_POST_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  VOTE_COMMENT,
  VOTE_COMMENT_SUCCESS,
  VOTE_COMMENT_FAILURE,
  EDIT_COMMENT,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
} from "../actionTypes/postTypes";

export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_POSTS });

  await axios
    .get(`${baseUri}/posts`, { headers })
    .then((response) => {
      const posts = response.data;
      dispatch({ type: FETCH_ALL_POSTS_SUCCESS, payload: posts });
    })
    .catch((error) => {
      dispatch({ type: FETCH_ALL_POSTS_FAILURE, payload: error });
    });
};

export const addNewPost = (content) => async (dispatch) => {
  dispatch({ type: ADD_NEW_POST });

  await axios({
    method: "post",
    url: `${baseUri}/posts`,
    data: content,
    headers,
  })
    .then((response) => {
      const newPost = response.data;
      console.log(newPost);
      dispatch({ type: ADD_NEW_POST_SUCCESS, payload: newPost });
    })
    .catch((error) => {
      dispatch({ type: ADD_NEW_POST_FAILURE, payload: error });
    });
};

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST });

  await axios
    .get(`${baseUri}/posts/${id}`, { headers })
    .then((response) => {
      const activePost = response.data;
      dispatch({ type: GET_POST_SUCCESS, payload: activePost });
    })
    .catch((error) => {
      dispatch({ type: GET_POST_FAILURE, payload: error });
    });
};

export const getComments = (id) => async (dispatch) => {
  dispatch({ type: GET_COMMENTS });

  await axios
    .get(`${baseUri}/posts/${id}/comments`, { headers })
    .then((response) => {
      const comments = response.data;
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: comments });
    })
    .catch((error) => {
      dispatch({ type: GET_COMMENTS_FAILURE, payload: error });
    });
};

export const modifyPost = (id, data) => async (dispatch) => {
  dispatch({ type: MODIFY_POST });

  await axios({
    method: "put",
    url: `${baseUri}/posts/${id}`,
    data,
    headers,
  })
    .then((response) => {
      const modifiedPost = response.data;
      dispatch({ type: MODIFY_POST_SUCCESS, payload: modifiedPost });
    })
    .catch((error) => {
      dispatch({ type: MODIFY_POST_FAILURE, payload: error });
    });
};

export const upVotePost = (id) => async (dispatch) => {
  dispatch({ type: UPVOTE_POST });

  await axios({
    method: "post",
    url: `${baseUri}/posts/${id}`,
    data: { option: "upVote" },
    headers,
  })
    .then((response) => {
      const upVotedComment = response.data;
      dispatch({ type: UPVOTE_POST_SUCCESS, payload: upVotedComment });
    })
    .catch((error) => {
      dispatch({ type: UPVOTE_POST_FAILURE, payload: error });
    });
};

export const downVotePost = (id) => async (dispatch) => {
  dispatch({ type: DOWNVOTE_POST });

  await axios({
    method: "post",
    url: `${baseUri}/posts/${id}`,
    data: { option: "downVote" },
    headers,
  })
    .then((response) => {
      const downVotedPost = response.data;
      dispatch({ type: DOWNVOTE_POST_SUCCESS, payload: downVotedPost });
    })
    .catch((error) => {
      dispatch({ type: DOWNVOTE_POST_FAILURE, payload: error });
    });
};

export const addComment = (data) => (dispatch) => {
  dispatch({ type: ADD_COMMENT });

  axios({
    method: "post",
    url: `${baseUri}/comments`,
    data,
    headers,
  })
    .then((response) => {
      const addedComment = response.data;
      dispatch({ type: ADD_COMMENT_SUCCESS, payload: addedComment });
    })
    .catch((error) => {
      dispatch({ type: ADD_COMMENT_FAILURE, payload: error });
    });
};

export const voteComment = (id) => async (dispatch) => {
  dispatch({ type: VOTE_COMMENT });

  await axios({
    method: "post",
    url: `${baseUri}/comments/${id}`,
    data: { option: "upVote" },
    headers,
  })
    .then((response) => {
      const upVotedComment = response.data;
      dispatch({ type: VOTE_COMMENT_SUCCESS, payload: upVotedComment });
    })
    .catch((error) => {
      dispatch({ type: VOTE_COMMENT_FAILURE, payload: error });
    });
};

export const editComment = (id, data) => async (dispatch) => {
  dispatch({ type: EDIT_COMMENT });

  await axios({
    method: "put",
    url: `${baseUri}/comments/${id}`,
    data,
    headers,
  })
    .then((response) => {
      const modifiedComment = response.data;
      dispatch({ type: EDIT_COMMENT_SUCCESS, payload: modifiedComment });
    })
    .catch((error) => {
      dispatch({ type: EDIT_COMMENT_FAILURE, payload: error });
    });
};

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: DELETE_POST });

  await axios({
    method: "delete",
    url: `${baseUri}/posts/${id}`,
    headers,
  })
    .then((response) => {
      const deletePost = response.data;
      dispatch({ type: DELETE_POST_SUCCESS, payload: deletePost });
    })
    .catch((error) => {
      dispatch({ type: DELETE_POST_FAILURE, payload: error });
    });
};

export const deleteComment = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENT });

  await axios({
    method: "delete",
    url: `${baseUri}/comments/${id}`,
    headers,
  })
    .then((response) => {
      const deleteComment = response.data;
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: deleteComment });
    })
    .catch((error) => {
      dispatch({ type: DELETE_COMMENT_FAILURE, payload: error });
    });
};
