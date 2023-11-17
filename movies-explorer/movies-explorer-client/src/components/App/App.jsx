import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './App.module.css'

import { Layout } from '../Layout/Layout'
import { Main } from '../../pages/Main/Main'
import { Movies } from '../../pages/Movies/Movies'
import { Profile } from '../../pages/Profile/Profile'
import { Login } from '../../pages/Login/Login'
import { Register } from '../../pages/Register/Register'
import { SavedMovies } from '../../pages/SavedMovies/SavedMovies'
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage'
import { mainApi } from '../../utils/MainApi'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import { Preloader } from '../Preloader/Preloader'

export function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [savedCards, setSavedCards] = useState([])
  const [isOpenSavedMovies, setIsOpenSavedMovies] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isUsedEmail, setIsUsedEmail] = useState(false)
  const [checkToken, setIsCheckToken] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  //регистрирует пользователя
  function handleRegister(username, email, password) {
    mainApi
      .register(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          handleLogin(email, password)
        }
      })
      .catch((err) => console.error(`Ошибка регистрации ${err}`))
  }

  //авторизует пользователя
  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/movies')
      })
      .catch((err) => console.error(`Ошибка авторизации ${err}`))
  }

  //загружает информаци о текущем пользователе; проверяет наличие токена, если сохранен, то залогинивает
  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([
        mainApi.getUserInfo(localStorage.jwt),
        mainApi.getSavedMovie(localStorage.jwt),
      ])
        .then(([dataUser, dataMovies]) => {
          setSavedCards(dataMovies)
          setCurrentUser(dataUser)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((err) => {
          console.log(`Ошибка загрузки данных ${err}`)
          localStorage.clear()
          setIsCheckToken(false)
          setLoggedIn(false)
        })
    } else {
      setLoggedIn(false)
      localStorage.clear()
      setIsCheckToken(false)
    }
  }, [loggedIn])

  // редактирует информацию о пользователе
  function handleEditUserInfo(username, email) {
    mainApi
      .editUserInfo(username, email, localStorage.jwt)
      .then((res) => {
        setIsUsedEmail(false)
        setCurrentUser(res)
      })
      .catch((err) => {
        setIsUsedEmail(true)
        console.error(`Ошибка при изменении информации ${err}`)
      })
  }

  // выходит из аккаунта
  function handleQuit() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  // сохраняет фильмы
  function handleSaveCard(data) {
    mainApi
      .saveMovie(data, localStorage.jwt)
      .then((data) => {
        setSavedCards([data, ...savedCards])
      })
      .catch((err) => console.error(`Ошибка при сохранении фильма ${err}`))
  }

  // удаляет фильмы
  function handleRemoveCard(cardId) {
    mainApi.removeMovie(cardId, localStorage.jwt).then(() => {
      const index = savedCards.findIndex((card) => card._id === cardId)
      setSavedCards([
        ...savedCards.slice(0, index),
        ...savedCards.slice(index + 1),
      ])
    })
  }

  // поставить/снять лайк (сохранить/удалить)
  function toggleLikeButton(data) {
    const isSavedCard = savedCards.some(
      (element) => data.id === element.movieId,
    )
    const clickedCard = savedCards.find((movie) => {
      return movie.movieId === data.id
    })
    if (isSavedCard) {
      handleRemoveCard(clickedCard._id)
    } else {
      handleSaveCard(data)
    }
  }

  // следит какая страница открыта - фильмы или сохраненные фильмы, для стилизации кнопки сохранения фильма
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsOpenSavedMovies(true)
    } else {
      setIsOpenSavedMovies(false)
    }
  }, [location])

  return (
    <>
      {checkToken ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <div className={styles.app}>
            <Routes>
              <Route
                element={
                  <Layout loggedIn={loggedIn} handleLogin={handleLogin} />
                }
                path="/"
              >
                <Route index element={<Main />} />
                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute
                      element={Movies}
                      loggedIn={loggedIn}
                      likeToggle={toggleLikeButton}
                      onRemove={handleRemoveCard}
                      savedCards={savedCards}
                    />
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    <ProtectedRoute
                      element={SavedMovies}
                      loggedIn={loggedIn}
                      onRemove={handleRemoveCard}
                      cards={savedCards}
                      isOpenSavedMovies={isOpenSavedMovies}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={Profile}
                      loggedIn={loggedIn}
                      onEdit={handleEditUserInfo}
                      onQuit={handleQuit}
                      isUsedEmail={isUsedEmail}
                      setIsUsedEmail={setIsUsedEmail}
                    />
                  }
                />
              </Route>
              <Route
                path="/signin"
                element={
                  !loggedIn ? (
                    <Login onLogin={handleLogin} />
                  ) : (
                    <Navigate to="/movies" replace />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  !loggedIn ? (
                    <Register onRegister={handleRegister} />
                  ) : (
                    <Navigate to="/movies" replace />
                  )
                }
              />
              <Route path="*" element={<NotFoundPage goBack={goBack} />} />
            </Routes>
          </div>
        </CurrentUserContext.Provider>
      )}
    </>
  )
}
