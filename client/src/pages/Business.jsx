import React, { useEffect, useState } from 'react'
import TopArticles from '../components/TopArticles'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Business() {
    const [posts, setPosts] = useState([])
    const location = useLocation()
    const category = location.pathname.split('/')[1]
    
    useEffect(() => {
  
      const fetchData = async () => {
          const res = await axios(`https://blog96.onrender.com/api/post/getPost?category=${category}&limit=4`)
          const data =  res.data
  
        if(res){
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

export default Business