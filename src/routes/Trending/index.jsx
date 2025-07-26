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

export default function Trending() {
  const { isDarkTheme } = useContext(ThemeContext)
  const { isSidebarVisible } = useContext(SidebarContext)
  
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getTrending = async () => {
    setLoading(true)
    setError(false)
    const jwt = Cookies.get('jwt_token')
    const { success, data } = await fetchAPI(
      `https://apis.ccbp.in/videos/trending`,
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
    getTrending()
  }, [])

  return (
    <>
      <Header />
      <div className="route">
        <Sidebar isSidebarVisible={isSidebarVisible} />
        <main
          data-testid="trending"
          className={`trending-main ${isDarkTheme ? 'dark' : 'light'}`}
        >
          <h2 className="trending-banner">Trending</h2>
          {loading && <Loader />}
          {error && <FailureView retry={getTrending} />}
          {!loading && !error && (
            <div className="trending-videos">
              {videos.map(v => (
                 <Link to={`/videos/${v.id}`} key={v.id} className="video-link">
                <div key={v.id} className="trending-video-card">
                  <img
                    src={v.thumbnail_url}
                    alt="video thumbnail"
                    className="trending-thumbnail"
                  />
                  <div className="trending-video-info">
                    <h3 className="trending-video-title">{v.title}</h3>
                    <p className="trending-video-channel">{v.channel.name}</p>
                    <p className="trending-video-meta">
                      {v.view_count} views • {v.published_at}
                    </p>
                  </div>
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
