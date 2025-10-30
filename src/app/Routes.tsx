import {createRoutesFromElements, Navigate, Route} from 'react-router-dom';
import {ProtectedRoute} from '@features/auth';

import {
  ROUTE__CREATE_EVENT,
  ROUTE__CURRENT_USER_PROFILE,
  ROUTE__EVENT_DETAILS,
  ROUTE__EVENTS,
  ROUTE__LOGIN,
  ROUTE__LOGIN__ENTER_CODE,
  ROUTE__LOGIN__ENTER_PHONE,
  ROUTE__MAIN,
  ROUTE__ORDER_FULL_INFO,
  ROUTE__ORDERS,
  ROUTE__USER_ACCOUNT,
  ROUTE__USER_ORDERS,
  ROUTE__USERS,
} from '@shared/constants';
import {EventsPage} from '../pages/MainPage/Events';
import {AppWrapper} from './AppWrapper';

import {CurrentUserProfilePage} from '@/pages/CurrentUserProfilePage';
import ErrorPage404 from '@/pages/Errors/404';
import {LoginPage} from '@/pages/LoginPage';
import {EnterCodeStep} from '@/pages/LoginPage/EnterCodeStep';
import {EnterPhoneStep} from '@/pages/LoginPage/EnterPhoneStep';
import {MainPage} from '@/pages/MainPage';
import {CreateEventPage} from '@/pages/MainPage/CreateEvent';
import {EditEventPage} from '@/pages/MainPage/EditEvent';
import {OrderFullInfoPage} from '@/pages/MainPage/OrderFullInfo';
import {OrdersPage} from '@/pages/MainPage/Orders';
import {TaskCategoryTable} from '@/pages/MainPage/Section1/TaskCategoryTable';
import {UserAccountPage} from '@/pages/MainPage/UserAccount';
import {UserOrdersPage} from '@/pages/MainPage/UserOrders';
import {UsersPage} from '@/pages/MainPage/Users';

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<AppWrapper />}>
      <Route path={ROUTE__LOGIN} element={<LoginPage />}>
        <Route path={ROUTE__LOGIN__ENTER_PHONE} element={<EnterPhoneStep />} />
        <Route path={ROUTE__LOGIN__ENTER_CODE} element={<EnterCodeStep />} />
        <Route
          index
          element={<Navigate replace to={ROUTE__LOGIN__ENTER_PHONE} />}
        />
        <Route path="*" element={<ErrorPage404 />} />
      </Route>

      <Route
        path={ROUTE__MAIN}
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      >
        <Route path="group1/section1" element={<TaskCategoryTable />} />
        <Route path="group1/section2" element={<div>Section 2</div>} />
        <Route path={ROUTE__USERS} element={<UsersPage />} />
        <Route path={ROUTE__USER_ACCOUNT} element={<UserAccountPage />} />
        <Route path={ROUTE__USER_ORDERS} element={<UserOrdersPage />} />
        <Route path={ROUTE__ORDER_FULL_INFO} element={<OrderFullInfoPage />} />
        <Route path={ROUTE__EVENTS} element={<EventsPage />} />
        <Route path={ROUTE__EVENT_DETAILS} element={<EditEventPage />} />
        <Route path={ROUTE__CREATE_EVENT} element={<CreateEventPage />} />
        <Route path={ROUTE__ORDERS} element={<OrdersPage />} />

        <Route index element={<Navigate replace to={ROUTE__USERS} />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Route>

      <Route
        path={ROUTE__CURRENT_USER_PROFILE}
        element={
          <ProtectedRoute>
            <CurrentUserProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate replace to={ROUTE__MAIN} />} />

      <Route path="*" element={<ErrorPage404 />} />
    </Route>
  </>,
);
