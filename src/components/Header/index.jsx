import React, { useContext,useState } from "react";
import { useTheme } from '../../context/ThemeContext'
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import Popup from '../../components/Popup'
import { SidebarContext } from '../../context/SidebarContext'
import "./index.css";

export default function Header() {
   const { isDarkTheme, toggleTheme } = useTheme()
  const [showLogout, setShowLogout] = useState(false)
  const { toggleSidebar } = useContext(SidebarContext)
  const openLogoutPopup = () => setShowLogout(true)
  const closeLogoutPopup = () => setShowLogout(false)
  return (
   <>
   <header className={`header ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className="header__left">
        <img
          src={
            isDarkTheme
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          }
          alt="website logo"
          className="header__logo"
        />
      </div>

      <div className="header__right">
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label="toggle theme"
        >
          {isDarkTheme ? <FaSun /> : <FaMoon />}
        </button>

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="header__profile"
        />

        <button className="header__logout" onClick={openLogoutPopup}>Logout</button>

        {/* Hamburger for mobile */}
        <button
          className="icon-button header__hamburger"
          onClick={toggleSidebar}
          aria-label="menu"
        >
          <FaBars />
        </button>
      </div>
    </header>
    {showLogout && <Popup onClose={closeLogoutPopup} />}
   </>
  );
}
