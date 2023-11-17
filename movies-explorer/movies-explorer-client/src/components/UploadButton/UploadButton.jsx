import styles from './UploadButton.module.css'

export function UploadButton({ upLoad }) {
  return (
    <>
      <button onClick={upLoad} className={styles.button}>
        Еще
      </button>
    </>
  )
}
