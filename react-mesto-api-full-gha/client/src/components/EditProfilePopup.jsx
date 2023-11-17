import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../context/CurrentUserContext'
import React, { useEffect } from 'react'
import useCheckValidity from '../hooks/useCheckValidity'

export default function EditProfilePopup({
	isOpen,
	onClose,
	onUpdateUser,
	isLoad
}) {
	const currentUser = React.useContext(CurrentUserContext)
	const {
		values,
		errors,
		isValid,
		isInputValid,
		handleChange,
		reset,
		setValue
	} = useCheckValidity()

	useEffect(() => {
		if (isOpen) {
			setValue('name', currentUser.name)
			setValue('job', currentUser.about)
		}
	}, [isOpen, currentUser, setValue])

	function resetOnClosePopup() {
		onClose()
		reset({ name: currentUser.name, job: currentUser.about })
	}

	function handleSubmit(evt) {
		evt.preventDefault()
		onUpdateUser({ name: values.name, about: values.job }, reset)
	}

	return (
		<PopupWithForm
			name="edit-profile"
			title="Редактировать профиль"
			buttonName="Сохранить"
			isOpen={isOpen}
			onClose={resetOnClosePopup}
			isValid={isValid}
			onSubmit={handleSubmit}
			isLoad={isLoad}
			reset={reset}
		>
			<input
				type="text"
				autoComplete="off"
				required
				id="profile-name"
				className={`popup__input ${
					isInputValid.name === undefined || isInputValid.name
						? ''
						: 'popup__input_type_error'
				}`}
				minLength="2"
				maxLength="40"
				name="name"
				placeholder="Ваше имя"
				disabled={isLoad}
				value={values.name ? values.name : ''}
				onChange={handleChange}
			/>
			<span className="popup__error popup__error_visible">
				{errors.name}
			</span>
			<input
				type="text"
				autoComplete="off"
				required
				id="profile-about-me"
				className={`popup__input ${
					isInputValid.job === undefined || isInputValid.job
						? ''
						: 'popup__input_type_error'
				}`}
				minLength="2"
				maxLength="200"
				name="job"
				placeholder="О себе"
				disabled={isLoad}
				value={values.job ? values.job : ''}
				onChange={handleChange}
			/>
			<span className="popup__error popup__error_visible">
				{errors.job}
			</span>
		</PopupWithForm>
	)
}
