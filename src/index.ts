import React from 'react';

const defaultName = 'main';

export const createTheming = <T extends { [color: string]: string }, N>(
  mainTheme: T,
  customThemes: {
    [themeName in keyof N]: {
      [color in keyof T]?: string;
    };
  }
): readonly [
  React.Provider<typeof defaultName | keyof N | null>,
  (themeName?: typeof defaultName | keyof N) => T,
  { [defaultName]: T } & typeof customThemes
] => {
  const themes = { [defaultName]: mainTheme, ...customThemes };

  const ThemeContext = React.createContext<keyof typeof themes | null>(null);

  const useTheme = (themeName?: keyof typeof themes) => {
    const contextName = React.useContext(ThemeContext);

    if (!themeName && contextName === null) {
      console.warn(
        '[react-color-theme]: Theme name is not provided, it happens if the theme provider is not rendered at the time useTheme hook is called. It might happen if useTheme is called in the same file where the provider is rendered, in that case it is recommended to refactor code to avoid that. Or if it is not possible you can pass the theme name to useTheme hook as a parameter.'
      );
    }

    const name = themeName ?? contextName ?? defaultName;

    return name === defaultName
      ? themes[defaultName]
      : { ...themes[defaultName], ...themes[name] };
  };

  return [ThemeContext.Provider, useTheme, themes] as const;
};
