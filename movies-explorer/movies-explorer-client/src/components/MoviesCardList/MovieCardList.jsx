import styles from './MovieCardList.module.css'
import { MovieCard } from '../MoviesCard/MovieCard'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ErrorsMoviesList } from '../ErrorsMoviesList/ErrorsMoviesList'

export function MovieCardList({
  cards,
  likeToggle,
  onRemove,
  isOpenSavedMovies,
  savedCards,
  error,
}) {
  const location = useLocation()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (error === '') {
      setIsError(false)
    } else {
      setIsError(true)
    }
  }, [error])

  return (
    <>
      {isError ? (
        <ErrorsMoviesList error={error} />
      ) : (
        <ul className={styles.wrapper}>
          {cards.map((data) => (
            <MovieCard
              data={data}
              key={location.pathname === '/movies' ? data.id : data._id}
              likeToggle={likeToggle}
              onRemove={onRemove}
              isOpenSavedMovies={isOpenSavedMovies}
              savedCards={savedCards}
            />
          ))}
        </ul>
      )}
    </>
  )
}
