import { Link, useLocation } from 'react-router-dom'
import { postViews } from '../lib/Common'
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useSelector } from 'react-redux'
import { Dropdown } from 'flowbite-react'

function Card({ post }) {
  const { currentUser } = useSelector(state => state.user)

  const location = useLocation()


    const handleClick = () => {
      postViews(post._id)
      window.history.pushState(`/article/${post._id}`)
      window.location.reload()
    }

    const handleDelete = async (postId) => {

    }

  return (
    <div className='w-full relative flex flex-row flex-wrap rounded-t-lg drop-shadow-xl bg-white dark:bg-[#10172B] cursor-pointer transition-all'>
      <Link onClick={handleClick}  to={`/article/${post._id}`} className='w-full h-full'>
          <img className='w-full opacity-85 hover:opacity-100 duration-100 rounded-t-md h-[11em] object-cover' src={post?.image} alt="" />
          <div className=" mt-1 p-4 flex flex-col gap-1 justify-between items-start">
              <h1 className='font-semibold text-md md:text-lg line-clamp-2'>{post?.title}</h1>
              <div className='line-clamp-3 font-thin text-[.65em] text-gray-400' dangerouslySetInnerHTML={{__html: post?.content}}></div>
              <span className='bg-black px-2 py-1 rounded-md text-white text-[10px] tracking-wider'>{post?.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
          </div>
      </Link>
      {
        location.pathname != '/' && location.pathname === `/article/${post._id}`  && (
          <div className="absolute top-4 right-4 p-2 opacity-65 hover:opacity-80 bg-black rounded-full">
            <Dropdown className='' outline label="" dismissOnClick={false} renderTrigger={() => <span><HiOutlineDotsVertical /></span>}>
                <Dropdown.Item className='bg-red-500' onClick={handleDelete(post._id)}>Delete</Dropdown.Item>
            </Dropdown>
          </div>
        )
      }
    </div>
  )
}

export default Card