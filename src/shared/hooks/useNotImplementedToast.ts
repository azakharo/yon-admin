import {useSnackbar} from 'notistack';

export const useNotImplementedToast = (message?: string) => {
  const {enqueueSnackbar} = useSnackbar();

  return () => {
    enqueueSnackbar(message || 'Not implemented yet', {
      variant: 'info',
    });
  };
};
