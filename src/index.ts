import React, { useContext } from 'react';

const defaultName = 'main';

export const createTheming = <T extends { [color: string]: string }, N>(
  mainTheme: T,
  customThemes: {
    [themeName in keyof N]: {
      [color in keyof T]?: string;
    };
  }
): readonly [
  React.Provider<'main' | keyof N | null>,
  (themeName?: keyof N | undefined) => T,
  {
    main: T;
  } & { [themeName in keyof N]: { [color in keyof T]?: string | undefined } }
] => {
  const themes = { [defaultName]: mainTheme, ...customThemes };

  const ThemeContext = React.createContext<keyof N | typeof defaultName | null>(
    null
  );

  const useTheme = (themeName?: keyof N) => {
    const contextName = useContext(ThemeContext);
    if (!themeName && contextName === null) {
      console.warn(
        '[react-color-theme]: It looks like you are using the useTheme hook in the same file that you use to render the theme provider. At the time the hook is called, the theme is set to `null`'
      );
    }
    const name = themeName || contextName || defaultName;
    return name === defaultName
      ? themes[defaultName]
      : { ...themes[defaultName], ...themes[name] };
  };

  return [ThemeContext.Provider, useTheme, themes] as const;
};
