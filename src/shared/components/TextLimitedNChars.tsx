import React, {FC} from 'react';
import {Tooltip, Typography, TypographyProps} from '@mui/material';

interface Props {
  text: string;
  limit: number;
  variant?: TypographyProps['variant'];
  sx?: TypographyProps['sx'];
}

export const TextLimitedNChars: FC<Props> = ({text, limit, variant, sx}) => {
  if (!text) {
    return text;
  }

  if (text.length <= limit) {
    return (
      <Typography noWrap variant={variant}>
        {text}
      </Typography>
    );
  }

  return (
    <Tooltip title={text}>
      <Typography
        noWrap
        sx={{
          maxWidth: `${limit}ch`,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          ...sx,
        }}
        variant={variant}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};
