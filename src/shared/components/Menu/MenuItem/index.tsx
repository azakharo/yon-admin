import {FC, ReactNode} from 'react';
import Arrow from '@mui/icons-material/ArrowForwardIosOutlined';
import {ButtonBase, ButtonBaseProps, Stack, Typography} from '@mui/material';
import {darken} from '@mui/material/styles';

import {COLOR__GRAY, COLOR__LIGHT_GRAY, COLOR__WHITE} from '@/theme/colors';

const backgroundColor = 'transparent';
const backgroundColorOnHover = darken(COLOR__WHITE, 0.1);

interface Props extends ButtonBaseProps {
  icon: ReactNode;
  text: string;
  subText?: string;
  onClick: () => void;
  additionalText?: string;
  isHoverDisabled?: boolean;
}

export const MenuItem: FC<Props> = ({
  icon,
  text,
  subText,
  onClick,
  additionalText,
  isHoverDisabled = false,
  sx,
  ...restProps
}) => {
  const textElem = (
    <Typography
      noWrap
      variant="b2medium"
      sx={subText ? undefined : {flex: '1 1 auto'}}
      ml={subText ? undefined : 2}
      align="left"
    >
      {text}
    </Typography>
  );

  const subTextElem = (
    <Typography
      noWrap
      variant="b4regular"
      align="left"
      sx={{
        color: COLOR__GRAY,
      }}
    >
      {subText}
    </Typography>
  );

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor,
        borderRadius: '0px',
        '@media(hover: hover)': isHoverDisabled
          ? undefined
          : {
              '&:hover': {
                backgroundColor: backgroundColorOnHover,
              },
            },
        '&:active': isHoverDisabled
          ? undefined
          : {
              backgroundColor: backgroundColorOnHover,
            },
        ...sx,
      }}
      {...restProps}
    >
      {icon}

      {subText ? (
        <Stack spacing={0.5} ml={2} sx={{flex: '1 1 auto'}}>
          {textElem}
          {subTextElem}
        </Stack>
      ) : (
        textElem
      )}

      <Typography
        noWrap
        variant="b2medium"
        align="right"
        sx={{color: COLOR__LIGHT_GRAY}}
        ml={2}
      >
        {additionalText}
      </Typography>

      <Arrow
        sx={{
          fontSize: 14,
          color: COLOR__LIGHT_GRAY,
          marginLeft: 2,
        }}
      />
    </ButtonBase>
  );
};
