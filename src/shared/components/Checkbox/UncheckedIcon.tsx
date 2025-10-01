import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const UncheckedIcon: FC<SvgIconProps> = props => {
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
          rx="4"
          fill="white"
          stroke="#DCDCDE"
          strokeWidth="2"
        />
      </svg>
    </SvgIcon>
  );
};
