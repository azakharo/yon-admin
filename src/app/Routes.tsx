import {createRoutesFromElements, Navigate, Route} from 'react-router-dom';
import {ProtectedRoute} from '@features/auth';

import {
  ROUTE__CURRENT_USER_PROFILE,
  ROUTE__LOGIN,
  ROUTE__LOGIN__ENTER_CODE,
  ROUTE__LOGIN__ENTER_PHONE,
  ROUTE__MAIN,
} from '@shared/constants';
import {AppWrapper} from './AppWrapper';

import {CurrentUserProfilePage} from '@/pages/CurrentUserProfilePage';
import ErrorPage404 from '@/pages/Errors/404';
import {LoginPage} from '@/pages/LoginPage';
import {EnterCodeStep} from '@/pages/LoginPage/EnterCodeStep';
import {EnterPhoneStep} from '@/pages/LoginPage/EnterPhoneStep';
import {MainPage} from '@/pages/MainPage';

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
        <Route path="section1" element={<div>Section 1</div>} />
        <Route path="section2" element={<div>Section 2</div>} />
        <Route index element={<Navigate replace to="section1" />} />
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
