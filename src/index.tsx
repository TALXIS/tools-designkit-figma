import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from './components/App';

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('react-page') as Element;
    const root = createRoot(container);
    root.render(<FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>);
  });