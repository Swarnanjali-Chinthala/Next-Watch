import './index.css'

export default function FailureView({ retry }) {
  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <p>Something went wrong</p>
      <button onClick={retry}>Retry</button>
    </div>
  )
}
