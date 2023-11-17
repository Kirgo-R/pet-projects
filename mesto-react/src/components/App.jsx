import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import api from '../utils/api'
import { useEffect, useState } from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeleteCardPopup from './DeleteCardPopup'

export default function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
	const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
	const [selectedCard, setSelectedCard] = useState({})
	const [isOpenImage, setIsOpenImage] = useState(false)
	const [currentUser, setCurrentUser] = useState({})
	const [cards, setCards] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [deleteCardId, setDeleteCardId] = useState('')
	const [isLoadSubmit, setIsLoadSubmit] = useState('')

	useEffect(() => {
		setIsLoading(true)
		Promise.all([api.getUserInfo(), api.getInitialCards()])
			.then(([userData, cardsData]) => {
				setCurrentUser(userData)
				setCards(cardsData)
				setIsLoading(false)
			})
			.catch((err) => console.error(`Ошибка получения данных ${err}`))
	}, [])

	console.log(cards)

	function closeAllPopup() {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
		setIsOpenImage(false)
		setIsDeleteCardPopupOpen(false)
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true)
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true)
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true)
	}

	function handleDeleteCardPopupClick(cardId) {
		setDeleteCardId(cardId)
		setIsDeleteCardPopupOpen(true)
	}

	function handleCardClick(card) {
		setSelectedCard(card)
		setIsOpenImage(true)
	}

	function handleCardDelete(evt) {
		evt.preventDefault()
		setIsLoadSubmit(true)
		api.cardDelete(deleteCardId)
			.then(() => {
				setCards(cards.filter((c) => c._id !== deleteCardId))
				closeAllPopup()
				setIsLoadSubmit(false)
			})
			.catch((err) => console.error(`Ошибка при удалении ${err}`))
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id)

		if (!isLiked) {
			api.setLike(card._id)
				.then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					)
				})
				.catch((err) => console.error(`Ошибка лайка ${err}`))
		} else {
			api.removeLike(card._id)
				.then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					)
				})
				.catch((err) => console.error(`Ошибка дизлайка ${err}`))
		}
	}

	function handleUpdateUser(userData, reset) {
		setIsLoadSubmit(true)
		api.editUserInfo(userData)
			.then((userUpdated) => {
				setCurrentUser(userUpdated)
				closeAllPopup()
				reset()
				setIsLoadSubmit(false)
			})
			.catch((err) =>
				console.error(
					`Ошибка при обновлении данных о пользователе ${err}`
				)
			)
	}

	function handleUpdateAvatar(userData, reset) {
		setIsLoadSubmit(true)
		api.editAvatar(userData)
			.then((avatarUpdated) => {
				setCurrentUser(avatarUpdated)
				closeAllPopup()
				reset()
				setIsLoadSubmit(false)
			})
			.catch((err) =>
				console.error(`Ошибка при обновлении аватара ${err}`)
			)
	}

	function handleAddPlaceSubmit(cardsData, reset) {
		setIsLoadSubmit(true)
		api.addNewCardImage(cardsData)
			.then((newCard) => {
				setCards([newCard, ...cards])
				closeAllPopup()
				reset()
				setIsLoadSubmit(false)
			})
			.catch((err) =>
				console.error(`Ошибка при добавлении карточки ${err}`)
			)
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='page'>
				<Header />
				<Main
					onEditAvatar={handleEditAvatarClick}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleDeleteCardPopupClick}
					cards={cards}
					isLoading={isLoading}
				/>

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopup}
					onUpdateUser={handleUpdateUser}
					isLoad={isLoadSubmit}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopup}
					onUpdateAvatar={handleUpdateAvatar}
					isLoad={isLoadSubmit}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopup}
					onAddPlace={handleAddPlaceSubmit}
					isLoad={isLoadSubmit}
				/>

				<DeleteCardPopup
					isOpen={isDeleteCardPopupOpen}
					onClose={closeAllPopup}
					onDelete={handleCardDelete}
					isLoad={isLoadSubmit}
				/>

				<Footer />

				<ImagePopup
					card={selectedCard}
					isOpen={isOpenImage}
					onClose={closeAllPopup}
				/>
			</div>
		</CurrentUserContext.Provider>
	)
}
