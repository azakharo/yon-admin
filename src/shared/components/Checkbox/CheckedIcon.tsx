import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const CheckedIcon: FC<SvgIconProps> = props => {
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
          x="0.75"
          y="0.75"
          width="18.5"
          height="18.5"
          rx="4.25"
          fill="#1751D0"
          stroke="#1751D0"
          strokeWidth="1.5"
        />
        <path
          d="M6 11.25L9.5 14C9.5 14 11.5 8.5 14.4 6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
