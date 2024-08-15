import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Image from "next/image";

const prisma = new PrismaClient

export default async function Itemdetail({ params }) {
    const id = parseInt(params.id)
    async function changeqty(formdata){
        "use server"
        const amount = parseInt(formdata.get('amount'))
        if (formdata.get('change')==="set") {
            const result = await prisma.items.update({
                where:{id: id},
                data:{quantity: amount}
            })
        }
        else if (formdata.get('change')==="add") {
            const result = await prisma.items.update({
                where:{id: id},
                data:{quantity: {increment: amount}}
            })
        }
        else if (formdata.get('change')==="sub") {
            const result = await prisma.items.update({
                where:{id: id},
                data:{quantity: {decrement: amount}}
            })
        }
        revalidatePath(`/item/${params.id}`)
    }
    const data = await prisma.items.findUnique({
        where: {
            id: id,
        },
        include: {
            category: {
                select: {
                    name: true
                }
            }
        }
    })
    let datas = JSON.stringify(data)
    return (
        <>
            <div className="">
                <div className="grid grid-cols-[max-content_1fr] gap-4">
                    <Image
                        className="h-full w-[300px]"
                        src={`/uploads/${data.imgpath}`}
                        alt="item image"
                        height={300}
                        width={300}
                    />
                    <div>
                        <div className="m-2 mt-0">
                            <p className="uppercase font-bold text-xs">Name</p>
                            <p className="font-semibold text-xl">{data.name}</p>
                        </div>
                        <div className="m-2">
                            <p className="uppercase font-bold text-xs">Description</p>
                            <p className="font-semibold text-xl">{data.description}</p>
                        </div>
                        <div className="m-2">
                            <p className="uppercase font-bold text-xs">Quantity</p>
                            <p className="font-semibold text-xl">{data.quantity}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 ml-2">
                            <div className="w-full text-gray-800">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="font-semibold">
                                            SET QUANTITY
                                        </div>
                                        <div>
                                            <form action={changeqty}>
                                                <input name="amount" id="amount" type="number" className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                <button type="submit" name="change" value="set" className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150">Set Quantity</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full text-gray-800">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="font-semibold">
                                            CHANGE QUANTITY
                                        </div>
                                        <div>
                                            <form action={changeqty}>
                                                <input name="amount" id="amount" type="number" className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <button type="submit" name="change" value="add" className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150"><i className="fas fa-plus" /></button>
                                                    <button type="submit" name="change" value="sub" className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150"><i className="fas fa-minus" /></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}