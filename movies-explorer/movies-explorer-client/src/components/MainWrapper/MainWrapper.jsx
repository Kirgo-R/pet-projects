import styles from './MainWrapper.module.css'

export function MainWrapper({
  sectionTitle,
  children,
  wrapperClass,
  anchorLink,
}) {
  const wrapperStyles = [styles.wrapper, wrapperClass].join(' ')
  return (
    <section ref={anchorLink} className={wrapperStyles}>
      <h2 className={styles.title}>{sectionTitle}</h2>
      {children}
    </section>
  )
}
