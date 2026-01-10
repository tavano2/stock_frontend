'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 차트용 가짜 데이터 (하루치 주가 변동)
const data = [
    { time: '09:00', price: 68000 },
    { time: '10:00', price: 68500 },
    { time: '11:00', price: 69200 },
    { time: '12:00', price: 68800 },
    { time: '13:00', price: 69500 },
    { time: '14:00', price: 70100 },
    { time: '15:00', price: 69800 },
    { time: '15:30', price: 70500 },
];

export function StockChart() {
    return (
        <Card className="h-full border-none shadow-none md:shadow-sm md:border">
            <CardHeader>
                <div className="flex justify-between items-end">
                    <div>
                        <CardTitle className="text-2xl font-bold">삼성전자</CardTitle>
                        <span className="text-sm text-gray-500">005930 · KOSPI</span>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-red-500">70,500원</div>
                        <div className="text-sm text-red-500">+2,500 (3.6%)</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[400px] w-full p-0 md:p-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            tickFormatter={(value) => `${value.toLocaleString()}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={(value: any) => [`${Number(value || 0).toLocaleString()}원`, '주가']}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#ef4444"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}