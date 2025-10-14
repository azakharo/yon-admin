import {FC, ReactNode} from 'react';
import {Box, Typography} from '@mui/material';

import {InfoIcon} from '@shared/components';

import {COLOR__GRAY, COLOR__LIGHT_GRAY} from '@/theme/colors';

interface Props {
  label: string;
  tooltipContent?: ReactNode;
}

export const PrimaryLabel: FC<Props> = ({label, tooltipContent}) => {
  const labelElem = (
    <Typography variant="b3medium" sx={{color: COLOR__GRAY}}>
      {label}
    </Typography>
  );

  if (!tooltipContent) {
    return labelElem;
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {labelElem}

      <InfoIcon
        iconFillColor={COLOR__LIGHT_GRAY}
        iconFontSize={20}
        tooltipContent={tooltipContent}
        tooltipProps={{placement: 'bottom'}}
      />
    </Box>
  );
};
