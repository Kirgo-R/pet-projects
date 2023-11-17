import { useCallback, useEffect, useState } from 'react'
import { useResize } from './useResize'
import {
  DESKTOP_INIT,
  DESKTOP_STEP,
  DESKTOP_WIDTH,
  INIT,
  MOBILE_INIT,
  MOBILE_STEP,
  MOBILE_WIDTH,
  STEP,
  TABLET_INIT,
  TABLET_STEP,
  TABLET_WIDTH,
} from '../utils/constants'

export function useCounterCards() {
  const { width } = useResize()
  const [count, setCount] = useState(0)

  const renderingCards = useCallback(() => {
    const counter = {
      initial: INIT,
      step: STEP,
    }
    if (width < DESKTOP_WIDTH) {
      counter.initial = DESKTOP_INIT
      counter.step = DESKTOP_STEP
    }
    if (width < TABLET_WIDTH) {
      counter.initial = TABLET_INIT
      counter.step = TABLET_STEP
    }
    if (width < MOBILE_WIDTH) {
      counter.initial = MOBILE_INIT
      counter.step = MOBILE_STEP
    }
    return counter
  }, [width])

  const initial = renderingCards().initial
  const step = renderingCards().step

  useEffect(() => {
    setCount(initial)
    if (width >= DESKTOP_WIDTH) {
      setCount(initial)
    }
    if (width < DESKTOP_WIDTH) {
      setCount(initial)
    }
    if (width < TABLET_WIDTH) {
      setCount(initial)
    }
    if (width < MOBILE_WIDTH) {
      setCount(initial)
    }
  }, [initial, width])

  function handleRenderingCards() {
    setCount(count + step)
  }

  function setInitial() {
    setCount(initial)
  }

  return { handleRenderingCards, count, setInitial }
}
