import styles from './MobileMenu.module.css'
import { NavLink } from 'react-router-dom'
import { AccountButton } from '../AccountButton/AccountButton'

export function MobileMenu({ openMenu, onClose }) {
  const popupClass = openMenu
    ? [styles.popup, styles['popup_opened']].join(' ')
    : styles.popup
  const menuClass = openMenu
    ? [styles.wrapper, styles['menu_opened']].join(' ')
    : styles.wrapper

  return (
    <div className={popupClass}>
      <div className={menuClass}>
        <nav>
          <ul className={styles.menu}>
            <li>
              <NavLink
                onClick={onClose}
                to="./"
                className={({ isActive }) =>
                  isActive
                    ? [styles['link_active'], styles.link].join(' ')
                    : styles.link
                }
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClose}
                to="/movies"
                className={({ isActive }) =>
                  isActive
                    ? [styles['link_active'], styles.link].join(' ')
                    : styles.link
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClose}
                to="/saved-movies"
                className={({ isActive }) =>
                  isActive
                    ? [styles['link_active'], styles.link].join(' ')
                    : styles.link
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <AccountButton onClick={onClose} />
      </div>
    </div>
  )
}
