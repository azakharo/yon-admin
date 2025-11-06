import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import SportsMmaOutlinedIcon from '@mui/icons-material/SportsMmaOutlined';
import {Box, Stack} from '@mui/material';

import {
  ROUTE__CATEGORIES,
  ROUTE__CATEGORIES_GROUP,
  ROUTE__EVENTS,
  ROUTE__GEO_FILTER_OPTIONS,
  ROUTE__ORDERS,
  ROUTE__PROMOCODES,
  ROUTE__USERS,
} from '@shared/constants';
import {NavigationLink} from './NavigationLink';
import {SubMenu} from './SubMenu';

export const SideBar = () => {
  return (
    <Box px={2} py={2} position="sticky" top={0}>
      <Stack spacing={2} component="nav">
        <NavigationLink
          route={ROUTE__USERS}
          text="Accounts"
          icon={<GroupOutlinedIcon />}
        />

        <NavigationLink
          route={ROUTE__EVENTS}
          text="Events"
          icon={<EventAvailableOutlinedIcon />}
        />

        <NavigationLink
          route={ROUTE__ORDERS}
          text="Orders"
          icon={<RequestPageOutlinedIcon />}
        />

        <SubMenu
          text="Categories"
          icon={<CategoryOutlinedIcon />}
          groupRoute={ROUTE__CATEGORIES_GROUP}
        >
          <NavigationLink
            route={ROUTE__CATEGORIES}
            text="Theme"
            icon={<SportsMmaOutlinedIcon />}
          />

          <NavigationLink
            route={ROUTE__GEO_FILTER_OPTIONS}
            text="Geo"
            icon={<PublicOutlinedIcon />}
          />
        </SubMenu>

        <NavigationLink
          route={ROUTE__PROMOCODES}
          text="Promo-codes"
          icon={<PasswordOutlinedIcon />}
        />
      </Stack>
    </Box>
  );
};
