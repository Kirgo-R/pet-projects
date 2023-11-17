import styles from './FilterCheckbox.module.css'
import { useEffect, useState } from 'react'

export function FilterCheckbox({
  setShortChecked,
  queryValue,
  isChecked,
  searchedMovies,
}) {
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (queryValue === '' || (searchedMovies.length === 0 && !isChecked)) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [queryValue, searchedMovies.length, isChecked])

  const checkboxClass = !isChecked
    ? [styles['pseudo-item'], styles['pseudo-item_disabled']].join(' ')
    : styles['pseudo-item']

  return (
    <fieldset className={styles.checkbox}>
      <input
        className={styles['checkbox__item']}
        name="checkbox"
        type="checkbox"
        onChange={() => setShortChecked()}
        disabled={isDisabled}
      />
      <span className={checkboxClass} />
      <label className={styles['checkbox__label']}>Короткометражки</label>
    </fieldset>
  )
}
