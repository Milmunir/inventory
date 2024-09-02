import { customModel } from "@/app/lib/prisma/customodel"
import { getactiveuser } from "@/app/lib/session"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient

export default async function Inventory() {
    const fetched = await prisma.categories.findMany()
    const uid = await getactiveuser()
    async function remove(data) {
        "use server"
        const id = parseInt(data.get('id'))
        const del = await customModel.categories.remove({
            id: id,
            uid: uid.id
        })
        revalidatePath('/category')
    }
    return (
        <>
            <div>
                <div className="flex w-full justify-end">
                    <a href="/category/add">
                        <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150" type="button">
                            Add
                        </button>
                    </a>
                </div>
                <div className="table border-collapse table-auto w-full text-sm mt-4">
                    <div className="table-header-group">
                        <div className="table-row">
                            <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pr-0 w-0 text-slate-400 dark:text-slate-200 text-left">#</div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-4 pt-4 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pr-4 pt-4 pb-3 text-slate-400 dark:text-slate-200 text-left">description</div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium text-slate-400 w-12 dark:text-slate-200 text-left"></div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium text-slate-400 w-12 dark:text-slate-200 text-left"></div>
                        </div>
                    </div>
                    {fetched.map((key) => (
                        <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                            <div className="table-row">
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pr-0 text-slate-500 dark:text-slate-400">{key.id}</div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-4 w-48 text-slate-500 dark:text-slate-400">{key.name}</div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pr-8 w-auto text-slate-500 dark:text-slate-400">{key.description}</div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 pl-2 text-slate-500 dark:text-slate-400 align-middle w-12 p-0">
                                    <a href={`/category/${key.id}/edit`}>
                                        <button className="bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button">
                                            <i className="fas fa-pen text-gray-200"></i>
                                        </button>
                                    </a>
                                </div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 text-slate-500 dark:text-slate-400 align-middle w-12 p-0">
                                    <form action={remove}>
                                        <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="submit" name="id" value={key.id}>
                                            <i className="fas fa-trash text-gray-200"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}