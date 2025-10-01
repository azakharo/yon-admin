import {FC} from 'react';
import {Box, BoxProps} from '@mui/material';

import {COLOR__WHITE} from '@/theme/colors';

interface Props extends BoxProps {
  imageSrc: string;
  altText?: string;
}

const size = 60;

export const CategoryIcon: FC<Props> = ({imageSrc, altText, ...restProps}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={COLOR__WHITE}
      borderRadius="50%"
      width={size}
      height={size}
      boxShadow="0px 10px 15px 0px #00000012"
      {...restProps}
    >
      <img src={imageSrc} alt={altText} />
    </Box>
  );
};
