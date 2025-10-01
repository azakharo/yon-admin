import {MouseEvent, useState} from 'react';
import {useAuth} from '@features/auth';
import {Logout} from '@mui/icons-material';
import {IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material';

import {SettingsIcon} from '@shared/icons';

export const SettingsMenu = () => {
  const {logout} = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleAvatarClick}>
        <SettingsIcon sx={{fontSize: 22}} />
      </IconButton>

      <Menu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={closeMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 38,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{horizontal: 'center', vertical: 'top'}}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      >
        <MenuItem
          onClick={() => {
            logout();
          }}
          dense
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
