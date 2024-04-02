import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, createLightTheme } from '@fluentui/react-components';

import App from './components/App';

const myBrand = {
  "10":"#000000",
  "20":"#011800",
  "30":"#002700",
  "40":"#00360c",
  "50":"#004612",
  "60":"#005618",
  "70":"#6187F0", //hoover
  "80":"#6187F0", //selected
  "90":"#218935",
  "100":"#3e9949",
  "110":"#59a85e",
  "120":"#73b776",
  "130":"#8ec68f",
  "140":"#949DAD",
  "150":"#c6e4c5",
  "160":"#e2f2e2"
}
const light = createLightTheme(myBrand);

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('react-page') as Element;
    const root = createRoot(container);
    root.render(<FluentProvider theme={light}>
      <App />
    </FluentProvider>);
  });