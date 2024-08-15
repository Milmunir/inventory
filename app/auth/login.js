"use server"
const { PrismaClient } = require('@prisma/client')
import { compare, hash } from "bcrypt";
import { redirect } from "next/navigation";

const prisma = new PrismaClient()

export async function signin(state, formData) {
    const id = parseInt(formData.get('id'))    
    try {
        const enter = await prisma.user.findUnique({
            where:{
                id: id
            }
        })
        console.log(enter.password);
        const istrue = await compare(formData.get('password'), enter.password)
        if (!istrue) {
            return{
                errors: 'ID or Password incorrect'
            }
        }
        console.log(istrue);
    } catch (error) {
        console.log(error);
    }
}