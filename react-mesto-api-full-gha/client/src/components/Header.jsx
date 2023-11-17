import headerLogo from '../images/header-logo.svg'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Header({ loggedIn, logOut, accountName }) {
	const location = useLocation()
	const linkText = location.pathname === '/signin' ? 'Регистрация' : 'Войти'
	const loggedInLinkText = loggedIn ? 'Выйти' : linkText

	const [isBurgerActive, setIsBurgerActive] = useState(false)

	const handleOpenBurgerMenu = () => {
		setIsBurgerActive(!isBurgerActive)
	}

	const handleLogOut = () => {
		logOut()
		setIsBurgerActive(false)
	}

	return (
		<header className="header">
			<div className="header__container">
				<div className="header__mobile-menu">
					<img
						src={headerLogo}
						alt="логотип сайта"
						className="header__logo"
					/>
					{loggedIn && (
						<div
							className={`burger ${
								isBurgerActive ? 'burger_active' : ''
							}`}
							onClick={handleOpenBurgerMenu}
						>
							<span />
						</div>
					)}
				</div>
				{loggedIn ? (
					<div
						className={
							!isBurgerActive
								? 'header__links'
								: 'header__links header__links_open'
						}
					>
						<h2 className="header__account-name">{accountName}</h2>
						<button
							type="button"
							className="button header__button header__link"
							onClick={handleLogOut}
						>
							{loggedInLinkText}
						</button>
					</div>
				) : (
					''
				)}
			</div>

			<Routes>
				<Route
					path="/signup"
					element={
						<Link to="/signin" className="header__link">
							Войти
						</Link>
					}
				/>
				<Route
					path="/signin"
					element={
						<Link to="/signup" className="header__link">
							Регистрация
						</Link>
					}
				/>
			</Routes>
		</header>
	)
}
