'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  FC,
  ReactNode
} from 'react'

interface ScrollContextType {
  scrollY: number
}

export const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0
})

interface ScrollObserverProps {
  children: ReactNode
}

const ScrollObserver: FC<ScrollObserverProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollObserver

