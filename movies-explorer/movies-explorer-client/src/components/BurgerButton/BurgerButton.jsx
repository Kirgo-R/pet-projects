import styles from './BurgerButton.module.css'

export function BurgerButton({ openMenu, onClick, mainPageOpened }) {
  const burgerClassButton = openMenu
    ? [styles.burger, styles['burger_active']].join(' ')
    : [styles.burger]

  return (
    <button
      type="button"
      className={
        mainPageOpened
          ? [burgerClassButton, styles['burger_dark']].join(' ')
          : burgerClassButton
      }
      onClick={onClick}
    >
      <span />
    </button>
  )
}
