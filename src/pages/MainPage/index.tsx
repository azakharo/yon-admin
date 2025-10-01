import {Outlet} from 'react-router-dom';

import {DashboardLayout} from '@shared/layouts';

export const MainPage = () => {
  return (
    <DashboardLayout
      header={<div>header</div>}
      sidebar={<div>sidebar</div>}
      mainContent={<Outlet />}
    />
  );
};
