import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const PaperClipIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3297 12.6499L9.85969 15.1199C8.48969 16.4899 8.48969 18.6999 9.85969 20.0699C11.2297 21.4399 13.4397 21.4399 14.8097 20.0699L18.6997 16.1799C21.4297 13.4499 21.4297 9.00992 18.6997 6.27992C15.9697 3.54992 11.5297 3.54992 8.79969 6.27992L4.55969 10.5199C2.21969 12.8599 2.21969 16.6599 4.55969 19.0099"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
