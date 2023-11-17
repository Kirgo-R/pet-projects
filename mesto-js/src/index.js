import './pages/index.css'
import Card from './scripts/components/Card.js'
import FormValidator from './scripts/components/FormValidator.js'
import Section from './scripts/components/Section.js'
import PopupWithForm from './scripts/components/PopupWithForm.js'
import PopupWithImage from './scripts/components/PopupWithImage.js'
import UserInfo from './scripts/components/UserInfo.js'
import PopupConfirm from './scripts/components/PopupConfirm.js'
import Api from './scripts/components/Api'
import {
  inputName,
  inputAboutMe,
  profileName,
  profileJob,
  popupEditProfile,
  editProfileButton,
  addImagePopup,
  addImageButton,
  imagePopup,
  editProfileForm,
  addImageForm,
  templateSelector,
  config,
  avatarEditPopup,
  confirmPopup,
  avatarEditButton,
  popupAvatarItem,
  avatarForm,
  cardsContainer,
} from './scripts/utils/constants.js'

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68/',
  headers: {
    authorization: '1fe292a7-4ebd-42ad-84c2-0ec91fe61e73',
    'Content-type': 'application/json',
  },
})

let myId

const popupAddImage = new PopupWithForm(addImagePopup, (inputValues) => {
  api
    .addNewCardImage(inputValues)
    .then((cardsData) => {
      cardList.addItem(createNewCard(cardsData))
      popupAddImage.close()
    })
    .catch((error) =>
      console.error(`Ошибка при добавлении изображения ${error}`)
    )
    .finally(() => {
      popupAddImage.setTextLoading()
    })
})

const popupEditAvatar = new PopupWithForm(avatarEditPopup, (inputValues) => {
  api
    .editAvatar(inputValues)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      })
      popupEditAvatar.close()
    })
    .catch((error) =>
      console.error(`Ошибка при изменении фото пользователя ${error}`)
    )
    .finally(() => {
      popupEditAvatar.setTextLoading()
    })
})

const popupUserInfo = new PopupWithForm(popupEditProfile, (inputValues) => {
  api
    .editUserInfo(inputValues)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      })
      popupUserInfo.close()
    })
    .catch((error) =>
      console.error(`Ошибка редактирования информации о профиле ${error}`)
    )
    .finally(() => {
      popupUserInfo.setTextLoading()
    })
})

const popupConfirm = new PopupConfirm(confirmPopup, ({ card, cardId }) => {
  api
    .cardDelete(cardId)
    .then(() => {
      card.deleteCard()
      popupConfirm.close()
    })
    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
    .finally(() => {
      popupConfirm.setTextLoading()
    })
})

const openImage = new PopupWithImage(imagePopup)

const userInfo = new UserInfo(profileName, profileJob, popupAvatarItem)

const profileValidator = new FormValidator(config, editProfileForm)

const cardValidator = new FormValidator(config, addImageForm)

const avatarValidator = new FormValidator(config, avatarForm)

function createNewCard(cardData) {
  const card = new Card(
    cardData,
    templateSelector,
    () => {
      openImage.open(cardData)
    },
    popupConfirm.open,

    (like, cardId) => {
      if (like.classList.contains('photo-grid__like-button_active')) {
        api
          .removeLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes)
          })
          .catch((error) => console.error(`Ошибка удаления лайка ${error}`))
      } else {
        api
          .setLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes)
          })
          .catch((error) => console.error(`Ошибка добавления лайка ${error}`))
      }
    },
    myId
  )

  return card.createCard()
}

const cardList = new Section((cardData) => {
  cardList.addItemAppend(createNewCard(cardData))
}, cardsContainer)

editProfileButton.addEventListener('click', () => {
  popupUserInfo.open()
  profileValidator.resetValidation()

  inputName.value = userInfo.getUserInfo().name
  inputAboutMe.value = userInfo.getUserInfo().aboutMe
})

addImageButton.addEventListener('click', () => {
  popupAddImage.open()
  cardValidator.resetValidation()
  cardValidator.disableButton()
})

avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open()
  avatarValidator.resetValidation()
  avatarValidator.disableButton()
})

profileValidator.enableValidation()
cardValidator.enableValidation()
avatarValidator.enableValidation()
openImage.setEventListener()
popupUserInfo.setEventListener()
popupAddImage.setEventListener()
popupEditAvatar.setEventListener()
popupConfirm.setEventListener()

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    })

    myId = userData._id

    cardList.renderItems(cardsData)
  })
  .catch((error) => console.error(`Ошибка при загрузке данных ${error}`))
