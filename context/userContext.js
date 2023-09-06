import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const ExtendedUserContext = createContext();

export const useExtendedUser = () => {
  return useContext(ExtendedUserContext);
};

export const ExtendedUserProvider = ({ children }) => {
  const { user: auth0User } = useUser();
  const [extendedUser, setExtendedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth0User) {
      fetch(`/api/getUserData?userId=${auth0User.sub}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }
          return res.json();
        })
        .then((data) => {
          setExtendedUser({ ...auth0User, ...data });
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [auth0User]);

  return (
    <ExtendedUserContext.Provider
      value={{ user: extendedUser, loading, error }}
    >
      {children}
    </ExtendedUserContext.Provider>
  );
};
