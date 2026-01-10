import { StockChart } from '@/components/trade/stock-chart';
import { OrderForm } from '@/components/trade/order-form';

export default function TradePage() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">주식 거래</h1>
            </div>

            {/* 메인 그리드 레이아웃: 왼쪽(차트) 8칸 vs 오른쪽(주문) 4칸 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)]">

                {/* 좌측: 차트 영역 (스크롤 없이 꽉 채우기) */}
                <div className="lg:col-span-8 h-full">
                    <StockChart />
                </div>

                {/* 우측: 주문 정보 (호가창 + 주문폼) */}
                <div className="lg:col-span-4 space-y-6">
                    <OrderForm />

                    {/* 호가창 자리 (일단 빈 박스) */}
                    <div className="border rounded-lg p-4 bg-white shadow-sm h-[300px] flex items-center justify-center text-gray-400">
                        호가창 영역 (준비중)
                    </div>
                </div>

            </div>
        </div>
    );
}