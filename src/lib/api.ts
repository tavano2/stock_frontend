import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000", // API 게이트웨이 주소
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // 👈 [추가] 모든 요청에 쿠키를 포함
});

export default apiClient;