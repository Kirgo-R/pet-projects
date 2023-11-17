import { useEffect, useState } from 'react'

const screenMobile = 768

export function useResize() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = (e) => {
      const window = e.target
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])

  return {
    width,
    isScreenDesktop: width > screenMobile,
    isScreenTablet: width <= screenMobile,
    isScreenMobile: width <= 425,
  }
}
