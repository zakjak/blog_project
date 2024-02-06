import React, { useEffect, useState } from 'react'
import TopArticles from '../components/TopArticles'
import { useLocation } from 'react-router-dom'

function Politics() {
    const [posts, setPosts] = useState([])
    const { pathname } = useLocation()
    const category = pathname.split('/')[1]
    
  useEffect(() => {

    const fetchData = async () => {
        const res = await fetch(`/api/post/getPost?category=${category}&limit=4`)
        const data = await res.json()

      if(res.ok){
        setPosts(data)
      }  
    }
    fetchData()
  }, [category])

  return (
    <div className='min-h-screen  w-[70%] mx-auto'>
        <TopArticles posts={posts} />
    </div>
  )
}

export default Politics