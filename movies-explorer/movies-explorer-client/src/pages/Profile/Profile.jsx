import styles from './Profile.module.css'
import { useContext, useEffect, useState } from 'react'
import {
  EMAIL_USED_ANOTHER_USER_ERROR,
  emailRegex,
  SUCCESS,
} from '../../utils/constants'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { useCheckValidity } from '../../hooks/useCheckValidity'

export function Profile({ onEdit, onQuit, isUsedEmail, setIsUsedEmail }) {
  const [editProfile, setEditProfile] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDisabledButton, setIsDisabledButton] = useState(true)
  const currentUser = useContext(CurrentUserContext)
  const { values, handleChange, setValue, isValid, isInputValid, errors } =
    useCheckValidity()

  const submitClass = isDisabledButton
    ? [styles['submit-button'], styles['submit-button_disable']].join(' ')
    : styles['submit-button']

  useEffect(() => {
    if (
      !isValid ||
      values.name === currentUser.name ||
      values.email === currentUser.email
    ) {
      setIsDisabledButton(true)
    } else {
      setIsDisabledButton(false)
    }
  }, [isValid, values.name, values.email, currentUser.email, currentUser.name])

  useEffect(() => {
    setValue('name', currentUser.name)
    setValue('email', currentUser.email)
  }, [currentUser, setValue])

  useEffect(() => {
    if (!isInputValid['email']) {
      setIsSuccess(false)
      setErrorMessage(errors.email)
    } else if (!isInputValid['name']) {
      setIsSuccess(false)
      setErrorMessage(errors.name)
    } else {
      setErrorMessage('')
    }
  }, [isInputValid, isUsedEmail, errors.email, errors.name])

  function setEdit() {
    setEditProfile(true)
    setIsSuccess(false)
  }

  function handleEdit(e) {
    e.preventDefault()
    setIsSuccess(true)
    onEdit(values.name, values.email)
    !isUsedEmail ? setEditProfile(false) : setEditProfile(true)
  }

  useEffect(() => {
    if (!isUsedEmail) {
      setErrorMessage('')
      setEditProfile(false)
      setIsUsedEmail(false)
    } else {
      setEditProfile(true)
      setIsSuccess(false)
      setErrorMessage(EMAIL_USED_ANOTHER_USER_ERROR)
    }
  }, [isUsedEmail, setIsUsedEmail])

  function handleLogout() {
    onQuit()
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{`Привет, ${currentUser.name}!`}</h2>
      <form className={styles.form} name="profile" noValidate>
        <div className={styles.inputs}>
          <fieldset className={styles['input-container']}>
            <span className={styles.placeholder}>Имя</span>
            <input
              required
              className={styles.input}
              type="text"
              name="name"
              minLength="2"
              maxLength="30"
              placeholder="Имя"
              value={values.name ? values.name : ''}
              onChange={handleChange}
              disabled={!editProfile}
              autoComplete="off"
            />
          </fieldset>
          <fieldset className={styles['input-container']}>
            <span className={styles.placeholder}>E-mail</span>
            <input
              required
              className={styles.input}
              type="text"
              name="email"
              value={values.email ? values.email : ''}
              placeholder="E-mail"
              pattern={emailRegex}
              onChange={handleChange}
              disabled={!editProfile}
              autoComplete="off"
            />
          </fieldset>
        </div>
        <fieldset className={styles['submit-block']}>
          {!isSuccess ? (
            <span className={styles.error}>{errorMessage}</span>
          ) : (
            <span className={styles.success}>{SUCCESS}</span>
          )}
          {editProfile ? (
            <input
              className={submitClass}
              onClick={handleEdit}
              type="submit"
              value="Сохранить"
              disabled={isDisabledButton}
            />
          ) : (
            <>
              <div className={styles.navigation}>
                <button
                  onClick={setEdit}
                  className={styles['edit-button']}
                  type="button"
                >
                  Редактировать
                </button>
                <button
                  className={styles.logout}
                  type="button"
                  onClick={handleLogout}
                >
                  Выйти из аккаунта
                </button>
              </div>
            </>
          )}
        </fieldset>
      </form>
    </div>
  )
}
