import type {Meta, StoryObj} from '@storybook/react';

import bitcoinImageSrc from '@shared/images/bitcoin.png';
import {SquareCategoryButton} from './index';

const meta = {
  title: 'Categories/SquareCategoryButton',
  component: SquareCategoryButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    imageSrc: bitcoinImageSrc,
    label: 'Crypto',
    categoryId: '1',
    onClick: () => {},
  },
} satisfies Meta<typeof SquareCategoryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  args: {
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};
