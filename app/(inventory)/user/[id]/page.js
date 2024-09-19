import { PrismaClient } from "@prisma/client"
import Image from "next/image"
import { notFound } from "next/navigation"

const prisma = new PrismaClient

export default async function UserDetail({ params }) {
    const id = parseInt(params.id)
    const data = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            imgprofile: true
        }
    })
    if (data == null) {
        notFound()
    }
    return (
        <>
            <title>{data.name}</title>
            <div className="">
                <div className="flex w-full justify-between">
                    <div>
                        {data.name} DETAIL
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <a href={`/user/${id}/edit`}>
                            <button className="bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button">
                                <i className="fas fa-pen text-gray-200"></i>
                            </button>
                        </a>
                        <button type='submit' className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150">
                            <i className="fas fa-trash text-gray-200"></i>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-[25%_1fr] gap-4 w-full">
                    <div className="">
                        <div className="relative flex w-full aspect-square">
                            <Image
                                className="object-contain"
                                src={data.imgprofile == null ? '/img/noimage.jpg' : `/img/user/${data.imgprofile}`}
                                alt="item image"
                                fill={true}
                            />
                        </div>
                    </div>
                    <div className="break-words">
                        <div className="m-2 ml-0">
                            <p className="uppercase font-bold text-xs">Employee ID</p>
                            <p className="font-semibold text-xl">{data.id}</p>
                        </div>
                        <div className="m-2 ml-0 mt-0">
                            <p className="uppercase font-bold text-xs">Name</p>
                            <p className="font-semibold text-xl">{data.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}