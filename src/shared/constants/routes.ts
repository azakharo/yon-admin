export const ROUTE__LOGIN = '/login';
export const ROUTE__LOGIN__ENTER_PHONE = `${ROUTE__LOGIN}/phone`;
export const ROUTE__LOGIN__ENTER_CODE = `${ROUTE__LOGIN}/code`;

export const ROUTE__MAIN = '/main';
export const ROUTE__USERS = `${ROUTE__MAIN}/users`;
export const ROUTE__USER_ORDERS = `${ROUTE__USERS}/:userId/orders`;
export const ROUTE__ORDER_FULL_INFO = `${ROUTE__MAIN}/orders/:id`;
export const ROUTE__USER_ACCOUNT = `${ROUTE__USERS}/:id`;
export const ROUTE__EVENTS = `${ROUTE__MAIN}/events`;
export const ROUTE__EVENT_DETAILS = `${ROUTE__EVENTS}/:id`;

export const ROUTE__CURRENT_USER_PROFILE = '/profile';
