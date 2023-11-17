import PopupWithForm from './PopupWithForm'
import useCheckValidity from '../hooks/useCheckValidity'

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoad }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useCheckValidity()

  function resetOnClosePopup() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    onAddPlace(
      {
        name: values.name,
        link: values.link,
      },
      reset
    )
  }

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={resetOnClosePopup}
      isValid={isValid}
      onSubmit={handleSubmit}
      reset={reset}
      isLoad={isLoad}
    >
      <input
        type="text"
        autoComplete="off"
        required
        id="image-name"
        className={`popup__input ${
          isInputValid.name === undefined || isInputValid.name
            ? ''
            : 'popup__input_type_error'
        }`}
        minLength="2"
        maxLength="30"
        name="name"
        placeholder="Название"
        disabled={isLoad}
        value={values.name ? values.name : ''}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_visible" id="image-name-error">
        {errors.name}
      </span>
      <input
        type="url"
        autoComplete="off"
        required
        id="image-url"
        className={`popup__input ${
          isInputValid.link === undefined || isInputValid.link
            ? ''
            : 'popup__input_type_error'
        }`}
        name="link"
        disabled={isLoad}
        placeholder="Ссылка на картинку"
        value={values.link ? values.link : ''}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_visible" id="image-url-error">
        {errors.link}
      </span>
    </PopupWithForm>
  )
}
