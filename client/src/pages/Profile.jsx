import { useSelector } from 'react-redux'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

function Profile() {
  const {currentUser} = useSelector(state => state.user)

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
        <Button color='dark'>Likes</Button>
        <Button color='dark'>Saved</Button>
        {
          currentUser && currentUser.isAdmin && (
            <Link to='/create'>
              <Button color='dark'>Create +</Button>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Profile