const SIZE = {
  XXL: 1600, // DESKTOP L
  XL: 1200, // DESKTOP M
  LG: 992, // TABLET L
  MD: 768, // TABLET M
  SM: 576, // Mobile L
  XS: 423 // Mobile M
}

export default class Media {
  static SIZE = SIZE

  static greaterThan(windowSize) {
    return `@media only screen and (min-width: ${windowSize}px)`
  }

  static lessThan(windowSize) {
    return `@media only screen and (max-width: ${windowSize - 1}px)`
  }
}
