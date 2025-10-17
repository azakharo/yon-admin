import {ErrorBoundary} from 'react-error-boundary';
import ModalContainer from 'react-modal-promise';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AuthProvider} from '@features/auth';
import {ThemeProvider} from '@mui/material/styles';
import {LocalizationProvider} from '@mui/x-date-pickers';
// If you are using date-fns v3.x, please import the v3 adapter
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import useMount from 'ahooks/es/useMount';
import {SnackbarProvider} from 'notistack';

import {isProduction} from '@shared/constants';
import {queryClient} from '@shared/setup';
import {SomethingWentWrong} from '@widgets/common';
import GlobalStyles from './GlobalStyles';

import './countryFlags.scss';
import './font.css';

import {routes} from '@/app/Routes';
import theme from '@/theme';

const vitePreloadErrorEvent = 'vite:preloadError';
const vitePreloadErrorHandler = () => {
  window.location.reload();
};

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_PUBLIC_PATH,
});

const App = () => {
  useMount(() => {
    if (isProduction) {
      console.log(`version: ${import.meta.env.VITE_APP_VERSION}`);

      window.addEventListener(vitePreloadErrorEvent, vitePreloadErrorHandler);

      return () => {
        window.removeEventListener(
          vitePreloadErrorEvent,
          vitePreloadErrorHandler,
        );
      };
    }

    return 0;
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <SnackbarProvider>
            <ErrorBoundary fallback={<SomethingWentWrong />}>
              <AuthProvider>
                <RouterProvider router={router} />
                <ModalContainer />
              </AuthProvider>
            </ErrorBoundary>
          </SnackbarProvider>

          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
