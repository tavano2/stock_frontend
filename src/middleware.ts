import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 이 함수는 matcher에 지정된 경로에 대한 요청이 오면 실행됩니다.
export function middleware(request: NextRequest) {
    // 1. 요청에서 accessToken 쿠키를 가져옵니다.
    const accessToken = request.cookies.get('accessToken');

    // 2. accessToken이 없으면 로그인 페이지로 리다이렉트합니다.
    if (!accessToken) {
        // 사용자가 원래 가려던 경로를 쿼리 파라미터로 추가하여,
        // 로그인 성공 후 원래 페이지로 돌아갈 수 있도록 합니다.
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.search = `redirect=${request.nextUrl.pathname}`;
        return NextResponse.redirect(url);
    }

    // 3. accessToken이 있으면 요청을 그대로 통과시킵니다.
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
         * - login, signup (인증이 필요 없는 페이지)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)',
    ],
}