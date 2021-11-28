import React from 'react';
declare const defaultName = "main";
export declare const createTheming: <T extends {
    [color: string]: string;
}, N>(mainTheme: T, customThemes: { [themeName in keyof N]: { [color in keyof T]?: string | undefined; }; }) => readonly [React.Provider<"main" | keyof N | null>, (themeName?: "main" | keyof N | undefined) => T, {
    main: T;
} & { [themeName in keyof N]: { [color in keyof T]?: string | undefined; }; }];
export {};
