import {Outlet} from 'react-router-dom';

import {DashboardLayout} from '@shared/layouts';
import {Header} from './Header';
import {SideBar} from './SideBar';

export const DashboardPage = () => {
  return (
    <DashboardLayout
      header={<Header />}
      sidebar={<SideBar />}
      mainContent={<Outlet />}
    />
  );
};
