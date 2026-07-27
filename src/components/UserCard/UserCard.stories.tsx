import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from './UserCard';
import { User } from '../../types/user';

const mockUser: User = {
  id: { name: 'BR', value: '999' },
  gender: 'female',
  name: { title: 'Ms', first: 'Fernanda', last: 'Lima' },
  email: 'fernanda.lima@example.com',
  dob: { date: '1990-03-15', age: 34 },
  phone: '11988887777',
  cell: '11988887777',
  picture: {
    large: 'https://randomuser.me/api/portraits/women/44.jpg',
    medium: 'https://randomuser.me/api/portraits/women/44.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  location: {
    street: { number: 10, name: 'Av Paulista' },
    city: 'São Paulo',
    state: 'SP',
    country: 'Brazil',
    postcode: '01310-000',
  },
  nat: 'BR',
};

const meta: Meta<typeof UserCard> = {
  title: 'Components/UserCard',
  component: UserCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: mockUser,
  },
};

export const MaleUser: Story = {
  args: {
    user: {
      ...mockUser,
      gender: 'male',
      name: { title: 'Mr', first: 'Lucas', last: 'Mendes' },
      email: 'lucas.mendes@example.com',
      dob: { date: '1998-11-20', age: 26 },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/32.jpg',
        medium: 'https://randomuser.me/api/portraits/men/32.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    },
  },
};
