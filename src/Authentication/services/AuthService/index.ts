import { LoginRequest, LoginResponse } from "../../stores/types";

interface AuthService {
    loginAPI: (requestObject: LoginRequest) => Promise<LoginResponse>
}

export default AuthService