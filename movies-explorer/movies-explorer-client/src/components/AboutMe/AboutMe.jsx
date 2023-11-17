import styles from './AboutMe.module.css'
import photo from '../../images/student_img.jpeg'
import { MainWrapper } from '../MainWrapper/MainWrapper'
import { Portfolio } from '../Portfolio/Portfolio'

export function AboutMe() {
  return (
    <MainWrapper sectionTitle={'Студент'} wrapperClass={[styles.wrapper]}>
      <div className={styles.about}>
        <div className={styles.text}>
          <h3 className={styles.name}>Виталий</h3>
          <p className={styles.profession}>Фронтенд-разработчик, 30 лет</p>
          <p className={styles.biography}>
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс&#8209;заказами&nbsp;и ушёл с&nbsp;постоянной
            работы.
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            href="https://github.com/Shrodinger-54rus"
          >
            GitHub
          </a>
        </div>
        <img className={styles.photo} src={photo} alt="фото для портфолио" />
      </div>
      <Portfolio />
    </MainWrapper>
  )
}
