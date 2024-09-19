"use server"
import 'server-only'
const { PrismaClient } = require('@prisma/client')
import { compare } from "bcrypt";
import { deletesession, encrypt, getactiveuser, setsessioncookie } from "../lib/session";
// import { NextResponse } from "next/server";
import { notFound, redirect } from "next/navigation";
import { registerValidator } from "../lib/validator";
import { hash } from "bcrypt";
import { customModel } from '../lib/prisma/customodel';
import { revalidatePath } from 'next/cache';

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
    const create = await customModel.user.newUser({
        id: id,
        name: formData.get('name'),
        password: password,
        role: 2
    })
    redirect(`/login`)
}

export async function signin(state, formData) {
    const id = parseInt(formData.get('id'))
    const enter = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    if (!enter) {
        return {
            errors: 'ID or Password incorrect'
        }
    }
    const istrue = await compare(formData.get('password'), enter.password)
    if (!istrue) {
        return {
            errors: 'ID or Password incorrect'
        }
    }
    // create session
    const expat = new Date(Date.now() + 24 * 60 * 60 * 1000) // expired 1d later
    const usertoken = await encrypt({
        id: enter.id,
        name: enter.name,
        imgprofile: enter.imgprofile,
        role: enter.role,
        expat: expat,
        verified: enter.verified
    })
    console.log(usertoken);
    await setsessioncookie(usertoken, expat)
    // NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    redirect('/dashboard')
}

export async function logout(req) {
    console.log('logout');
    console.log(req);
    await deletesession()
    redirect('/login')
}

export async function autoLogin(id) {
    const enter = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    // create session
    const expat = new Date(Date.now() + 24 * 60 * 60 * 1000) // expired 1d later
    const usertoken = await encrypt({
        id: enter.id,
        name: enter.name,
        imgprofile: enter.imgprofile,
        role: enter.role,
        expat: expat,
        verified: enter.verified
    })
    console.log(usertoken);
    await setsessioncookie(usertoken, expat)
    // NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    redirect('/dashboard')
}