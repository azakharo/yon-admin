import {FC} from 'react';
import {Box, BoxProps, Button, Stack, Typography} from '@mui/material';

import {HeartButton} from '@shared/components';
import {useNotImplementedToast} from '@shared/hooks';
import {useAddRemoveEventFromFavorites} from '../../../portfolio';
import {Event} from '../../types';
import {EventInfoLine} from '../EventInfoLine';

import {COLOR__LINE, COLOR__WHITE} from '@/theme/colors';

export interface Props extends BoxProps {
  event: Event;
}

export const EventCard: FC<Props> = ({event, ...restProps}) => {
  const {
    id,
    name,
    description,
    logoUrl,
    startDate,
    yesPrice,
    yesText,
    noPrice,
    noText,
    category,
    isFavorite,
    tradingVolume,
  } = event;
  const showNotImplemented = useNotImplementedToast();
  const {mutate: addRemoveEventFromFavorites} =
    useAddRemoveEventFromFavorites();

  return (
    <Box
      p={2}
      bgcolor={COLOR__WHITE}
      borderRadius="6px"
      border={`0.7px solid ${COLOR__LINE}`}
      {...restProps}
    >
      <Stack spacing={1}>
        <Box display="flex" gap={1}>
          <img src={logoUrl} alt="" width="auto" height={57} />

          <Box
            display="flex"
            gap={1}
            alignItems="flex-start"
            flex="1"
            justifyContent="space-between"
          >
            <Typography variant="b1bold">{name}</Typography>

            <HeartButton
              isFavorite={isFavorite}
              onClick={() => {
                addRemoveEventFromFavorites({eventId: id, isFavorite});
              }}
              sx={{marginTop: '-0.5rem'}}
            />
          </Box>
        </Box>

        <EventInfoLine
          categoryName={category.name}
          categoryLogoUrl={category.logoUrl}
          startDate={startDate}
          tradingVolume={tradingVolume}
        />

        <Typography variant="b4medium" sx={{color: '#4F4D55'}}>
          {description}
        </Typography>

        <Box display="flex" gap={2}>
          <Button
            variant="subtleBordered"
            color="primary"
            fullWidth
            onClick={showNotImplemented}
            sx={{paddingY: 1}}
          >
            {yesText || 'Yes'} ${yesPrice}
          </Button>

          <Button
            variant="subtleBordered"
            color="error"
            fullWidth
            onClick={showNotImplemented}
            sx={{paddingY: 1}}
          >
            {noText || 'No'} ${noPrice}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
