import {useNavigate} from 'react-router-dom';
import {Box, Button, Typography} from '@mui/material';

import Icon from './picture.svg?react';

const ErrorPage404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/', {replace: true});
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Icon width={280} height={'100%'} />

        <Typography variant="h1" mt={3}>
          404: Page not found
        </Typography>

        <Typography variant="b1medium" mt={1} mb={3}>
          Check the URL
        </Typography>

        <Button variant="contained" onClick={handleGoHome}>
          Back to the main page
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage404;
