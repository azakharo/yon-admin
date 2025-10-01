import {FC, ReactNode} from 'react';
import {ChevronRightRounded} from '@mui/icons-material';
import {ButtonBase, Typography} from '@mui/material';
import {darken} from '@mui/material/styles';

import {COLOR__BACK, COLOR__LIGHT_GRAY} from '@/theme/colors';

const backgroundColor = COLOR__BACK;
const backgroundColorOnHover = darken(backgroundColor, 0.1);

interface Props {
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

export const ButtonWithChevron: FC<Props> = ({icon, text, onClick}) => {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor,
        paddingX: 1,
        paddingY: 0.75,
        borderRadius: '6px',
        '@media(hover: hover)': {
          '&:hover': {
            backgroundColor: backgroundColorOnHover,
          },
        },
        '&:active': {
          backgroundColor: backgroundColorOnHover,
        },
        width: 'fit-content',
      }}
    >
      {icon}

      <Typography
        noWrap
        variant="b4medium"
        sx={{flex: '1 1 auto'}}
        ml={1}
        align="left"
      >
        {text}
      </Typography>

      <ChevronRightRounded
        sx={{
          color: COLOR__LIGHT_GRAY,
          marginLeft: 1,
        }}
      />
    </ButtonBase>
  );
};
