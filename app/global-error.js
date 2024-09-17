'use client'

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body>
            {console.log(error)}
                <div className='flex w-screen h-screen items-center justify-center'>
                    <div>
                        <div className='flex h-min w-min'>
                            <h2 className='mx-4 text-2xl'>Oops!</h2>
                            <span className='border-l-[1px] border-white px-4 text-nowrap flex items-center'>
                                <p>{message}</p>
                            </span>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}