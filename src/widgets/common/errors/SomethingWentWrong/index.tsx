import {FC, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useIsMobile} from '@features/responsive';
import {Box, Button, Typography} from '@mui/material';
import {isAxiosError} from 'axios';

import {ErrorNotImplemented} from '@shared/types';
import {AccessDenied} from '../AccessDenied';
import {NotImplemented} from '../NotImplement';
import Icon from './picture.svg?react';

interface Props {
  error?: Error;
}

export const SomethingWentWrong: FC<Props> = ({error}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(
      () => {
        containerRef.current?.scrollIntoView(false);
      },
      // Without the timeout NotImpl and AccessDenied errors are NOT scrolled into view
      100,
    );
  }, [error]);

  if (error && error instanceof ErrorNotImplemented) {
    return <NotImplemented ref={containerRef} error={error} />;
  }

  if (error && isAxiosError(error) && error.status === 403) {
    return <AccessDenied ref={containerRef} />;
  }

  return (
    <Box
      ref={containerRef}
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt={isMobile ? 1 : 10}
      pb={2}
      px={2}
    >
      <Icon width={280} height={'100%'} />

      <Typography variant="h1" mt={3} align="center" sx={{textWrap: 'balance'}}>
        Something went wrong
      </Typography>

      <Typography variant="b1regular" mt={1} mb={3}>
        We are already fixing the problem
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          navigate('/');
          setTimeout(() => {
            window.location.reload();
          }, 0);
        }}
      >
        Back to the main page
      </Button>
    </Box>
  );
};
