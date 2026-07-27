import type { Preview } from '@storybook/react';
import '../src/styles/main.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#171717' },
        { name: 'card', value: '#31323F' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};

export default preview;
