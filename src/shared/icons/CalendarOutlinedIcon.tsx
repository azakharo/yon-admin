import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const CalendarOutlinedIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.35714 5.92632H11.5859M3.86384 1.82812V3.05773M11.9844 1.82812V3.05758M14.375 6.05758L14.375 13.1719C14.375 14.8287 13.0319 16.1719 11.375 16.1719H4.625C2.96815 16.1719 1.625 14.8287 1.625 13.1719V6.05758C1.625 4.40073 2.96815 3.05758 4.625 3.05758H11.375C13.0319 3.05758 14.375 4.40073 14.375 6.05758Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
