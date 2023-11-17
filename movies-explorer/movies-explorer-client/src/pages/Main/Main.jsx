import { Promo } from '../../components/Promo/Promo'
import { AboutProject } from '../../components/AboutProject/AboutProject'
import { Techs } from '../../components/Techs/Techs'
import { AboutMe } from '../../components/AboutMe/AboutMe'
import { useRef } from 'react'

export function Main() {
  const refScroll = useRef()

  function scrollHandler() {
    refScroll.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Promo onClick={scrollHandler} />
      <AboutProject anchorLink={refScroll} />
      <Techs />
      <AboutMe />
    </>
  )
}
