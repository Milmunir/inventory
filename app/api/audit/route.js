import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient
export async function POST(request) {
    const data = await request.json();
    const sort = JSON.parse('{"' + data.sort + '": "asc"}')
    const userId = parseInt(data.user)
    const id = parseInt(data.id)
    const log = await prisma.audit.findMany({
        orderBy: [
            sort
        ],
        where: {
            user_id: isNaN(userId) ? undefined : userId,
            type: data.type == ''? undefined : data.type,
            entity_id: isNaN(id) ? undefined : id,
            action: data.action == '' ? undefined : data.action,
            part: data.part == '' ? undefined : data.part,
            timestamp:{
                gte: data.from == '' ? undefined : new Date(data.from),
                lte: data.to == '' ? undefined : new Date(data.to)
            }
        }
    })
    console.log(log);
    return NextResponse.json({log})
}