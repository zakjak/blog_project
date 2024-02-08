import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { MdOutlineAccessTime } from 'react-icons/md'
import { FaRegEye } from "react-icons/fa"
import { CiShare2 } from "react-icons/ci";
import CommentSection from '../components/CommentSection'
import { formatCount } from '../lib/Common'
 
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
    <div className='w-[60%] min-h-screen mx-auto'>
        {
            article && (
        <div className="pt-8 flex flex-col gap-2">
            <div className='w-[90%] mx-auto flex flex-col gap-4'>
                <h1 className='lg:text-3xl  text-xl md:text-2xl'>{article.title}</h1>
                <div className=" text-gray-400">
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-2 text-xs'>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1'>
                                    <span className='text-lg'><MdOutlineAccessTime /></span>
                                    <span>{moment(article.createdAt).fromNow()}</span>
                                </div>
                                {
                                    article.views > 0 && (
                                        <>
                                    <div className='flex gap-2 items-center'>
                                        <hr className='h-4 border-[.2px] border-gray-400' />
                                        <div className='flex items-center gap-2'>
                                            <span className='text-lg'><FaRegEye /></span>
                                            <span className=''>{`${formatCount(article.views)} ${article > 1 ? 'read' : 'reads'}`}</span>
                                        </div>
                                    </div>
                                        </>
                                    )
                                }
                            </div>
                            {article.author && (
                                <h1 className=''>By <span className='cursor-pointer hover:text-white'>{article.author}</span></h1>
                            )}
                        </div>
                        <div className="text-black dark:text-white text-xl">
                            <CiShare2 className='cursor-pointer' />
                        </div>
                    </div>
                    </div>
                <hr className='opacity-30 mb-4' /> 
            </div>
            <div className="w-[85%] h-[25rem] rounded-md overflow-hidden shadow-lg mx-auto">
                <img className='w-full h-full object-cover' src={article.image} alt={article.title} />
            </div>
            <article dangerouslySetInnerHTML={{__html: article.content}} className='article w-[85%] mx-auto'></article>
            <CommentSection postId={article._id} />
        </div>
            )
        }
    </div>
  )
}

export default Article