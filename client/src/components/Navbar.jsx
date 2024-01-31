import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";

function NavbarComponent() {
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
        <Link className='m marker:' to='/sign-in'>
            <Button>
                Sign in
            </Button>
        </Link>
    </Navbar>
  )
}

export default NavbarComponent