import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NavbarComponent from './components/Navbar'
import NavbarLinks from './components/NavbarLinks'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

function App() {

  return (
    <>
    <NavbarComponent />
    <NavbarLinks />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
