import type {Meta, StoryObj} from '@storybook/react';

import {Transaction} from '../../types';
import {TransactionCard} from './index';

const meta = {
  title: 'Transactions/TransactionCard',
  component: TransactionCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransactionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const transaction: Transaction = {
  id: '1ce0c0dd-150d-4286-a047-5a07f1fa314f',
  value: -0.53,
  bonus: -0.23,
  meta: [
    'OrderID 07f6dbeb-5ed1-4903-a23c-e7e60bb0cef2',
    'OrderItemID 67369339-c0fe-4a26-a35c-cba8a64c6f6f',
  ],
  paymentType: '',
  label: 'matched',
  relatedEntity: 'order',
  relatedEntityId: 'order1',
  created: new Date('2025-08-05T19:21:25.899830Z'),
};

export const Basic: Story = {
  args: {
    transaction,
  },
};

export const PositiveValues: Story = {
  args: {
    transaction: {
      id: '1ce0c0dd-150d-4286-a047-5a07f1fa314f',
      value: 46.53,
      bonus: 1.23,
      meta: [
        'OrderID 07f6dbeb-5ed1-4903-a23c-e7e60bb0cef2',
        'OrderItemID 67369339-c0fe-4a26-a35c-cba8a64c6f6f',
      ],
      paymentType: '',
      label: 'matched',
      relatedEntity: '',
      relatedEntityId: '',
      created: new Date('2025-08-05T19:21:25.899830Z'),
    },
  },
};
