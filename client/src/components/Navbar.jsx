import { Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { signOut } from '../redux/user/userSlice';

function NavbarComponent() {
    const [searchInput, setSearchInput] = useState('')
    const [searchTerm, setSearchTerm] = useState('')


    const { theme } = useSelector(state => state.theme)
    const { currentUser } = useSelector(state => state.user)
    
    const  dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    }, [location.search])

    const handleSignOut = async () => {
        const res = await fetch('https://blog96.onrender.com/api/auth/signout', {
            method: 'POST'
        })

        if(res.ok){
            const data = await res.json()
            if(data){
                dispatch(signOut())
                navigate('/sign-in')
            }
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if(!searchInput || searchInput === ''){
            return;
        }
        const urlParams = new URLSearchParams(location.search)
        console.log(urlParams)
        urlParams.set('searchTerm', searchInput)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

  return (
    <Navbar className='w-full sticky top-0 z-50 h-16 shadow-md flex items-center'>
        <Navbar.Brand as={Link} to='/'>
            Gh Media
        </Navbar.Brand>
        <form onSubmit={handleSearch}>
            <div className=" flex items-center h-8">
                <TextInput value={searchInput} onChange={e => setSearchInput(e.target.value)} className='' type='search' placeholder='Search...' />
                <Button type='submit' outline color='blak'><IoIosSearch type='submit' className='text-2xl'  /></Button>
            </div>
        </form>
        <div className="flex gap-2 items-center">
            <Button
                className=' text-black flex h-10'
                gradientDuoTone='purpleToPink'
                onClick={() => dispatch(toggleTheme())}
            >
                {theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>
            {
                currentUser ? (
                    <div>
                    <Dropdown className='w-[15em] -z-50' label='' renderTrigger={() => <img className='w-10 h-10 cursor-pointer rounded-full'  src={currentUser.profilePicture} />}>
                        <div className='p-4 text-xl'>
                            {currentUser.username}
                        </div>
                        <Dropdown.Divider />
                        {
                            currentUser.isAdmin && (
                                <Dropdown.Item as={Link} to={`/profile/${currentUser._id}`}>
                                    Profile
                                </Dropdown.Item>
                            )
                        }
                        <Dropdown.Item onClick={handleSignOut}>
                            Signout
                        </Dropdown.Item>
                    </Dropdown>
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