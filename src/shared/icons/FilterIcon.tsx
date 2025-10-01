import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const FilterIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 3.66675H11.5M11.5 3.66675C11.5 5.04746 12.6192 6.16675 14 6.16675C15.3807 6.16675 16.5 5.04746 16.5 3.66675C16.5 2.28604 15.3807 1.16675 14 1.16675C12.6192 1.16675 11.5 2.28604 11.5 3.66675ZM6.5 10.3334H16.5M6.5 10.3334C6.5 11.7142 5.38071 12.8334 4 12.8334C2.61929 12.8334 1.5 11.7142 1.5 10.3334C1.5 8.95266 2.61929 7.83341 4 7.83341C5.38071 7.83341 6.5 8.95266 6.5 10.3334Z"
          stroke="#171717"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
