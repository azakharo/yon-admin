import {FC, PropsWithChildren} from 'react';
import {Box, BoxProps} from '@mui/material';

export const StepPageLayout: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...restProps
}) => {
  return (
    <Box
      minHeight="100dvh"
      maxWidth={400}
      margin={'0 auto'}
      display="flex"
      flexDirection="column"
      {...restProps}
    >
      {children}
    </Box>
  );
};
