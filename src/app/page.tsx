'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();

  // 1. 금고(Store)에서 상태 꺼내오기
  // (Hydration 오류 방지를 위해 마운트 체크 로직을 살짝 추가하면 더 좋습니다)
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    // 1. 서버(Next.js)에 요청해서 쿠키 삭제
    await fetch('/api/auth/logout', { method: 'POST' });

    // 2. 클라이언트 상태 비우기
    logout();
    alert('로그아웃 되었습니다.');
    router.refresh();
  };

  // 마운트 되기 전에는 아무것도 안 보여줌 (깜빡임 방지)
  if (!isMounted) return null;

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-6">
        <h1 className="text-4xl font-bold tracking-tight">Msa Stock Platform 🚀</h1>

        {/* 2. 로그인 여부에 따라 다른 화면 보여주기 */}
        {isAuthenticated ? (
            // ✅ 로그인 했을 때 (6-4단계에서 멋진 대시보드로 바뀔 예정)
            <div className="text-center space-y-4 p-8 bg-green-50 rounded-xl border border-green-200 shadow-sm w-[500px]">
              <h3 className="text-2xl font-bold text-green-700">
                환영합니다!<br/>
                <span className="text-black">{user?.email}</span> 님
              </h3>
              <p className="text-gray-600">현재 로그인 상태입니다.</p>

              <div className="flex flex-col gap-3 pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  📈 주식 거래 하러가기
                </Button>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            </div>
        ) : (
            // ❌ 로그인 안 했을 때 (랜딩 페이지)
            <div className="text-center space-y-4 p-8 bg-gray-50 rounded-xl border border-gray-200 shadow-sm w-[500px]">
              <p className="text-gray-500 mb-4">
                로그인 후 주식 거래 서비스를 이용해보세요.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/login" className="flex-1">
                  <Button className="w-full">로그인</Button>
                </Link>
                <Button variant="secondary" className="flex-1">회원가입</Button>
              </div>
            </div>
        )}
      </div>
  );
}
