import {FC} from 'react';
import {FileWithPath} from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import {Box, IconButton} from '@mui/material';

import {FileBox} from '../FileBox';

import {COLOR__LIGHT_GRAY, COLOR__WHITE} from '@/theme/colors';

const iconSize = 14;

interface Props {
  file: FileWithPath;
  onRemove: (file: FileWithPath) => void;
}

export const FileToUploadThumbnail: FC<Props> = ({file, onRemove}) => {
  return (
    <Box position="relative">
      <FileBox key={file.name} fileName={file.name} />

      <IconButton
        sx={{
          padding: '2px',
          position: 'absolute',
          top: -0.25 * iconSize,
          right: -0.25 * iconSize,
          backgroundColor: '#B5B5B5',
          '&:hover': {
            backgroundColor: COLOR__LIGHT_GRAY,
          },
        }}
        onClick={event => {
          event.stopPropagation();

          onRemove(file);
        }}
      >
        <CloseIcon
          sx={{width: iconSize, height: iconSize, color: COLOR__WHITE}}
        />
      </IconButton>
    </Box>
  );
};
