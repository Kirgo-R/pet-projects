export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteButtonClick,
    like,
    myId
  ) {
    this._data = data
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleDeleteButtonClick = handleDeleteButtonClick
    this._like = like
    this._myId = myId

    this._cardId = data._id
    this._ownerID = data.owner._id
    this._likes = data.likes
    this._likesLength = data.likes.length

    this._cardElement = this._getCardElement()
    this._deleteButton = this._cardElement.querySelector(
      '.photo-grid__delete-button'
    )
    this._likeButton = this._cardElement.querySelector(
      '.photo-grid__like-button'
    )
    this._image = this._cardElement.querySelector('.photo-grid__image')
    this._title = this._cardElement.querySelector('.photo-grid__title')
    this._counter = this._cardElement.querySelector('.photo-grid__like-count')
  }

  _getCardElement() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.photo-grid__item')
      .cloneNode(true)
  }

  _setEventListener() {
    this._likeButton.addEventListener('click', () => {
      this._like(this._likeButton, this._cardId)
    })

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick({ card: this, cardId: this._cardId })
    })

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data)
    })
  }

  _changeStateTrash() {
    if (this._myId === this._ownerID) {
      this._deleteButton.style.display = 'block'
    } else {
      this._deleteButton.style.display = 'none'
    }
  }

  _checkLikeStatus() {
    this._likes.forEach((like) => {
      if (like._myId === this._id) {
        this._likeButton.classList.add('photo-grid__like-button_active')
        return
      }
    })
    this._counter.textContent = this._likesLength
  }

  toggleLike(likes) {
    this._likeButton.classList.toggle('photo-grid__like-button_active')
    this._counter.textContent = likes.length
  }

  deleteCard() {
    this._cardElement.remove()
    this._cardElement = null
  }

  createCard() {
    this._image.src = this._data.link
    this._image.alt = this._data.name
    this._title.textContent = this._data.name
    this._checkLikeStatus()
    this._setEventListener()
    this._changeStateTrash()
    return this._cardElement
  }
}
