'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
    }, [error])

    return (
        < div >
            {/* {console.log(error.digest)} */}
            <div className='flex w-screen h-screen items-center justify-center'>
                <div className='grid max-w-full grid-cols-[min-content_1fr] items-center'>
                    <h2 className='mx-4 text-2xl'>Ops!</h2>
                    <span className='border-l-[1px] border-white px-4 text-center'>
                        <p>{error.message}</p>
                    </span>
                </div>
            </div>
        </div >
    )
}