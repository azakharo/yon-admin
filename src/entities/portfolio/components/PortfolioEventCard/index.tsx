import {FC} from 'react';
import {
  Box,
  BoxProps,
  ButtonBase,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import isEmpty from 'lodash/isEmpty';

import {CardBox, HeartButton} from '@shared/components';
import dummyCategoryLogoSrc from '@shared/images/logo.svg';
import {EventInfoLine} from '../../../event';
import {useAddRemoveEventFromFavorites} from '../../apiHooks';
import {PortfolioEvent} from '../../types';
import {StatValueBox} from '../StatValueBox';
import {ColorLabel} from './ColorLabel';
import {OrderCountBox} from './OrderCountBox';

import {COLOR__MAGENTA} from '@/theme/colors';

export interface Props extends BoxProps {
  event: PortfolioEvent;
}

export const PortfolioEventCard: FC<Props> = ({event, ...restProps}) => {
  const {
    id,
    name,
    logoUrl,
    startDate,
    labels,
    takeProfitOrderCount,
    stopLossOrderCount,
    autoCancelOrderCount,
    stat: {liveProfit, potentialProfit, exitProfit, totalInvested},
    tradingVolume,
    isFavorite,
  } = event;

  const {mutate: addRemoveEventFromFavorites} =
    useAddRemoveEventFromFavorites();

  return (
    <ButtonBase
      // To prevent button-in-button warning
      component="div"
    >
      <CardBox
        isBordered
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        {...restProps}
      >
        {/* Labels */}
        {!isEmpty(labels) && (
          <Stack direction="row" spacing={1}>
            {labels.map(label => (
              <ColorLabel key={label} text={label} />
            ))}
          </Stack>
        )}

        {/* Order counts */}
        <Stack direction="row" spacing={1}>
          <OrderCountBox
            count={takeProfitOrderCount}
            label="TP"
            color="#34C759"
          />
          <OrderCountBox
            count={stopLossOrderCount}
            label="SL"
            color={COLOR__MAGENTA}
          />
          <OrderCountBox
            count={autoCancelOrderCount}
            label="AC"
            color="#00C7BE"
          />
        </Stack>

        <Stack spacing={1}>
          <Box display="flex" gap={1} alignItems="flex-start">
            <img src={logoUrl} alt="" width="auto" height={57} />

            <Typography variant="b1bold">{name}</Typography>

            <HeartButton
              isFavorite={isFavorite}
              onClick={e => {
                e.stopPropagation();

                addRemoveEventFromFavorites({eventId: id, isFavorite});
              }}
              sx={{marginTop: '-0.5rem', marginLeft: 'auto'}}
            />
          </Box>

          <EventInfoLine
            categoryName="Category"
            categoryLogoUrl={dummyCategoryLogoSrc}
            startDate={startDate}
            tradingVolume={tradingVolume}
          />
        </Stack>

        <Grid container rowSpacing={1} columnSpacing="5px">
          <Grid size={6}>
            <StatValueBox
              label="Live profit"
              value={liveProfit.liveProfit}
              isForceShowingSign
            />
          </Grid>

          <Grid size={6}>
            <StatValueBox
              label="Potential profit"
              value={potentialProfit.estimatedValue}
              isForceShowingSign
            />
          </Grid>

          <Grid size={6}>
            <StatValueBox
              label="Exit profit"
              value={exitProfit.exitProfit}
              isForceShowingSign
            />
          </Grid>

          <Grid size={6}>
            <StatValueBox
              label="Total investment"
              value={totalInvested.total}
              isForceShowingSign={false}
            />
          </Grid>
        </Grid>
      </CardBox>
    </ButtonBase>
  );
};
