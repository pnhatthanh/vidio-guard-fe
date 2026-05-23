// Design System Color Tokens — "The Digital Curator"
// Vigilant Lens AI — Deep Indigo & Cyber Blue Palette

export const colors = {
  // Surfaces
  background: '#0b1326',
  surfaceDim: '#0b1326',
  surfaceContainerLowest: '#060e20',
  surfaceContainerLow: '#131b2e',
  surfaceContainer: '#171f33',
  surfaceContainerHigh: '#222a3d',
  surfaceContainerHighest: '#2d3449',
  surfaceBright: '#31394d',
  surfaceVariant: '#2d3449',
  surface: '#0b1326',

  // Primary — Cyber Blue
  primary: '#b7c4ff',
  primaryContainer: '#0052ff',
  primaryFixed: '#dde1ff',
  primaryFixedDim: '#b7c4ff',
  onPrimary: '#002682',
  onPrimaryContainer: '#dfe3ff',
  inversePrimary: '#004ced',

  // Secondary
  secondary: '#b7c8e1',
  secondaryContainer: '#3a4a5f',
  onSecondary: '#213145',
  onSecondaryContainer: '#a9bad3',

  // Tertiary — Alert/Violation Red
  tertiary: '#ffb3b6',
  tertiaryContainer: '#cd003c',
  onTertiary: '#68001a',
  onTertiaryContainer: '#ffddde',

  // Error
  error: '#ffb4ab',
  errorContainer: '#93000a',
  onError: '#690005',
  onErrorContainer: '#ffdad6',

  // Text
  onBackground: '#dae2fd',
  onSurface: '#dae2fd',
  onSurfaceVariant: '#c3c5d9',
  inverseSurface: '#dae2fd',
  inverseOnSurface: '#283044',

  // Outline
  outline: '#8d90a2',
  outlineVariant: '#434656',
} as const;

export type ColorKey = keyof typeof colors;
