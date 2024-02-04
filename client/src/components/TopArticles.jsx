import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

function TopArticles({ posts }) {
  return (
    <div className='w-full'>
      <div className='w-[80%] h mx-auto pt-8'>
        <Link to={`/article/${posts[0]?._id}`} className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
          <div className="flex-1 cursor-pointer rounded-md overflow-hidden">
            <img className='w-full opacity-85 hover:opacity-100 transition-all duration-100' src={posts[0]?.image} alt="" />
          </div>
          <div className="flex opacity-85 hover:opacity-100 transition-all duration-100 items-start flex-1 cursor-pointer flex-col gap-4 md:justify-center md:mb-14">
            <h1 className='text-lg font-semibold md:text-xl lg:text-2xl'>{posts[0]?.title}</h1>
            <div className='line-clamp-2' dangerouslySetInnerHTML={{__html: posts[0]?.content}}></div>
            <span className='bg-black text-white py-1 px-2 font-semibold text-sm rounded-md'>{posts[0]?.category}</span>
          </div>
        </Link>
        <div className="grid mt-6 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2">
          {
            posts.slice(1).map(post => (
              <Card key={post._id} post={post} />
            ))
          }
        </div>

        <div className="">
      </div>
    </div>
    </div>
  )
}

export default TopArticles