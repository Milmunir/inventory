import { notFound, redirect } from "next/navigation"
import Img from "./img"
import { customModel } from "@/app/lib/prisma/customodel";
import { getactiveuser } from "@/app/lib/session";

export default async function Edititem({ params }) {
    const id = parseInt(params.id)
    const prevdata = await customModel.items.findUnique({
        where: { id: id }
    })
    if (prevdata == null) {
        notFound()
    }

    async function edititem(data) {
        "use server"
        let qty = parseInt(data.get('quantity'))
        let category = parseInt(data.get('category_id'))
        const file = data.get("base64img");
        let filename
        if (file === 'null') {
            console.log('no image');
            filename = undefined
        }
        else {
            console.log('has image');
            filename = file
        }
        try {
            const uid = await getactiveuser();
            const create = await customModel.items.upItem({
                uid: uid.id,
                id: prevdata.id,
                name: data.get('name'),
                description: data.get('description'),
                quantity: qty,
                category_id: category,
                imgpath: filename,
                before: prevdata
            })
        } catch (error) {
            console.log(error);
        }
        redirect(`/item/${id}`)
    }
    const categories = await customModel.categories.findMany()
    return (
        <>
            <title>{`Edit ${prevdata.name}`}</title>
            <div className="mb-3 pt-0 grid grid-cols-[1fr_25%] gap-4">
                <form action={edititem} id="item-form">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" placeholder="name" className="px-3 py-3 placeholder-gray-600 text-blueGray-600 text-gray-800 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full my-4" defaultValue={prevdata.name} />
                    <label htmlFor="quantity">Quantity</label>
                    <input id="quantity" name="quantity" type="number" placeholder="quantity" className="px-3 py-3 placeholder-gray-600 text-gray-800 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full my-4" min={0} defaultValue={prevdata.quantity} />
                    <label htmlFor="category_id">Category</label>
                    <select id="category_id" name="category_id" type="text" placeholder="category_id" className="px-3 py-3 placeholder-gray-600 text-gray-800 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full my-4" defaultValue={prevdata.category_id}>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" placeholder="description" className="px-3 py-3 placeholder-gray-600 text-gray-600 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full my-4" defaultValue={prevdata.description} />
                    <div className="flex w-full justify-end">
                        <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none my-4 ease-linear transition-all duration-150" type="submit">UPDATE ITEM</button>
                    </div>
                </form>
                <div>
                    <Img formid="item-form" imagebefore={prevdata.imgpath} />
                </div>
            </div>
        </>
    )
}