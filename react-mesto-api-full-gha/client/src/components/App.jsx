import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext'
import api from '../utils/api'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeleteCardPopup from './DeleteCardPopup'
import { ProtectedRoute } from './ProtectedRoute'
import { Register } from './Register'
import { Login } from './Login'
import * as apiAuth from '../utils/apiAuth'
import { InfoTooltip } from './InfoTooltip'

export default function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
	const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false)
	const [isOpenImage, setIsOpenImage] = useState(false)
	const isOpen =
		isEditProfilePopupOpen ||
		isAddPlacePopupOpen ||
		isEditAvatarPopupOpen ||
		isDeleteCardPopupOpen ||
		isInfoTooltipPopup ||
		isOpenImage

	const [selectedCard, setSelectedCard] = useState({})
	const [currentUser, setCurrentUser] = useState({})
	const [cards, setCards] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [deleteCardId, setDeleteCardId] = useState('')
	const [isAvatarUpdating, setIsAvatarUpdating] = useState(false)
	const [isPlaceLoading, setIsPlaceLoading] = useState(false)
	const [isUserInfoUpdating, setIsUserInfoUpdating] = useState(false)
	const [isCardDeleted, setIsCardDeleted] = useState(false)
	const [loggedIn, setLoggedIn] = useState(false)
	const [email, setEmail] = useState('')
	const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		setIsLoading(true)
		if (loggedIn) {
			Promise.all([
				api.getUserInfo(localStorage.jwt),
				api.getInitialCards(localStorage.jwt)
			])
				.then(([userData, cardsData]) => {
					setCurrentUser(userData)
					setCards(cardsData)
				})
				.catch((err) => console.error(`Ошибка получения данных ${err}`))
				.finally(() => setIsLoading(false))
		}
	}, [loggedIn])

	const closeAllPopup = useCallback(() => {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
		setIsOpenImage(false)
		setIsDeleteCardPopupOpen(false)
		setIsInfoTooltipPopup(false)
	}, [])

	useEffect(() => {
		const closePopupsByEsc = (e) => {
			if (e.key === 'Escape') {
				closeAllPopup()
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', closePopupsByEsc)
			return () => {
				document.removeEventListener('keydown', closePopupsByEsc)
			}
		}
	}, [isOpen, closeAllPopup])

	const handleEditProfileClick = useCallback(() => {
		setIsEditProfilePopupOpen(true)
	}, [])

	const handleEditAvatarClick = useCallback(() => {
		setIsEditAvatarPopupOpen(true)
	}, [])

	const handleAddPlaceClick = useCallback(() => {
		setIsAddPlacePopupOpen(true)
	}, [])

	const handleDeleteCardPopupClick = useCallback((cardId) => {
		setDeleteCardId(cardId)
		setIsDeleteCardPopupOpen(true)
	}, [])

	const handleCardClick = useCallback((card) => {
		setSelectedCard(card)
		setIsOpenImage(true)
	}, [])

	const handleCardDelete = useCallback(() => {
		setIsCardDeleted(true)
		api.cardDelete(deleteCardId, localStorage.jwt)
			.then(() => {
				setCards((cards) => cards.filter((c) => c._id !== deleteCardId))
				closeAllPopup()
			})
			.catch((err) => console.error(`Ошибка при удалении ${err}`))
			.finally(() => setIsCardDeleted(false))
	}, [deleteCardId, closeAllPopup])

	const handleCardLike = useCallback(
		(card) => {
			const isLiked = card.likes.some((i) => i === currentUser._id)

			if (!isLiked) {
				api.setLike(card._id, localStorage.jwt)
					.then((res) => {
						setCards((cards) =>
							cards.map((item) =>
								item._id === card._id ? res : item
							)
						)
					})
					.catch((err) =>
						console.error(`Ошибка удаления лайка ${err}`)
					)
			} else {
				api.removeLike(card._id, localStorage.jwt)
					.then((res) => {
						setCards((cards) =>
							cards.map((item) =>
								item._id === card._id ? res : item
							)
						)
					})
					.catch((err) => console.error(`Ошибка лайка ${err}`))
			}
		},
		[currentUser._id]
	)

	const handleUpdateUser = useCallback(
		(userData, reset) => {
			setIsUserInfoUpdating(true)
			api.editUserInfo(userData, localStorage.jwt)
				.then((userUpdated) => {
					setCurrentUser(userUpdated)
					closeAllPopup()
					reset()
				})
				.catch((err) =>
					console.error(
						`Ошибка при обновлении данных о пользователе ${err}`
					)
				)
				.finally(() => setIsUserInfoUpdating(false))
		},
		[closeAllPopup]
	)

	const handleUpdateAvatar = useCallback(
		(userData, reset) => {
			setIsAvatarUpdating(true)
			api.editAvatar(userData, localStorage.jwt)
				.then((avatarUpdated) => {
					setCurrentUser(avatarUpdated)
					closeAllPopup()
					reset()
				})
				.catch((err) =>
					console.error(`Ошибка при обновлении аватара ${err}`)
				)
				.finally(() => setIsAvatarUpdating(false))
		},
		[closeAllPopup]
	)

	const handleAddPlaceSubmit = useCallback(
		(cardsData, reset) => {
			setIsPlaceLoading(true)
			api.addNewCardImage(cardsData, localStorage.jwt)
				.then((newCard) => {
					setCards([newCard, ...cards])
					closeAllPopup()
					reset()
				})
				.catch((err) =>
					console.error(`Ошибка при добавлении карточки ${err}`)
				)
				.finally(() => setIsPlaceLoading(false))
		},
		[cards, closeAllPopup]
	)

	useEffect(() => {
		if (localStorage.jwt) {
			apiAuth
				.checkToken(localStorage.jwt)
				.then((res) => {
					setEmail(res.email)
					setLoggedIn(true)
					navigate('/', { replace: true })

				})
				.catch((err) =>
					console.log(`Ошибка авторизации при входе ${err}`)
				)
		} else {
			setLoggedIn(false)
		}
	}, [navigate])

	function handleRegister(email, password) {
		apiAuth
			.register(email, password)
			.then(() => {
					setIsInfoTooltipSuccess(true)
					navigate('/signin')
			})
			.catch((err) => {
				setIsInfoTooltipSuccess(false)
				console.log(`Ошибка при регистрации ${err}`)
			})
			.finally(() => setIsInfoTooltipPopup(true))
	}

	function handleLogin(email, password) {
		apiAuth
			.login(email, password)
			.then((res) => {
					localStorage.setItem('jwt', res.token)
					navigate('/')
					setLoggedIn(true)
					setEmail(email)
			})
			.catch((err) => {
				setIsInfoTooltipSuccess(false)
				setIsInfoTooltipPopup(true)
				console.log(`Ошибка авторизации ${err}`)
			})
	}

	function logOut() {
		setLoggedIn(false)
		localStorage.removeItem('jwt')
		setEmail('')
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header
					loggedIn={loggedIn}
					logOut={logOut}
					accountName={email}
				/>
				<Routes>
					<Route
						path="/signup"
						element={<Register onRegister={handleRegister} />}
					/>
					<Route
						path="/signin"
						element={<Login onLogin={handleLogin} />}
					/>
					<Route
						element={<Navigate to={loggedIn ? '/' : '/signin'} />}
					/>
					<Route
						path="/"
						element={
							<ProtectedRoute
								element={Main}
								loggedIn={loggedIn}
								accountName={email}
								onEditAvatar={handleEditAvatarClick}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
								onCardDelete={handleDeleteCardPopupClick}
								cards={cards}
								isLoading={isLoading}
							/>
						}
					/>
				</Routes>
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopup}
					onUpdateUser={handleUpdateUser}
					isLoad={isUserInfoUpdating}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopup}
					onUpdateAvatar={handleUpdateAvatar}
					isLoad={isAvatarUpdating}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopup}
					onAddPlace={handleAddPlaceSubmit}
					isLoad={isPlaceLoading}
				/>

				<DeleteCardPopup
					isOpen={isDeleteCardPopupOpen}
					onClose={closeAllPopup}
					onDelete={handleCardDelete}
					isLoad={isCardDeleted}
				/>

				<ImagePopup
					card={selectedCard}
					isOpen={isOpenImage}
					onClose={closeAllPopup}
				/>
				<InfoTooltip
					onClose={closeAllPopup}
					isOpen={isInfoTooltipPopup}
					isSuccess={isInfoTooltipSuccess}
					text={
						isInfoTooltipSuccess
							? 'Вы успешно зарегистрировались!'
							: 'Что-то пошло не так! Попробуйте ещё раз.'
					}
				/>

				{loggedIn && <Footer />}
			</div>
		</CurrentUserContext.Provider>
	)
}
