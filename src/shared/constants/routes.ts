export const ROUTE__LOGIN = '/login';
export const ROUTE__LOGIN__ENTER_PHONE = `${ROUTE__LOGIN}/phone`;
export const ROUTE__LOGIN__ENTER_CODE = `${ROUTE__LOGIN}/code`;

export const ROUTE__DASHBOARD = '/main';
export const ROUTE__USERS = `${ROUTE__DASHBOARD}/users`;
export const ROUTE__USER_ORDERS = `${ROUTE__USERS}/:userId/orders`;
export const ROUTE__ORDER_FULL_INFO = `${ROUTE__DASHBOARD}/orders/:id`;
export const ROUTE__USER_ACCOUNT = `${ROUTE__USERS}/:id`;
export const ROUTE__EVENTS = `${ROUTE__DASHBOARD}/events`;
export const ROUTE__EVENT_DETAILS = `${ROUTE__EVENTS}/:id`;
export const ROUTE__ORDERS = `${ROUTE__DASHBOARD}/orders`;
export const ROUTE__CREATE_EVENT = `${ROUTE__EVENTS}/create`;

export const ROUTE__CATEGORIES_GROUP = `${ROUTE__DASHBOARD}/categories`;
export const ROUTE__CATEGORIES = `${ROUTE__CATEGORIES_GROUP}/theme`;
export const ROUTE__CATEGORY_CREATE = `${ROUTE__CATEGORIES}/create`;
export const ROUTE__CATEGORY_EDIT = `${ROUTE__CATEGORIES}/:id`;

export const ROUTE__SUB_CATEGORIES = `${ROUTE__CATEGORIES}/:categoryId/subcategories`;
export const ROUTE__SUB_CATEGORY_CREATE = `${ROUTE__SUB_CATEGORIES}/create`;
export const ROUTE__SUB_CATEGORY_EDIT = `${ROUTE__SUB_CATEGORIES}/:id`;

export const ROUTE__GEO_FILTER_OPTIONS = `${ROUTE__CATEGORIES_GROUP}/geo`;
export const ROUTE__GEO_FILTER_OPTION__CREATE = `${ROUTE__GEO_FILTER_OPTIONS}/create`;
export const ROUTE__GEO_FILTER_OPTION__EDIT = `${ROUTE__GEO_FILTER_OPTIONS}/:id`;

export const ROUTE__CURRENT_USER_PROFILE = '/profile';
