"use server"
const { PrismaClient } = require('@prisma/client')
import { redirect } from "next/navigation";
import { registerValidator } from "../lib/validator";
import { hash } from "bcrypt";

const prisma = new PrismaClient()

export async function signup(state, formData) {
    const id = parseInt(formData.get('id'))
    // Validate form fields
    const validatedFields = registerValidator.safeParse({
        id: id,
        name: formData.get('name'),
        password: formData.get('password'),
    })
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const password = await hash(formData.get('password'), 10)
    const create = await prisma.user.create({
        data: {
            id: id,
            name: formData.get('name'),
            password: password,
            role: 2
        }
    })
    redirect(`/login`)
}