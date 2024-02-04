import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { MdOutlineAccessTime } from 'react-icons/md'
import { FaRegEye } from "react-icons/fa"
 
function Article() {
    const { id } = useParams()
    const [article, setArticle] = useState({})
    
    useEffect(() => {
        const getArticle = async () => {
            const res = await fetch(`/api/post/getPost?postId=${id}`)
            const data = await res.json()
            setArticle(...data)
        }
        getArticle()
    }, [id])

  return (
    <div className='w-[70%] min-h-screen mx-auto'>
        <div className="pt-8 flex flex-col gap-2">
            <h1 className='text-3xl'>{article.title}</h1>
            <div className="flex items-center text-gray-400 gap-1 text-xs">
                <div className='flex items-center gap-1'>
                    <span className='text-lg'><MdOutlineAccessTime /></span>
                    <span>{moment(article.createdAt).fromNow()}</span>
                </div>
                <hr className='h-4 border-[.2px] border-gray-400' />
                <div className='flex items-center gap-2'>
                    <span className='text-lg'><FaRegEye /></span>
                    <span className=''>{`${article.views} reads`}</span>
                </div>
            </div>
            <div className="w-full rounded-md overflow-hidden">
                <img className='w-full h-[30rem] object-cover' src={article.image} alt={article.title} />
            </div>
            <article dangerouslySetInnerHTML={{__html: article.content}} className='article'></article>
        </div>
    </div>
  )
}

export default Article