import {Components} from '@mui/material/styles';

import {COLOR__LINE, COLOR__WHITE} from '../colors';

export const switchSettings: Components['MuiSwitch'] = {
  styleOverrides: {
    root: {
      width: 36,
      height: 20,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: '1px 0',
        transitionDuration: '300ms',
        transform: 'translate(2px, 1px)',
        '&.Mui-checked': {
          transform: 'translate(18px, 1px)',
          color: COLOR__WHITE,
          '& + .MuiSwitch-track': {
            backgroundColor: COLOR__LINE,
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 16,
        height: 16,
      },
      '& .MuiSwitch-track': {
        borderRadius: 25,
        backgroundColor: COLOR__LINE,
        opacity: 1,
      },
    },
  },
};
