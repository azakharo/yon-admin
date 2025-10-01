import {FC} from 'react';
import {IconButton, IconButtonProps} from '@mui/material';
import {useSnackbar} from 'notistack';

import {ShareIcon} from '../../../icons';

export const ShareButton: FC<IconButtonProps> = props => {
  const {enqueueSnackbar} = useSnackbar();

  const handleClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'YON',
          text: 'YON',
          url: window.location.href,
        })
        .then(() => {
          return;
        })
        .catch(error => {
          console.error(error);
          enqueueSnackbar('Could not share the current link', {
            variant: 'error',
          });
        });
    } else {
      enqueueSnackbar('Web Share API is not supported on your device', {
        variant: 'error',
      });
    }
  };

  return (
    <IconButton size="small" onClick={handleClick} {...props}>
      <ShareIcon sx={{fontSize: 18}} />
    </IconButton>
  );
};
