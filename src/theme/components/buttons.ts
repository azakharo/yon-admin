import {Components, darken} from '@mui/material/styles';

import {
  COLOR__BACK,
  COLOR__ERROR,
  COLOR__ERROR_LIGHT,
  COLOR__LINE,
  COLOR__MAIN_BLACK,
  COLOR__PRIMARY,
  COLOR__PRIMARY_LIGHT,
  COLOR__PRIMARY_SOFT_DARK,
  COLOR__WHITE,
} from '../colors';

const containedPrimaryHoverBg = COLOR__PRIMARY_SOFT_DARK;
const borderTransparent = '1px solid transparent';
const subtleFocusVisibleBoxShadow = `0px 0px 0px 3px #DCDCDE,0px 0px 0px 1px ${COLOR__WHITE}`;

const disabledStyles = {
  color: COLOR__LINE,
  backgroundColor: COLOR__BACK,
  border: `1px solid ${COLOR__LINE}`,
} as const;

const subtleNotBorderedCommonStyles = {
  border: borderTransparent,
  boxShadow: '0px 1.5px 4px -1px #0A090B12',

  '@media(hover: hover)': {
    '&:hover': {
      boxShadow: 'none',
      border: `1px solid ${COLOR__LINE}`,
    },
  },
  '&:focus-visible': {
    boxShadow: subtleFocusVisibleBoxShadow,
  },
  '&.Mui-disabled': disabledStyles,
} as const;

const subtleBlackStyles = {
  ...subtleNotBorderedCommonStyles,
  backgroundColor: COLOR__BACK,
  color: COLOR__MAIN_BLACK,
  '& span.MuiCircularProgress-root': {
    color: COLOR__MAIN_BLACK,
  },
  '&:active': {
    border: `1px solid ${COLOR__LINE}`,
    backgroundColor: darken(COLOR__BACK, 0.1),
  },
} as const;

const subtlePrimaryStyles = {
  ...subtleNotBorderedCommonStyles,
  backgroundColor: COLOR__PRIMARY_LIGHT,
  color: COLOR__PRIMARY,

  '& span.MuiCircularProgress-root': {
    color: COLOR__PRIMARY,
  },
  '&:active': {
    backgroundColor: darken(COLOR__PRIMARY_LIGHT, 0.05),
  },
} as const;

const subtleBorderedStyles = {
  border: `1px solid ${COLOR__LINE}`,
  '&.Mui-disabled': disabledStyles,
} as const;

const subtleBorderedPrimaryStyles = {
  ...subtleBorderedStyles,
  backgroundColor: COLOR__PRIMARY_LIGHT,
  color: COLOR__PRIMARY,
  '& span.MuiCircularProgress-root': {
    color: COLOR__PRIMARY,
  },
  '@media(hover: hover)': {
    '&:hover': {
      backgroundColor: darken(COLOR__PRIMARY_LIGHT, 0.1),
    },
  },
  '&:focus-visible': {
    boxShadow: subtleFocusVisibleBoxShadow,
  },
  '&:active': {
    backgroundColor: darken(COLOR__PRIMARY_LIGHT, 0.2),
  },
} as const;

const subtleBorderedErrorStyles = {
  ...subtleBorderedStyles,
  backgroundColor: COLOR__ERROR_LIGHT,
  color: COLOR__ERROR,
  '& span.MuiCircularProgress-root': {
    color: COLOR__ERROR,
  },
  '@media(hover: hover)': {
    '&:hover': {
      backgroundColor: darken(COLOR__ERROR_LIGHT, 0.1),
    },
  },
  '&:focus-visible': {
    boxShadow: subtleFocusVisibleBoxShadow,
  },
  '&:active': {
    backgroundColor: darken(COLOR__ERROR_LIGHT, 0.2),
  },
} as const;

export const buttonSettings: Components['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ownerState}) => ({
      borderRadius: 6,
      ...(ownerState.variant === 'contained' &&
        ownerState.color === 'primary' && {
          border: borderTransparent,
          '& span.MuiCircularProgress-root': {
            color: COLOR__PRIMARY,
          },
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: containedPrimaryHoverBg,
            },
          },
          '&:focus-visible': {
            boxShadow: '0px 0px 0px 3px #DCDCDE,0px 0px 0px 1px #FFFFFF',
          },
          '&:active': {
            backgroundColor: containedPrimaryHoverBg,
          },
          '&.Mui-disabled': disabledStyles,
        }),
      ...(ownerState.variant === 'outlined' &&
        ownerState.color === 'black' && {
          border: '1px solid #E6E6E6',
          boxShadow: '0px 1.5px 4px -1px #0A090B12',

          '& span.MuiCircularProgress-root': {
            color: COLOR__MAIN_BLACK,
          },
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: darken(COLOR__WHITE, 0.05),
            },
          },
          '&:focus-visible': {
            boxShadow: '0px 0px 0px 3px #DCDCDE,0px 0px 0px 1px #FFFFFF',
          },
          '&:active': {
            backgroundColor: darken(COLOR__WHITE, 0.1),
          },
          '&.Mui-disabled': disabledStyles,
        }),
      ...(ownerState.variant === 'subtle' &&
        ownerState.color === 'black' &&
        subtleBlackStyles),
      ...(ownerState.variant === 'subtle' &&
        ownerState.color === 'primary' &&
        subtlePrimaryStyles),
      ...(ownerState.variant === 'subtleBordered' &&
        ownerState.color === 'primary' &&
        subtleBorderedPrimaryStyles),
      ...(ownerState.variant === 'subtleBordered' &&
        ownerState.color === 'error' &&
        subtleBorderedErrorStyles),
    }),
    sizeMedium: {
      padding: '10px 16px',
    },
  },
};
