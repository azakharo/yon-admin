import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const SortIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.16699 3.66679L3.07774 1.75604C3.40317 1.4306 3.93081 1.4306 4.25625 1.75604L6.16699 3.66678M3.66699 2.00012L3.66699 12.0001M8.66699 11.1668L10.5777 13.0775C10.9032 13.403 11.4308 13.403 11.7562 13.0775L13.667 11.1668M11.167 12.8335L11.167 2.83345"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </SvgIcon>
  );
};
