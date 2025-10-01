import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import type {Meta} from '@storybook/react';

import {ButtonWithChevron} from './index';

import {COLOR__SECONDARY} from '@/theme/colors';

const meta = {
  title: 'UI kit/Button Custom/Button with chevron',
  component: ButtonWithChevron,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof ButtonWithChevron>;

export default meta;

export const Initial = {
  args: {
    icon: <Brightness5OutlinedIcon sx={{color: COLOR__SECONDARY}} />,
    text: 'Созданные мной задачи',
  },
};
