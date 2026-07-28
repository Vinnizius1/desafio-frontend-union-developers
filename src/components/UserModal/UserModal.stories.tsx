import type { Meta, StoryObj } from '@storybook/react';
import { UserModal } from './UserModal';
import { User } from '../../types/user';

const mockUser: User = {
  id: { name: '1', value: '123' },
  gender: 'male',
  name: { title: 'Mr', first: 'Carlos', last: 'Ferreira' },
  email: 'carlos@example.com',
  dob: { date: '1988-10-20', age: 36 },
  phone: '(21) 98888-7777',
  cell: '(21) 99999-6666',
  picture: {
    large: 'https://randomuser.me/api/portraits/men/32.jpg',
    medium: '',
    thumbnail: '',
  },
  location: {
    street: { number: 450, name: 'Avenida Atlântica' },
    city: 'Rio de Janeiro',
    state: 'RJ',
    country: 'Brasil',
    postcode: '22070-000',
  },
  nat: 'BR',
};

const meta: Meta<typeof UserModal> = {
  title: 'Components/UserModal',
  component: UserModal,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof UserModal>;

export const Default: Story = {
  args: {
    user: mockUser,
    isOpen: true,
  },
};
