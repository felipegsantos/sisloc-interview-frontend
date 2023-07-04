/** @type {import('next/server').NextRequest} */
/** @type {import('next/server').NextFetchEvent} */

import { NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}

async function _validateToken(token) {
    try {
        const _fetch = await fetch(new URL('/api/auth/validate', 'http://localhost:3000'), {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
        if (!_fetch.ok) {
            throw new Error('token invalid');
        }
        return await _fetch.json();
    } catch (error) {
        console.log(error);
        throw new Error('token invalid');
    }
}



export async function middleware(request, event) {
    const url = request.nextUrl
    let response = NextResponse.next();
    let cookieAuth = request.cookies.get('sisloc');

    
    if(url.pathname.startsWith('/panel')) {
        console.log('cookie  ', cookieAuth)
        if (!cookieAuth?.value) {
            if (!url.pathname.startsWith('/auth/sign_in')) {
                console.log('not has token');
                response = NextResponse.redirect(new URL(`/auth/sign_in`, request.url));
                response.cookies.delete('sisloc');
                return response;
            }
            return response;
        }
    
        await _validateToken(cookieAuth?.value).catch(err => {
            console.log('entrou no catch', err)
            response = NextResponse.redirect(new URL(`/auth/sign_in`, request.url));
            response.cookies.delete('sisloc');
            return response;
        });
    }

    return response;
}
