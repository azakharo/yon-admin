import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

export const FormRow: FC<BoxProps> = ({children, ...restProps}) => {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap={4}
      sx={{
        '& > *': {
          flex: '1 1 0px',
        },
      }}
      flexWrap="wrap"
      {...restProps}
    >
      {children}
    </Box>
  );
};
