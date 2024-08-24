"use server"
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient

export async function getaudit(state, formdata) {
    const itemId = parseInt(formdata.get('item'))
    const sort = JSON.parse('{"' + formdata.get('sort') + '": "asc"}')
    const userId = parseInt(formdata.get('user'))
    const log = await prisma.audit.findMany({
        orderBy: [
            sort
        ],
        where: {
            item_id: isNaN(itemId) ? undefined : itemId,
            action: formdata.get('action') == '' ? undefined : formdata.get('action'),
            user_id: isNaN(userId) ? undefined : userId,
        },
        include: {
            item: {
                select: {
                    name: true
                }
            }
        }
    })
    return {
        log
    }
}

export async function auditup(param) {
    console.log(param);
    const itemId = parseInt(param.item)
    const sort = JSON.parse('{"' + param.sort + '": "asc"}')
    const userId = parseInt(param.user)
    const newdata = await prisma.audit.findMany({
        orderBy: [
            sort
        ],
        where: {
            item_id: isNaN(itemId) ? undefined : itemId,
            action: param.action == '' ? undefined : param.action,
            user_id: isNaN(userId) ? undefined : userId,
        }
    })
    return newdata
}