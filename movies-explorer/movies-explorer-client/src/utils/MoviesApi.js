import { MOVIES_URL } from './constants'

export class MoviesApi {
  constructor(options) {
    this._url = options.url
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getMovies() {
    return fetch(`${this._url}`).then(this._checkResponse)
  }
}

export const moviesApi = new MoviesApi({
  url: MOVIES_URL,
})
