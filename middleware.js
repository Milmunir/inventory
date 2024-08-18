import { NextResponse } from 'next/server'
import { decrypt } from './app/lib/session'
import { cookies } from 'next/headers'
 
// 1. Specify public routes and the rest is protected
const publicRoutes = ['/login', '/register']
 
export default async function middleware(req) {
  // 2. Check if the current route is public
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  console.log(req.nextUrl);
  // 5. Redirect to /login if the user is not authenticated
  if (!isPublicRoute && !session?.id) {
    console.log('UnOK');
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  // 6. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session?.id){
    console.log('OK');
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
  console.log("nope");
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$|.*\\.jpg$).*)'],
}