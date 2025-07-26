// src/components/LogoutPopup.jsx

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ThemeContext } from '../../context/ThemeContext'
import './index.css'

export default function LogoutPopup({ onClose }) {
  const navigate = useNavigate()
  const { isDarkTheme } = useContext(ThemeContext)

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <div className="popup-overlay">
      <div className={`popup ${isDarkTheme ? 'dark' : 'light'}`}>
        <h2>Are you sure you want to logout?</h2>
        <div className="popup-buttons">
          <button className="popup-btn cancel" onClick={onClose}>
            No
          </button>
          <button className="popup-btn confirm" onClick={handleLogout}>
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
