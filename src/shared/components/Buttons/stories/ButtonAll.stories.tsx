import {Button, Stack} from '@mui/material';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'UI kit/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <>
      <Stack spacing={2} direction="row" mb={4}>
        <Button variant="contained" color="primary">
          Contained Primary
        </Button>
      </Stack>

      <Stack spacing={2} direction="row" mb={4}>
        <Button variant="subtle" color="primary">
          Subtle Primary
        </Button>
        <Button variant="subtle" color="black">
          Subtle Black
        </Button>
      </Stack>

      <Stack spacing={2} direction="row" mb={4}>
        <Button variant="outlined" color="black">
          Outlined Black
        </Button>
      </Stack>

      <Stack spacing={2} direction="row" mb={4}>
        <Button variant="subtleBordered" color="primary">
          Subtle Bordered Primary
        </Button>
        <Button variant="subtleBordered" color="error">
          Subtle Bordered Error
        </Button>
      </Stack>
    </>
  ),
};

export default meta;
