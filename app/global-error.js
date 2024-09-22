'use client'

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body>
                {console.log(error)}
                <div className='flex w-screen h-screen items-center justify-center'>
                    <div className='grid max-w-full grid-cols-[min-content_1fr] items-center'>
                        <h2 className='mx-4 text-2xl'>Oops!</h2>
                        <span className='border-l-[1px] border-white px-4 text-center'>
                            <p>{error.message}</p>
                        </span>
                    </div>
                </div>
            </body>
        </html>
    )
}