import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { SidebarContext } from '../../context/SidebarContext'
import Loader from '../../components/Loader'
import FailureView from '../../components/FailureView'
import { ThemeContext } from '../../context/ThemeContext'
import { fetchAPI } from '../../utils/api'
import './index.css'

export default function Gaming() {
  const { isDarkTheme } = useContext(ThemeContext)
  const { isSidebarVisible } = useContext(SidebarContext)

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getGaming = async () => {
    
    setLoading(true)
    setError(false)
    const jwt = Cookies.get('jwt_token')
    const { success, data } = await fetchAPI(
      `https://apis.ccbp.in/videos/gaming`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    if (success) {
      setVideos(data.videos)
    } else {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    getGaming()
  }, [])

  return (
    <>
      <Header />
      <div className="route">
        <Sidebar isSidebarVisible={isSidebarVisible} />
        <main
          data-testid="gaming"
          className={`gaming-main ${isDarkTheme ? 'dark' : 'light'}`}
        >
          <div className="gaming-banner">
            <h2>Gaming</h2>
          </div>
          {loading && <Loader />}
          {error && <FailureView retry={getGaming} />}
          {!loading && !error && (
            <div className="gaming-videos">
              {videos.map(v => (
                 <Link to={`/videos/${v.id}`} key={v.id} className="video-link">
                <div key={v.id} className="gaming-card">
                  <img
                    src={v.thumbnail_url}
                    alt="video thumbnail"
                    className="gaming-thumbnail"
                  />
                  <h3 className="gaming-title">{v.title}</h3>
                  <p className="gaming-meta">{v.view_count} Watching Worldwide</p>
                </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
