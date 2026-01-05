import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "Logout successful" });

    // 쿠키를 만료시켜서 삭제 효과를 냅니다.
    response.cookies.set("accessToken", "", { maxAge: 0, path: "/" });

    return response;
}