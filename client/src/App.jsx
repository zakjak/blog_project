import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import NavbarComponent from './components/Navbar'

function App() {

  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
