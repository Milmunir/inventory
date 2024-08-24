import { customModel } from "@/app/lib/prisma/customodel";
import { getactiveuser } from "@/app/lib/session";
import { redirect } from "next/navigation"

export default async function Addcategory() {
    const uid = await getactiveuser()
    async function additem(data) {
        "use server"
        const create = await customModel.categories.newCat({
            uid: uid,
            name: data.get('name'),
            description: data.get('description')
        })
        redirect('/category')
    }
    return (
        <>
            <div className="mb-3 pt-0">
                <form action={additem}>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" placeholder="name" className="px-3 py-3 placeholder-gray-600 text-blueGray-600 text-gray-800 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full my-4" />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" placeholder="description" className="px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full my-4" />
                    <div className="flex w-full justify-end">
                        <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none my-4 ease-linear transition-all duration-150" type="submit">ADD NEW CATEGORY</button>
                    </div>
                </form>
            </div>
        </>
    )
}