import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

export const Row: FC<BoxProps> = ({children, ...restProps}) => {
  return (
    <Box
      display="flex"
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
