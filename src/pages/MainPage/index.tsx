import {useIsMobile} from '@features/responsive';
import {Box} from '@mui/material';

import {Header} from './Header';

const paddingX = 2;

export const MainPage = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      pt={1}
      maxWidth={isMobile ? '100%' : 768}
      margin="0 auto"
      height="100dvh"
      display="flex"
      flexDirection="column"
      flexWrap="nowrap"
    >
      <Header px={paddingX} />
    </Box>
  );
};
