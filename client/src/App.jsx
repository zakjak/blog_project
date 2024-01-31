import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NavbarComponent from './components/Navbar'
import NavbarLinks from './components/NavbarLinks'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'

function App() {

  return (
    <>
    <NavbarComponent />
    <NavbarLinks />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
