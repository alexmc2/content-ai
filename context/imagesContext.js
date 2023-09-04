import React, { useReducer, useCallback } from 'react';

export const ImagesContext = React.createContext();

const initialState = {
  images: [],
};

const imagesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    case 'ADD_IMAGES':
      const newImages = [...state.images];
      action.payload.forEach((image) => {
        const exists = newImages.find((i) => i._id === image._id);
        if (!exists) {
          newImages.push(image);
        }
      });
      return { ...state, images: newImages };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image._id !== action.payload),
      };
    default:
      return state;
  }
};

export const ImagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imagesReducer, initialState);

  const setImagesFromSSR = useCallback((imagesFromSSR = []) => {
    dispatch({ type: 'SET_IMAGES', payload: imagesFromSSR });
  }, []);

  const getImages = useCallback(async ({ lastImageDate }) => {
    const result = await fetch('/api/getImages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ lastImageDate }),
    });

    const json = await result.json();
    const imagesResult = json.images || [];
    dispatch({ type: 'ADD_IMAGES', payload: imagesResult });
  }, []);

  const deleteImage = useCallback(async (imageId) => {
    try {
      const response = await fetch('/api/deleteImage', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      });
      const json = await response.json();
      if (json.success) {
        dispatch({ type: 'DELETE_IMAGE', payload: imageId });
      } else {
        console.log('Failed to delete image on the server.');
      }
    } catch (e) {
      console.log('Error deleting image:', e);
    }
  }, []);

  return (
    <ImagesContext.Provider
      value={{
        images: state.images,
        setImagesFromSSR,
        getImages,
        deleteImage,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};
