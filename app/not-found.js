import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex w-screen h-screen items-center justify-center'>
      <div className='flex h-min w-min text-center'>
        <h2 className='mx-4 text-2xl'>404</h2>
        <span className='border-l-[1px] border-white px-4 text-nowrap flex items-center'>
          <p>This Page Could not be found</p>
        </span>
      </div>
    </div>
  )
}