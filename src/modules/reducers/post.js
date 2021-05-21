import {
  FETCH_ALL_POSTS,
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAILURE,
  ADD_NEW_POST,
  ADD_NEW_POST_SUCCESS,
  ADD_NEW_POST_FAILURE,
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
  DOWNVOTE_POST_SUCCESS,
  DOWNVOTE_POST_FAILURE,
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

const initialState = {
  posts: { listPosts: [], isLoading: false, error: null },
  activePost: { post: {}, isLoading: false, error: null, isLoadingVote: null },
  activeComments: {
    comments: [],
    isLoading: false,
    error: null,
    isLoadingVote: null,
  },
  deletedPost: { post: null, isLoading: false, error: null },
  deletedComment: { comment: null, isLoading: false, error: null },
};

export const posts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          isLoading: true,
        },
      };
    case FETCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          listPosts: payload,
          isLoading: false,
        },
      };
    case FETCH_ALL_POSTS_FAILURE:
      return {
        ...state,
        posts: {
          ...state.posts,
          isLoading: false,
          error: payload,
        },
      };
    case ADD_NEW_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          isLoading: true,
        },
      };
    case ADD_NEW_POST_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          listPosts: [payload, ...state.posts.listPosts],
          isLoading: false,
        },
      };
    case ADD_NEW_POST_FAILURE:
      return {
        ...state,
        posts: {
          ...state.posts,
          isLoading: false,
          error: payload,
        },
      };
    case GET_POST:
      return {
        ...state,
        activePost: {
          ...state.activePost,
          isLoading: true,
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        activePost: {
          ...state.activePost,
          post: payload,
          isLoading: false,
        },
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        activePost: {
          ...state.activePost,
          isLoading: false,
          error: payload,
        },
      };
    case GET_COMMENTS:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: true,
        },
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: false,
          comments: payload,
        },
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: false,
          error: payload,
        },
      };

    case MODIFY_POST:
      // case UPVOTE_POST:
      // case DOWNVOTE_POST:
      return {
        ...state,
        activePost: {
          ...state.activePost,
          isLoading: true,
        },
      };
    case UPVOTE_POST:
    case DOWNVOTE_POST:
      return {
        ...state,
        activePost: {
          ...state.activePost,
          isLoadingVote: true,
        },
      };
    case MODIFY_POST_SUCCESS:
    case UPVOTE_POST_SUCCESS:
    case DOWNVOTE_POST_SUCCESS:
      return {
        ...state,
        activePost: {
          ...state.activePost,
          post: payload,
          isLoading: false,
          isLoadingVote: false,
        },
      };
    case MODIFY_POST_FAILURE:
    case UPVOTE_POST_FAILURE:
    case DOWNVOTE_POST_FAILURE:
      return {
        ...state,
        activePost: {
          ...state.activePost,
          isLoading: false,
          isLoadingVote: false,
          error: payload,
        },
      };
    case ADD_COMMENT:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: true,
        },
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: false,
          comments: [payload, ...state.activeComments.comments],
        },
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: false,
          error: payload,
        },
      };
    case VOTE_COMMENT:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoadingVote: true,
        },
      };
    case VOTE_COMMENT_SUCCESS:
      const idxVoteCom = state.activeComments.comments.findIndex(
        (comment) => comment.id === payload.id
      );
      let newCommentsVote = [...state.activeComments.comments];
      newCommentsVote[idxVoteCom] = payload;
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoadingVote: false,
          comments: newCommentsVote,
        },
      };
    case VOTE_COMMENT_FAILURE:
      return {
        ...state,
        activeComments: {
          ...state,
          error: payload,
        },
      };
    case EDIT_COMMENT:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: true,
        },
      };
    case EDIT_COMMENT_SUCCESS:
      const idxEditCom = state.activeComments.comments.findIndex(
        (comment) => comment.id === payload.id
      );
      let newCommentsEdit = [...state.activeComments.comments];
      newCommentsEdit[idxEditCom] = payload;
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: false,
          comments: newCommentsEdit,
        },
      };
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        activeComments: {
          ...state.activeComments,
          isLoading: false,
          error: payload,
        },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        deletedComment: {
          ...state.deletedComment,
          isLoading: true,
        },
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deletedComment: {
          ...state.deletedComment,
          isLoading: false,
          comment: payload,
        },
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deletedComment: {
          ...state.deletedComment,
          isLoading: false,
          error: payload,
        },
      };
    case DELETE_POST:
      return {
        ...state,
        deletedPost: {
          ...state.deletedPost,
          isLoading: true,
        },
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletedPost: {
          ...state.deletedPost,
          isLoading: false,
          post: payload,
        },
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletedPost: {
          ...state.deletedPost,
          isLoading: false,
          error: payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
