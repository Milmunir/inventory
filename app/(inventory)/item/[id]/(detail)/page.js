import { customModel } from "@/app/lib/prisma/customodel";
import { getactiveuser } from "@/app/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Itemdetail({ params }) {
    const uid = await getactiveuser()
    const id = parseInt(params.id)
    const data = await customModel.items.findUnique({
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
    async function changeqty(formdata) {
        "use server"
        const amount = parseInt(formdata.get('amount'))
        await customModel.items.setQty({
            uid: uid,
            id: id,
            amount: amount,
            before: data.quantity
        })
        revalidatePath(`/item/${params.id}`)
    }
    async function add(formdata) {
        "use server"
        const amount = parseInt(formdata.get('amount'))
        await customModel.items.addQty({
            uid: uid,
            id: id,
            amount: amount,
            before: data.quantity
        })
        revalidatePath(`/item/${params.id}`)
    }
    async function sub(formdata) {
        "use server"
        const amount = parseInt(formdata.get('amount'))
        await customModel.items.subQty({
            uid: uid,
            id: id,
            amount: amount,
            before: data.quantity
        })
        revalidatePath(`/item/${params.id}`)
    }
    async function remove(formdata) {
        "use server"
        await customModel.items.remove({
            uid: uid,
            id: id,
            before: data
        })
        redirect('/item')
    }
    return (
        <>
            <div className="">
                <div className="flex w-full justify-between">
                    <div>
                        {data.name} DETAIL
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <a href={`/item/${id}/edit`}>
                            <button className="bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button">
                                <i className="fas fa-pen text-gray-200"></i>
                            </button>
                        </a>
                        <form action={remove}>
                            <button type='submit' className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150">
                                <i className="fas fa-trash text-gray-200"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-[min-content min-content] gap-4 w-full">
                    <div className="lg:row-span-2 row-span-1 col-span-1">
                        <div className="relative flex w-full h-full">
                            <Image
                                className="object-contain"
                                src={`/uploads/${data.imgpath}`}
                                alt="item image"
                                fill={true}
                            />
                        </div>
                    </div>
                    <div className="lg:row-span-1 col-span-1 break-words">
                        <div className="m-2 ml-0 mt-0">
                            <p className="uppercase font-bold text-xs">Name</p>
                            <p className="font-semibold text-xl">{data.name}</p>
                        </div>
                        <div className="m-2 ml-0">
                            <p className="uppercase font-bold text-xs">Description</p>
                            <p className="font-semibold text-xl">{data.description}</p>
                        </div>
                        <div className="m-2 ml-0">
                            <p className="uppercase font-bold text-xs">Quantity</p>
                            <p className="font-semibold text-xl">{data.quantity}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:row-span-1 col-span-2 lg:col-span-1">
                        <div className="w-full text-gray-800">
                            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-0 shadow-lg">
                                <div className="flex-auto p-4">
                                    <div className="font-semibold">
                                        SET QUANTITY
                                    </div>
                                    <div>
                                        <form action={changeqty}>
                                            <input name="amount" id="amount" type="number" className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            <button type="submit" className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150">Set Quantity</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-gray-800">
                            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-0 shadow-lg">
                                <div className="flex-auto p-4">
                                    <div className="font-semibold">
                                        CHANGE QUANTITY
                                    </div>
                                    <div>
                                        <form action={add}>
                                            <input name="amount" id="amount" type="number" className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <button type="submit" formAction={add} className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150"><i className="fas fa-plus" /></button>
                                                <button type="submit" formAction={sub} className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150"><i className="fas fa-minus" /></button>
                                            </div>
                                        </form>
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