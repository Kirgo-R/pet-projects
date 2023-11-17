const BASE_URL = process.env.REACT_APP_BASE_URL

class Api {
	constructor(options) {
		this._url = options.url
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	}

	getUserInfo(token) {
		return fetch(`${this._url}/users/me`, {
			headers: {
				authorization: `Bearer ${token}`
			}
		}).then(this._checkResponse)
	}

	getInitialCards(token) {
		return fetch(`${this._url}/cards`, {
			headers: {
				authorization: `Bearer ${token}`
			}
		}).then(this._checkResponse)
	}

	addNewCardImage(cardsData, token) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: cardsData.name,
				link: cardsData.link
			})
		}).then(this._checkResponse)
	}

	editUserInfo(userData, token) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: userData.name,
				about: userData.about
			})
		}).then(this._checkResponse)
	}

	editAvatar(userData, token) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				avatar: userData.avatar
			})
		}).then(this._checkResponse)
	}

	setLike(cardId, token) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${token}`
			}
		}).then(this._checkResponse)
	}

	removeLike(cardId, token) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`
			}
		}).then(this._checkResponse)
	}

	cardDelete(cardId, token) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`
			}
		}).then(this._checkResponse)
	}
}

const api = new Api({
	url: BASE_URL,
	headers: {
		authorization: '1fe292a7-4ebd-42ad-84c2-0ec91fe61e73',
		'Content-Type': 'application/json'
	}
})

export default api
