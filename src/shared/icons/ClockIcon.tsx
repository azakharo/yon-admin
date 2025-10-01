import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const ClockIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0004 20.1004C15.3023 20.1004 19.6004 15.8023 19.6004 10.5004C19.6004 5.19846 15.3023 0.900391 10.0004 0.900391C4.69846 0.900391 0.400391 5.19846 0.400391 10.5004C0.400391 15.8023 4.69846 20.1004 10.0004 20.1004ZM11 6.00049C11 5.4482 10.5523 5.00049 10 5.00049C9.44771 5.00049 9 5.4482 9 6.00049V10.5005C9 10.7657 9.10536 11.0201 9.29289 11.2076L12.2929 14.2076C12.6834 14.5981 13.3166 14.5981 13.7071 14.2076C14.0976 13.8171 14.0976 13.1839 13.7071 12.7934L11 10.0863V6.00049Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
};
