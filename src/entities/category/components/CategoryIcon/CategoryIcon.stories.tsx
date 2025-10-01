import type {Meta, StoryObj} from '@storybook/react';

import bitcoinImageSrc from '@shared/images/bitcoin.png';
import {CategoryIcon} from './index';

const meta = {
  title: 'Categories/CategoryIcon',
  component: CategoryIcon,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CategoryIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    imageSrc: bitcoinImageSrc,
  },
};
