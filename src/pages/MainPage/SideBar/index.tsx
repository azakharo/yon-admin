import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import RunningWithErrorsOutlinedIcon from '@mui/icons-material/RunningWithErrorsOutlined';
import {Box, Stack} from '@mui/material';

import AllTasksIcon from './icons/allTasks.svg?react';
import {NavigationLink} from './NavigationLink';
import {SubMenu} from './SubMenu';

export const SideBar = () => {
  return (
    <Box px={2} py={2} position="sticky" top={0}>
      <Stack spacing={2} component="nav">
        <SubMenu text="Group 1" icon={<AllTasksIcon />} groupRoute="/main">
          <NavigationLink
            route="/main/section1"
            text="Section 1"
            icon={<RunningWithErrorsOutlinedIcon />}
          />

          <NavigationLink
            route="/main/section2"
            text="Section 2"
            icon={<CategoryOutlinedIcon />}
          />
        </SubMenu>
      </Stack>
    </Box>
  );
};
