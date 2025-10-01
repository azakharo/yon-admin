import {FC} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export const ShareIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <svg
        width="17"
        height="15"
        viewBox="0 0 17 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.9139 6.20786C16.1972 6.00303 16.1882 5.57814 15.8965 5.38547L9.27557 1.01227C8.94316 0.792708 8.5 1.0311 8.5 1.42948L8.5 3.49145C3.83878 5.13411 0.5 8.75193 0.5 13.9615C0.5 14.2159 0.895388 14.2474 0.981239 14.0079C2.10018 10.8875 5.04414 8.47721 8.5 8.47721V10.5899C8.5 10.9979 8.96233 11.2341 9.29296 10.995L15.9139 6.20786Z"
          fill="#171717"
        />
      </svg>
    </SvgIcon>
  );
};
