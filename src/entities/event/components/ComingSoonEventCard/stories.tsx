import type {Meta, StoryObj} from '@storybook/react';

import categoryIconSrc from '@shared/images/bitcoin.png';
import iconSrc from '@shared/images/emirates.png';
import bannerSrc from '@shared/images/footballBanner.jpg';
import {EventResult, EventStatus} from '../../types';
import {ComingSoonEventCard} from './index';

const meta = {
  title: 'Events/ComingSoonEventCard',
  component: ComingSoonEventCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ComingSoonEventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    event: {
      id: '1',
      logoUrl: iconSrc,
      name: 'S7 Event Title (RU)',
      startDate: new Date(),
      description:
        'Browse jobs with Jora. More than 250000 jobs, all on one job search site. Free registration.',
      yesPrice: 15,
      category: {
        id: 'football',
        name: 'football',
        description: 'football category description',
        logoUrl: categoryIconSrc,
        bannerUrl: bannerSrc,
      },
      subCategories: [],
      isFavorite: false,
      yesText: 'Yes',
      noPrice: 15,
      noText: 'No',
      isLive: false,
      tradingVolume: 12.1,
      status: EventStatus.active,
      result: EventResult.waitingForResult,
    },
  },
};
