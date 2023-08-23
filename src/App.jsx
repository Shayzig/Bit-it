// import About from './pages/About'
import './assets/scss/global.scss'
import './assets/scss/basics/_typography.scss'
import AppHeader from './cmps/AppHeader'
import HomePage from './pages/HomePage'
import Charts from './pages/Charts'
import ContactsPage from './pages/ContactPage'
import ContactEdit from './pages/ContactEdit'
import ContactDetails from './pages/ContactDetails'
import LoginSignUp from './pages/LoginSignUp'
import { useEffect } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { loadUsers } from './store/actions/user.actions'
import Footer from './cmps/Footer'

function App() {

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <Router>
            <section className="main-layout">
                <AppHeader />
                <Routes>
                    <Route path='/' element={<LoginSignUp />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/contact' element={<ContactsPage />} />
                    <Route path='/chart' element={<Charts />} />
                    <Route path='/contact/edit/:id?' element={<ContactEdit />} />
                    <Route path='/contact/:id' element={<ContactDetails />} />
                </Routes>
                <Footer />
            </section>
        </Router>

    )
}

export default App


//NESTED ROUTS
// const Team = () => {
//     return (
//         <ul>
//             <li>Moshe</li>
//             <li>Dan</li>
//             <li>Lior</li>
//         </ul>
//     )
// }

// const Vision = () => {
//     return (
//         <ul>
//             <li>Take Over The World</li>
//             <li>Save The World</li>
//             <li>Eat</li>
//         </ul>
//     )
// }

// <Route path='/about' element={<About />} >
{/* <Route path='team' element={<Team />} /> */ }
{/* <Route path='vision' element={<Vision />} /> */ }
{/* </Route > */ }