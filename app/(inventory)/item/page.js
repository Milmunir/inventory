import { PrismaClient } from "@prisma/client"
import Filter from "./filter"

const prisma = new PrismaClient

export default async function Inventory() {
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
            <div>
                <Filter item={items} cat={categories}/>
            </div >
        </>
    )
}