import {FC} from 'react';
import {Box, FormControlLabel, Typography} from '@mui/material';

import {GeoFilterOption} from '@entities/common';
import {Checkbox} from '@shared/components';

interface Props {
  filterOption: GeoFilterOption;
  isSelected: boolean;
  onSelect: (id: string, newValue: boolean) => void;
}

export const Item: FC<Props> = ({filterOption, isSelected, onSelect}) => {
  const {name, id, logo_url} = filterOption;

  return (
    <FormControlLabel
      sx={{
        marginLeft: 1.5,
        marginRight: 0,
        paddingY: 0.5,
        justifyContent: 'space-between',
      }}
      key={id}
      value={id}
      control={
        <Checkbox
          onChange={() => {
            onSelect(id, !isSelected);
          }}
          checked={isSelected}
        />
      }
      label={
        <Box display="flex" alignItems="center" gap={1}>
          {logo_url && <img src={logo_url} width={20} height={20} alt={name} />}

          <Typography variant="b3medium">{name}</Typography>
        </Box>
      }
      labelPlacement="start"
    />
  );
};
