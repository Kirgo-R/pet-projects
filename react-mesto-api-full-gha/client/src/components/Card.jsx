import React, { useContext } from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext'

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	const currentUser = useContext(CurrentUserContext)
	const isOwn = card.owner === currentUser._id
	const isLiked = card.likes.some((i) => i === currentUser._id)
	const cardLikeButtonClassName = `button photo-grid__like-button ${
		isLiked ? 'photo-grid__like-button_active' : ''
	}`

	const handleLikeClick = () => {
		onCardLike(card)
	}

	const handleCardClick = () => {
		onCardClick(card)
	}

	return (
		<article className="photo-grid__item">
			<img
				src={card.link}
				alt={card.name}
				className="photo-grid__image"
				onClick={handleCardClick}
			/>
			{isOwn && (
				<button
					className="photo-grid__delete-button button"
					type="button"
					aria-label="Удалить"
					onClick={() => onCardDelete(card._id)}
				/>
			)}
			<div className="photo-grid__caption">
				<h2 className="photo-grid__title text-overflow">{card.name}</h2>
				<div className="photo-grid__like">
					<button
						className={cardLikeButtonClassName}
						type="button"
						aria-label="Лайк ♡"
						onClick={handleLikeClick}
					/>
					<span className="photo-grid__like-count">
						{card.likes.length}
					</span>
				</div>
			</div>
		</article>
	)
}
