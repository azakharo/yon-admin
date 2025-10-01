import {Box, BoxProps} from '@mui/material';

export type ColorLabelProps = BoxProps;

export const ColorLabel = ({children, ...restProps}: ColorLabelProps) => {
  return (
    <Box p={0.75} borderRadius="5px" {...restProps}>
      {children}
    </Box>
  );
};
