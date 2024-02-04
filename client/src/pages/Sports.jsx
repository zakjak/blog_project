import React, { useEffect, useState } from 'react'
import TopArticles from '../components/TopArticles'
import { useParams } from 'react-router-dom'

function Sports() {
    const [posts, setPosts] = useState([])
    
  useEffect(() => {

    const fetchData = async () => {
        const res = await fetch(`/api/post/getPost?category=sports&limit=4`)
        const data = await res.json()

      if(res.ok){
        setPosts(data)
      }  
    }
    fetchData()
  }, [])

  return (
    <div className='min-h-screen'>
        <TopArticles posts={posts} />
    </div>
  )
}

export default Sports