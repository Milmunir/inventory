import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient
export async function POST(request) {
    const data = await request.json();
    const itemId = parseInt(data.item)
    const sort = JSON.parse('{"' + data.sort + '": "asc"}')
    const userId = parseInt(data.user)
    const log = await prisma.audit.findMany({
        orderBy: [
            sort
        ],
        where: {
            item_id: isNaN(itemId) ? undefined : itemId,
            action: data.action == '' ? undefined : data.action,
            user_id: isNaN(userId) ? undefined : userId,
            timestamp:{
                gte: data.from == '' ? undefined : new Date(data.from),
                lte: data.to == '' ? undefined : new Date(data.to)
            }
        },
        include: {
            item: {
                select: {
                    name: true
                }
            }
        }
    })
    console.log(log);
    
    return NextResponse.json({log})
}