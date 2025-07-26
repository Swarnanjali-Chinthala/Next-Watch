import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Loader from '../../components/Loader'
import FailureView from '../../components/FailureView'
import { ThemeContext } from '../../context/ThemeContext'
import { SidebarContext } from '../../context/SidebarContext'
import { fetchAPI } from '../../utils/api'
import VideoCard from '../../components/VideoCard'
import './index.css'

export default function Home() {
  const { isDarkTheme } = useContext(ThemeContext)
  const { isSidebarVisible } = useContext(SidebarContext)

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [bannerVisible, setBannerVisible] = useState(true)

  const onCloseBanner = () => setBannerVisible(false)

  const logoUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  const getVideos = async () => {
    setLoading(true)
    setError(false)
    const jwt = Cookies.get('jwt_token')
    const { success, data } = await fetchAPI(
      `https://apis.ccbp.in/videos/all?search=${search}`,
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
    getVideos()
  }, [])

  return (
    <>
      <Header />
      <div className="route">
        <Sidebar isSidebarVisible={isSidebarVisible} />

        <main
          data-testid="home"
          className="home-main"
          style={{ backgroundColor: isDarkTheme ? '#181818' : '#f9f9f9' }}
        >
          {bannerVisible && (
            <div className="banner">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
                alt="banner"
                className="banner-bg"
              />
              <div className="banner-content">
                <img src={logoUrl} alt="website logo" className="banner-logo" />
                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button className="get-it-now-btn">GET IT NOW</button>
              </div>
              <button className="banner-close" onClick={onCloseBanner}>
                X
              </button>
            </div>
          )}

          <input
            className="search-input"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="search-button"
            data-testid="searchButton"
            onClick={getVideos}
          >
            Search
          </button>

          {loading && <Loader />}
          {error && <FailureView retry={getVideos} />}
          {!loading && !error && videos.length === 0 && <p>No Videos Found</p>}

          <div className="videos-container">
            <ul className="video-list">
              {videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}
