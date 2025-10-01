import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const HoverUncheckedIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="18"
          height="18"
          rx="9"
          fill="white"
          stroke="#6C92E4"
          strokeWidth="2"
        />
      </svg>
    </SvgIcon>
  );
};
