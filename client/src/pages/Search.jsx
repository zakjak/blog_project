import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import axios from 'axios'

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
                const res = await axios.get(`https://blog-site-dhug.onrender.com/api/post/getPost?${searchQuery}`)

                if(!res){
                    return
                }
        
                if(res){
                    const data = res.data
                    setPosts(data)
                    setLoading(false)
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchPosts()
    }, [location.search])
    

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
                <div className="col-span-3 flex flex-col gap-2">
                    {
                        posts.length ? (
                            posts.map(post => (
                                    <Link to={`/article/${post._id}`} key={post._id}>
                                        <div className="flex gap-3">
                                            <div className='w-[10rem]  col-span-1'>
                                                <img className='w-full object-cover' src={post.image} alt="" />
                                            </div>
                                            <div className="w-[95%]">
                                                <span className='line-clamp-1 font-semibold'>{post.title}</span>
                                                <span className='line-clamp-2 text-xs text-gray-400 font-light mt-2' dangerouslySetInnerHTML={{__html: post.content}}></span>
                                            </div>
                                        </div>
                                    </Link>
                            ))
                        ) : (
                            <p>Please search again!!!</p>
                        )
                    }
                    {/* <div>
                        1
                    </div> */}
                </div>
                <div className="col-span-2"></div>
                </>
            )
        }
    </div>
  )
}

export default Search