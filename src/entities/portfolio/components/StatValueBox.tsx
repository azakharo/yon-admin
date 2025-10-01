import {FC, ReactNode} from 'react';
import {useIsMobile} from '@features/responsive';
import {Box, BoxProps, Typography} from '@mui/material';

import {CountValue, CurrencyValue, InfoIcon} from '@shared/components';

import {COLOR__LIGHT_GRAY, COLOR__LINE} from '@/theme/colors';

interface Props extends BoxProps {
  label: string;
  value: number;
  isCurrency?: boolean;
  tooltipContent?: ReactNode;
  isForceShowingSign: boolean;
}

export const StatValueBox: FC<Props> = ({
  label,
  value,
  isCurrency = true,
  tooltipContent,
  isForceShowingSign,
  ...restProps
}) => {
  const isMobile = useIsMobile();

  const labelElem = (
    <Typography
      variant="b4medium"
      sx={{color: COLOR__LIGHT_GRAY, display: 'block', marginBottom: '2px'}}
    >
      {label}
    </Typography>
  );

  return (
    <Box
      py={0.75}
      // reduced page width on desktop
      px={isMobile ? 2 : 0}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="6px"
      border={`0.7px solid ${COLOR__LINE}`}
      {...restProps}
    >
      {tooltipContent ? (
        <Box display="flex" alignItems="center" gap={0.5}>
          {labelElem}
          <InfoIcon
            iconFillColor={COLOR__LIGHT_GRAY}
            iconFontSize={16}
            tooltipContent={tooltipContent}
            tooltipProps={{placement: 'bottom'}}
          />
        </Box>
      ) : (
        labelElem
      )}

      <Typography variant="b4medium">
        {isCurrency && isForceShowingSign && value > 0 && '+'}
        {isCurrency && (
          <CurrencyValue value={value} allowNegative={isForceShowingSign} />
        )}

        {!isCurrency && <CountValue value={value} />}
      </Typography>
    </Box>
  );
};
