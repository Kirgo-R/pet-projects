import React from 'react'

export const InfoTooltip = ({ onClose, isOpen, isSuccess, text }) => {
	return (
		<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container popup__container_info-tooltip">
				<button
					className="button popup__close-button"
					type="button"
					aria-label="Закрыть"
					onClick={onClose}
				></button>
				<div
					className={`popup__success ${
						isSuccess
							? 'popup__success_true'
							: 'popup__success_false'
					}`}
				/>
				<h2 className="popup__success-title">{text}</h2>
			</div>
		</div>
	)
}
