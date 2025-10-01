import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

export const TableRowActionsContainer: FC<BoxProps> = ({
  children,
  ...restProps
}) => {
  return (
    <Box display="flex" gap={1} {...restProps}>
      {children}
    </Box>
  );
};
