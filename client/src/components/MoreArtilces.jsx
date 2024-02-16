import React, { useEffect, useState } from 'react'
import Card from './Card'
import { FaChevronDown} from "react-icons/fa6";

function MoreArtilces({ topPosts }) {
  const [posts, setPosts] = useState([])
  const [showMore, setShowMore] = useState(false)


  useEffect(() => {

    const fetchData = async () => {
        const res = await fetch(`https://blog96.onrender.com/api/post/getPost?limit=9`)
        const data = await res.json()

      if(res.ok){
        const dataToFilter = topPosts.map(top => top._id)
        const filteredArray = data.filter(myData => !dataToFilter.includes(myData._id))
        setPosts(filteredArray)
      }  
    }
    fetchData()
  }, [topPosts])

  const handleShowMore = async () => {
    const startIndex = posts.length
    
    try{
      const res = await fetch(`https://blog96.onrender.comapi/post/getPost?startIndex=${startIndex}`)
      const data = await res.json()

      if(res.ok){
        setPosts((prev) => [...prev, ...data])
        if(data.length < 9){
          setShowMore(false)
        }
      } 
    }catch(err){
      console.log(err)
    }
     
  }

  return (
    <div className='mt-4'>
      {
        posts && (
          <>
            <div className="flex items-center cursor-pointer opacity-80 hover:opacity-100">
              <h1 className='text-md mb-2 font-semibold tracking-wide'>More stories</h1>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
            {
              posts.map((post) => (
                <Card key={post._id} post={post} />
              ))
            }
            </div>
          </>
        )
      }
      {
        showMore && (
        <div className="w-full flex justify-center mt-4">
          <FaChevronDown dis onClick={handleShowMore} className='cursor-pointer' />
        </div>
        )
      } 
    </div>
  )
}

export default MoreArtilces