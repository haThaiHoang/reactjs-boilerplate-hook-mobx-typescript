import './app/bootstrap'

declare global {
  interface NodeModule {
    hot: any
  }
}

if (module.hot) {
  module.hot.accept()

  module.hot.addStatusHandler((status: string) => {
    // eslint-disable-next-line
    if (status === 'prepare') console.clear()
  })
}
