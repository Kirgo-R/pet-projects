import React from 'react'
import Card from './Card'
import Spinner from './Spinner'
import { CurrentUserContext } from '../context/CurrentUserContext'

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  isLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <img
              src={currentUser.avatar}
              alt="аватар"
              className="profile__avatar-item"
            />
            <button
              type="button"
              aria-label="Сменить фото профиля"
              className="profile__avatar-edit button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              className="profile__edit button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          className="profile__add button"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        ></button>
      </section>
      <div className="photo-grid">
        {isLoading ? (
          <Spinner />
        ) : (
          cards.map((data) => (
            <Card
              card={data}
              onCardClick={onCardClick}
              key={data._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        )}
      </div>
    </main>
  )
}
