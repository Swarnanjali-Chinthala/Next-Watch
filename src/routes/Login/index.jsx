import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = ({ theme = 'light' }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, { expires: 30 })
      navigate('/')
    } else {
      setError(data.error_msg)
    }
  }

  const logoUrl =
    theme === 'dark'
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <img src={logoUrl} alt="website logo" className="login-logo" />
        <h1 className="login-title">Sign in to NxtWatch</h1>

        <label htmlFor="username" className="login-label">Username</label>
        <input
          id="username"
          className="login-input"
          placeholder="Enter rahul"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input
          id="password"
          className="login-input"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter rahul@2021"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <div className="login-options">
          <label htmlFor="showPassword" className="checkbox-label">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={e => setShowPassword(e.target.checked)}
            />
            Show Password
          </label>
        </div>

        <button type="submit" className="login-button">Login</button>

        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  )
}

export default Login
