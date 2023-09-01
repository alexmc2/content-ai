import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

export const PostsContext = React.createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    console.log('postsFromSSR: ', postsFromSSR);
    setPosts(postsFromSSR); // set posts from SSR
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
    console.log('postResult: ', postsResult);
    setPosts((value) => {
      const newPosts = [...value];
      postsResult.forEach((post) => {
        const exists = newPosts.find((p) => p._id === post._id);
        if (!exists) {
          newPosts.push(post);
        }
      });
      return newPosts;
    });
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
        // Update the local state to remove the deleted post
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post._id !== postId)
        );
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
        posts,
        setPostsFromSSR,
        getPosts,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
