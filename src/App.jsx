

import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import FavoritesView from './components/FavoritesView'
import { FavoritesProvider } from './context/FavoritesContext'
import MoviesView from './components/MoviesView'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <FavoritesProvider>
      <div className="app-container">
            <Header />
            {activeTab === 'home' && <MainContent />}
            {activeTab === 'movies' && <MoviesView />}
            {activeTab === 'search' && <SearchView />}
            {activeTab === 'favorites' && <FavoritesView />}
            <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    </FavoritesProvider>
  )
}

export default App
