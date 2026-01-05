"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 apiClient import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
    // 스토어에서 로그인 함수(login)만 꺼내오기
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null); // 👈 에러 상태
    const [loading, setLoading] = useState(false); // 👈 로딩 상태
    const router = useRouter(); // 👈 페이지 이동을 위한 router 객체

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // 로딩 시작
        setError(null); // 이전 에러 메시지 초기화

        try {
            // 이제 응답 본문에 토큰이 없으므로, 변수에 저장할 필요 없음
            const response = await apiClient.post("/api/users/login", {
                email: email,
                password: password,
            });

            // Zustand 스토어에 "나 로그인했어!" 라고 알리기
            // API가 유저 이름(name)을 돌려준다면 그걸 쓰고, 없으면 '사용자'라고 저장합니다.
            const userName = response.data?.name || "사용자";
            login({
                email: email,
                name: userName
            });

            alert("로그인에 성공했습니다!");
            router.push("/"); // 👈 로그인 성공 시 메인 페이지("/")로 이동

        } catch (err) {
            console.error("로그인 실패:", err);
            setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">로그인</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ... (이메일, 비밀번호 Input 부분은 동일) ... */}
                    <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">비밀번호</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "로그인 중..." : "로그인"}
                    </Button>
                </form>
            </div>
        </div>
    );
}