import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 허용할 국가 코드 목록 (ISO 3166-1 alpha-2)
// 예: 'KR' = 한국, 'US' = 미국, 'JP' = 일본
const ALLOWED_COUNTRIES = ['KR', 'JP'];

export function middleware(request: NextRequest) {
  // /admin 경로에만 적용
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Vercel에서 제공하는 geo 정보
    const country = request.headers.get('x-vercel-ip-country') || 'UNKNOWN';
    
    // 개발 환경에서는 통과 (localhost는 geo 정보 없음)
    const isDev = process.env.NODE_ENV === 'development';
    
    if (!isDev && !ALLOWED_COUNTRIES.includes(country)) {
      // 허용되지 않은 국가 - 403 페이지로 리다이렉트 또는 에러 반환
      return new NextResponse(
        JSON.stringify({ 
          error: 'Access Denied', 
          message: '접근이 허용되지 않은 지역입니다.' 
        }),
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
  }

  return NextResponse.next();
}

// Middleware가 실행될 경로 설정
export const config = {
  matcher: '/admin/:path*',
};