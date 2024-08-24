import { PrismaClient } from "@prisma/client";
import Table from "./table";
import Filter from "./filter";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient

export default async function Audit() {
    const log = await prisma.audit.findMany({
        orderBy: [
            { timestamp: 'desc' }
        ],
        include: {
            item: {
                select: {
                    name: true
                }
            }
        }
    })
    const item = await prisma.items.findMany({
        select: {
            id: true,
            name: true
        }
    })
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true
        }
    })
    
    return (
        <>
            <Filter user={users} item={item} log={log}/>
        </>
    )
}