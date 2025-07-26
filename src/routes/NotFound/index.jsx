import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { SidebarContext } from '../../context/SidebarContext'
import './index.css'

export default function NotFound() {
  const { isDarkTheme } = useContext(ThemeContext)
  const { isSidebarVisible } = useContext(SidebarContext)
  
  return (
    <>
      <Header />
      <div className="route">
        <Sidebar isSidebarVisible={isSidebarVisible} />
        <main
          style={{ backgroundColor: isDarkTheme ? '#0f0f0f' : '#f9f9f9' }}
        >
          <img
            src={
              isDarkTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            }
            alt="not found"
          />
          <h3>Page Not Found</h3>
        </main>
      </div>
    </>
  )
}
