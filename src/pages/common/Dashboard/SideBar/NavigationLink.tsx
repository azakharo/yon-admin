import {FC, ReactNode} from 'react';
import {NavLink} from 'react-router-dom';
import {Box, Button, Typography} from '@mui/material';

import {activeBgColor, activeColor} from './constants';

import {COLOR__MAIN_BLACK, COLOR__WHITE} from '@/theme/colors';

interface Props {
  icon: ReactNode;
  text: string;
  route: string;
}

export const NavigationLink: FC<Props> = ({icon, text, route}) => {
  return (
    <Button
      component={NavLink}
      to={route}
      variant="outlined"
      sx={{
        padding: '12px 16px',
        justifyContent: 'flex-start',

        backgroundColor: COLOR__WHITE,

        '& svg': {
          color: COLOR__MAIN_BLACK,
          width: 24,
          height: 'auto',
        },
        '& .MuiTypography-root': {
          color: COLOR__MAIN_BLACK,
          fontWeight: 400,
        },

        '&.active': {
          backgroundColor: activeBgColor,
          '& svg': {
            color: activeColor,
          },
          '& .MuiTypography-root': {
            color: activeColor,
            fontWeight: 500,
          },
        },

        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: activeBgColor,
          border: '1px solid transparent',
        },
        '&:active': {
          backgroundColor: activeBgColor,
          border: '1px solid transparent',
        },
      }}
    >
      <Box display="flex" gap={1} alignItems="center">
        {icon}

        <Typography
          sx={{
            fontSize: 16,
            lineHeight: '20px',
          }}
        >
          {text}
        </Typography>
      </Box>
    </Button>
  );
};
