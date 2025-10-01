import type {Meta, StoryObj} from '@storybook/react';

import footballIconSrc from '@shared/images/bitcoin.png';
import {Topic} from '../../../topic';
import {TopicCard} from './index';

const meta = {
  title: 'Topics/TopicCard',
  component: TopicCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TopicCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const topic: Topic = {
  id: '1',
  name: 'Germany vs Brazil, it will be amazing match all the times',
  logoUrl: footballIconSrc,
  categoryName: 'Football',
  subCategories: [
    {
      id: '1',
      name: 'FIFA 2025',
    },
  ],
  startDate: new Date('2025-07-27T10:57:10.884Z'),
  isLive: false,
};

export const Initial: Story = {
  args: {
    topic,
  },
};

export const WithLiveBadge: Story = {
  args: {
    topic: {...topic, isLive: true},
  },
};
