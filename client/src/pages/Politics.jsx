import React, { useEffect, useState } from 'react'
import TopArticles from '../components/TopArticles'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Politics() {
    const [posts, setPosts] = useState([])
    const { pathname } = useLocation()
    const category = pathname.split('/')[1]
    
  useEffect(() => {

    const fetchData = async () => {
        const res = await axios.get(`https://blog-site-dhug.onrender.com/api/post/getPost?category=${category}&limit=4`)
        const data = res.data

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

export default Politics