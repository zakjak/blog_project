import { useSelector } from 'react-redux'
import { Button, Spinner } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Card from '../components/Card'

function Profile() {
  const [posts, setPosts] = useState([])
  const {currentUser} = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)

  console.log(currentUser._id)

  useEffect(() => {
    const getPosts = async() => {
      try{
        const res = await fetch(`/api/post/getPost?userId=${currentUser._id}`)
        const data = await res.json()
  
        if(res.ok){
          setPosts(data)
        }
      }catch(err){
        console.log(err)
      }
    }
    getPosts()
  }, [currentUser._id])

  return (
    <div className='min-h-screen w-full'>
      <div className="w-[80%] mx-auto flex flex-col items-center mt-4 gap-2">
        <div className="w-[9em] shadow-md h-[9em] rounded-full overflow-hidden">
          <img className='w-full h-full object-cover' src={currentUser.profilePicture} alt="" />
        </div>
        <p>{currentUser.username}</p>
        <p>{currentUser.email}</p>
      </div>
      <div className="flex gap-4 justify-center mt-4">
        <Button color='dark'>Posts</Button>
        {
          currentUser && currentUser.isAdmin && (
            <Link to='/create'>
              <Button color='dark'>Create +</Button>
            </Link>
          )
        }
      </div>
      
      <div className='grid mt-4 md:grid-cols-3 gap-2 md:w-[80%] mx-auto w-[65%] '>
        {
          posts ? (
            posts.map(post => (
              <Card key={post._id} post={post} />
            ))
          ) : (
            <div className='w-full col-span-4 h-screen flex justify-center items-center'>
              <Spinner />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Profile