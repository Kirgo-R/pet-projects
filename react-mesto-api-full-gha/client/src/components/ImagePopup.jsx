import React from 'react'

export default function ImagePopup({ card, isOpen, onClose }) {
	return (
		<div
			className={`popup popup_image-show ${isOpen ? 'popup_opened' : ''}`}
			onClick={onClose}
		>
			<figure className="image-show" onClick={(e) => e.stopPropagation()}>
				<button
					onClick={onClose}
					className="button popup__close-button popup__close-button_image"
					type="button"
					aria-label="Закрыть"
				></button>
				<img
					src={card.link}
					alt={card.name}
					className="image-show__item"
				/>
				<figcaption className="image-show__caption">
					{card.name}
				</figcaption>
			</figure>
		</div>
	)
}
