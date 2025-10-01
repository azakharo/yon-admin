import {FC, ReactNode} from 'react';
import Icon from '@mui/icons-material/Info';
import {SvgIconProps, Tooltip, TooltipProps} from '@mui/material';

import {Color} from '../types';

import {COLOR__WHITE} from '@/theme/colors';

interface Props extends SvgIconProps {
  tooltipContent: ReactNode;
  tooltipProps?: Partial<TooltipProps>;
  iconFillColor?: Color;
  iconColor?: Color;
  iconFontSize?: number;
}

export const InfoIcon: FC<Props> = ({
  tooltipContent,
  tooltipProps,
  iconFillColor = '#7F7D83',
  iconColor = COLOR__WHITE,
  iconFontSize = 20,
  sx,
  ...restProps
}) => {
  return (
    <Tooltip
      title={<span style={{whiteSpace: 'pre-line'}}>{tooltipContent}</span>}
      placement="top"
      arrow
      {...tooltipProps}
    >
      <Icon
        sx={{
          fontSize: iconFontSize,
          fill: iconFillColor,
          color: iconColor,
          ...sx,
        }}
        {...restProps}
      />
    </Tooltip>
  );
};
