export const container = document.querySelector('.page')
export const inputName = container.querySelector('.popup__input_type_name')
export const inputAboutMe = container.querySelector(
  '.popup__input_type_about-me'
)
export const profileName = container.querySelector('.profile__title')
export const profileJob = container.querySelector('.profile__subtitle')
export const popupEditProfile = container.querySelector('.popup_edit-profile')
export const editProfileButton = container.querySelector('.profile__edit')
export const addImagePopup = container.querySelector('.popup_add-image')
export const addImageButton = container.querySelector('.profile__add')
export const imagePopup = document.querySelector('.popup_image-show')

export const templateSelector = '.photo-template'
export const avatarEditPopup = container.querySelector('.popup_avatar')
export const confirmPopup = container.querySelector('.popup_confirm')
export const avatarEditButton = container.querySelector('.profile__avatar-edit')
export const popupAvatarItem = container.querySelector('.profile__avatar-item')

export const avatarForm = container.querySelector('.popup__form_type_avatar')
export const addImageForm = container.querySelector(
  '.popup__form_type_new-image'
)
export const editProfileForm = container.querySelector(
  '.popup__form_type_edit-profile'
)

export const cardsContainer = document.querySelector('.photo-grid')
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
