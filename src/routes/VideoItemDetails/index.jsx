import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import LoaderView from '../../components/Loader'
import FailureView from '../../components/FailureView'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { SidebarContext } from '../../context/SidebarContext'
import { FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa'
import { ThemeContext } from '../../context/ThemeContext'
import { SavedVideosContext } from '../../context/SavedVideosContext'
import './index.css'

function getRelativeTime(publishedAt) {
  
  const publishedDate = new Date(publishedAt)
  const now = new Date()
  const diff = now - publishedDate
  const seconds = diff / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const months = days / 30
  const years = days / 365

  if (years >= 1) return `${Math.floor(years)} year${years > 1 ? 's' : ''} ago`
  if (months >= 1) return `${Math.floor(months)} month${months > 1 ? 's' : ''} ago`
  if (days >= 1) return `${Math.floor(days)} day${days > 1 ? 's' : ''} ago`
  if (hours >= 1) return `${Math.floor(hours)} hour${hours > 1 ? 's' : ''} ago`
  if (minutes >= 1) return `${Math.floor(minutes)} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
}

const VideoItemDetails = () => {
  const { isDarkTheme } = useContext(ThemeContext)
  const { isSidebarVisible } = useContext(SidebarContext)
  const { savedVideos, toggleSave } = useContext(SavedVideosContext)

  const { id } = useParams()
  const [videoDetails, setVideoDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  const getVideoDetails = async () => {
    setLoading(true)
    setError(false)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      setVideoDetails(data.video_details)
    } else {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    getVideoDetails()
  }, [])

  const handleLike = () => {
    setIsLiked(true)
    setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(true)
    setIsLiked(false)
  }

  const handleSave = () => {
    if (videoDetails) {
      toggleSave(videoDetails)
    }
  }

  const isAlreadySaved = videoDetails
    ? savedVideos.some(v => v.id === videoDetails.id)
    : false

  const onRetry = () => getVideoDetails()

  return (
    <div className={`video-details-page ${isDarkTheme ? 'dark' : 'light'}`}>
      <Header />
      

      {loading ? (
        <LoaderView />
      ) : error ? (
        <FailureView onRetry={onRetry} />
      ) : (
        <div className="video-details-container">
          <div className="video-player">
            <iframe
              width="100%"
              height="400"
              src={videoDetails.video_url.replace('/watch?v=', '/embed/')}
              title={videoDetails.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <h1 className="video-title">{videoDetails.title}</h1>

          <div className="video-meta">
            <p>{videoDetails.view_count} views</p>
            <p>{getRelativeTime(videoDetails.published_at)}</p>
          </div>

          <div className="video-actions">
            <button
              className={`video-action-btn ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <FaThumbsUp /> Like
            </button>
            <button
              className={`video-action-btn ${isDisliked ? 'active' : ''}`}
              onClick={handleDislike}
            >
              <FaThumbsDown /> Dislike
            </button>
            <button
              className={`video-action-btn ${isAlreadySaved ? 'active' : ''}`}
              onClick={handleSave}
            >
              <FaBookmark /> {isAlreadySaved ? 'Saved' : 'Save'}
            </button>
          </div>

          <hr />

          <div className="channel-info">
            <img
              src={videoDetails.channel.profile_image_url}
              alt="channel logo"
              className="channel-logo"
            />
            <div>
              <p className="channel-name">{videoDetails.channel.name}</p>
              <p>{videoDetails.channel.subscriber_count} subscribers</p>
            </div>
          </div>

          <p className="video-description">{videoDetails.description}</p>
        </div>
      )}
    </div>
  )
}

export default VideoItemDetails
