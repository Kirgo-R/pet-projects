import styles from './Preloader.module.css'

export function Preloader() {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloaderContainer}>
        <span className={styles.preloaderRound}></span>
      </div>
    </div>
  )
}
