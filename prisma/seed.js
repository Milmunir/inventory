const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcrypt')
const prisma = new PrismaClient()
const dotenv = require('dotenv')

dotenv.config()

async function main() {
    const password = await hash(process.env.ADMIN_PASSWORD, 10)
    const admin = await prisma.user.create({
        data: {
            id: 0,
            name: process.env.ADMIN_NAME,
            password: password,
            role: 0,
            verified: true
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })