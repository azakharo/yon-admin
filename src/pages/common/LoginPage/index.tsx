import {Outlet} from 'react-router-dom';

import {AuthDataProvider} from './AuthDataContext';

export const LoginPage = () => {
  return (
    <AuthDataProvider>
      <Outlet />
    </AuthDataProvider>
  );
};
