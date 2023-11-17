import { SERVER_URL, BEATFILM_URL } from './constants'

class MainApi {
  constructor(options) {
    this._url = options.url
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status)
  }

  _request(path, options) {
    return fetch(`${this._url}${path}`, options).then(this._checkResponse)
  }

  register(username, email, password) {
    return this._request('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    })
  }

  login(email, password) {
    return this._request('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
  }

  getUserInfo(token) {
    return this._request('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  editUserInfo(username, email, token) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: username,
        email: email,
      }),
    })
  }

  getSavedMovie(token) {
    return this._request('/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  saveMovie(data, token) {
    return this._request('/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: `${BEATFILM_URL}${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `${BEATFILM_URL}${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    })
  }

  removeMovie(cardId, token) {
    return this._request(`/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

export const mainApi = new MainApi({
  url: SERVER_URL,
})
