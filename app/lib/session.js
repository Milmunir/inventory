import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(encodedKey)
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session\n' + error)
    }
}

export async function setsessioncookie(session, expat) {
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expat,
        sameSite: 'lax',
        path: '/',
    })
    
}

export async function getactiveuser() {
    const session = cookies().get('session').value
    const payload = await decrypt(session)
    return payload.id
}

export async function updatesessioncookie() {
    const session = cookies().get('session').value
    const payload = await decrypt(session)
    if (!session || !payload) {
        console.log('user not found');
        redirect('/login')
    }
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    try {
        cookies().set('session', session, {
            httpOnly: true,
            secure: true,
            expires: expires,
            sameSite: 'lax',
            path: '/',
        })
        console.log('session refresed');
        return expires
    } catch (error) {
        console.log(error);
    }
}

export async function deletesession() {
    console.log('delete session');
    cookies().delete('session')
    console.log('deleted');
}