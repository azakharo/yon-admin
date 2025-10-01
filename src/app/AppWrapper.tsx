import {Outlet, ScrollRestoration} from 'react-router-dom';

// It wraps all app routes (rendered for all routes).
// It was introduced for including ScrollRestoration.
export const AppWrapper = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};
