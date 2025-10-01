import {forwardRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useIsMobile} from '@features/responsive';
import {Box, Button, Typography} from '@mui/material';

import Icon from '../SomethingWentWrong/picture.svg?react';

export const AccessDenied = forwardRef<HTMLDivElement>((_, ref) => {
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
      maxWidth={isMobile ? undefined : 420}
    >
      <Icon width={280} height={'100%'} />

      <Typography variant="h1" mt={3} align="center" sx={{textWrap: 'pretty'}}>
        У вас нет доступа к запрашиваемой странице
      </Typography>

      <Typography
        variant="b1regular"
        mt={1}
        mb={3}
        align="center"
        sx={{textWrap: 'pretty'}}
      >
        Чтобы получить доступ, обратитесь к своему руководству
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
});
