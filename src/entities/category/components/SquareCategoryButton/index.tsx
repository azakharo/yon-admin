import {FC} from 'react';
import {ButtonBase, Stack, Typography} from '@mui/material';

import {limitString} from '@shared/utils';
import {CategoryIcon} from '../CategoryIcon';

import {COLOR__LIGHT_BACK, COLOR__LINE, COLOR__PRIMARY} from '@/theme/colors';

interface Props {
  imageSrc: string;
  label: string;
  categoryId: string;
  isSelected: boolean;
  onClick: (categoryId: string) => void;
}

export const SquareCategoryButton: FC<Props> = ({
  imageSrc,
  label,
  categoryId,
  isSelected,
  onClick,
}) => {
  return (
    <ButtonBase
      onClick={() => {
        onClick(categoryId);
      }}
    >
      <Stack
        spacing={0.75}
        padding="12px 19px"
        sx={{
          border: `0.7px solid ${COLOR__LINE}`,
          borderRadius: '6px',
          ...(isSelected
            ? {
                border: `1.5px solid ${COLOR__PRIMARY}`,
                backgroundColor: COLOR__LIGHT_BACK,
              }
            : undefined),
          '@media(hover: hover)': {
            '&:hover': {
              backgroundColor: COLOR__LIGHT_BACK,
            },
          },
        }}
      >
        <CategoryIcon imageSrc={imageSrc} />

        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 13,
            color: '#0000004D',
          }}
          align="center"
          title={label.length > 10 ? label : undefined}
        >
          {label.length > 10 ? limitString(label, 10) : label}
        </Typography>
      </Stack>
    </ButtonBase>
  );
};
