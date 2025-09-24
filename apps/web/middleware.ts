import { NextRequest, NextResponse } from "next/server"


const publicRoutes=['/', '/login']


export const middleware=(req:NextRequest)=>{
    
    const token=req.cookies.get("token")?.value
    const pathName=req.nextUrl.pathname

    if(!token && !publicRoutes.includes(pathName)){
        return NextResponse.redirect(new URL('/login',req.url))
    }
    if(token && publicRoutes.includes(pathName)){
        return NextResponse.redirect(new URL('/dashboard',req.url))
    }

    return NextResponse.next()
}



export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
]
}

