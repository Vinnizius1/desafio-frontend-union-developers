import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Título principal semântico (h1) do cabeçalho' },
    version: { control: 'text', description: 'Tag de versão do sistema' },
    githubUrl: { control: 'text', description: 'Link do repositório no GitHub' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'Desafio Frontend - Union Developers',
    version: 'v1.0.0',
    githubUrl: 'https://github.com/Vinnizius1/desafio-frontend-union-developers',
  },
};
