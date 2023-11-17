import styles from './Movies.module.css'
import { MovieCardList } from '../../components/MoviesCardList/MovieCardList'
import { SearchForm } from '../../components/SearchForm/SearchForm'
import { useCallback, useEffect, useState } from 'react'
import {
  NOT_FOUND_ERROR,
  NOT_MOVIE_ERROR,
  SERVER_ERROR,
  SHORTS,
} from '../../utils/constants'
import { Preloader } from '../../components/Preloader/Preloader'
import { moviesApi } from '../../utils/MoviesApi'
import { UploadButton } from '../../components/UploadButton/UploadButton'
import { useCounterCards } from '../../hooks/useCounterCards'

export function Movies({ likeToggle, onRemove, savedCards }) {
  const { count, handleRenderingCards, setInitial } = useCounterCards()

  const [error, setError] = useState('')
  const [serverError, setServerError] = useState(false)
  const [isUploadVisible, setIsUploadVisible] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [searchedMovies, setSearchedMovies] = useState([])

  const [initiallyDisplayed, setInitiallyDisplayed] = useState([])

  const [queryValue, setQueryValue] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [shortChecked, setShortChecked] = useState(false)

  useEffect(() => {
    setInitiallyDisplayed(searchedMovies.slice(0, count))
  }, [count, searchedMovies])

  useEffect(() => {
    if (searchedMovies.length > initiallyDisplayed.length) {
      setIsUploadVisible(true)
    } else {
      setIsUploadVisible(false)
    }
  }, [searchedMovies, initiallyDisplayed])

  function handleSearch(query) {
    setInitial()
    if (moviesList.length === 0) {
      setIsSearching(true)
      moviesApi
        .getMovies()
        .then((moviesData) => {
          setMoviesList(moviesData)
          setServerError(false)
          setResult(query, shortChecked, moviesData)
        })
        .catch((err) => {
          setServerError(true)
          console.error(`Ошибка при обработке поискового запроса ${err}`)
        })
        .finally(() => {
          setIsSearching(false)
        })
    } else {
      setResult(query, shortChecked, moviesList)
    }
  }

  const setResult = useCallback((query, shortChecked, movies) => {
    setQueryValue(query)
    recordingResult(query, shortChecked, movies)
    setSearchedMovies(
      movies.filter((movie) => {
        const result = movie.nameRU.toLowerCase().includes(query.toLowerCase())
        return shortChecked ? result && movie.duration <= SHORTS : result
      }),
    )
  }, [])

  function shortChanged() {
    if (shortChecked) {
      setShortChecked(false)
      setResult(queryValue, false, moviesList)
    } else {
      setShortChecked(true)
      setResult(queryValue, true, moviesList)
      localStorage.setItem('short', JSON.stringify(true))
    }
  }

  function recordingResult(query, short, movies) {
    localStorage.setItem('query', JSON.stringify(query))
    localStorage.setItem('short', JSON.stringify(short))
    localStorage.setItem('movies', JSON.stringify(movies))
  }

  useEffect(() => {
    if (localStorage.query && localStorage.short && localStorage.movies) {
      const query = JSON.parse(localStorage.query)
      const short = JSON.parse(localStorage.short)
      const movies = JSON.parse(localStorage.movies)

      setShortChecked(short)
      setMoviesList(movies)
      setServerError(false)
      setResult(query, short, movies)
      setQueryValue(query)
    }
  }, [setResult])

  useEffect(() => {
    if (searchedMovies.length === 0 && queryValue === '') {
      setError(NOT_MOVIE_ERROR)
    } else if (searchedMovies.length === 0) {
      setError(NOT_FOUND_ERROR)
    } else if (serverError) {
      setError(SERVER_ERROR)
    } else {
      setError('')
    }
  }, [queryValue, searchedMovies, serverError])

  return (
    <section className={styles.wrapper}>
      <SearchForm
        queryValue={queryValue}
        handleSearch={handleSearch}
        setShortChecked={shortChanged}
        isChecked={shortChecked}
        searchedMovies={searchedMovies}
      />
      {isSearching ? (
        <Preloader />
      ) : (
        <MovieCardList
          error={error}
          likeToggle={likeToggle}
          onRemove={onRemove}
          cards={initiallyDisplayed}
          savedCards={savedCards}
        />
      )}
      {isUploadVisible ? <UploadButton upLoad={handleRenderingCards} /> : ''}
    </section>
  )
}
