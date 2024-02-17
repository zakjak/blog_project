import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from 'flowbite-react'
import SearchInput from './SearchInput'

function NavbarLinks() {
    const [searchInput, setSearchInput] = useState('')
    const location = useLocation()
    const [tab, setTab] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const pathname = location.pathname
        setTab(pathname)

    }, [location.pathname])

    const handleSearch = (e) => {
        e.preventDefault()
        if(!searchInput || searchInput === ''){
            return;
        }
        const urlParams = new URLSearchParams(location.search)
    
        urlParams.set('searchTerm', searchInput)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

  return (
    <>
    <Navbar className='w-full text-xs md:text-sm sticky top-[4rem] z-40 bg-black dark:bg-[#191919] overflow-x-scroll navlinks'>
        <div className="flex justify-between w-full md:justify-center md:gap-6">
            <Navbar.Link className={`text-white dark:text-white bg-transparent 
            ${tab === '/' && 'underline'}`} href='/'>
                Home
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white bg-transparent  
            ${tab === '/sports' && 'underline'}`} href='/sports'>
                Sports
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white bg-transparent 
            ${tab === '/politics' && 'underline'}`} href='/politics'>
                Politics
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white bg-transparent 
            ${tab === '/entertainment' && 'underline'}`} href='/entertainment'>
                Entertainment
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white bg-transparent 
            ${tab === '/business' && 'underline'}`} href='/business'>
                Business
            </Navbar.Link>
            <Navbar.Link className={`text-white dark:text-white bg-transparent 
            ${tab === '/tech' && 'underline'}`} href='/tech'>
                Technology
            </Navbar.Link>
        </div>
    </Navbar>
    <div className="md:hidden sticky top-[7.3rem] py-4 z-40 bg-black dark:bg-[#191919] w-full flex justify-center">
        <SearchInput searchInput={searchInput} handleSearch={handleSearch} setSearchInput={setSearchInput} />
    </div>
    </>
  )
}

export default NavbarLinks