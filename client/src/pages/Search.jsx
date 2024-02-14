import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Spinner } from 'flowbite-react'

function Search() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)

        const fetchPosts = async() => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            try{
                const res = await fetch(`/api/post/getPost?${searchQuery}`)

                if(!res.ok){
                    return
                }
        
                if(res.ok){
                    const data = await res.json()
                    setPosts(data)
                    setLoading(false)
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchPosts()
    }, [location.search])

    console.log(posts)
    

  return (
    <div className='grid grid-cols-6 min-h-screen mt-4'>
        {
            loading ? (
                <div className='col-span-6 flex items-center justify-center'>
                    <Spinner />
                </div>
            ): (
                <>
                <div className="col-span-1">
    
                </div>
                <div className="col-span-4 flex flex-col  gap-2">
                    {
                        posts && (
                            posts.map(post => (
                                <Link to={`/article/${post._id}`} key={post._id} className="flex gap-2">
                                    <div className='w-[8rem] h-13 col-span-1'>
                                        <img className='w-full h-full object-cover' src={post.image} alt="" />
                                    </div>
                                    <div className="">
                                        <span className='line-clamp-1 font-semibold'>{post.title}</span>
                                        <span className='line-clamp-2 text-xs text-gray-400' dangerouslySetInnerHTML={{__html: post.content}}></span>
                                    </div>
                                </Link>
                            ))
                        )
                    }
                </div>
                <div className="col-span-1"></div>
                </>
            )
        }
    </div>
  )
}

export default Search