import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {useErrorBoundary} from 'react-error-boundary';
import useMount from 'ahooks/es/useMount';

import {CurrentUser, getCurrentUser} from '@entities/user';
import {
  getAuthTokenFromLocalStorage,
  setAuthTokenInLocalStorage,
  setRefreshTokenInLocalStorage,
} from './helpers/localStorage';
import {EnterSmsCodeResult, logout as logoutApiMethod} from './api';
import {clearOnLogout} from './cleanupOnLogout';

const isAuthed = (): boolean => !!getAuthTokenFromLocalStorage();

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: CurrentUser | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
};

export interface AuthContextType extends AuthState {
  onLoginSuccess: (tokens: EnterSmsCodeResult) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
  onLoginSuccess: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider: FC<React.PropsWithChildren> = ({children}) => {
  const {showBoundary} = useErrorBoundary();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [initializing, setInitializing] = useState(true);

  const getLoggedInUser = useCallback(async () => {
    let user: CurrentUser | null = null;
    try {
      user = await getCurrentUser();
    } catch (err) {
      console.log('could not get the current user');
      showBoundary(err);
      return;
    }

    setCurrentUser(user);
    setIsAuthenticated(true);
  }, [showBoundary]);

  const onLoginSuccess = useCallback(
    ({authToken, refreshToken}: EnterSmsCodeResult) => {
      setAuthTokenInLocalStorage(authToken);
      setRefreshTokenInLocalStorage(refreshToken);
      return getLoggedInUser();
    },
    [getLoggedInUser],
  );

  const logout = useCallback(() => {
    void logoutApiMethod().catch(err => {
      console.log('Could not log out using API');
      console.error(err);
    });
    clearOnLogout();
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      onLoginSuccess,
      logout,
    }),
    [isAuthenticated, onLoginSuccess, logout, currentUser],
  );

  useMount(() => {
    if (isAuthed()) {
      void getLoggedInUser().then(() => {
        setInitializing(false);
        return;
      });
    } else {
      setInitializing(false);
    }
  });

  if (initializing) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
