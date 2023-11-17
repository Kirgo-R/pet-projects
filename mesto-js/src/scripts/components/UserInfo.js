export default class UserInfo {
  constructor(userName, userJob, userAvatar) {
    this._userName = userName
    this._userJob = userJob
    this._userAvatar = userAvatar
  }

  getUserInfo() {
    const inputsUserInfo = {
      name: this._userName.textContent,
      aboutMe: this._userJob.textContent,
    }
    return inputsUserInfo
  }

  setUserInfo(data) {
    this._userName.textContent = data.name
    this._userJob.textContent = data.job
    this._userAvatar.src = data.avatar
  }
}
