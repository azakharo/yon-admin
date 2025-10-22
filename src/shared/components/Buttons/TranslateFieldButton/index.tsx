import {FC} from 'react';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import {IconButton, IconButtonProps} from '@mui/material';

export const TranslateFieldButton: FC<IconButtonProps> = props => {
  return (
    <IconButton title="Add translations" {...props}>
      <TranslateOutlinedIcon />
    </IconButton>
  );
};
