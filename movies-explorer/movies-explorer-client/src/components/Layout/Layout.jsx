import { Header } from '../Header/Header'
import { MobileMenu } from '../MobileMenu/MobileMenu'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { useEffect, useState } from 'react'
import { useResize } from '../../hooks/useResize'
import styles from './Layout.module.css'

export function Layout({ loggedIn, handleLogin }) {
  const { isScreenDesktop } = useResize()
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState(false)
  const [mainPageOpened, setMainPageOpened] = useState(true)
  const [profilePageOpened, setProfilePageOpened] = useState(false)

  function handleOpenMobileMenu() {
    setOpenMenu(!openMenu)
  }

  function handleCloseMenu() {
    setOpenMenu(false)
  }

  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        setOpenMenu(false)
      }
    }

    if (openMenu) {
      document.addEventListener('keydown', closeByEsc)
      return () => {
        document.removeEventListener('keydown', closeByEsc)
      }
    }
  }, [openMenu, setOpenMenu])

  useEffect(() => {
    isScreenDesktop && setOpenMenu(false)
  }, [isScreenDesktop])

  useEffect(() => {
    if (location.pathname === '/') {
      setMainPageOpened(true)
    } else {
      setMainPageOpened(false)
    }
  }, [location])

  useEffect(() => {
    if (location.pathname === '/profile') {
      setProfilePageOpened(true)
    } else {
      setProfilePageOpened(false)
    }
  }, [location])

  return (
    <>
      <Header
        loggedIn={loggedIn}
        handleLogin={handleLogin}
        openMenu={openMenu}
        onClick={handleOpenMobileMenu}
        onClose={handleCloseMenu}
        mainPageOpened={mainPageOpened}
      />
      <MobileMenu openMenu={openMenu} onClose={handleCloseMenu} />
      <main className={styles.main}>
        <Outlet />
      </main>
      {!profilePageOpened && <Footer />}
    </>
  )
}
