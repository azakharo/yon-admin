import type {Meta, StoryObj} from '@storybook/react';

import {FilterSetBadge} from '../FilterSetBadge';
import {TabButton} from './TabButton';

const emptyFunc = () => {};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI kit/Tabs/TabButton',
  component: TabButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    label: 'Crypto',
    value: 'crypto',
    onSelect: emptyFunc,
  },
} satisfies Meta<typeof TabButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const InitialWithBadge = {
  render: () => {
    return (
      <FilterSetBadge>
        <TabButton
          label="Crypto"
          value="crypto"
          onSelect={emptyFunc}
          isSelected={false}
        />
      </FilterSetBadge>
    );
  },
};

export const SelectedWithBadge = {
  render: () => {
    return (
      <FilterSetBadge>
        <TabButton
          label="Crypto"
          value="crypto"
          onSelect={emptyFunc}
          isSelected
        />
      </FilterSetBadge>
    );
  },
};
