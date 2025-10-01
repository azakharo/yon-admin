import {FC} from 'react';
import {Edit as EditIcon} from '@mui/icons-material';
import {IconButton, IconButtonProps} from '@mui/material';

export const EditButton: FC<IconButtonProps> = props => {
  return (
    <IconButton size="small" {...props}>
      <EditIcon />
    </IconButton>
  );
};
