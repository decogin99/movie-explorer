

import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="fixed inset-0 flex flex-col">
      <Header />
      <MainContent />
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App
