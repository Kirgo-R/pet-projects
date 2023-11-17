import promoImage from '../../images/promo-image.png'
import styles from './Promo.module.css'

export function Promo({ onClick }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.promo}>
        <h1 className={styles.title}>
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className={styles.caption}>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button type="button" onClick={onClick} className={styles.button}>
          Узнать больше
        </button>
      </div>
      <img
        className={styles.image}
        src={promoImage}
        alt="изображение промо-блока"
      />
    </section>
  )
}
