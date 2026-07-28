import type { Meta, StoryObj } from '@storybook/react';
import { UserTabs } from './UserTabs';
import { User } from '../../types/user';

const mockUser: User = {
  id: { name: 'BR', value: '101' },
  gender: 'female',
  name: { title: 'Miss', first: 'Jennie', last: 'Nichols' },
  email: 'jennie@example.com',
  dob: { date: '1993-11-02T00:00:00.000Z', age: 30 },
  phone: '(11) 91234-5678',
  cell: '(11) 98765-4321',
  picture: { large: '', medium: '', thumbnail: '' },
  location: { street: { number: 45, name: 'Avenida Paulista' }, city: 'São Paulo', state: 'SP', country: 'Brasil', postcode: '01310-000' },
  nat: 'BR',
};

const meta: Meta<typeof UserTabs> = {
  title: 'Components/UserTabs',
  component: UserTabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserTabs>;

export const Default: Story = {
  args: {
    user: mockUser,
  },
};
