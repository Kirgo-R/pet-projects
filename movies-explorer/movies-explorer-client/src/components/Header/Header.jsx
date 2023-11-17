import styles from './Header.module.css'
import { Navigation } from '../Navigation/Navigation'
import { Logo } from '../Logo/Logo'
import { Auth } from '../Auth/Auth'

export function Header({
  onClick,
  openMenu,
  mainPageOpened,
  handleLogin,
  loggedIn,
}) {
  const headerClass = !mainPageOpened
    ? [styles.header, styles['header_light']].join(' ')
    : styles.header

  return (
    <header className={headerClass}>
      <Logo />
      {loggedIn ? (
        <Navigation
          onClick={onClick}
          openMenu={openMenu}
          mainPageOpened={mainPageOpened}
        />
      ) : (
        <Auth />
      )}
    </header>
  )
}
