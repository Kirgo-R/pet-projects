import styles from './Navigation.module.css'
import { useResize } from '../../hooks/useResize'
import { BurgerButton } from '../BurgerButton/BurgerButton'
import { NavLink } from 'react-router-dom'
import { AccountButton } from '../AccountButton/AccountButton'

export function Navigation({ onClick, openMenu, mainPageOpened }) {
  const { isScreenDesktop } = useResize()
  const linkClass = mainPageOpened
    ? [styles.link, styles.linkMainPage].join(' ')
    : styles.link

  return (
    <>
      {isScreenDesktop ? (
        <>
          <nav>
            <ul className={styles.navigation}>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? [linkClass, styles['link_active']].join(' ')
                      : linkClass
                  }
                  to="/movies"
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? [linkClass, styles['link_active']].join(' ')
                      : linkClass
                  }
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          </nav>
          <AccountButton mainPageOpened={mainPageOpened} />
        </>
      ) : (
        <BurgerButton
          mainPageOpened={mainPageOpened}
          openMenu={openMenu}
          onClick={onClick}
        />
      )}
    </>
  )
}
