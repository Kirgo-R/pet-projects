import PopupWithForm from './PopupWithForm'
import React, { useEffect, useRef } from 'react'
import useCheckValidity from '../hooks/useCheckValidity'

export default function EditAvatarPopup({
	isOpen,
	onClose,
	onUpdateAvatar,
	isLoad
}) {
	const avatarRef = useRef()
	const { values, errors, isValid, isInputValid, handleChange, reset } =
		useCheckValidity()

	function resetOnClosePopup() {
		onClose()
		reset()
	}

	function handleSubmit(evt) {
		evt.preventDefault()

		onUpdateAvatar(
			{
				avatar: avatarRef.current.value
			},
			reset
		)
	}

	useEffect(() => {
		avatarRef.current.value = ''
	}, [isOpen])

	return (
		<PopupWithForm
			name="avatar"
			title="Обновить аватар"
			buttonName="Сохранить"
			isOpen={isOpen}
			onClose={resetOnClosePopup}
			onSubmit={handleSubmit}
			isValid={isValid}
			isLoad={isLoad}
		>
			<input
				type="url"
				autoComplete="off"
				required
				id="avatar"
				className={`popup__input ${
					isInputValid.avatar === undefined || isInputValid.avatar
						? ''
						: 'popup__input_type_error'
				}`}
				name="avatar"
				placeholder="Ссылка на новое фото"
				disabled={isLoad}
				onChange={handleChange}
				value={values.avatar ? values.avatar : ''}
				ref={avatarRef}
			/>
			<span className="popup__error popup__error_visible">
				{errors.avatar}
			</span>
		</PopupWithForm>
	)
}
