import {styled, Tab, tabClasses} from '@mui/material';

import {COLOR__GRAY, COLOR__MAIN_BLACK} from '@/theme/colors';

export const ClassicMuiTab = styled(Tab)(() => ({
  minHeight: 'auto',
  fontSize: 14,
  fontWeight: 500,
  color: COLOR__GRAY,
  [`&.${tabClasses.selected}`]: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR__MAIN_BLACK,
  },
})) as typeof Tab;
