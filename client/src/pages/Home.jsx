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

  console.log(posts)

  return (
    <div className='min-h-screen'>
      <TopArticles posts={posts} />
      <MoreArtilces />
    </div>
  )
}

export default Home