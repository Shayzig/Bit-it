import './assets/scss/global.scss'
import './assets/scss/basics/_typography.scss'
import AppHeader from './cmps/AppHeader'
import HomePage from './pages/HomePage'
import Charts from './pages/Charts'
import ContactsPage from './pages/ContactPage'
import About from './pages/About'
import ContactEdit from './pages/ContactEdit'
import ContactDetails from './pages/ContactDetails'
import LoginSignUp from './pages/LoginSignUp'
import { useEffect } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadUsers } from './store/actions/user.actions'


function App() {

    const users = useSelector(state => state.userModule.users)
    useEffect(() => {
        loadUsers()
    }, [])

    const Team = () => {
        return (
            <ul>
                <li>Moshe</li>
                <li>Dan</li>
                <li>Lior</li>
            </ul>
        )
    }

    const Vision = () => {
        return (
            <ul>
                <li>Take Over The World</li>
                <li>Save The World</li>
                <li>Eat</li>
            </ul>
        )
    }

    return (
        <Router>
            <section className="main-layout">
                <AppHeader />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginSignUp />} />

                    <Route path='/about' element={<About />} >
                        <Route path='team' element={<Team />} />
                        <Route path='vision' element={<Vision />} />
                    </Route >

                    <Route path='/contact' element={<ContactsPage />} />
                    <Route path='/chart' element={<Charts />} />
                    <Route path='/contact/edit/:id?' element={<ContactEdit />} />
                    <Route path='/contact/:id' element={<ContactDetails />} />
                </Routes>
            </section>
        </Router>

    )
}

export default App


