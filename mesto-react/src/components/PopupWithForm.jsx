import React from 'react'

export default function PopupWithForm({
  name,
  title,
  buttonName,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
  isLoad,
  reset,
}) {
  React.useEffect(() => {
    if (!isOpen) return

    function handleESC(e) {
      if (e.key === 'Escape') {
        onClose()
        reset()
      }
    }

    document.addEventListener('keydown', handleESC)

    return () => document.removeEventListener('keydown', handleESC)
  }, [isOpen, onClose, reset])

  return (
    <div
      className={`popup popup_${name} ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`button popup__button submit-button ${
              !isValid && 'popup__button_disabled'
            }`}
            disabled={!isValid || isLoad}
          >
            {isLoad ? (
              <div className="popup__button-loading"></div>
            ) : (
              buttonName
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
