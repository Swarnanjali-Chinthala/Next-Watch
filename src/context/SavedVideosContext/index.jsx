import { createContext, useState, useEffect } from 'react'

export const SavedVideosContext = createContext()

export const SavedVideosProvider = ({ children }) => {
  const [savedVideos, setSavedVideos] = useState(() => {
    const stored = localStorage.getItem('savedVideos')
    return stored ? JSON.parse(stored) : []
  })

  // Save to localStorage whenever savedVideos changes
  useEffect(() => {
    localStorage.setItem('savedVideos', JSON.stringify(savedVideos))
  }, [savedVideos])

  const toggleSave = video => {
    setSavedVideos(prev => {
      const exists = prev.find(v => v.id === video.id)
      if (exists) {
        return prev.filter(v => v.id !== video.id)
      } else {
        return [...prev, video]
      }
    })
  }

  return (
    <SavedVideosContext.Provider value={{ savedVideos, toggleSave }}>
      {children}
    </SavedVideosContext.Provider>
  )
}
