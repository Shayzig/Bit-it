// import './App.css'
import { useState } from 'react'
import './assets/scss/global.scss'
import './assets/scss/basics/_typography.scss'
import AppHeader from './cmps/AppHeader'
import HomePage from './pages/HomePage'
import Charts from './pages/Charts'
import ContactsPage from './pages/ContactPage'
import About from './pages/About'
import ContactEdit from './pages/ContactEdit'
import ContactDetails from './pages/ContactDetails'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'

function App() {

    const [selectedCmp, setSelectedCmp] = useState('home')

    function setCmp(cmp) {
        setSelectedCmp(cmp)
    }

    return (
        <Router>
            <section className="main-layout">
                <AppHeader />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<ContactsPage />} />
                    <Route path='/chart' element={<Charts />} />
                    <Route path='contact/edit/:id?' element={<ContactEdit />} />
                    <Route path='contact/:id' element={<ContactDetails />} />
                </Routes>
            </section>
        </Router>

    )
}

export default App
