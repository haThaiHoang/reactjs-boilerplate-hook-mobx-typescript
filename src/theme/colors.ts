import tinycolor from 'tinycolor2'

// Color utils
export const darken = (color: string, value: number): string => tinycolor(color).darken(value).toString()
export const lighten = (color: string, value: number): string => tinycolor(color).lighten(value).toString()
export const alpha = (color: string, value: number): string => tinycolor(color).setAlpha(value).toRgbString()
export const isLight = (color: string): boolean => tinycolor(color).isLight()

export const PRIMARY = '#388E3C'
export const DARK = '#595757'
