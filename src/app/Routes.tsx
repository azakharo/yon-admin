import {createRoutesFromElements, Navigate, Route} from 'react-router-dom';
import {ProtectedRoute} from '@features/auth';

import {
  ROUTE__CATEGORIES,
  ROUTE__CATEGORY_CREATE,
  ROUTE__CATEGORY_EDIT,
  ROUTE__CREATE_EVENT,
  ROUTE__CURRENT_USER_PROFILE,
  ROUTE__DASHBOARD,
  ROUTE__EVENT_DETAILS,
  ROUTE__EVENTS,
  ROUTE__GEO_FILTER_OPTION__CREATE,
  ROUTE__GEO_FILTER_OPTION__EDIT,
  ROUTE__GEO_FILTER_OPTIONS,
  ROUTE__LOGIN,
  ROUTE__LOGIN__ENTER_CODE,
  ROUTE__LOGIN__ENTER_PHONE,
  ROUTE__ORDER_FULL_INFO,
  ROUTE__ORDERS,
  ROUTE__PROMO_MONEY_TRANSACTIONS,
  ROUTE__PROMOCODE_CREATE,
  ROUTE__PROMOCODES,
  ROUTE__SUB_CATEGORIES,
  ROUTE__SUB_CATEGORY_CREATE,
  ROUTE__SUB_CATEGORY_EDIT,
  ROUTE__USER_ACCOUNT,
  ROUTE__USER_ORDERS,
  ROUTE__USERS,
} from '@shared/constants';
import {AppWrapper} from './AppWrapper';

import {CategoriesPage} from '@/pages/category/Categories';
import {CreateCategoryPage} from '@/pages/category/CreateCategory';
import {CreateGeoFilterOptionPage} from '@/pages/category/CreateGeoFilterOption';
import {CreateSubCategoryPage} from '@/pages/category/CreateSubCategory';
import {EditCategoryPage} from '@/pages/category/EditCategory';
import {EditGeoFilterOptionPage} from '@/pages/category/EditGeoFilterOption';
import {EditSubCategoryPage} from '@/pages/category/EditSubCategory';
import {GeoCategoriesPage} from '@/pages/category/GeoCategories';
import {SubCategoriesPage} from '@/pages/category/SubCategories';
import {DashboardPage} from '@/pages/common/Dashboard';
import ErrorPage404 from '@/pages/common/Errors/404';
import {LoginPage} from '@/pages/common/LoginPage';
import {EnterCodeStep} from '@/pages/common/LoginPage/EnterCodeStep';
import {EnterPhoneStep} from '@/pages/common/LoginPage/EnterPhoneStep';
import {CreateEventPage} from '@/pages/event/CreateEvent';
import {EditEventPage} from '@/pages/event/EditEvent';
import {EventsPage} from '@/pages/event/Events';
import {OrderFullInfoPage} from '@/pages/order/OrderFullInfo';
import {OrdersPage} from '@/pages/order/Orders';
import {CreatePromocodePage} from '@/pages/promocode/CreatePromocode';
import {PromocodesPage} from '@/pages/promocode/Promocodes';
import {PromoMoneyTransactionsPage} from '@/pages/transaction/PromoMoneyTransactions';
import {CurrentUserProfilePage} from '@/pages/user/CurrentUserProfilePage';
import {UserAccountPage} from '@/pages/user/UserAccount';
import {UserOrdersPage} from '@/pages/user/UserOrders';
import {UsersPage} from '@/pages/user/Users';

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
        path={ROUTE__DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTE__USERS} element={<UsersPage />} />
        <Route path={ROUTE__USER_ACCOUNT} element={<UserAccountPage />} />
        <Route path={ROUTE__USER_ORDERS} element={<UserOrdersPage />} />
        <Route path={ROUTE__ORDER_FULL_INFO} element={<OrderFullInfoPage />} />

        <Route path={ROUTE__EVENTS} element={<EventsPage />} />
        <Route path={ROUTE__EVENT_DETAILS} element={<EditEventPage />} />
        <Route path={ROUTE__CREATE_EVENT} element={<CreateEventPage />} />

        <Route path={ROUTE__ORDERS} element={<OrdersPage />} />

        <Route path={ROUTE__CATEGORIES} element={<CategoriesPage />} />
        <Route path={ROUTE__CATEGORY_CREATE} element={<CreateCategoryPage />} />
        <Route path={ROUTE__CATEGORY_EDIT} element={<EditCategoryPage />} />

        <Route path={ROUTE__SUB_CATEGORIES} element={<SubCategoriesPage />} />
        <Route
          path={ROUTE__SUB_CATEGORY_CREATE}
          element={<CreateSubCategoryPage />}
        />
        <Route
          path={ROUTE__SUB_CATEGORY_EDIT}
          element={<EditSubCategoryPage />}
        />

        <Route
          path={ROUTE__GEO_FILTER_OPTIONS}
          element={<GeoCategoriesPage />}
        />
        <Route
          path={ROUTE__GEO_FILTER_OPTION__CREATE}
          element={<CreateGeoFilterOptionPage />}
        />
        <Route
          path={ROUTE__GEO_FILTER_OPTION__EDIT}
          element={<EditGeoFilterOptionPage />}
        />

        <Route path={ROUTE__PROMOCODES} element={<PromocodesPage />} />
        <Route
          path={ROUTE__PROMOCODE_CREATE}
          element={<CreatePromocodePage />}
        />

        <Route
          path={ROUTE__PROMO_MONEY_TRANSACTIONS}
          element={<PromoMoneyTransactionsPage />}
        />

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

      <Route path="/" element={<Navigate replace to={ROUTE__DASHBOARD} />} />

      <Route path="*" element={<ErrorPage404 />} />
    </Route>
  </>,
);
