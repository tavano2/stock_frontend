import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. 저장할 유저 정보의 타입 정의 (필요한 정보만 정의)
interface User {
    email: string;
    name?: string; // 이름은 없을 수도 있으니 선택값(?)으로
}

// 2. 스토어(금고)의 전체 모양 정의 (데이터 + 데이터를 조작하는 함수)
interface AuthState {
    user: User | null;      // 로그인 안했으면 null
    isAuthenticated: boolean; // 로그인 여부 (true/false)
    login: (user: User) => void; // 로그인 함수
    logout: () => void;          // 로그아웃 함수
}

// 3. 스토어 생성
export const useAuthStore = create<AuthState>()(
    // persist 미들웨어: 새로고침 해도 로그인이 풀리지 않게 LocalStorage에 자동 저장해줍니다!
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            // 로그인 시: 유저 정보를 받고, 인증 상태를 true로 변경
            login: (userData) => set({ user: userData, isAuthenticated: true }),

            // 로그아웃 시: 정보를 싹 비움
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage', // 브라우저 LocalStorage에 저장될 키 이름
        }
    )
);