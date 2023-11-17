import styles from './AboutProject.module.css'
import { MainWrapper } from '../MainWrapper/MainWrapper'

export function AboutProject({ anchorLink }) {
  return (
    <MainWrapper
      anchorLink={anchorLink}
      wrapperClass={[styles.wrapper]}
      sectionTitle={'О проекте'}
    >
      <div className={styles.about}>
        <h3 className={styles['about__head']}>
          Дипломный проект включал&nbsp;5 этапов
        </h3>
        <h3 className={styles['about__head']}>
          На&nbsp;выполнение диплома ушло&nbsp;5 недель
        </h3>
        <p className={styles['about__caption']}>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и&nbsp;финальные доработки.
        </p>
        <p className={styles['about__caption']}>
          У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно
          было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className={styles.deadlines}>
        <h3 className={styles['deadlines__head']}>1 неделя</h3>
        <h3 className={styles['deadlines__head']}>4 недели</h3>
        <p className={styles['deadlines__caption']}>Back-end</p>
        <span className={styles['deadlines__caption']}>Front-end</span>
      </div>
    </MainWrapper>
  )
}
