import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {IconButton, Stack, Typography} from '@mui/material';

import {useNotImplementedToast} from '@shared/hooks';
import {CategoryIcon} from '../CategoryIcon';

export interface CategoryButtonProps {
  imageSrc: string;
  label: string;
  targetRoute?: string;
}

export const CategoryButton: FC<CategoryButtonProps> = ({
  imageSrc,
  label,
  targetRoute,
}) => {
  const navigate = useNavigate();
  const showNotImplemented = useNotImplementedToast();

  return (
    <Stack spacing={0.75}>
      <IconButton
        onClick={() => {
          if (targetRoute) {
            navigate(targetRoute);
          } else {
            showNotImplemented();
          }
        }}
        sx={{
          paddingY: 0,
          paddingX: '5px',
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        }}
      >
        <CategoryIcon
          imageSrc={imageSrc}
          sx={{
            '@media(hover: hover)': {
              '&:hover': {
                boxShadow: '0px 10px 15px 0px #00000024',
              },
            },
          }}
        />
      </IconButton>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 13,
          color: '#0000004D',
        }}
        align="center"
      >
        {label}
      </Typography>
    </Stack>
  );
};
