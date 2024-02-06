import React, { useEffect, useState } from 'react'
import Card from './Card'
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

function MoreArtilces() {
  const [posts, setPosts] = useState([])


  useEffect(() => {

    const fetchData = async () => {
        const res = await fetch(`/api/post/getPost?limit=9`)
        const data = await res.json()

        console.log(data)
      if(res.ok){
        setPosts(data)
      }  
    }
    fetchData()
  }, [])

  const handleShowMore = async () => {
    let num = 2
    const numberOfPost = num += 2
    const startIndex = numberOfPost
    const urlParams = new URLSearchParams(location.search)

    urlParams.set('startIndex', startIndex)
    const searchQuery = urlParams.toString()

    const res = await fetch(`api/post/getPost?startIndex=${searchQuery}&limit=4`)
        const data = await res.json()

        console.log(data)
      // if(res.ok){
      //   setPosts({...posts, data})
      // }  
  }

  return (
    <div className='mt-4'>
      <div className="flex items-center cursor-pointer opacity-80 hover:opacity-100">
        <h1 className='text-lg mb-2 font-semibold tracking-wide'>More stories</h1>
        <span className='text-sm'><FaChevronRight /></span>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
      {
        posts.map((post) => (
          <Card key={post._id} post={post} />
        ))
      }
      </div>
    </div>
  )
}

export default MoreArtilces