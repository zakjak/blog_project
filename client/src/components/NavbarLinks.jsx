import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar } from 'flowbite-react'

function NavbarLinks() {
    const location = useLocation()
    const [tab, setTab] = useState('')

    useEffect(() => {
        const pathname = location.pathname
        setTab(pathname)

    }, [location.pathname])
  return (
    <Navbar className='w-full sticky top-[4rem] z-40 bg-black dark:bg-gray-500 overflow-scroll md:overflow-hidden'>
        <div className="w-full flex justify-center gap-4">
            <Navbar.Link className={`text-white dark:text-white 
            ${tab === '/' && 'underline'}`} href='/'>
                Home
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white 
            ${tab === '/sports' && 'underline'}`} href='/sports'>
                Sports
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white 
            ${tab === '/politics' && 'underline'}`} href='/politics'>
                Politics
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white 
            ${tab === '/entertainment' && 'underline'}`} href='/entertainment'>
                Entertainment
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white 
            ${tab === '/business' && 'underline'}`} href='/business'>
                Business
            </Navbar.Link>
        </div>
    </Navbar>
  )
}

export default NavbarLinks