

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import FavoritesView from './components/FavoritesView'
import { FavoritesProvider } from './context/FavoritesContext'
import MoviesView from './components/MoviesView'

function App() {
  return (
    <FavoritesProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/movies" element={<MoviesView />} />
          <Route path="/favorites" element={<FavoritesView />} />
        </Routes>
        <Footer />
      </div>
    </FavoritesProvider>
  )
}

export default App
