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
  COLOR__MAGENTA_LIGHT,
  COLOR__MAGENTA_SOFT_DARK,
  COLOR__PRIMARY,
  COLOR__PRIMARY_LIGHT,
} from '@/theme/colors';

const text2Bg: Record<string, Color> = {
  matched: COLOR__PRIMARY_LIGHT,
  exited: COLOR__MAGENTA_LIGHT,
  resolved: '#DBF5F4',
};

const text2Color: Record<string, Color> = {
  matched: COLOR__PRIMARY,
  exited: COLOR__MAGENTA_SOFT_DARK,
  resolved: '#108E85',
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
