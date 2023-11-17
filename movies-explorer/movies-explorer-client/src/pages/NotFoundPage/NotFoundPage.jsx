import styles from './NotFoundPage.module.css'
import { Link } from 'react-router-dom'

export function NotFoundPage({ goBack }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h2 className={styles.title}>404</h2>
        <p className={styles.caption}>Страница не найдена</p>
      </div>
      <Link className={styles.link} onClick={goBack}>
        Назад
      </Link>
    </div>
  )
}
