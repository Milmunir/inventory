export default function errorLoadData() {
    return (
        <>
            <div className='flex w-full h-full items-center justify-center'>
                <div className='flex h-min w-min'>
                    <h2 className='mx-4 text-2xl'>Oops!</h2>
                    <span className='border-l-[1px] border-white px-4 text-nowrap flex items-center'>
                        <p>Error when loading data</p>
                    </span>
                </div>
            </div>
        </>
    )
}