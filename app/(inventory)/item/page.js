import { PrismaClient } from "@prisma/client"
import Filter from "./filter"
import { getactiveuser } from "@/app/lib/session"

const prisma = new PrismaClient

export default async function Inventory() {
    const user = await getactiveuser()

    const items = await prisma.items.findMany({
        orderBy: [
            { name: 'asc' },
            { id: 'asc' }
        ],
        include: {
            category: {
                select: {
                    name: true
                }
            }
        }
    })
    const categories = await prisma.categories.findMany({
        select: {
            id: true,
            name: true
        }
    })
    return (
        <>
            <title>Items</title>
            <div>
                <Filter item={items} cat={categories} user={user} />
            </div >
        </>
    )
}