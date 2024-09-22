import { NextResponse } from 'next/server'
import { decrypt, updatesessioncookie } from './app/lib/session'
import { cookies } from 'next/headers'

// 1. Specify public routes and the rest is protected
const publicRoutes = ['/login', '/register']
const adminRoutes = ['/user']
const viewerRoutes = ['/dashboard', '/item', '/report', '/category', '/profile']

export default async function middleware(req) {
  // 2. Check if the current route is public
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)
  const isViewerRoute = viewerRoutes.includes(path)
  const isAdminRoute = adminRoutes.includes(path)
  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  const response = NextResponse
  if (session) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    try {
      response.next().cookies.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
      })
    } catch (error) {
      console.log(error);
    }
  }
  console.log(session?.id);

  // 5. When not logged in but trying to access
  if (!isPublicRoute && session?.id==undefined) {
    return response.redirect(new URL('/login', req.nextUrl))
  }
  if (!isViewerRoute && session?.verified === false) {
    return new response('Forrbidden', { status: 403 })
  }
  if (isAdminRoute && session.role !== 0) {
    console.log('admin - ' + session.role);
    // throw { success: false, message: 'Forrbidden', status: 403 };
    return new response('Forrbidden', { status: 403 })
  }
  // 6. Already logged in
  if (isPublicRoute && session?.id) {
    return response.redirect(new URL('/dashboard', req.nextUrl))
  }
  return response.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$|.*\\.jpg$).*)'],
}