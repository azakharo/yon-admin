import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

import {COLOR__LINE} from '@/theme/colors';

interface Props extends BoxProps {
  isBordered?: boolean;
}

export const CardBox: FC<Props> = ({
  isBordered = false,
  children,
  ...restProps
}) => {
  return (
    <Box
      p={2}
      borderRadius="6px"
      border={isBordered ? `0.7px solid ${COLOR__LINE}` : undefined}
      {...restProps}
    >
      {children}
    </Box>
  );
};
