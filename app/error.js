'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
    }, [error])

    return (
        < div >
            {console.log(error)}
            <div className='flex w-screen h-screen items-center justify-center'>
                <div>
                    <div className='flex h-min w-min'>
                        <h2 className='mx-4 text-2xl'>Ops!</h2>
                        <span className='border-l-[1px] border-white px-4 text-nowrap flex items-center'>
                            <p>{error.message}</p>
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}