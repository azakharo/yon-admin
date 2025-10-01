import React, {FC} from 'react';
import {Tooltip, Typography, TypographyProps} from '@mui/material';

interface Props extends Omit<TypographyProps, 'children'> {
  text: string;
  lineCount: number;
}

export const TextLimitedNLines: FC<Props> = ({
  text,
  lineCount,
  sx,
  ...restProps
}) => {
  return (
    <Tooltip title={text}>
      <Typography
        sx={{
          overflow: 'hidden',
          lineClamp: `${lineCount}`,
          display: '-webkit-box',
          WebkitLineClamp: lineCount,
          WebkitBoxOrient: 'vertical',
          ...sx,
        }}
        {...restProps}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};
