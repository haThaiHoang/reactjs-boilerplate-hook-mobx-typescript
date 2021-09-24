import { useState, useEffect, useCallback } from 'react'
import setLocale from 'yup/lib/setLocale'
import FontFaceObserver from 'fontfaceobserver'

import Request from '@/utils/request'
import Storage from '@/utils/storage'

const font = new FontFaceObserver('Nunito')

setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

const Init = ({ children }: { children: JSX.Element }) => {
  const [inited, setInited] = useState(false)

  const hidePreloading = useCallback((): void => {
    const preloading: any = document.getElementsByClassName('preloading')[0]

    const fadeEffect = setInterval(() => {
      if (!preloading.style.opacity) {
        preloading.style.opacity = 1
      }
      if (preloading.style.opacity === '1') {
        preloading.style.opacity = 0
      } else {
        clearInterval(fadeEffect)
        preloading.style.display = 'none'
      }
    }, 500)
  }, [])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = Storage.get('ACCESS_TOKEN')
      if (token) Request.setAccessToken(token)

      setInited(true)

      try {
        await font.load()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Load Fontface failed')
      }

      hidePreloading()
    }

    fetchData()
  }, [])

  return inited ? children : null
}

export default Init
