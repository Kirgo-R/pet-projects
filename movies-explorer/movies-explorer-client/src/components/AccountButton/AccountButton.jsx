import { NavLink } from 'react-router-dom'
import styles from './AccountButton.module.css'

export function AccountButton({ mainPageOpened, onClick }) {
  const buttonClass = !mainPageOpened
    ? [styles.button, styles['button_light']].join(' ')
    : styles.button

  return (
    <>
      <NavLink onClick={onClick} className={buttonClass} to="/profile">
        Аккаунт
      </NavLink>
    </>
  )
}
