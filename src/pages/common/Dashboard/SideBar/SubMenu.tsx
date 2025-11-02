import {FC, PropsWithChildren, ReactNode, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Box, Button, Stack} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import {activeBgColor, activeColor} from './constants';

import {COLOR__MAIN_BLACK, COLOR__WHITE} from '@/theme/colors';

interface Props {
  groupRoute: string;
  text: string;
  icon?: ReactNode;
}

export const SubMenu: FC<PropsWithChildren<Props>> = ({
  children,
  text,
  icon,
  groupRoute,
}) => {
  const {pathname} = useLocation();
  const isActive = pathname.startsWith(groupRoute);
  const [open, setOpen] = useState(isActive);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          padding: '12px 16px',
          justifyContent: 'flex-start',

          backgroundColor: isActive ? activeBgColor : COLOR__WHITE,

          '& svg': {
            color: isActive ? activeColor : COLOR__MAIN_BLACK,
            width: 24,
            height: 'auto',
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
        <Box display="flex" gap={1} alignItems="center" width="100%">
          {icon}

          <Typography
            sx={{
              fontSize: 16,
              lineHeight: '20px',
              color: isActive ? activeColor : COLOR__MAIN_BLACK,
              fontWeight: isActive ? 500 : 400,
            }}
          >
            {text}
          </Typography>

          {open ? (
            <ExpandLess sx={{marginLeft: 'auto'}} />
          ) : (
            <ExpandMore sx={{marginLeft: 'auto'}} />
          )}
        </Box>
      </Button>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack spacing={2} paddingLeft={2.5} component="nav">
          {children}
        </Stack>
      </Collapse>
    </>
  );
};
