# react-color-theme

Simple hook-based color theming for React with TypeScript support. Define your own color themes and use `ThemeProvider` in order to choose one of the themes in your app. Then fetch the current theme using `useTheme` hook.

## How to use?

1. Create a file for defining themes `theme.jsx`, set up themes and export them.

```jsx
// ./features/theme.jsx
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

2. Use `ThemeProvider` in your `App.jsx` file:

```jsx
// ./App.jsx
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './features/theme';
import { MyComponent } from './components/MyComponent';

export const App = () => {
  const [themeName, setThemeName] = useState('main');

  useEffect(() => {
    // Your theme name determining logic
    setThemeName('light');
  }, [themeName]);

  return (
    <ThemeProvider value={themeName}>
      {/* ... */}

      <MyComponent />

      {/* ... */}
    </ThemeProvider>
  );
};
```

3. Then in your component fetch your theme using `useTheme` hook:

```jsx
// ./components/MyComponent.jsx
import React from 'react';
import { useTheme } from './features/theme';

export const MyComponent = () => {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.background }}>
      <h2 style={{ color: theme.primary }}>This is a title</h2>
      <p style={{ color: theme.text }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
        reprehenderit officiis alias quam recusandae dolores sunt placeat.
      </p>
    </div>
  );
};
```

And that is it! Switching from dark to light modes should be as easy as changing `themeName` state of the `App` component.

## Are there any problems?

- Unfortunately, if you call `useTheme` in the same file where you render the theme provider it will not work properly. Because at the moment the hook is invoked, theme name is not yet set, so it will fallback to default theme and warn you in console about this case.

  It is recommended to refactor your code to avoid needing to use themes in the file where render the theme provider, but if it is not possible, you can pass theme name directly to `useTheme` hook as a parameter. So a fix would be:

```jsx
export const App = () => {
  const [themeName, setThemeName] = useState('main');
  const theme = useTheme(themeName); // <- Here we haven't yet initialized ThemeProvider, so we have to pass theme name to the hook

  useEffect(() => {
    // Your theme name determining logic
    setThemeName('light');
  }, [themeName]);

  return <ThemeProvider value={themeName}>{/* ... */}</ThemeProvider>;
};
```

## Do you have TypesScript support?

- Indeed we do! Defining your themes made easy with type hints from your IDE. Also `ThemeProvider` expects to get a union of theme names, so in order to pass a string to it be sure to convert it to one of themes keys first. You can use `keyof typeof themes` type to do that, this general `themes` object is exposed for simplifying work with types. So when working with theme name you can do something like that:

```tsx
import { themes } from './features/theme';

type ThemeName = keyof typeof themes;

const App: FC = () => {
  const [themeName, setThemeName] = useState<ThemeName>('main');

  let name: ThemeName = 'dark';
  name = 'light';
  setThemeName(name);

  return <ThemeProvider value={themeName}>{/* ... */}</ThemeProvider>;
};
```
