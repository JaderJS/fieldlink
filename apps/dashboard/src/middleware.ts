import axios, { AxiosResponse, AxiosError, isAxiosError, } from 'axios'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkIsPrivateRoute, checkIsPublicRoute } from './functions/utils'
import { getSessionCookie } from "better-auth/cookies"
import { auth } from "@/core/better.auth"
//Authenticate next
//https://nextjs.org/docs/app/building-your-application/routing/middleware#producing-a-response

const PUBLIC_ROUTES = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl

    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.next()
    }

    const sessionCookie = getSessionCookie(request)

    if (!sessionCookie) {
        const url = request.nextUrl.clone()
        url.pathname = '/sign-in'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()

    // const token = request.cookies.get('fieldlink-web')
    // const pathname = request.nextUrl.pathname
    // const isPublic = checkIsPublicRoute(pathname)

    // if (isPublic) {
    //     return NextResponse.next()
    // }
    // if (!token) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

    // return NextResponse.next()

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}