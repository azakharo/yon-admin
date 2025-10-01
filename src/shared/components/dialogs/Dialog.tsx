import {FC} from 'react';
import {useIsMobile} from '@features/responsive';
import {Dialog as MuiDialog, DialogProps} from '@mui/material';

export const Dialog: FC<DialogProps> = ({slotProps, ...restProps}) => {
  const isMobile = useIsMobile();

  return (
    <MuiDialog
      fullScreen={isMobile}
      slotProps={{
        paper: {
          sx: {
            //-------------------------------------------------------
            // The following props are also specified in the theme
            borderRadius: isMobile ? '0px' : undefined,
            padding: 3,
            //-------------------------------------------------------
          },
        },
        ...slotProps,
      }}
      {...restProps}
    />
  );
};
