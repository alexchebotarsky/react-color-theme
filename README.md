# react-color-theme

Hook-based color theme for react. Define color themes and use `Provider` in order to choose one of the color themes in your app.

## How to use?

1. Create a file for defining themes `theme.jsx`, set up themes and export them.

```jsx
import { createTheming } from 'react-color-theme';

export const [ThemeProvider, useTheme, themes] = createTheming(
  {
    background: '#282836',
    foreground: '#3e3e4a',
    text: '#fff',
    primary: '#fc6',
    secondary: '#4f6bab',
  },
  {
    dark: {
      background: '#282836',
      foreground: '#3e3e4a',
      text: '#fff',
    },
    light: {
      background: '#fff',
      foreground: '#eee',
      text: '#333',
    },
  }
);
```

- The first argument is the default theme, it must contain default values for all possible colors.
- The second argument is the object containing all named themes. A named theme might miss some colors, in this case a corresponding value from the default theme will be used.

2. Use `ThemeProvider` in your `index` file:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './features/theme';
import { App } from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider value="main">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
