import {forwardRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useIsMobile} from '@features/responsive';
import {Box, Button, Typography} from '@mui/material';

import {ErrorNotImplemented} from '@shared/types';
import imageSrc from './cat.jpg';

interface Props {
  error?: ErrorNotImplemented;
}

export const NotImplemented = forwardRef<HTMLDivElement, Props>(
  ({error}, ref) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt={isMobile ? 1 : 10}
        pb={2}
      >
        <img
          src={imageSrc}
          width={280}
          height={'100%'}
          style={{borderRadius: '50%'}}
          alt="Логотип Ленты"
        />

        <Typography variant="h1" mt={3} align="center">
          Пока не реализовано
        </Typography>

        <Typography variant="b1regular" mt={1} mb={3}>
          {error?.message || 'Надеемся, скоро будет реализовано!'}
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Вернуться назад
        </Button>
      </Box>
    );
  },
);
