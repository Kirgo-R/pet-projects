import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.title}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className={styles.copyright}>
        <p className={styles.subtitle}>© 2023</p>
        <nav className={styles.navigation}>
          <Link
            target="_blank"
            to="https://practicum.yandex.ru/"
            className={styles.link}
          >
            Яндекс.Практикум
          </Link>
          <Link
            target="_blank"
            to="https://github.com/Shrodinger-54rus"
            className={styles.link}
          >
            Github
          </Link>
        </nav>
      </div>
    </footer>
  )
}
