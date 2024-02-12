import TopArticles from '../components/TopArticles';
import MoreArtilces from '../components/MoreArtilces';
import { useEffect, useState } from 'react';

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {

    const fetchData = async () => {
        const res = await fetch(`/api/post/getPost?category=sports&category=entertainment&category=business&category=politics&limit=1`)
        const data = await res.json()

      if(res.ok){
        setPosts(data)
      }  
    }
    fetchData()
  }, [])

  

  return (
    <div className='min-h-screen w-[70%] mx-auto mb-4'>
      <TopArticles posts={posts} />
      <MoreArtilces topPosts={posts} />
    </div>
  )
}

export default Home