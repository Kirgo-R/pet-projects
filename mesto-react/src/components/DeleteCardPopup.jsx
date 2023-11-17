import PopupWithForm from './PopupWithForm'

export default function DeleteCardPopup({ isOpen, onClose, onDelete, isLoad }) {
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonName="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onDelete}
      isLoad={isLoad}
    />
  )
}
