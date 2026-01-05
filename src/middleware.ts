import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. 로그인이 필요한 페이지들 (보호된 경로)
const protectedRoutes = ['/dashboard', '/trade', '/portfolio', '/settings'];
// 2. 이미 로그인한 사람은 접근 금지할 페이지들 (로그인, 회원가입)
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value; // 쿠키 확인
    const { pathname } = request.nextUrl;

    // -------------------------------------------------------------
    // 규칙 A: 보호된 페이지 접근 제어
    // "로그인 안 한 사람이 VIP 룸에 가려고 하면 -> 로그인 페이지로 쫓아냄"
    // -------------------------------------------------------------
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname); // 원래 가려던 곳 기억
        return NextResponse.redirect(loginUrl);
    }

    // -------------------------------------------------------------
    // 규칙 B: 인증 페이지 접근 제어 (여기가 사용자님이 원하신 기능! ✨)
    // "이미 로그인한 사람이 로그인 페이지에 오면 -> 메인으로 보냄"
    // -------------------------------------------------------------
    if (authRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// 미들웨어가 실행될 경로를 지정합니다.
export const config = {
    matcher: [
        /*
         * 아래 경로들을 제외한 모든 경로에서 미들웨어를 실행합니다.
         * - api (API 라우트)
         * - _next/static (정적 파일)
         * - _next/image (이미지 최적화 파일)
         * - favicon.ico (파비콘)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}