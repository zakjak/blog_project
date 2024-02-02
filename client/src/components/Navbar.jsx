import { Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa'
import { useState } from 'react';
import { signOut } from '../redux/user/userSlice';

function NavbarComponent() {
    const { theme } = useSelector(state => state.theme)
    const { currentUser } = useSelector(state => state.user)
    
    const  dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        const res = await fetch('/api/auth/signout', {
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
                    <Dropdown className='w-[15em]' label='' renderTrigger={() => <img className='w-10 h-10 cursor-pointer rounded-full'  src={currentUser.profilePicture} />}>
                        <div className='p-4 text-xl'>
                            {currentUser.username}
                        </div>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to={`/profile/${currentUser._id}`}>
                            Profile
                        </Dropdown.Item>
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