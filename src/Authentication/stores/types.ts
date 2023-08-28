export interface LoginRequest {
    email: string,
    password: string,
}

export interface LoginResponse {
    get_user_id: { "id": number }[];
    isLoginSuccessful: boolean;
}