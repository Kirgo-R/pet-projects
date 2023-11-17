import styles from './SearchForm.module.css'
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox'
import { useCheckValidity } from '../../hooks/useCheckValidity'
import { QUERY_VALUE_ERROR } from '../../utils/constants'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function SearchForm({
  onFilter,
  queryValue,
  handleSearch,
  setShortChecked,
  isChecked,
  disabledSearch,
  searchedMovies,
}) {
  const { reset, isValid, handleChange, values } = useCheckValidity()
  const { pathname } = useLocation()
  const submitButtonClass = !isValid
    ? [styles.submit, styles['submit_disabled']].join(' ')
    : styles.submit

  function onChange(e) {
    handleChange(e)
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleSearch(values.search)
  }

  useEffect(() => {
    if (
      pathname === '/saved-movies' ||
      (pathname === '/saved-movies' && disabledSearch)
    ) {
      reset({ search: '' })
    } else {
      reset({ search: queryValue })
    }
  }, [queryValue, pathname, reset, disabledSearch])

  return (
    <>
      <form
        noValidate
        className={styles.form}
        name="find"
        onSubmit={handleSubmit}
      >
        <fieldset className={styles['inputs-container']}>
          <input
            required
            className={styles.input}
            type="text"
            name="search"
            placeholder="Фильм"
            autoComplete="off"
            value={values.search || ''}
            onChange={onChange}
            disabled={disabledSearch}
          />
          <input
            className={submitButtonClass}
            type="submit"
            value="Найти"
            disabled={!isValid || disabledSearch}
          />
        </fieldset>
        <span className={styles.error}>
          {!isValid ? QUERY_VALUE_ERROR : ''}
        </span>
        <FilterCheckbox
          queryValue={queryValue}
          onFilter={onFilter}
          setShortChecked={setShortChecked}
          isChecked={isChecked}
          searchedMovies={searchedMovies}
        />
      </form>
    </>
  )
}
