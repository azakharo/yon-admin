import {FC} from 'react';
import {useIsMobile} from '@features/responsive';
import {
  Box,
  BoxProps,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {format} from 'date-fns';

import {LiveBadge, TextLimitedNLines} from '@shared/components';
import {UserAvatar} from '../../../user';
import {Topic} from '../../types';

import {
  COLOR__LIGHT_GRAY,
  COLOR__LINE,
  COLOR__PRIMARY,
  COLOR__WHITE,
} from '@/theme/colors';

const categoryTextStyles = {
  fontSize: 10,
  fontWeight: 500,
  color: COLOR__LIGHT_GRAY,
} as const;

interface Props extends BoxProps {
  topic: Topic;
}

export const TopicCard: FC<Props> = ({topic, ...restProps}) => {
  const isMobile = useIsMobile();
  const {name, startDate, categoryName, subCategories, isLive, logoUrl} = topic;

  const subCategoriesString = subCategories.map(sub => sub.name).join(', ');
  const subCategoriesElem = (
    <Typography sx={categoryTextStyles} noWrap>
      {subCategoriesString}
    </Typography>
  );
  const subCategoriesElemFinal = (
    <Tooltip title={subCategoriesString}>{subCategoriesElem}</Tooltip>
  );

  const card = (
    <Box
      p={1}
      bgcolor={COLOR__WHITE}
      borderRadius="6px"
      border={`0.7px solid ${COLOR__LINE}`}
      {...restProps}
      width={isMobile ? 160 : 200}
    >
      <Box display="flex" justifyContent="space-between" gap={1}>
        <Stack spacing={0.5}>
          <TextLimitedNLines
            text={name}
            lineCount={2}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '17px',
              // Actually it's not required to specify the height.
              // But it will help if lineClamp doesn't work.
              height: 34,
            }}
          />

          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 500,
              lineHeight: '13px',
            }}
          >
            {format(startDate, 'MMM d, H:mm')}
          </Typography>
        </Stack>

        {logoUrl ? (
          <img src={logoUrl} alt={name} width="auto" height={50} />
        ) : (
          <UserAvatar name="YON" size={50} bgColor={COLOR__PRIMARY} />
        )}
      </Box>

      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{height: 16, alignSelf: 'center'}}
          />
        }
        spacing={1}
      >
        <Typography sx={categoryTextStyles}>{categoryName}</Typography>

        {subCategoriesElemFinal}
      </Stack>
    </Box>
  );

  if (!isLive) {
    return card;
  }

  return <LiveBadge>{card}</LiveBadge>;
};
