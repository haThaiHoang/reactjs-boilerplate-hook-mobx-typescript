class Storage {
  _storage: globalThis.Storage

  constructor(storage: globalThis.Storage) {
    this._storage = storage
  }

  get(key: string, defaultValue: string | null = null) {
    let value = this._storage.getItem(key) || defaultValue

    if (value) {
      try {
        value = JSON.parse(value)
      } catch (error) {
        value = defaultValue
      }
    }

    return value
  }

  has(key: string) {
    return this.get(key) !== null
  }

  set(key: string, value: string | null | undefined) {
    value = JSON.stringify(value)

    this._storage.setItem(key, value)
  }

  remove(key: string) {
    this._storage.removeItem(key)
  }

  clear() {
    this._storage.clear()
  }

  pull(key: string, defaultValue?: string) {
    const value = this.get(key, defaultValue)

    this.remove(key)

    return value
  }
}

const LocalStorage = new Storage(window.localStorage)
const SessionStorage = new Storage(window.sessionStorage)

export default LocalStorage

export {
  SessionStorage
}
