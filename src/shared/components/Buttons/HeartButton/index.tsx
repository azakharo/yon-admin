import {FC} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {IconButton, IconButtonProps} from '@mui/material';

import {COLOR__LINE, COLOR__PRIMARY} from '@/theme/colors';

interface Props extends IconButtonProps {
  isFavorite: boolean;
}

export const HeartButton: FC<Props> = ({isFavorite, ...restProps}) => {
  return (
    <IconButton size="small" {...restProps}>
      <FavoriteIcon sx={{color: isFavorite ? COLOR__PRIMARY : COLOR__LINE}} />
    </IconButton>
  );
};
