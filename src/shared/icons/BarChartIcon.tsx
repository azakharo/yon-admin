import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const BarChartIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="6" width="4" height="9" rx="1" fill="#1751D0" />
        <rect x="10" y="2" width="4" height="13" rx="1" fill="#BC1C1C" />
      </svg>
    </SvgIcon>
  );
};
