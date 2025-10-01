import {Box} from '@mui/material';
import type {Meta} from '@storybook/react';

import {TextLimitedNLines} from '../index';

const meta = {
  title: 'UI kit/TextLimitedNLines',
  component: TextLimitedNLines,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextLimitedNLines>;

export default meta;

export const Basic = {
  render: () => (
    <Box width={280}>
      <TextLimitedNLines
        text="People rejoice at the Sun, and I'm dreaming of the Moon. People rejoice at the Sun, and I'm dreaming of the Moon"
        lineCount={2}
      />
    </Box>
  ),
};
