import {FC} from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import {Box, CircularProgress, Stack, Typography} from '@mui/material';
import {darken} from '@mui/material/styles';
import capitalize from 'lodash/capitalize';

import {getFileExtFromPath, getFileNameWithoutExtension} from '@shared/utils';

import {COLOR__PRIMARY, COLOR__WHITE} from '@/theme/colors';

const backgroundColor = COLOR__WHITE;
const backgroundColorOnHover = darken(backgroundColor, 0.1);

const iconProps = {
  sx: {
    fontSize: 36,
    color: COLOR__PRIMARY,
  },
} as const;

interface Props {
  fileName: string;
  isLoading?: boolean;
}

// File representation in task comments
export const FileBox: FC<Props> = ({fileName, isLoading}) => {
  const fname = getFileNameWithoutExtension(fileName);
  const extension = getFileExtFromPath(fileName);

  const icon = isLoading ? (
    <CircularProgress size={32} />
  ) : (
    <ImageOutlinedIcon {...iconProps} />
  );
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={0.75}
      bgcolor={backgroundColor}
      px={1.75}
      py={1}
      borderRadius="20px"
      border="1px solid #F1F1F1"
      textAlign="left"
      sx={{
        '&:hover': {
          backgroundColor: backgroundColorOnHover,
        },
        '&:active': {
          backgroundColor: backgroundColorOnHover,
        },
      }}
    >
      {icon}

      <Stack>
        <Typography noWrap sx={{color: '#000', fontSize: 17, fontWeight: 400}}>
          {fname}
        </Typography>

        <Typography sx={{color: '#4D4D4D', fontSize: 15, fontWeight: 400}}>
          {extension ? capitalize(extension) : extension}
        </Typography>
      </Stack>
    </Box>
  );
};
