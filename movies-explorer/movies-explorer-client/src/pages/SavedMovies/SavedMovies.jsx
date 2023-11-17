import styles from './SavedMovies.module.css'
import { MovieCardList } from '../../components/MoviesCardList/MovieCardList'
import { SearchForm } from '../../components/SearchForm/SearchForm'
import { useCallback, useEffect, useState } from 'react'
import { NOT_FOUND_ERROR, NOT_SAVE_ERROR, SHORTS } from '../../utils/constants'

export function SavedMovies({ cards, onRemove, isOpenSavedMovies }) {
  const [searchResult, setSearchResult] = useState(cards)
  const [error, setError] = useState('')
  const [shortChecked, setShortChecked] = useState(false)
  const [queryValue, setQueryValue] = useState('')
  const [disabledSearch, setDisabledSearch] = useState(false)

  useEffect(() => {
    if (cards.length === 0) {
      setError(NOT_SAVE_ERROR)
    } else if (searchResult.length === 0) {
      setError(NOT_FOUND_ERROR)
    } else {
      setError('')
    }
  }, [searchResult, cards])

  const setResult = useCallback((query, shortChecked, movies) => {
    setQueryValue(query)
    setSearchResult(
      movies.filter((movie) => {
        const result = movie.nameRU.toLowerCase().includes(query.toLowerCase())
        return shortChecked ? result && movie.duration <= SHORTS : result
      }),
    )
  }, [])

  function handleSearch(query) {
    setResult(query, shortChecked, cards)
  }

  useEffect(() => {
    if (searchResult.length === 0) {
      setDisabledSearch(true)
      setShortChecked(false)
    } else {
      setDisabledSearch(false)
    }
    setResult(queryValue, shortChecked, cards)
  }, [setResult, cards, queryValue, shortChecked, searchResult.length])

  function shortChanged() {
    if (shortChecked) {
      setShortChecked(false)
      setResult(queryValue, false, cards)
    } else {
      setShortChecked(true)
      setResult(queryValue, true, cards)
    }
  }

  return (
    <section className={styles.wrapper}>
      <SearchForm
        handleSearch={handleSearch}
        setShortChecked={shortChanged}
        isChecked={shortChecked}
        disabledSearch={disabledSearch}
        searchedMovies={searchResult}
      />
      <MovieCardList
        error={error}
        onRemove={onRemove}
        cards={searchResult}
        isOpenSavedMovies={isOpenSavedMovies}
      />
    </section>
  )
}
