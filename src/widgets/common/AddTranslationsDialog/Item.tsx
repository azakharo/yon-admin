import {FC} from 'react';
import {Box, TextField, Typography} from '@mui/material';

import {SupportedLanguage} from '@shared/types';

interface Props {
  lang: SupportedLanguage;
  trans: string;
  onChange: (lang: SupportedLanguage, trans: string) => void;
}

export const Item: FC<Props> = ({lang, trans, onChange}) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography
        sx={{
          minWidth: '10ch',
        }}
      >
        {lang}:
      </Typography>

      <TextField
        value={trans}
        onChange={event => {
          onChange(lang, event.target.value);
        }}
        sx={{flex: 1}}
      />
    </Box>
  );
};
