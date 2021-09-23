import tinycolor from 'tinycolor2'

// Color utils
export const darken = (color, value) => tinycolor(color).darken(value).toString()
export const lighten = (color, value) => tinycolor(color).lighten(value).toString()
export const alpha = (color, value) => tinycolor(color).setAlpha(value).toRgbString()
export const isLight = (color) => tinycolor(color).isLight()

export const PRIMARY = '#388E3C'
export const DARK = '#595757'
