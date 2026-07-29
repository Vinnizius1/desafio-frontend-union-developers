import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserTable } from './UserTable';
import { User } from '../../types/user';

const mockUsers: User[] = [
  {
    id: { name: 'BR', value: '101' },
    gender: 'female',
    name: { title: 'Ms', first: 'Julia', last: 'Alves' },
    email: 'julia@example.com',
    dob: { date: '1995-04-10T00:00:00.000Z', age: 29 },
    phone: '12345',
    cell: '67890',
    picture: { large: '', medium: '', thumbnail: '' },
    location: { street: { number: 1, name: 'Rua A' }, city: 'São Paulo', state: 'SP', country: 'Brasil', postcode: '000' },
    nat: 'BR',
  },
  {
    id: { name: 'US', value: '102' },
    gender: 'male',
    name: { title: 'Mr', first: 'John', last: 'Smith' },
    email: 'john@example.com',
    dob: { date: '1988-11-20T00:00:00.000Z', age: 36 },
    phone: '555-0199',
    cell: '555-0199',
    picture: { large: '', medium: '', thumbnail: '' },
    location: { street: { number: 42, name: 'Wall St' }, city: 'New York', state: 'NY', country: 'USA', postcode: '10005' },
    nat: 'US',
  },
];

const meta: Meta<typeof UserTable> = {
  title: 'Components/UserTable',
  component: UserTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    onUserClick: { action: 'userClicked' },
  },
};

export default meta;
type Story = StoryObj<typeof UserTable>;

export const Default: Story = {
  args: {
    users: mockUsers,
  },
};
