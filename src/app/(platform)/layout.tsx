import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

export default function PlatformLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative">
            {/* 1. 사이드바 (고정) */}
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>

            {/* 2. 메인 컨텐츠 영역 */}
            <main className="md:pl-72 h-full">
                {/* w-full 대신 left/right 좌표로 꽉 채우기 */}
                <div className="fixed top-0 z-50 h-16 left-0 md:left-72 right-0">
                    <Header />
                </div>

                {/* 컨텐츠 (헤더 높이만큼 띄움) */}
                <div className="pt-16 h-full p-8 bg-slate-50">
                    {children}
                </div>
            </main>
        </div>
    );
}