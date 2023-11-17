import PopupWithForm from './PopupWithForm'

export default function DeleteCardPopup({ isOpen, onClose, onDelete, isLoad }) {
	const onConfirm = (e) => {
		e.preventDefault()
		onDelete()
	}

	return (
		<PopupWithForm
			name="confirm"
			title="Вы уверены?"
			buttonName="Да"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onConfirm}
			isLoad={isLoad}
		/>
	)
}
