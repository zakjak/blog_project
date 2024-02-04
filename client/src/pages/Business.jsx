import React, { useEffect, useState } from 'react'
import TopArticles from '../components/TopArticles'
import { useLocation } from 'react-router-dom'

function Business() {
    const [posts, setPosts] = useState([])
    const location = useLocation()
    const category = location.pathname.split('/')[1]
    
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
    <div className='min-h-screen'>
        <TopArticles posts={posts} />
    </div>
  )
}

export default Business