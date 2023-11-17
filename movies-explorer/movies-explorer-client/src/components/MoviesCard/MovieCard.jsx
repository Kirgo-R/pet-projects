import styles from './MovieCard.module.css'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BEATFILM_URL } from '../../utils/constants'

export function MovieCard({
  data,
  likeToggle,
  onRemove,
  isOpenSavedMovies,
  savedCards,
}) {
  const location = useLocation()

  const [imageUrl, setImageUrl] = useState(`${BEATFILM_URL}${data.image.url}`)
  const [isSaved, setIsSaved] = useState(false)

  const savedButtonClass = isSaved
    ? [styles.saved]
    : [styles.saved, styles.unsaved].join(' ')
  const deleteButtonClass = [styles.deleteButton, styles.saved].join(' ')

  // перевод минут в формат "ЧЧ ММ"
  function duration(time) {
    return `${Math.trunc(time / 60)}ч ${time % 60}м`
  }

  // сравнивает id чтобы отображать есть или нет лайк
  useEffect(() => {
    if (location.pathname === '/movies') {
      setIsSaved(savedCards.some((card) => data.id === card.movieId))
    }
  }, [data, savedCards, data.movieId, setIsSaved, location.pathname])

  // передает нужный url картинки в зависимости от открытой страницы
  useEffect(() => {
    location.pathname !== '/movies'
      ? setImageUrl(data.image)
      : setImageUrl(`${BEATFILM_URL}${data.image.url}`)
  }, [location, data.image])

  // удаление фильма на странице сохраненных фильмов
  function handleRemoveCard() {
    onRemove(data._id)
  }

  // сохранить/удалить фильм на кнопку "лайк"
  function toggleSavedButton() {
    if (!isSaved) {
      likeToggle(data)
      setIsSaved(true)
    } else {
      likeToggle(data)
    }
  }

  return (
    <li className={styles.wrapper}>
      <Link to={data.trailerLink} target="_blank">
        <img
          className={styles.poster}
          src={imageUrl}
          alt={`Постер к филму "${data.nameRU}"`}
        />
      </Link>
      <div className={styles.caption}>
        <h2 className={styles.title}>{data.nameRU}</h2>
        {isOpenSavedMovies ? (
          <button onClick={handleRemoveCard} className={deleteButtonClass} />
        ) : (
          <button onClick={toggleSavedButton} className={savedButtonClass} />
        )}
      </div>
      <span className={styles.duration}>{duration(data.duration)}</span>
    </li>
  )
}
