// src/components/VideoCard/index.jsx
import {Link} from 'react-router-dom'
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

  if (years >= 1) return `${Math.floor(years)} year${years >= 2 ? 's' : ''} ago`
  if (months >= 1) return `${Math.floor(months)} month${months >= 2 ? 's' : ''} ago`
  if (days >= 1) return `${Math.floor(days)} day${days >= 2 ? 's' : ''} ago`
  if (hours >= 1) return `${Math.floor(hours)} hour${hours >= 2 ? 's' : ''} ago`
  if (minutes >= 1) return `${Math.floor(minutes)} minute${minutes >= 2 ? 's' : ''} ago`
  return 'Just now'
}

export default function VideoCard({ video }) {
  return (
    <li className="video-card">
      <Link to={`/videos/${video.id}`} className="video-link">
      <img
        src={video.thumbnail_url}
        alt="video thumbnail"
        className="video-card__thumbnail"
      />
      <div className="video-card__info">
        <img
          src={video.channel.profile_image_url}
          alt="channel logo"
          className="video-card__channel-logo"
        />
        <div className="video-card__text">
          <h3 className="video-card__title">{video.title}</h3>
          <p className="video-card__channel-name">{video.channel.name}</p>
          <p className="video-card__meta">
            {video.view_count} views • {getRelativeTime(video.published_at)}
          </p>
        </div>
      </div>
      </Link>
    </li>
  )
}
