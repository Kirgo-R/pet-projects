import styles from './Portfolio.module.css'
import { Link } from 'react-router-dom'

export function Portfolio() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Портфолио</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            target="_blank"
            className={styles.link}
            to="https://github.com/Shrodinger-54rus/how-to-learn"
          >
            Статичный сайт
          </Link>
          <Link
            target="_blank"
            className={styles['link-arrow']}
            to="https://github.com/Shrodinger-54rus/how-to-learn"
          >
            &#8599;
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            target="_blank"
            className={styles.link}
            to="https://github.com/Shrodinger-54rus/russian-travel"
          >
            Адаптивный сайт
          </Link>
          <Link
            target="_blank"
            className={styles['link-arrow']}
            to="https://github.com/Shrodinger-54rus/russian-travel"
          >
            &#8599;
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            target="_blank"
            className={styles.link}
            to="https://github.com/Shrodinger-54rus/react-mesto-api-full-gha"
          >
            Одностраничное приложение
          </Link>
          <Link
            target="_blank"
            className={styles['link-arrow']}
            to="https://github.com/Shrodinger-54rus/react-mesto-api-full-gha"
          >
            &#8599;
          </Link>
        </li>
      </ul>
    </section>
  )
}
