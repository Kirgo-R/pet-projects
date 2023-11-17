import styles from './ErrorsMoviesList.module.css'

export function ErrorsMoviesList({ error }) {
  return (
    <>
      <span className={styles.error}>{error}</span>
    </>
  )
}
