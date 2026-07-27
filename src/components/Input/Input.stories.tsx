import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Rótulo acessível opcional sobre o campo' },
    placeholder: { control: 'text', description: 'Texto explicativo do placeholder' },
    error: { control: 'text', description: 'Mensagem de erro de validação' },
    disabled: { control: 'boolean', description: 'Desabilita o campo de entrada' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar usuários por nome...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Nome do Usuário',
    placeholder: 'Digite o nome...',
  },
};

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState('Ana Silva');
    return (
      <Input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClear={() => setVal('')}
        placeholder="Buscar..."
      />
    );
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Buscar...',
    error: 'Nenhum usuário encontrado com este nome.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Busca desabilitada',
    disabled: true,
  },
};
