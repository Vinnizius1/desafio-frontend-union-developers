import type { Meta, StoryObj } from '@storybook/react';
import { ViewToggle } from './ViewToggle';

const meta: Meta<typeof ViewToggle> = {
  title: 'Components/ViewToggle',
  component: ViewToggle,
  tags: ['autodocs'],
  argTypes: {
    onViewChange: { action: 'viewChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof ViewToggle>;

export const GridActive: Story = {
  args: {
    viewMode: 'grid',
  },
};

export const TableActive: Story = {
  args: {
    viewMode: 'table',
  },
};
