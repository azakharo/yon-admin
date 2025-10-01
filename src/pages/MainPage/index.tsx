import {Outlet} from 'react-router-dom';

import {DashboardLayout} from '@shared/layouts';
import {Header} from './Header';

export const MainPage = () => {
  return (
    <DashboardLayout
      header={<Header />}
      sidebar={<div>sidebar</div>}
      mainContent={<Outlet />}
    />
  );
};
