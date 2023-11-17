import styles from './Auth.module.css'
import { Link } from 'react-router-dom'

export function Auth({ handleLogin }) {
  return (
    <nav className={styles.auth}>
      <Link className={styles.signup} to="/signup">
        Регистрация
      </Link>
      <Link className={styles.signin} to="/signin">
        Войти
      </Link>
    </nav>
  )
}
