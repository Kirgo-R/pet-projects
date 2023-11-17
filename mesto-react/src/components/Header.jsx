import headerLogo from '../images/header-logo.svg'

export default function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип сайта" className="header__logo" />
    </header>
  )
}
