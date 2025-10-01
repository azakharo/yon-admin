import {FC, ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import {
  Box,
  BoxProps,
  IconButton,
  IconButtonProps,
  Stack,
  Typography,
} from '@mui/material';

interface Props extends BoxProps {
  title: string;
  isBackButtonShown?: boolean;
  rightPart?: ReactNode;
  isTitleUnderBackButton?: boolean;
  backButtonProps?: IconButtonProps;
}

export const Header: FC<Props> = ({
  title,
  isBackButtonShown = true,
  rightPart,
  isTitleUnderBackButton = false,
  backButtonProps,
  ...restProps
}) => {
  const navigate = useNavigate();
  const {sx: backButtonSx, ...restBackButtonProps} = backButtonProps ?? {};

  const handleBack = () => {
    navigate(-1);
  };

  const backButtonElem = isBackButtonShown && (
    <IconButton
      aria-label="back"
      onClick={handleBack}
      sx={{
        color: 'inherit',
        ...backButtonSx,
      }}
      {...restBackButtonProps}
    >
      <WestOutlinedIcon />
    </IconButton>
  );

  const titleElem = (
    <Typography
      sx={{
        fontWeight: 500,
        fontSize: 16,
        color: 'inherit',
      }}
    >
      {title}
    </Typography>
  );

  return (
    <Box display="flex" alignItems="center" gap={1} {...restProps}>
      {isTitleUnderBackButton ? (
        <Stack alignItems="flex-start">
          {backButtonElem}
          {titleElem}
        </Stack>
      ) : (
        <>
          {backButtonElem}
          {titleElem}
        </>
      )}

      {rightPart && <Box marginLeft="auto">{rightPart}</Box>}
    </Box>
  );
};
