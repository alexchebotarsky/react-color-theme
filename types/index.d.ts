import React from 'react';
export declare const createTheming: <T extends {
    [color: string]: string;
}, N>(mainTheme: T, customThemes: { [themeName in keyof N]: { [color in keyof T]?: string | undefined; }; }) => readonly [React.Provider<"main" | keyof N | null>, (themeName?: keyof N | undefined) => T, {
    main: T;
} & { [themeName_1 in keyof N]: { [color_1 in keyof T]?: string | undefined; }; }];
