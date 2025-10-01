import {Box, lighten, ToggleButton, Typography} from '@mui/material';
import isNil from 'lodash/isNil';

import {
  COLOR__GRAY,
  COLOR__LIGHT_BACK,
  COLOR__MAIN_BLACK,
  COLOR__WHITE,
} from '@/theme/colors';

const hoverColor = '#E5E7ED';

interface TabButtonProps<TValue> {
  value: TValue; // value associated with the tab
  label: string;
  counter?: number;
  isSelected: boolean;
  onSelect: (value: TValue) => void;
}

export const TabButton = <TValue = string,>({
  value,
  label,
  counter,
  isSelected,
  onSelect,
}: TabButtonProps<TValue>) => {
  const color = isSelected ? COLOR__WHITE : COLOR__GRAY;

  const labelElem = (
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: isSelected ? 600 : 500,
        color,
      }}
      noWrap
    >
      {label}
    </Typography>
  );

  const counterElem = (
    <Box
      px={0.75}
      py={0.125}
      borderRadius="10px"
      bgcolor={COLOR__WHITE}
      color={COLOR__MAIN_BLACK}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="b3regular">{counter}</Typography>
    </Box>
  );

  const content = isNil(counter) ? (
    labelElem
  ) : (
    <Box display="flex" alignItems="center" gap={0.5}>
      {labelElem}
      {counterElem}
    </Box>
  );

  return (
    <ToggleButton
      value={value as never}
      selected={isSelected}
      onChange={() => {
        onSelect(value);
      }}
      sx={{
        borderRadius: '6px',
        border: '1px solid transparent',
        padding: '8px 12px',
        backgroundColor: COLOR__LIGHT_BACK,
        color,
        '&:hover': {
          '@media(hover: hover)': {
            backgroundColor: hoverColor,
            '& > span': {
              color: COLOR__MAIN_BLACK,
            },
          },
        },
        '&:active': {
          backgroundColor: hoverColor,
        },
        '&.Mui-selected': {
          backgroundColor: COLOR__MAIN_BLACK,
        },
        '&:hover.Mui-selected': {
          '@media(hover: hover)': {
            backgroundColor: lighten(COLOR__MAIN_BLACK, 0.2),
            '& > span': {
              color: COLOR__WHITE,
            },
          },
          '@media(hover: none)': {
            backgroundColor: COLOR__MAIN_BLACK,
            '& > span': {
              color: COLOR__WHITE,
            },
          },
        },
      }}
    >
      {content}
    </ToggleButton>
  );
};
