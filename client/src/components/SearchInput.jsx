import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { IoIosSearch } from 'react-icons/io'

function SearchInput({ searchInput, setSearchInput, handleSearch }) {
  return (
    <form onSubmit={handleSearch}>
        <div className="flex items-center h-8">
            <TextInput value={searchInput} onChange={e => setSearchInput(e.target.value)} className='' type='search' placeholder='Search...' />
            <Button type='submit' outline color='blak'><IoIosSearch type='submit' className='text-2xl'  /></Button>
        </div>
    </form>
  )
}

export default SearchInput