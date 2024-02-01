import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa'
import NavbarLinks from './NavbarLinks';

function NavbarComponent() {
    const { theme } = useSelector(state => state.theme)
    const { currentUser } = useSelector(state => state.user)
    
    const  dispatch = useDispatch()

  return (
    <Navbar className='w-full h-16 shadow-md flex items-center'>
        <Navbar.Brand as={Link} to='/'>
            Gh Media
        </Navbar.Brand>
        <form>
            <div className=" flex items-center h-8">
                <TextInput className='' type='search' placeholder='Search...' />
                <IoIosSearch className='text-gray-500 text-lg' />
            </div>
        </form>
        <div className="flex gap-2">
            <Button
                className=' text-black flex'
                gradientDuoTone='purpleToPink'
                onClick={() => dispatch(toggleTheme())}
            >
                {theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>
            {
                currentUser ? (
                    <div className='w-12 h-12 rounded-full bg-gray-400'>
                        <img className='w-full h-full object-cover' src={currentUser.profilePicture} alt="" />
                    </div>
                ) : (
                    <Link className='m marker:' to='/sign-in'>
                        <Button gradientDuoTone='purpleToPink'>
                            Sign in
                        </Button>
                    </Link>
                )
            }
        </div>
    </Navbar>
  )
}

export default NavbarComponent