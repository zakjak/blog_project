import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { MdOutlineAccessTime } from 'react-icons/md'
import { FaRegEye } from "react-icons/fa"
import { CiInstagram, CiShare2, CiTwitter } from "react-icons/ci";
import CommentSection from '../components/CommentSection'
import { formatCount } from '../lib/Common'
import Card from '../components/Card'
import { Dropdown } from 'flowbite-react'
import { CiFacebook } from "react-icons/ci";
 
function Article() {
    const { id } = useParams()
    const [article, setArticle] = useState({})
    const [relatedArticles, setRelatedArticles] = useState([])
    
    useEffect(() => {
        getArticle()
    }, [id])

    const getArticle = async () => {
        const res = await fetch(`https://blog-project-sable.vercel.app/api/post/getPost?postId=${id}`)
        const data = await res.json()
        setArticle(...data)
    }

    useEffect(() => {
        const getRelatedArticles = async () => {
            const res = await fetch(`https://blog-project-sable.vercel.app/api/post/getPost?category=${article?.category}&&limits=3`)
            const data = await res.json()
             if(res.ok){
                const filtered = data.filter((post) => post._id !== article._id)
                setRelatedArticles(filtered)
             }
        }
        getRelatedArticles()
    }, [article?.category])

    const handleShareLink = () => {
        window.FB.ui({
            method: 'share',
            href: article.content
        })
    }


  return (
    <div className=' min-h-screen grid lg:grid-cols-6 w-[90%] mx-auto'>
        {
            article && (
        <div className="pt-8 flex flex-col gap-2 md:col-span-4 col-span-6">
            <div className='w-[90%] mx-auto flex flex-col gap-4'>
                <h1 className='lg:text-3xl  text-xl md:text-2xl'>{article.title}</h1>
                <div className=" dark:text-gray-400 text-black opacity-60">
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
                        <div className="text-black relative dark:text-white text-xl">
                            <Dropdown dismissOnClick={false} className='absolute mt-' label='' renderTrigger={() => <span><CiShare2 className='cursor-pointer' /></span>}>
                                <Dropdown.Item onClick={handleShareLink} className='text-lg dark:text-white text-black'><CiFacebook /> Facebook</Dropdown.Item>
                                <Dropdown.Item className='text-lg dark:text-white text-black'><CiTwitter  /> X</Dropdown.Item>
                                <Dropdown.Item className='text-lg dark:text-white text-black'><CiInstagram /> Instagram</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    </div>
                <hr className='opacity-30 mb-4' /> 
            </div>
            <div className="w-[85%] h-[20%] md:h-[24rem] rounded-md overflow-hidden shadow-lg mx-auto">
                <img className='w-full aspect-video object-cover h-full' src={article.image} alt={article.title} />
            </div>
            <article dangerouslySetInnerHTML={{__html: article.content}} className='article w-[85%] mx-auto'></article>
            {/* <CommentSection postId={article._id} /> */}
        </div>
            )
        }
        {
            relatedArticles && (
                <div className='mt-4 p-8 col-span-2 mx-8'>
                    {
                        relatedArticles.length > 0 && (
                            <>
                            <h2 className='text-lg drop-shadow-lg mb-2'>Related articles</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
                                {
                                    relatedArticles.map((article) => (
                                        <Card key={article._id} post={article} />
                                    ))
                                    }
                            </div>
                            </>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default Article