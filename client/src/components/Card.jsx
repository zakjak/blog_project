import { Link } from 'react-router-dom'

function Card({ post }) {
    
  return (
    <Link to={`/article/${post._id}`} className='w-full rounded-t-lg shadow-md cursor-pointer'>
        <img className='w-full rounded-t-md h-[11em] object-cover' src={post?.image} alt="" />
        <div className=" mt-1 p-4 flex flex-col gap-1 justify-between">
            <h1 className='font-semiboldtext-lg line-clamp-2'>{post?.title}</h1>
            <div className='line-clamp-3 font-light text-sm text-gray-400' dangerouslySetInnerHTML={{__html: post?.content}}></div>
            <span className=''>{post?.category}</span>
        </div>
    </Link>
  )
}

export default Card