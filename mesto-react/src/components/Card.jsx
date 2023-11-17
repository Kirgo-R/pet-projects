import React from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext'

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some((i) => i._id === currentUser._id)
  const cardLikeButtonClassName = `button photo-grid__like-button ${
    isLiked && 'photo-grid__like-button_active'
  }`

  function handleLikeClick() {
    onCardLike(card)
  }

  return (
    <article className="photo-grid__item">
      <img
        src={card.link}
        alt={card.name}
        className="photo-grid__image"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
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
          <span className="photo-grid__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
