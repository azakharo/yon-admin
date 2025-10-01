import type {Meta, StoryObj} from '@storybook/react';

import iconSrc from '@shared/images/emirates.png';
import {PortfolioEvent} from '../../types';
import {PortfolioEventCard} from './index';

const meta = {
  title: 'Portfolio/PortfolioEventCard',
  component: PortfolioEventCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PortfolioEventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const event: PortfolioEvent = {
  id: '1',
  name: 'Will Ronaldo make 2 goals in this match?',
  description:
    'Browse jobs with Jora. More than 250000 jobs, all on one job search site. Free registration.',
  startDate: new Date(),
  logoUrl: iconSrc,
  takeProfitOrderCount: 2,
  stopLossOrderCount: 2,
  autoCancelOrderCount: 4,
  stat: {
    totalInvested: {
      total: -2.56,
      matched: {
        total: -1.28,
        value: -0.9,
        bonus: -0.38,
      },
      unmatched: {
        total: -1.28,
        value: -0.9,
        bonus: -0.38,
      },
    },
    liveProfit: {
      liveProfit: 2.28,
      investment: -1.28,
      currentValue: 1,
    },
    exitProfit: {
      exitProfit: 0.89,
      soldQuantity: 1,
      platformFee: -0.11,
    },
    potentialProfit: {
      potentialProfit: 0.76 + 1.28,
      investment: -1.28,
      estimatedValue: 0.76,
    },
  },
  labels: ['exiting', 'matched', 'unmatched'],
  isFavorite: false,
  tradingVolume: 284_000,
};

export const Basic: Story = {
  args: {
    event,
  },
};
