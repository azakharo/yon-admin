import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import {Box, Stack} from '@mui/material';

import {ROUTE__EVENTS, ROUTE__ORDERS, ROUTE__USERS} from '@shared/constants';
import {NavigationLink} from './NavigationLink';

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

        {/*<SubMenu*/}
        {/*  text="Group 1"*/}
        {/*  icon={<AllTasksIcon />}*/}
        {/*  groupRoute="/main/group1"*/}
        {/*>*/}
        {/*  <NavigationLink*/}
        {/*    route="/main/group1/section1"*/}
        {/*    text="Section 1"*/}
        {/*    icon={<RunningWithErrorsOutlinedIcon />}*/}
        {/*  />*/}

        {/*  <NavigationLink*/}
        {/*    route="/main/group1/section2"*/}
        {/*    text="Section 2"*/}
        {/*    icon={<CategoryOutlinedIcon />}*/}
        {/*  />*/}
        {/*</SubMenu>*/}
      </Stack>
    </Box>
  );
};
