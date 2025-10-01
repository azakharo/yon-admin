import type {Meta, StoryObj} from '@storybook/react';

import bitcoinImageSrc from '@shared/images/bitcoin.png';
import {CategoryButton} from './index';

const meta = {
  title: 'Categories/CategoryButton',
  component: CategoryButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CategoryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    imageSrc: bitcoinImageSrc,
    label: 'Crypto',
  },
};
