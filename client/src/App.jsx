import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NavbarComponent from './components/Navbar'
import NavbarLinks from './components/NavbarLinks'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Article from './pages/Article'
import Sports from './pages/Sports'
import Politics from './pages/Politics'
import Entertainment from './pages/Entertainment'
import Business from './pages/Business'
import Technology from './pages/Technology'

function App() {

  return (
    <>
    <NavbarComponent />
    <NavbarLinks />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/sports' element={<Sports />} />
        <Route path='/business' element={<Business />} />
        <Route path='/entertainment' element={<Entertainment />} />
        <Route path='/politics' element={<Politics />} />
        <Route path='/tech' element={<Technology />} />
        <Route path='/article/:id' element={<Article />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
