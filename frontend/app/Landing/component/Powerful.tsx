import React from 'react'

const Powerful = () => {
  return (
    <div className='py-8 pt-16 max-w-6xl mx-auto'>
        <h1 className='text-4xl font-poppins leading-snug'>Powerful Features Designed <br /> for Knowledge Hoarders</h1>
        <div className='flex items-center justify-center w-full gap-24 mt-12'>
            <div className='bg-neutral-200 w-2/5 h-96 rounded-2xl'></div>
            <div className='bg-neutral-100 w-3/5 h-96 rounded-2xl flex flex-col items-start justify-center gap-4 px-12'>
            <div className='border border-zinc-800 px-2 py-2 w-full rounded-sm'>
                <h1 className='text-lg'>AI Summaries</h1>
                <p className='text-xs text-zinc-700'>
                    Get concise summaries of your bookmarks, so you can quickly understand the content without having to open the link.
                </p>
            </div>
            <div className='border border-zinc-800 px-2 py-2 w-full rounded-sm'>
                <h1 className='text-lg'>Smart Tags</h1>
            </div>
            <div className='border border-zinc-800 px-2 py-2 w-full rounded-sm'>
                <h1 className='text-lg'>Semantic Search</h1>
            </div>
            <div className='border border-zinc-800 px-2 py-2 w-full rounded-sm'>
                <h1 className='text-lg'>Automatic Metadata</h1>
            </div>
            <div className='border border-zinc-800 px-2 py-2 w-full rounded-sm'>
                <h1 className='text-lg'>Collections</h1>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Powerful