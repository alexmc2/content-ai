import React, { useReducer, useCallback } from 'react';

export const PostsContext = React.createContext();

const initialState = {
  posts: [],
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'ADD_POSTS':
      const newPosts = [...state.posts];
      action.payload.forEach((post) => {
        const exists = newPosts.find((p) => p._id === post._id);
        if (!exists) {
          newPosts.push(post);
        }
      });
      return { ...state, posts: newPosts };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    dispatch({ type: 'SET_POSTS', payload: postsFromSSR });
  }, []);

  const getPosts = useCallback(async ({ lastPostDate }) => {
    const result = await fetch('/api/getPosts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ lastPostDate }),
    });

    const json = await result.json();
    const postsResult = json.posts || [];
    dispatch({ type: 'ADD_POSTS', payload: postsResult });
  }, []);

  const deletePost = useCallback(async (postId) => {
    try {
      const response = await fetch('/api/deletePost', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });
      const json = await response.json();
      if (json.success) {
        dispatch({ type: 'DELETE_POST', payload: postId });
      } else {
        console.log('Failed to delete post on the server.');
      }
    } catch (e) {
      console.log('Error deleting post:', e);
    }
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        setPostsFromSSR,
        getPosts,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
