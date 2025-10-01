import {FC} from 'react';
import {Typography} from '@mui/material';
import capitalize from 'lodash/capitalize';

import {
  ColorLabel as BaseColorLabel,
  ColorLabelProps,
} from '@shared/components';
import {Color} from '@shared/types';

import {
  COLOR__LIGHT_BACK,
  COLOR__LIGHT_GRAY,
  COLOR__PRIMARY,
  COLOR__PRIMARY_LIGHT,
  COLOR__SUCCESS_LIGHT,
  COLOR__SUCCESS_SOFT_DARK,
  COLOR__WARNING_LIGHT,
  COLOR__WARNING_SOFT_DARK,
} from '@/theme/colors';

const text2Bg: Record<string, Color> = {
  matched: COLOR__SUCCESS_LIGHT,
  unmatched: COLOR__PRIMARY_LIGHT,
  exiting: COLOR__WARNING_LIGHT,
  exited: '#E1FBF9',
};

const text2Color: Record<string, Color> = {
  matched: COLOR__SUCCESS_SOFT_DARK,
  unmatched: COLOR__PRIMARY,
  exiting: COLOR__WARNING_SOFT_DARK,
  exited: '#1FB0AB',
};

interface Props extends Omit<ColorLabelProps, 'children'> {
  text: string;
}

export const ColorLabel: FC<Props> = ({text, ...restProps}) => {
  const color = text2Color[text] ?? COLOR__LIGHT_GRAY;
  const bgColor = text2Bg[text] ?? COLOR__LIGHT_BACK;

  return (
    <BaseColorLabel bgcolor={bgColor} {...restProps}>
      <Typography variant="b4medium" sx={{color}}>
        {capitalize(text)}
      </Typography>
    </BaseColorLabel>
  );
};
