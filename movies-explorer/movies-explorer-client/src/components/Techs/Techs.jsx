import styles from './Tech.module.css'
import { MainWrapper } from '../MainWrapper/MainWrapper'

export function Techs() {
  return (
    <MainWrapper sectionTitle={'Технологии'} wrapperClass={[styles.wrapper]}>
      <h3 className={styles.title}>7 технологий</h3>
      <p className={styles.caption}>
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили в дипломном проекте.
      </p>
      <ul className={styles.list}>
        <li className={styles.item}>HTML</li>
        <li className={styles.item}>CSS</li>
        <li className={styles.item}>JS</li>
        <li className={styles.item}>React</li>
        <li className={styles.item}>Git</li>
        <li className={styles.item}>Express.js</li>
        <li className={styles.item}>mongoDB</li>
      </ul>
    </MainWrapper>
  )
}
