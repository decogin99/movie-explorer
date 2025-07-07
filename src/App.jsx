

import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import FavoritesView from './components/FavoritesView'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <FavoritesProvider>
      <div className="fixed inset-0 flex flex-col">
        <Header />
        {activeTab === 'favorites' ? <FavoritesView /> : <MainContent />}
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </FavoritesProvider>
  )
}

export default App
