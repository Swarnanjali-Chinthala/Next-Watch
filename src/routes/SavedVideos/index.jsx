import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { SidebarContext } from '../../context/SidebarContext' 
import { ThemeContext } from '../../context/ThemeContext'
import { SavedVideosContext } from '../../context/SavedVideosContext'
import './index.css'

export default function SavedVideos() {
  const { isDarkTheme } = useContext(ThemeContext)
  const { isSidebarVisible } = useContext(SidebarContext)
  
  const { savedVideos } = useContext(SavedVideosContext)

  return (
    <>
      <Header />
      <div className="route">
        <Sidebar isSidebarVisible={isSidebarVisible} />
        <main
          data-testid="savedVideos"
          style={{ backgroundColor: isDarkTheme ? '#0f0f0f' : '#f9f9f9' }}
        >
          <h2 data-testid="banner">Saved Videos</h2>
          {savedVideos.length === 0 ? (
            <div className='saveVideosMessage'>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />
              <p>No Saved Videos Found</p>
            </div>
          ) : (
             <div className="saved-videos-grid">
            {savedVideos.map(v => (
              <Link to={`/videos/${v.id}`} key={v.id} className="video-link">
              <div key={v.id}>
                <img src={v.thumbnail_url} alt="video thumbnail" />
                <h3>{v.title}</h3>
              </div>
              </Link>
            ))}
           </div >
          )}
        </main>
      </div>
    </>
  )
}
