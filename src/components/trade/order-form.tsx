'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function OrderForm() {
    const [price, setPrice] = useState(70500);
    const [quantity, setQuantity] = useState(1);

    const total = price * quantity;

    return (
        <Card>
            <CardHeader>
                <CardTitle>주문하기</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="buy" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600">매수</TabsTrigger>
                        <TabsTrigger value="sell" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">매도</TabsTrigger>
                    </TabsList>

                    {/* 매수 폼 */}
                    <TabsContent value="buy" className="space-y-4">
                        <div className="space-y-2">
                            <Label>주문 단가</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="text-right pr-8"
                                />
                                <span className="absolute right-3 top-2.5 text-sm text-gray-500">원</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>주문 수량</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="text-right pr-8"
                                />
                                <span className="absolute right-3 top-2.5 text-sm text-gray-500">주</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t flex justify-between items-center">
                            <span className="font-medium text-gray-600">총 주문 금액</span>
                            <span className="font-bold text-xl text-red-600">{total.toLocaleString()}원</span>
                        </div>

                        <Button className="w-full bg-red-600 hover:bg-red-700">
                            매수하기
                        </Button>
                    </TabsContent>

                    {/* 매도 폼 (매수와 색상만 다르게) */}
                    <TabsContent value="sell" className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
                            보유 주식이 없습니다.
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}