import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup)
    this._zoomImage = this._popup.querySelector('.image-show__item')
    this._imageCaption = this._popup.querySelector('.image-show__caption')
  }

  open(image) {
    this._zoomImage.src = image.link
    this._zoomImage.alt = image.name
    this._imageCaption.textContent = image.name
    super.open()
  }
}
