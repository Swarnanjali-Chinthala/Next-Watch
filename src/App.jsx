import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import Trending from './routes/Trending'
import Gaming from './routes/Gaming'
import SavedVideos from './routes/SavedVideos'
import VideoDetails from './routes/VideoItemDetails'
import NotFound from './routes/NotFound'
import ProtectedRoute from './utils/ProtectedRoute'

import { ThemeProvider, useTheme } from './context/ThemeContext'
import { SavedVideosProvider } from './context/SavedVideosContext'
import { SidebarProvider } from './context/SidebarContext'

function AppContent() {
  const { isDarkTheme } = useTheme()

  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/saved-videos" element={<SavedVideos />} />
          <Route path="/videos/:id" element={<VideoDetails />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <SavedVideosProvider>
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </SavedVideosProvider>
    </ThemeProvider>
  )
}
